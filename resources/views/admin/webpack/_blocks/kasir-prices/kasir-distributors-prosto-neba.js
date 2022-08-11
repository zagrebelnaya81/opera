import SeatDistributors from "./class/seatDistributorsClass"
import DistributorsControllerProstoNebaClass from "./class/distributorsControllerProstoNebaClass"
import {pullDistributorsFromServer, pullDistributorsSeatsFromServer, pushDistributorsSeatsProstoNebaToServer, sellDistributorsTickets} from "./getDataFromServer"
import {alertSuccess, alertError} from "../../global/alert"

export default function kasirDistributors() {
  const kasir = document.querySelector(`#kasir-prosto-neba`);

  if (!kasir) return false;

  window.addEventListener(`load`, (e) => {
    class KasirSchemeController {
      constructor(item) {
        this.item = item;

        this.priceZonesController = null;
        this.seats = null;

        this.saveBtn = this.item.querySelector(`#saveSeats`);
        this.btnDisabled = false;

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
              .then(() => {
                pullDistributorsSeatsFromServer()
                  .then(data => data.ticketsCashBox.data)
                  .then(data => this.seats = data)
                  .then(() => {
                    this.alertBlock.prepend(alertSuccess(`Квитки успішно продані`))
                    this.priceZonesController.enabledBtnSell(this.distributor_id);
                    this.checkBtnDistributorsVisible();
                    this.distributor_id = null;
                  })
                  .catch(err => {
                    this.priceZonesController.enabledBtnSell(this.distributor_id);
                    this.checkBtnDistributorsVisible();
                  })
              })
              .catch(err => {
                this.alertBlock.prepend(alertError(`Помилка! Квитки не були продані`))
                this.distributor_id = null;
                this.priceZonesController.enabledBtnSell(this.distributor_id);
                this.checkBtnDistributorsVisible();
              })
          }
        });

        this.item.addEventListener(`sellTickets`, (e) => {
          this.distributor_id = e.detail.id;
          $(this.modal).modal(`show`);
        });

        this.getDataFromServer()
          .then(data => {
            this.item.removeAttribute(`data-disabled`);

            const distrIdList = data.distr.map(item => item.id),
                  seats = data.seats;

            distrIdList.forEach(id => {
              const filteredSeats = seats.filter(seat => seat.distributor_id == id);

              this.priceZonesController.setCount(id, filteredSeats.length);
              filteredSeats.length > 0 ? this.priceZonesController.showBtnSell(id) : null;
            })
          })

        this.saveBtn.addEventListener(`click`, (e) => {
          this.pushSeats()
            .then(() => {
              pullDistributorsSeatsFromServer()
                .then(data => data.ticketsCashBox.data)
                .then(data => this.seats = data)
                .then(() => {
                  this.btnDisabled = false;
                  this.btnSaveStatus();
                  this.alertBlock.prepend(alertSuccess(`Дані успішно збережені`));
                  this.checkBtnDistributorsVisible();
                })
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
      }

      async getDataFromServer() {
        const distr = await pullDistributorsFromServer()
          .then(data => {
            const kasirPrices = document.querySelector(`.kasir__prices`);

            this.priceZonesController = new DistributorsControllerProstoNebaClass(kasirPrices, data);

            return data
          });

        const seats = await pullDistributorsSeatsFromServer()
          .then(data => data.ticketsCashBox.data)
          .then(data => this.seats = data);

        return {
          distr: distr,
          seats: seats
        }
      }

      btnSaveStatus() {
        this.saveBtn.disabled = this.btnDisabled;

        if (this.btnDisabled) {
          this.saveBtn.classList.add(`disabled`);
        } else {
          this.saveBtn.classList.remove(`disabled`);
        }
      }

      async pushSeats() {
        this.btnDisabled = true;
        this.btnSaveStatus();
        await pushDistributorsSeatsProstoNebaToServer(this.priceZonesController.createDataForBooking())
              .catch(err => {
                this.btnDisabled = false;
                this.btnSaveStatus();
                throw err
              })
      }

      checkBtnDistributorsVisible() {
        this.priceZonesController.priceZonesList.map(item => item.id)
        .forEach(item => {
          const find = this.seats.some(seat => seat.distributor_id == item);
          find ? this.priceZonesController.showBtnSell(item) : this.priceZonesController.hideBtnSell(item);
        });
      }

      async sellTickets(payload) {
        const id = payload.id,
              type = payload.type;

        this.priceZonesController.disabledBtnSell(id);

        await sellDistributorsTickets({
            payment_type: type,
            distributor_id: id
          })
          .then(data => {
            if (!data.status) throw data
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
