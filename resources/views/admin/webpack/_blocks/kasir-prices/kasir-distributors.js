import SeatDistributors from "./class/seatDistributorsClass"
import DistributorsControllerClass from "./class/distributorsControllerClass"
import {ServerDataSendDistributors} from "./class/serverDataSendClass"
import {pullDistributorsFromServer, pullDistributorsSeatsFromServer, pushDistributorsSeatsToServer, sellDistributorsTickets} from "./getDataFromServer"
import schemeDraw from "./schemeDraw"
import {alertSuccess, alertError} from "../../global/alert"

export default function kasirDistributors() {
	const kasir = document.querySelector(`#kasir-distributors`);

	if (!kasir) return false;

	window.addEventListener(`load`, (e) => {
		class KasirSchemeController {
			constructor(item) {
				this.item = item;
				this.activeScheme = {
					id: null,
					color: null
				};
        this.disabledColorValue = `#dddddd`;
        this.similarColorValue = `#999999`;
        this.disabledColor = true;
				this.priceZonesController = null;
				this.seats = null;
        this.activeSeats = [];
				this.saveBtn = this.item.querySelector(`#saveSeats`);
				this.btnDisabled = false;
				this.scheme = schemeDraw();
				this.massActive = false;
        this.ctrlMassActive = false;
        this.filteredColorArr = null;
				this.alertBlock = this.item.querySelector(`.kasir__alert-wrap`);
        this.modal = document.querySelector(`[data-sold-modal]`);
        this.distributor_id = null;

        this.modal.addEventListener(`click`, (e) => {
          const target = e.target.closest(`[data-sold-type]`);

          if (target) {
            const payload = {
                type: target.getAttribute(`data-sold-type`),
                id: this.distributor_id
              };

            $(this.modal).modal(`hide`);

            this.sellTickets(payload)
            .then(data => {
              this.alertBlock.prepend(alertSuccess(`Квитки успішно продані`))
              this.priceZonesController.showSoldLink(this.distributor_id);
              this.distributor_id = null;
            })
            .catch(err => {
              this.alertBlock.prepend(alertError(`Помилка! Квитки не були продані`))
              this.distributor_id = null;
            })
          }
        });

        this.item.addEventListener(`priceZonesChange`, (e) => this.setActiveScheme(e));
				this.item.addEventListener(`disabledColor`, (e) => this.changeDisabledColor(e));
        this.item.addEventListener(`sellTickets`, (e) => {
          this.distributor_id = e.detail.id;
          $(this.modal).modal(`show`);
        });

				this.getDataFromServer()
          .then(() => [...document.querySelectorAll(`#scheme [data-seat]:not([data-seat-id])`)].forEach(item => {
            item.classList.add(`not-markable`);
            item.classList.add(`not-available`);
          }))
          .then(() => {
            this.item.removeAttribute(`data-disabled`);
  					this.seats.forEach((seat, i) => {
  						if (seat.distributor_id) {
  							const data = this.priceZonesController.getDataById(seat.distributor_id),
                      color = this.disabledColor ? this.disabledColorValue : data.color;

                seat.fillElement({id: data.id, color: color}, true);
                this.priceZonesController.showBtnSell(seat.distributor_id);
  						} else if (seat.isAvailable == `0`) {
                seat.domItem.closest(`g`).classList.add(`not-available`);
              }
  					});
  				});

				this.saveBtn.addEventListener(`click`, (e) => {
					this.pushSeats()
						.then(() => {
							this.alertBlock.prepend(alertSuccess(`Дані успішно збережені`));
							this.clearLocalSeats();
              this.activeSeats = [];
              this.checkBtnDistributorsVisible();
						})
						.catch(err => {
              console.log(err)
              if (!err.status) {
                this.alertBlock.prepend(alertError(`Помилка! Одне або кілька місць зайняті. Сторінка буде перезавантажена через 2сек`));
                setTimeout(() => {
                  location.reload();
                }, 2000)
              } else {
                this.alertBlock.prepend(alertError(`Помилка! Дані не можуть бути збережені`));
              }
						})
				});

        this.scheme.addEventListener(`mouseover`, (e) => {
          const resetArr = () => {
            if (this.filteredColorArr) {
              let color = this.disabledColorValue,
                  distributorId = this.filteredColorArr[0].distributor_id;

              this.filteredColorArr.forEach(item => item.fillElement({id: item.distributor_id, color}, true));
              this.filteredColorArr = null;
              this.priceZonesController.triggerActiveHoverItem(distributorId, 0, false);
            }
          }

          if (this.seats && this.disabledColor && !this.ctrlMassActive) {
            const target = e.target.closest(`[data-seat]`);
            let active = ``;

            if (target) {
              if (target != active) {
                const distributor = this.seats.find(item => item.domItem == target.querySelector(`circle`)),
                      distributorId = distributor ? distributor.distributor_id : null;

                if (distributorId) {
                  resetArr();

                  active = target;
                  this.filteredColorArr = this.seats.filter(item => item.distributor_id == distributorId);
                  this.filteredColorArr.forEach(item => item.fillElement({id: distributorId, color: this.similarColorValue}, true));
                  this.priceZonesController.triggerActiveHoverItem(distributorId, this.filteredColorArr.length, true);

                  return false;
                }
              }
            }
          }

          resetArr();
        });
        this.massCheckWithoutCtrl();
				this.massSeatCheck();
			}

      massCheckWithoutCtrl() {
        let targetArr = [];

        const massCheckMove = (e) => {
          const moveTarget = e.target.closest(`[data-seat]`);

          if (moveTarget && !targetArr.find(item => item == moveTarget)) {
            targetArr.push(moveTarget);
            this.setSeatPrice(moveTarget);
          }
        };

        this.scheme.addEventListener(`mousedown`, (e) => {
          if (this.massActive) return false;
          const target = e.target.closest(`[data-seat]`);

          if (target) {
            targetArr.push(target);
            this.setSeatPrice(target);
            this.ctrlMassActive = true;
            this.scheme.addEventListener(`mousemove`, massCheckMove);
          }
        });

        this.scheme.addEventListener(`mouseup`, (e) => {
          targetArr = [];
          this.ctrlMassActive = false;
          this.scheme.removeEventListener(`mousemove`, massCheckMove);
        })
      }

			massSeatCheck() {
				let timer = null,
						keyDownFire = false,
						mouseObj = {X: [], Y: []},
						element = null;

				const sortCoordinates = (a, b) => {
						if (a > b) return 1;
						if (a < b) return -1;
					},
					mouseCoordinatesDown = (e) => {
						mouseObj.X = [];
						mouseObj.Y = [];
						mouseObj.X.push(e.x);
						mouseObj.Y.push(e.y);

						element = createBorderElement({X: e.x, Y: e.y});
						this.scheme.addEventListener(`mousemove`, mouseCoordinatesMove);
					},
					mouseCoordinatesMove = (e) => {
						if (!element) return false;
						const left = parseInt(element.style.left) || `auto`,
									right = parseInt(element.style.right) || `auto`,
									top = parseInt(element.style.top) || `auto`,
									bottom = parseInt(element.style.bottom) || `auto`;

						if (left !== `auto`) {
							if (e.x < mouseObj.X[0]) {
								element.style.right = `${window.innerWidth - left}px`;
								element.style.left = `auto`;
							}
						} else if (right !== `auto`) {
							if (e.x > mouseObj.X[0]) {
								element.style.left = `${window.innerWidth - right}px`;
								element.style.right = `auto`;
							}
						}

						if (top !== `auto`) {
							if (e.y < mouseObj.Y[0]) {
								element.style.bottom = `${window.innerHeight - top}px`;
								element.style.top = `auto`;
							}
						} else if (bottom !== `auto`) {
							if (e.y > mouseObj.Y[0]) {
								element.style.top = `${window.innerHeight - bottom}px`;
								element.style.bottom = `auto`;
							}
						}

						element.style.width = `${Math.abs(mouseObj.X[0] - e.x)}px`;
						element.style.height = `${Math.abs(mouseObj.Y[0] - e.y)}px`;
					},
					mouseCoordinatesUp = (e) => {
						mouseObj.X.push(e.x);
						mouseObj.Y.push(e.y);
						mouseObj.X.sort(sortCoordinates);
						mouseObj.Y.sort(sortCoordinates);

						if (mouseObj.X.length >= 2 && mouseObj.Y.length >= 2) {
							this.massSetSeatPrice(mouseObj);
						}
						this.scheme.removeEventListener(`mousemove`, mouseCoordinatesMove);
						if (element) {
							element.remove();
							element = null;
						}
					},
					createBorderElement = (coordinate) => {
						const el = document.createElement(`div`);

						el.style.cssText = `position:fixed;top:${coordinate.Y}px;left:${coordinate.X}px;border:1px solid #333333;pointer-events:none;background:rgba(0,0,0,0.2);z-index:10000;`
						document.body.appendChild(el);
						return el;
					};

				window.addEventListener(`keydown`, (e) => {
					if (e.keyCode === 17) {
						if (!keyDownFire) {
							this.massActive = true;
							mouseObj.X = [];
							mouseObj.Y = [];
							this.scheme.classList.add(`kasir__scheme-massive`);
							this.scheme.addEventListener(`mousedown`, mouseCoordinatesDown);
							this.scheme.addEventListener(`mouseup`, mouseCoordinatesUp);
							keyDownFire = true;
						}
					}
				});

				window.addEventListener(`keyup`, (e) => {
					if (e.keyCode === 17) {
						this.massActive = false;
						this.scheme.classList.remove(`kasir__scheme-massive`);
						this.scheme.removeEventListener(`mousedown`, mouseCoordinatesDown);
						this.scheme.removeEventListener(`mouseup`, mouseCoordinatesUp);
						keyDownFire = false;

						if (element) {
							element.remove();
							element = null;
						}
					}
				})
			}

			setActiveScheme(e) {
				this.activeScheme.id = e.detail.priceZoneActive.id;
				this.activeScheme.color = e.detail.priceZoneActive.color;
			}

      changeDisabledColor(e) {
        this.disabledColor = e.detail.disabledColor;

        this.seats.forEach(item => {
          if (!item.distributor_id) return false;

          let color = this.disabledColor ? this.disabledColorValue : this.priceZonesController.getDataById(item.distributor_id).color;

          item.fillElement({id: item.distributor_id, color}, true);
        })
      }

			async getDataFromServer() {
				await pullDistributorsFromServer()
					.then(data => {
						const kasirPrices = document.querySelector(`.kasir__prices`);

						this.priceZonesController = new DistributorsControllerClass(kasirPrices, data);
					});

				await pullDistributorsSeatsFromServer()
					.then(data => data.ticketsCashBox.data)
					.then(serverSeats => {
						this.seats = serverSeats.map(item => {
							const seat = new SeatDistributors(item),
                    group = document.querySelector(`#scheme [data-section="${item.seatPrice.data.section_number}"] [data-row="${item.seatPrice.data.row_number}"] [data-seat="${item.seatPrice.data.seat_number}"]`);
							seat.setDomLink(group.querySelector(`circle`));
              group.setAttribute(`data-seat-id`, item.id);

              return seat
						})
					});
			}

      setSeatsToActive(seats) {
        seats.forEach(seat => {
          if (seat) {
            const color = this.disabledColor ? this.disabledColorValue : this.activeScheme.color;

            seat.fillElement({id: this.activeScheme.id, color: color}, this.activeScheme.id);
          }

          const index = this.activeSeats.findIndex(item => item.id == seat.id);

          if (index == -1) {
            this.activeSeats.push(seat)
          } else {
            this.activeSeats.splice(index, 1);
            this.activeSeats.push(seat);
          }
        })
      }

			setSeatPrice(seat) {
        if (seat.classList.contains(`not-available`)) return false;
				const seatIndex = seat.getAttribute(`data-seat`),
							row = seat.closest(`[data-row]`),
							rowIndex = row.getAttribute(`data-row`),
							section = row.closest(`[data-section]`),
							sectionIndex = section.getAttribute(`data-section`);

				const seatObj = this.seats.find(item => item.row == rowIndex && item.section == sectionIndex && item.seat_number == seatIndex);

        if (seatObj) {
          this.setSeatsToActive([seatObj]);
          this.setLocalSeats();
        }
			}

			massSetSeatPrice(coordinate) {
				const filterSeats = this.seats.filter(item => {
          if (item.domItem.closest(`g`).classList.contains(`not-available`)) return false;

					const itemCoord = item.domItem.getBoundingClientRect(),
								itemCenter = {
									X: itemCoord.left + itemCoord.width / 2,
									Y: itemCoord.top + itemCoord.height / 2
								}

					if (coordinate.X[0] <= itemCenter.X && coordinate.X[1] >= itemCenter.X && coordinate.Y[0] <= itemCenter.Y && coordinate.Y[1] >= itemCenter.Y) {
						return true;
					} else {
						return false;
					}
				});

        this.setSeatsToActive(filterSeats);
				this.setLocalSeats();
			}

			setLocalSeats() {
				localStorage.setItem(`${location.href}`, JSON.stringify(this.activeSeats))
			}

			clearLocalSeats() {
				localStorage.removeItem(`${location.href}`)
			}

			btnSaveStatus() {
				this.saveBtn.disabled = this.btnDisabled;

				if (this.btnDisabled) {
					this.saveBtn.classList.add(`disabled`);
				} else {
					this.saveBtn.classList.remove(`disabled`);
				}
			}

			createDataForServer() {
				return {
					tickets: this.activeSeats.map(seat => new ServerDataSendDistributors(seat))
				}
			}

			async pushSeats() {
				this.btnDisabled = true;
				this.btnSaveStatus();
				await pushDistributorsSeatsToServer(this.createDataForServer())
							.then((data) => {
								this.btnDisabled = false;
								this.btnSaveStatus();
							})
							.catch(err => {
								this.btnDisabled = false;
								this.btnSaveStatus();
								throw err
							})
			}

      checkBtnDistributorsVisible() {
        this.priceZonesController.priceZonesList.map(item => item.id).forEach(item => {
          const find = this.seats.some(seat => seat.distributor_id == item);
          find ? this.priceZonesController.showBtnSell(item) : this.priceZonesController.hideBtnSell(item);
        });
      }

      async sellTickets(payload) {
        const id = payload.id,
              type = payload.type,
              tickets = this.seats.filter(seat => seat.distributor_id == id);

        this.priceZonesController.disabledBtnSell(id);

        await sellDistributorsTickets({
            payment_type: type,
            distributor_id: id
          })
          .then(data => {
            if (data.status) {
              this.priceZonesController.enabledBtnSell(id);
              tickets.forEach(seat => {
                seat.fillElement({});
                seat.domItem.closest(`g`).classList.add(`not-available`);
              });
            } else {
              throw data
            }

            this.checkBtnDistributorsVisible();
          })
          .catch(err => {
            this.priceZonesController.enabledBtnSell(id);
            throw err
          });
      }
		}

		new KasirSchemeController(kasir);
	})
}
