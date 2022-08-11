"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  (function () {
    var SessionStorageCartClass = function () {
      function SessionStorageCartClass() {
        _classCallCheck(this, SessionStorageCartClass);

        this.perfomances = null;
        this._init();
        this.vue = null;
      }

      _createClass(SessionStorageCartClass, [{
        key: "_init",
        value: function _init() {
          var _this = this;

          this._intervalFunc();

          setInterval(function () {
            _this._intervalFunc();
          }, 100);
        }
      }, {
        key: "_intervalFunc",
        value: function _intervalFunc() {
          var _this2 = this;

          var sessionStorageData = sessionStorage.getItem("cart");

          if (sessionStorageData) {
            var parseData = JSON.parse(sessionStorageData),
                filteredData = parseData.perfomances.filter(function (perfomance) {
              return _this2._checkTimeEnd(perfomance.date, perfomance.reserved_time);
            });

            this.perfomances = filteredData;

            if (!this.perfomances.length) {
              this._deleteCart();
            } else {
              sessionStorage.setItem("cart", JSON.stringify({ perfomances: this.perfomances }));
            }
          }
        }
      }, {
        key: "_deleteCart",
        value: function _deleteCart() {
          this.perfomances = null;

          sessionStorage.removeItem("cart");
        }
      }, {
        key: "_checkTimeEnd",
        value: function _checkTimeEnd(date, reserved_time) {
          return new Date() < new Date(date) && new Date() - 24 * 60 * 60 * 1000 < new Date(reserved_time);
        }
      }, {
        key: "addTickets",
        value: function addTickets(obj) {
          var _this3 = this;

          if (this.perfomances) {
            var index = this.perfomances.findIndex(function (item) {
              return item.id == obj.id;
            });

            if (index == -1) {
              this.perfomances.push({
                reserved_time: new Date(),
                id: obj.id,
                date: obj.date,
                tickets: obj.tickets
              });
            } else {
              obj.tickets.forEach(function (item) {
                var arr = _this3.perfomances[index].tickets;

                if (arr.every(function (arrItem) {
                  return arrItem != item;
                })) arr.push(item);
              });
            }
          } else {
            this.perfomances = [{
              reserved_time: new Date(),
              id: obj.id,
              date: obj.date,
              tickets: obj.tickets
            }];
          }

          sessionStorage.setItem("cart", JSON.stringify({ perfomances: this.perfomances }));
        }
      }, {
        key: "removeTickets",
        value: function removeTickets(obj) {
          if (this.perfomances) {
            var index = this.perfomances.findIndex(function (item) {
              return item.id == obj.id;
            });

            if (index != -1) {
              var newArr = this.perfomances[index].tickets.filter(function (item) {
                return !obj.tickets.find(function (ticket) {
                  return item == ticket;
                });
              });

              !newArr.length ? this.perfomances.splice(index, 1) : this.perfomances[index].tickets = newArr;

              if (this.perfomances.length) {
                sessionStorage.setItem("cart", JSON.stringify({ perfomances: this.perfomances }));
              } else {
                this.perfomances = null;
                sessionStorage.removeItem("cart");
              }
            }
          }
        }
      }, {
        key: "setVue",
        value: function setVue(obj) {
          this.vue = obj;
        }
      }]);

      return SessionStorageCartClass;
    }();

    ;

    window.sessionStorageCart = new SessionStorageCartClass();
  })();

  (function () {
    var LocalStorageCartClass = function () {
      function LocalStorageCartClass() {
        _classCallCheck(this, LocalStorageCartClass);

        this.el = null;
        this.localStorageData = null;
        this.reserved_time = null;
        this.perfomances = null;
        this.vue = null;
        this.lang = document.documentElement.getAttribute("lang");
        this.translation = {
          youHave: {
            ru: "\u0423 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C",
            en: "You have",
            ua: "\u0423 \u0432\u0430\u0441 \u0454"
          },
          minutes: {
            ru: "\u043C\u0438\u043D\u0443\u0442, \u0447\u0442\u043E\u0431\u044B \u043E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437",
            en: "minutes to place an order",
            ua: "\u0445\u0432\u0438\u043B\u0438\u043D, \u0449\u043E\u0431 \u043E\u0444\u043E\u0440\u043C\u0438\u0442\u0438 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F"
          }
        };

        this._init();
      }

      _createClass(LocalStorageCartClass, [{
        key: "_init",
        value: function _init() {
          var _this4 = this;

          this._intervalFunc();

          setInterval(function () {
            _this4._intervalFunc();
          }, 100);
        }
      }, {
        key: "_intervalFunc",
        value: function _intervalFunc() {
          var localStorageData = localStorage.getItem("cart");

          if (localStorageData) {
            this.localStorageData = localStorageData;

            var parseData = JSON.parse(this.localStorageData);

            this.reserved_time = parseData.reserved_time;
            this.perfomances = parseData.perfomances;

            if (this._checkTimeEnd()) {
              this.perfomances.forEach(function (item) {
                return window.sessionStorageCart.addTickets(item);
              });

              this._deleteCart();
            } else {
              !this._cartInDom() ? this._createCart() : this._changeCart();
            }
          } else {
            this._deleteCart();
          }
        }
      }, {
        key: "_getData",
        value: function _getData() {
          var goodsCount = this.perfomances.reduce(function (sum, item) {
            return sum + item.tickets.length;
          }, 0),
              timerStart = +new Date(this.reserved_time),
              timerEnd = timerStart + 15 * 60 * 1000,
              timerNow = Date.now(),
              secondsFullLeft = Math.floor((timerEnd - timerNow) / 1000),
              minutesLeft = Math.floor(secondsFullLeft / 60),
              secondsLeft = Math.floor(secondsFullLeft - minutesLeft * 60);
          return {
            goodsCount: goodsCount,
            minutesLeft: minutesLeft,
            secondsLeft: secondsLeft
          };
        }
      }, {
        key: "_cartInDom",
        value: function _cartInDom() {
          return document.querySelector(".cart-global");
        }
      }, {
        key: "_formatDate",
        value: function _formatDate(value) {
          return value < 10 ? "0" + value : value;
        }
      }, {
        key: "_createCart",
        value: function _createCart() {
          var data = this._getData(),
              template = "<section class=\"cart-global\">\n                <div class=\"cart-global__wrap\">\n                  <a href=\"/ticket/cart\" class=\"cart-global__link\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 65.1 57.3\" width=\"30\" height=\"26\" fill=\"#fff\">\n                      <path d=\"M46.5,44.5c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4c3.5,0,6.4-2.9,6.4-6.4C52.9,47.4,50,44.5,46.5,44.5z M46.5,54.5\n                      c-2,0-3.5-1.6-3.5-3.5c0-2,1.6-3.5,3.5-3.5c2,0,3.5,1.6,3.5,3.5C50,52.9,48.5,54.5,46.5,54.5z\"/>\n                      <path d=\"M63.6,9H12.7l-0.9-3.6C11.1,2.2,8.2,0,4.9,0H1.4C0.6,0,0,0.6,0,1.4c0,0.8,0.6,1.4,1.4,1.4h3.5\n                      c1.9,0,3.6,1.3,4.1,3.2l7,28.5c0.8,3.2,3.6,5.4,6.9,5.4h29.8c3.3,0,6.2-2.3,6.9-5.5L65,10.8c0.1-0.4,0-0.9-0.3-1.2\n                      C64.5,9.2,64.1,9,63.6,9z M56.8,33.8c-0.4,1.9-2.2,3.3-4.1,3.2H22.9c-1.9,0-3.6-1.3-4.1-3.2l-5.4-21.9h48.4L56.8,33.8z\"/>\n                      <path d=\"M27.1,44.5c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4c3.5,0,6.4-2.9,6.4-6.4C33.5,47.4,30.6,44.5,27.1,44.5z M27.1,54.5\n                      c-2,0-3.5-1.6-3.5-3.5c0-2,1.6-3.5,3.5-3.5c2,0,3.5,1.6,3.5,3.5C30.6,52.9,29,54.5,27.1,54.5z\"/>\n                    </svg>\n                    <span class=\"cart-global__count\" data-cart-global-count>" + data.goodsCount + "</span>\n                  </a>\n                  <div class=\"cart-global__info\">\n                    " + this.translation.youHave[this.lang] + " <span class=\"cart-global__timer\" data-cart-global-timer>" + this._formatDate(data.minutesLeft) + ":" + this._formatDate(data.secondsLeft) + "</span> " + this.translation.minutes[this.lang] + "\n                  </div>\n                </div>\n              </section>";

          document.body.insertAdjacentHTML("afterBegin", template);
          document.body.classList.add("cart-global-insert");
          this.el = this._cartInDom();
        }
      }, {
        key: "_deleteCart",
        value: function _deleteCart() {
          if (this.perfomances) {
            this.localStorageData = null;
            this.reserved_time = null;
            this.perfomances = null;

            if (this._cartInDom()) {
              this.el.remove();
              this.el = null;
            }

            localStorage.removeItem("cart");
            localStorage.removeItem("orderId");
            document.body.classList.remove("cart-global-insert");

            if (this.vue) {
              this.vue.clearCart();
              var route = this.vue.$route;

              if (route) {
                if (route.meta.cart) {
                  this.vue.$router.push({ name: "Cart" });
                }
              }
            }
          }
        }
      }, {
        key: "_changeCart",
        value: function _changeCart() {
          var timer = this.el.querySelector("[data-cart-global-timer]"),
              goods = this.el.querySelector("[data-cart-global-count]"),
              data = this._getData();

          timer.textContent = this._formatDate(data.minutesLeft) + ":" + this._formatDate(data.secondsLeft);
          goods.textContent = data.goodsCount;
        }
      }, {
        key: "_checkTimeEnd",
        value: function _checkTimeEnd() {
          return +new Date(this.reserved_time) + 15 * 60 * 1000 < Date.now();
        }
      }, {
        key: "addTickets",
        value: function addTickets(obj) {
          var _this5 = this;

          if (this.localStorageData) {
            var index = this.perfomances.findIndex(function (item) {
              return item.id == obj.perfomances[0].id;
            });

            index == -1 ? this.perfomances.push(obj.perfomances[0]) : obj.perfomances[0].tickets.forEach(function (item) {
              return _this5.perfomances[index].tickets.push(item);
            });
          } else {
            this.perfomances = obj.perfomances;
            this.reserved_time = obj.reserved_time;
          }

          var createJSON = JSON.stringify({
            reserved_time: this.reserved_time,
            perfomances: this.perfomances
          });

          this.localStorageData = createJSON;

          localStorage.setItem("cart", createJSON);
        }
      }, {
        key: "removeTickets",
        value: function removeTickets(obj) {
          if (this.localStorageData) {
            var index = this.perfomances.findIndex(function (item) {
              return item.id == obj.id;
            });

            if (index != -1) {
              var newArr = this.perfomances[index].tickets.filter(function (item) {
                return !obj.tickets.find(function (ticket) {
                  return item == ticket;
                });
              });

              !newArr.length ? this.perfomances.splice(index, 1) : this.perfomances[index].tickets = newArr;

              if (this.perfomances.length) {
                localStorage.setItem("cart", JSON.stringify({
                  reserved_time: this.reserved_time,
                  perfomances: this.perfomances
                }));
              } else {
                localStorage.removeItem("cart");
              }
            }
          }
        }
      }, {
        key: "setVue",
        value: function setVue(obj) {
          this.vue = obj;
        }
      }]);

      return LocalStorageCartClass;
    }();

    ;

    window.localStorageCart = new LocalStorageCartClass();
  })();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQtZ2xvYmFsLmpzIl0sIm5hbWVzIjpbIlNlc3Npb25TdG9yYWdlQ2FydENsYXNzIiwicGVyZm9tYW5jZXMiLCJfaW5pdCIsInZ1ZSIsIl9pbnRlcnZhbEZ1bmMiLCJzZXRJbnRlcnZhbCIsInNlc3Npb25TdG9yYWdlRGF0YSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsInBhcnNlRGF0YSIsIkpTT04iLCJwYXJzZSIsImZpbHRlcmVkRGF0YSIsImZpbHRlciIsIl9jaGVja1RpbWVFbmQiLCJwZXJmb21hbmNlIiwiZGF0ZSIsInJlc2VydmVkX3RpbWUiLCJsZW5ndGgiLCJfZGVsZXRlQ2FydCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJyZW1vdmVJdGVtIiwiRGF0ZSIsIm9iaiIsImluZGV4IiwiZmluZEluZGV4IiwiaXRlbSIsImlkIiwicHVzaCIsInRpY2tldHMiLCJmb3JFYWNoIiwiYXJyIiwiZXZlcnkiLCJhcnJJdGVtIiwibmV3QXJyIiwiZmluZCIsInRpY2tldCIsInNwbGljZSIsIndpbmRvdyIsInNlc3Npb25TdG9yYWdlQ2FydCIsIkxvY2FsU3RvcmFnZUNhcnRDbGFzcyIsImVsIiwibG9jYWxTdG9yYWdlRGF0YSIsImxhbmciLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImdldEF0dHJpYnV0ZSIsInRyYW5zbGF0aW9uIiwieW91SGF2ZSIsInJ1IiwiZW4iLCJ1YSIsIm1pbnV0ZXMiLCJsb2NhbFN0b3JhZ2UiLCJhZGRUaWNrZXRzIiwiX2NhcnRJbkRvbSIsIl9jcmVhdGVDYXJ0IiwiX2NoYW5nZUNhcnQiLCJnb29kc0NvdW50IiwicmVkdWNlIiwic3VtIiwidGltZXJTdGFydCIsInRpbWVyRW5kIiwidGltZXJOb3ciLCJub3ciLCJzZWNvbmRzRnVsbExlZnQiLCJNYXRoIiwiZmxvb3IiLCJtaW51dGVzTGVmdCIsInNlY29uZHNMZWZ0IiwicXVlcnlTZWxlY3RvciIsInZhbHVlIiwiZGF0YSIsIl9nZXREYXRhIiwidGVtcGxhdGUiLCJfZm9ybWF0RGF0ZSIsImJvZHkiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJjbGVhckNhcnQiLCJyb3V0ZSIsIiRyb3V0ZSIsIm1ldGEiLCJjYXJ0IiwiJHJvdXRlciIsIm5hbWUiLCJ0aW1lciIsImdvb2RzIiwidGV4dENvbnRlbnQiLCJjcmVhdGVKU09OIiwibG9jYWxTdG9yYWdlQ2FydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQ0FBQyxZQUFNO0FBQ0wsR0FBQyxZQUFNO0FBQUEsUUFDQ0EsdUJBREQ7QUFFSCx5Q0FBYztBQUFBOztBQUNaLGFBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxhQUFLQyxLQUFMO0FBQ0EsYUFBS0MsR0FBTCxHQUFXLElBQVg7QUFDRDs7QUFORTtBQUFBO0FBQUEsZ0NBUUs7QUFBQTs7QUFDTixlQUFLQyxhQUFMOztBQUVBQyxzQkFBWSxZQUFNO0FBQ2hCLGtCQUFLRCxhQUFMO0FBQ0QsV0FGRCxFQUVHLEdBRkg7QUFHRDtBQWRFO0FBQUE7QUFBQSx3Q0FnQmE7QUFBQTs7QUFDZCxjQUFNRSxxQkFBcUJDLGVBQWVDLE9BQWYsUUFBM0I7O0FBRUEsY0FBSUYsa0JBQUosRUFBd0I7QUFDdEIsZ0JBQU1HLFlBQVlDLEtBQUtDLEtBQUwsQ0FBV0wsa0JBQVgsQ0FBbEI7QUFBQSxnQkFDTU0sZUFBZUgsVUFBVVIsV0FBVixDQUFzQlksTUFBdEIsQ0FBNkI7QUFBQSxxQkFBYyxPQUFLQyxhQUFMLENBQW1CQyxXQUFXQyxJQUE5QixFQUFvQ0QsV0FBV0UsYUFBL0MsQ0FBZDtBQUFBLGFBQTdCLENBRHJCOztBQUdBLGlCQUFLaEIsV0FBTCxHQUFtQlcsWUFBbkI7O0FBRUEsZ0JBQUksQ0FBQyxLQUFLWCxXQUFMLENBQWlCaUIsTUFBdEIsRUFBOEI7QUFDNUIsbUJBQUtDLFdBQUw7QUFDRCxhQUZELE1BRU87QUFDTFosNkJBQWVhLE9BQWYsU0FBK0JWLEtBQUtXLFNBQUwsQ0FBZSxFQUFDcEIsYUFBYSxLQUFLQSxXQUFu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QXZDLENBQWY7O0FBRUEsZUFBQ0YsT0FBT2pCLE1BQVIsR0FBaUIsS0FBS2pCLFdBQUwsQ0FBaUJxQyxNQUFqQixDQUF3QmIsS0FBeEIsRUFBK0IsQ0FBL0IsQ0FBakIsR0FBcUQsS0FBS3hCLFdBQUwsQ0FBaUJ3QixLQUFqQixFQUF3QkssT0FBeEIsR0FBa0NLLE1BQXZGOztBQUVBLGtCQUFJLEtBQUtsQyxXQUFMLENBQWlCaUIsTUFBckIsRUFBNkI7QUFDM0JvQyw2QkFBYWxDLE9BQWIsU0FBNkJWLEtBQUtXLFNBQUwsQ0FBZTtBQUMxQ0osaUNBQWUsS0FBS0EsYUFEc0I7QUFFMUNoQiwrQkFBYSxLQUFLQTtBQUZ3QixpQkFBZixDQUE3QjtBQUlELGVBTEQsTUFLTztBQUNMcUQsNkJBQWFoQyxVQUFiO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUExTEU7QUFBQTtBQUFBLCtCQTRMSUUsR0E1TEosRUE0TFM7QUFDVixlQUFLckIsR0FBTCxHQUFXcUIsR0FBWDtBQUNEO0FBOUxFOztBQUFBO0FBQUE7O0FBK0xKOztBQUVEZSxXQUFPc0QsZ0JBQVAsR0FBMEIsSUFBSXBELHFCQUFKLEVBQTFCO0FBQ0QsR0FsTUQ7QUFtTUQsQ0F4U0QiLCJmaWxlIjoiY2FydC1nbG9iYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoKCkgPT4ge1xuICAoKCkgPT4ge1xuICAgIGNsYXNzIFNlc3Npb25TdG9yYWdlQ2FydENsYXNzIHtcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnBlcmZvbWFuY2VzID0gbnVsbDtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgICAgICB0aGlzLnZ1ZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIF9pbml0KCkge1xuICAgICAgICB0aGlzLl9pbnRlcnZhbEZ1bmMoKTtcblxuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5faW50ZXJ2YWxGdW5jKCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9XG5cbiAgICAgIF9pbnRlcnZhbEZ1bmMoKSB7XG4gICAgICAgIGNvbnN0IHNlc3Npb25TdG9yYWdlRGF0YSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYGNhcnRgKTtcblxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2VEYXRhKSB7XG4gICAgICAgICAgY29uc3QgcGFyc2VEYXRhID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZURhdGEpLFxuICAgICAgICAgICAgICAgIGZpbHRlcmVkRGF0YSA9IHBhcnNlRGF0YS5wZXJmb21hbmNlcy5maWx0ZXIocGVyZm9tYW5jZSA9PiB0aGlzLl9jaGVja1RpbWVFbmQocGVyZm9tYW5jZS5kYXRlLCBwZXJmb21hbmNlLnJlc2VydmVkX3RpbWUpKTtcblxuICAgICAgICAgIHRoaXMucGVyZm9tYW5jZXMgPSBmaWx0ZXJlZERhdGE7XG5cbiAgICAgICAgICBpZiAoIXRoaXMucGVyZm9tYW5jZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWxldGVDYXJ0KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYGNhcnRgLCBKU09OLnN0cmluZ2lmeSh7cGVyZm9tYW5jZXM6IHRoaXMucGVyZm9tYW5jZXN9KSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgX2RlbGV0ZUNhcnQoKSB7XG4gICAgICAgIHRoaXMucGVyZm9tYW5jZXMgPSBudWxsO1xuXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oYGNhcnRgKTtcbiAgICAgIH1cblxuICAgICAgX2NoZWNrVGltZUVuZChkYXRlLCByZXNlcnZlZF90aW1lKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpIDwgbmV3IERhdGUoZGF0ZSkgJiYgbmV3IERhdGUoKSAtIDI0ICogNjAgKiA2MCAqIDEwMDAgPCBuZXcgRGF0ZShyZXNlcnZlZF90aW1lKVxuICAgICAgfVxuXG4gICAgICBhZGRUaWNrZXRzKG9iaikge1xuICAgICAgICBpZiAodGhpcy5wZXJmb21hbmNlcykge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wZXJmb21hbmNlcy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmlkID09IG9iai5pZCk7XG5cbiAgICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucGVyZm9tYW5jZXMucHVzaCh7XG4gICAgICAgICAgICAgIHJlc2VydmVkX3RpbWU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgIGlkOiBvYmouaWQsXG4gICAgICAgICAgICAgIGRhdGU6IG9iai5kYXRlLFxuICAgICAgICAgICAgICB0aWNrZXRzOiBvYmoudGlja2V0c1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqLnRpY2tldHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgYXJyID0gdGhpcy5wZXJmb21hbmNlc1tpbmRleF0udGlja2V0cztcblxuICAgICAgICAgICAgICBpZiAoYXJyLmV2ZXJ5KGFyckl0ZW0gPT4gYXJySXRlbSAhPSBpdGVtKSkgYXJyLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wZXJmb21hbmNlcyA9IFt7XG4gICAgICAgICAgICByZXNlcnZlZF90aW1lOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgaWQ6IG9iai5pZCxcbiAgICAgICAgICAgIGRhdGU6IG9iai5kYXRlLFxuICAgICAgICAgICAgdGlja2V0czogb2JqLnRpY2tldHNcbiAgICAgICAgICB9XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYGNhcnRgLCBKU09OLnN0cmluZ2lmeSh7cGVyZm9tYW5jZXM6IHRoaXMucGVyZm9tYW5jZXN9KSk7XG4gICAgICB9XG5cbiAgICAgIHJlbW92ZVRpY2tldHMob2JqKSB7XG4gICAgICAgIGlmICh0aGlzLnBlcmZvbWFuY2VzKSB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnBlcmZvbWFuY2VzLmZpbmRJbmRleChpdGVtID0+IGl0ZW0uaWQgPT0gb2JqLmlkKTtcblxuICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgY29uc3QgbmV3QXJyID0gdGhpcy5wZXJmb21hbmNlc1tpbmRleF0udGlja2V0cy5maWx0ZXIoaXRlbSA9PiAhb2JqLnRpY2tldHMuZmluZCh0aWNrZXQgPT4gaXRlbSA9PSB0aWNrZXQpKTtcblxuICAgICAgICAgICAgIW5ld0Fyci5sZW5ndGggPyB0aGlzLnBlcmZvbWFuY2VzLnNwbGljZShpbmRleCwgMSkgOiB0aGlzLnBlcmZvbWFuY2VzW2luZGV4XS50aWNrZXRzID0gbmV3QXJyO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wZXJmb21hbmNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgY2FydGAsIEpTT04uc3RyaW5naWZ5KHtwZXJmb21hbmNlczogdGhpcy5wZXJmb21hbmNlc30pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucGVyZm9tYW5jZXMgPSBudWxsO1xuICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGBjYXJ0YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNldFZ1ZShvYmopIHtcbiAgICAgICAgdGhpcy52dWUgPSBvYmo7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZUNhcnQgPSBuZXcgU2Vzc2lvblN0b3JhZ2VDYXJ0Q2xhc3MoKTtcbiAgfSkoKTtcblxuICAoKCkgPT4ge1xuICAgIGNsYXNzIExvY2FsU3RvcmFnZUNhcnRDbGFzcyB7XG4gICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lbCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlRGF0YSA9IG51bGw7XG4gICAgICAgIHRoaXMucmVzZXJ2ZWRfdGltZSA9IG51bGw7XG4gICAgICAgIHRoaXMucGVyZm9tYW5jZXMgPSBudWxsO1xuICAgICAgICB0aGlzLnZ1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFuZyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoYGxhbmdgKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvbiA9IHtcbiAgICAgICAgICB5b3VIYXZlOiB7XG4gICAgICAgICAgICBydTogYNCjINCy0LDRgSDQtdGB0YLRjGAsXG4gICAgICAgICAgICBlbjogYFlvdSBoYXZlYCxcbiAgICAgICAgICAgIHVhOiBg0KMg0LLQsNGBINGUYFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbWludXRlczoge1xuICAgICAgICAgICAgcnU6IGDQvNC40L3Rg9GCLCDRh9GC0L7QsdGLINC+0YTQvtGA0LzQuNGC0Ywg0LfQsNC60LDQt2AsXG4gICAgICAgICAgICBlbjogYG1pbnV0ZXMgdG8gcGxhY2UgYW4gb3JkZXJgLFxuICAgICAgICAgICAgdWE6IGDRhdCy0LjQu9C40L0sINGJ0L7QsSDQvtGE0L7RgNC80LjRgtC4INC30LDQvNC+0LLQu9C10L3QvdGPYFxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICB9XG5cbiAgICAgIF9pbml0KCkge1xuICAgICAgICB0aGlzLl9pbnRlcnZhbEZ1bmMoKTtcblxuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5faW50ZXJ2YWxGdW5jKCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9XG5cbiAgICAgIF9pbnRlcnZhbEZ1bmMoKSB7XG4gICAgICAgIGNvbnN0IGxvY2FsU3RvcmFnZURhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgY2FydGApO1xuXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2VEYXRhKSB7XG4gICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VEYXRhID0gbG9jYWxTdG9yYWdlRGF0YTtcblxuICAgICAgICAgIGNvbnN0IHBhcnNlRGF0YSA9IEpTT04ucGFyc2UodGhpcy5sb2NhbFN0b3JhZ2VEYXRhKTtcblxuICAgICAgICAgIHRoaXMucmVzZXJ2ZWRfdGltZSA9IHBhcnNlRGF0YS5yZXNlcnZlZF90aW1lO1xuICAgICAgICAgIHRoaXMucGVyZm9tYW5jZXMgPSBwYXJzZURhdGEucGVyZm9tYW5jZXM7XG5cbiAgICAgICAgICBpZiAodGhpcy5fY2hlY2tUaW1lRW5kKCkpIHtcbiAgICAgICAgICAgIHRoaXMucGVyZm9tYW5jZXMuZm9yRWFjaChpdGVtID0+IHdpbmRvdy5zZXNzaW9uU3RvcmFnZUNhcnQuYWRkVGlja2V0cyhpdGVtKSlcblxuICAgICAgICAgICAgdGhpcy5fZGVsZXRlQ2FydCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAhdGhpcy5fY2FydEluRG9tKCkgPyB0aGlzLl9jcmVhdGVDYXJ0KCkgOiB0aGlzLl9jaGFuZ2VDYXJ0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2RlbGV0ZUNhcnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBfZ2V0RGF0YSgpIHtcbiAgICAgICAgY29uc3QgZ29vZHNDb3VudCA9IHRoaXMucGVyZm9tYW5jZXMucmVkdWNlKChzdW0sIGl0ZW0pID0+IHN1bSArIGl0ZW0udGlja2V0cy5sZW5ndGgsIDApLFxuICAgICAgICAgICAgICB0aW1lclN0YXJ0ID0gK25ldyBEYXRlKHRoaXMucmVzZXJ2ZWRfdGltZSksXG4gICAgICAgICAgICAgIHRpbWVyRW5kID0gdGltZXJTdGFydCArIDE1ICogNjAgKiAxMDAwLFxuICAgICAgICAgICAgICB0aW1lck5vdyA9IERhdGUubm93KCksXG4gICAgICAgICAgICAgIHNlY29uZHNGdWxsTGVmdCA9IE1hdGguZmxvb3IoKHRpbWVyRW5kIC0gdGltZXJOb3cpIC8gMTAwMCksXG4gICAgICAgICAgICAgIG1pbnV0ZXNMZWZ0ID0gTWF0aC5mbG9vcihzZWNvbmRzRnVsbExlZnQgLyA2MCksXG4gICAgICAgICAgICAgIHNlY29uZHNMZWZ0ID0gTWF0aC5mbG9vcihzZWNvbmRzRnVsbExlZnQgLSBtaW51dGVzTGVmdCAqIDYwKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBnb29kc0NvdW50LFxuICAgICAgICAgIG1pbnV0ZXNMZWZ0LFxuICAgICAgICAgIHNlY29uZHNMZWZ0XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgX2NhcnRJbkRvbSgpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jYXJ0LWdsb2JhbGApO1xuICAgICAgfVxuXG4gICAgICBfZm9ybWF0RGF0ZSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPCAxMCA/IGAwJHt2YWx1ZX1gIDogdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIF9jcmVhdGVDYXJ0KCkge1xuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5fZ2V0RGF0YSgpLFxuICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IGA8c2VjdGlvbiBjbGFzcz1cImNhcnQtZ2xvYmFsXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcnQtZ2xvYmFsX193cmFwXCI+XG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiL3RpY2tldC9jYXJ0XCIgY2xhc3M9XCJjYXJ0LWdsb2JhbF9fbGlua1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDY1LjEgNTcuM1wiIHdpZHRoPVwiMzBcIiBoZWlnaHQ9XCIyNlwiIGZpbGw9XCIjZmZmXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk00Ni41LDQ0LjVjLTMuNSwwLTYuNCwyLjktNi40LDYuNGMwLDMuNSwyLjksNi40LDYuNCw2LjRjMy41LDAsNi40LTIuOSw2LjQtNi40QzUyLjksNDcuNCw1MCw0NC41LDQ2LjUsNDQuNXogTTQ2LjUsNTQuNVxuICAgICAgICAgICAgICAgICAgICAgIGMtMiwwLTMuNS0xLjYtMy41LTMuNWMwLTIsMS42LTMuNSwzLjUtMy41YzIsMCwzLjUsMS42LDMuNSwzLjVDNTAsNTIuOSw0OC41LDU0LjUsNDYuNSw1NC41elwiLz5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTYzLjYsOUgxMi43bC0wLjktMy42QzExLjEsMi4yLDguMiwwLDQuOSwwSDEuNEMwLjYsMCwwLDAuNiwwLDEuNGMwLDAuOCwwLjYsMS40LDEuNCwxLjRoMy41XG4gICAgICAgICAgICAgICAgICAgICAgYzEuOSwwLDMuNiwxLjMsNC4xLDMuMmw3LDI4LjVjMC44LDMuMiwzLjYsNS40LDYuOSw1LjRoMjkuOGMzLjMsMCw2LjItMi4zLDYuOS01LjVMNjUsMTAuOGMwLjEtMC40LDAtMC45LTAuMy0xLjJcbiAgICAgICAgICAgICAgICAgICAgICBDNjQuNSw5LjIsNjQuMSw5LDYzLjYsOXogTTU2LjgsMzMuOGMtMC40LDEuOS0yLjIsMy4zLTQuMSwzLjJIMjIuOWMtMS45LDAtMy42LTEuMy00LjEtMy4ybC01LjQtMjEuOWg0OC40TDU2LjgsMzMuOHpcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0yNy4xLDQ0LjVjLTMuNSwwLTYuNCwyLjktNi40LDYuNGMwLDMuNSwyLjksNi40LDYuNCw2LjRjMy41LDAsNi40LTIuOSw2LjQtNi40QzMzLjUsNDcuNCwzMC42LDQ0LjUsMjcuMSw0NC41eiBNMjcuMSw1NC41XG4gICAgICAgICAgICAgICAgICAgICAgYy0yLDAtMy41LTEuNi0zLjUtMy41YzAtMiwxLjYtMy41LDMuNS0zLjVjMiwwLDMuNSwxLjYsMy41LDMuNUMzMC42LDUyLjksMjksNTQuNSwyNy4xLDU0LjV6XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJ0LWdsb2JhbF9fY291bnRcIiBkYXRhLWNhcnQtZ2xvYmFsLWNvdW50PiR7ZGF0YS5nb29kc0NvdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJ0LWdsb2JhbF9faW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICAke3RoaXMudHJhbnNsYXRpb24ueW91SGF2ZVt0aGlzLmxhbmddfSA8c3BhbiBjbGFzcz1cImNhcnQtZ2xvYmFsX190aW1lclwiIGRhdGEtY2FydC1nbG9iYWwtdGltZXI+JHt0aGlzLl9mb3JtYXREYXRlKGRhdGEubWludXRlc0xlZnQpfToke3RoaXMuX2Zvcm1hdERhdGUoZGF0YS5zZWNvbmRzTGVmdCl9PC9zcGFuPiAke3RoaXMudHJhbnNsYXRpb24ubWludXRlc1t0aGlzLmxhbmddfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvc2VjdGlvbj5gO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKGBhZnRlckJlZ2luYCwgdGVtcGxhdGUpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoYGNhcnQtZ2xvYmFsLWluc2VydGApO1xuICAgICAgICB0aGlzLmVsID0gdGhpcy5fY2FydEluRG9tKCk7XG4gICAgICB9XG5cbiAgICAgIF9kZWxldGVDYXJ0KCkge1xuICAgICAgICBpZiAodGhpcy5wZXJmb21hbmNlcykge1xuICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlRGF0YSA9IG51bGw7XG4gICAgICAgICAgdGhpcy5yZXNlcnZlZF90aW1lID0gbnVsbDtcbiAgICAgICAgICB0aGlzLnBlcmZvbWFuY2VzID0gbnVsbDtcblxuICAgICAgICAgIGlmICh0aGlzLl9jYXJ0SW5Eb20oKSkge1xuICAgICAgICAgICAgdGhpcy5lbC5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuZWwgPSBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGBjYXJ0YCk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYG9yZGVySWRgKTtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoYGNhcnQtZ2xvYmFsLWluc2VydGApO1xuXG4gICAgICAgICAgaWYgKHRoaXMudnVlKSB7XG4gICAgICAgICAgICB0aGlzLnZ1ZS5jbGVhckNhcnQoKTtcbiAgICAgICAgICAgIGNvbnN0IHJvdXRlID0gdGhpcy52dWUuJHJvdXRlO1xuXG4gICAgICAgICAgICBpZiAocm91dGUpIHtcbiAgICAgICAgICAgICAgaWYgKHJvdXRlLm1ldGEuY2FydCkge1xuICAgICAgICAgICAgICAgIHRoaXMudnVlLiRyb3V0ZXIucHVzaCh7IG5hbWU6IGBDYXJ0YH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgX2NoYW5nZUNhcnQoKSB7XG4gICAgICAgIGNvbnN0IHRpbWVyID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jYXJ0LWdsb2JhbC10aW1lcl1gKSxcbiAgICAgICAgICAgICAgZ29vZHMgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNhcnQtZ2xvYmFsLWNvdW50XWApLFxuICAgICAgICAgICAgICBkYXRhID0gdGhpcy5fZ2V0RGF0YSgpO1xuXG4gICAgICAgIHRpbWVyLnRleHRDb250ZW50ID0gYCR7dGhpcy5fZm9ybWF0RGF0ZShkYXRhLm1pbnV0ZXNMZWZ0KX06JHt0aGlzLl9mb3JtYXREYXRlKGRhdGEuc2Vjb25kc0xlZnQpfWA7XG4gICAgICAgIGdvb2RzLnRleHRDb250ZW50ID0gZGF0YS5nb29kc0NvdW50O1xuICAgICAgfVxuXG4gICAgICBfY2hlY2tUaW1lRW5kKCkge1xuICAgICAgICByZXR1cm4gK25ldyBEYXRlKHRoaXMucmVzZXJ2ZWRfdGltZSkgKyAxNSAqIDYwICogMTAwMCA8IERhdGUubm93KClcbiAgICAgIH1cblxuICAgICAgYWRkVGlja2V0cyhvYmopIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlRGF0YSkge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wZXJmb21hbmNlcy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmlkID09IG9iai5wZXJmb21hbmNlc1swXS5pZCk7XG5cbiAgICAgICAgICBpbmRleCA9PSAtMSA/IHRoaXMucGVyZm9tYW5jZXMucHVzaChvYmoucGVyZm9tYW5jZXNbMF0pIDogb2JqLnBlcmZvbWFuY2VzWzBdLnRpY2tldHMuZm9yRWFjaChpdGVtID0+IHRoaXMucGVyZm9tYW5jZXNbaW5kZXhdLnRpY2tldHMucHVzaChpdGVtKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wZXJmb21hbmNlcyA9IG9iai5wZXJmb21hbmNlcztcbiAgICAgICAgICB0aGlzLnJlc2VydmVkX3RpbWUgPSBvYmoucmVzZXJ2ZWRfdGltZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNyZWF0ZUpTT04gPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgcmVzZXJ2ZWRfdGltZTogdGhpcy5yZXNlcnZlZF90aW1lLFxuICAgICAgICAgIHBlcmZvbWFuY2VzOiB0aGlzLnBlcmZvbWFuY2VzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlRGF0YSA9IGNyZWF0ZUpTT047XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYGNhcnRgLCBjcmVhdGVKU09OKTtcbiAgICAgIH1cblxuICAgICAgcmVtb3ZlVGlja2V0cyhvYmopIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlRGF0YSkge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wZXJmb21hbmNlcy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmlkID09IG9iai5pZCk7XG5cbiAgICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0FyciA9IHRoaXMucGVyZm9tYW5jZXNbaW5kZXhdLnRpY2tldHMuZmlsdGVyKGl0ZW0gPT4gIW9iai50aWNrZXRzLmZpbmQodGlja2V0ID0+IGl0ZW0gPT0gdGlja2V0KSk7XG5cbiAgICAgICAgICAgICFuZXdBcnIubGVuZ3RoID8gdGhpcy5wZXJmb21hbmNlcy5zcGxpY2UoaW5kZXgsIDEpIDogdGhpcy5wZXJmb21hbmNlc1tpbmRleF0udGlja2V0cyA9IG5ld0FycjtcblxuICAgICAgICAgICAgaWYgKHRoaXMucGVyZm9tYW5jZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBjYXJ0YCwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHJlc2VydmVkX3RpbWU6IHRoaXMucmVzZXJ2ZWRfdGltZSxcbiAgICAgICAgICAgICAgICBwZXJmb21hbmNlczogdGhpcy5wZXJmb21hbmNlc1xuICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgY2FydGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZXRWdWUob2JqKSB7XG4gICAgICAgIHRoaXMudnVlID0gb2JqO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlQ2FydCA9IG5ldyBMb2NhbFN0b3JhZ2VDYXJ0Q2xhc3MoKTtcbiAgfSkoKTtcbn0pKCk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
