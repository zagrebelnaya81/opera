"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var ConciergeSelectEvent = function () {
    function ConciergeSelectEvent(item) {
      var _this = this;

      _classCallCheck(this, ConciergeSelectEvent);

      this.item = item;
      this.btnBack = this.item.querySelector("[data-btn-back]");
      this.evtList = this.item.querySelector("[data-event-list]");
      this.evtForm = this.item.querySelector("[data-form]");
      this.evtInput = this.evtForm.querySelector("[data-ticket-code]");
      this.evtBlock = this.item.querySelector("[data-event-block]");
      this.evtTitle = this.evtBlock.querySelector("[data-event-title]");
      this.evtDate = this.evtBlock.querySelector("[data-event-date]");
      this.evtTime = this.evtBlock.querySelector("[data-event-time]");
      this.evtHall = this.evtBlock.querySelector("[data-event-hall]");
      this.evtID = null;
      this.ticketServerInfo = {};
      this.feedback = null;

      this.btnBack.addEventListener("click", function (e) {
        e.preventDefault();
        _this.toggleBtnBack();
        _this.toggleEventBlock();
      });

      this.evtList.addEventListener("click", function (e) {
        e.preventDefault();
        var target = e.target.closest("a");
        if (!target) return false;
        _this.setEventData(target);
        _this.evtInput.focus();
      });

      this.evtForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var ticketCode = _this.evtInput.value;
        _this.getInfoTicket(ticketCode);
      });
    }

    _createClass(ConciergeSelectEvent, [{
      key: "setEventData",
      value: function setEventData(el) {
        this.evtTitle.innerHTML = el.getAttribute("data-title");
        this.evtDate.innerHTML = el.getAttribute("data-date");
        this.evtTime.innerHTML = el.getAttribute("data-time");
        this.evtHall.innerHTML = el.getAttribute("data-hall");
        this.evtID = el.getAttribute("data-id");

        this.toggleEventBlock();
        this.toggleBtnBack();
      }
    }, {
      key: "toggleEventBlock",
      value: function toggleEventBlock() {
        this.evtBlock.classList.toggle("visible");
        this.evtList.classList.toggle("visible");
      }
    }, {
      key: "toggleBtnBack",
      value: function toggleBtnBack() {
        this.btnBack.classList.toggle("visible");
        this.clearTicketInputValue();
      }
    }, {
      key: "clearTicketInputValue",
      value: function clearTicketInputValue() {
        this.evtInput.value = "";
      }
    }, {
      key: "setFocusInput",
      value: function setFocusInput() {
        this.evtInput.value = "";
        this.evtInput.focus();
      }
    }, {
      key: "createFeedBack",
      value: function createFeedBack() {
        var obj = this.ticketServerInfo,
            message = obj.message || "-",
            status = obj.status,
            time = obj.activated_at || "-",
            title = "-",
            hall = "-",
            section = "-",
            row = "-",
            seat = "-";

        if (obj.ticket) {
          title = obj.ticket.data.performanceCalendar.data.performance.data.title || "-", hall = obj.ticket.data.performanceCalendar.data.hall.data.title || "-", section = obj.ticket.data.seatPrice.data.section_number || "-", row = obj.ticket.data.seatPrice.data.row_number || "-", seat = obj.ticket.data.seatPrice.data.seat_number || "-";
        }

        this.feedback = "<div class=\"popup__inner\" data-status=\"" + status + "\">\n            <div class=\"popup__wrap\">\n              <div class=\"popup__concierge\">\n                <p class=\"popup__concierge-status\">" + message + "</p>\n                <p class=\"popup__concierge-ticket popup__concierge-ticket--time\"><b>\u0410\u043A\u0442\u0438\u0432\u043E\u0432\u0430\u043D\u043E:&nbsp;</b>" + time + "</p>\n                <p class=\"popup__concierge-title\">" + title + "</p>\n                <div class=\"popup__concierge-info\">\n                  <p class=\"popup__concierge-ticket popup__concierge-ticket--hall\"><b>\u0417\u0430\u043B:&nbsp;</b>" + hall + "</p>\n                  <p class=\"popup__concierge-ticket popup__concierge-ticket--section\"><b>\u0421\u0435\u043A\u0442\u043E\u0440:&nbsp;</b>" + section + "</p>\n                  <p class=\"popup__concierge-ticket popup__concierge-ticket--row\"><b>\u0420\u044F\u0434:&nbsp;</b>" + row + "</p>\n                  <p class=\"popup__concierge-ticket popup__concierge-ticket--seat\"><b>\u041C\u0456\u0441\u0446\u0435:&nbsp;</b>" + seat + "</p>\n                </div>\n              </div>\n              <button type=\"button\" class=\"popup__close-feedback-ok\" data-popup-close=\"\">\u0417\u0430\u043A\u0440\u0438\u0442\u0438</button>\n            </div>\n          </div>";
      }
    }, {
      key: "generateElementFeedBack",
      value: function generateElementFeedBack() {
        var _this2 = this;

        var container = document.createElement("section");
        container.classList.add("popup");
        container.classList.add("popup--feedback");
        container.classList.add("popup--active");
        container.dataset.popup = "concierge";
        container.innerHTML = this.feedback;

        container.addEventListener("click", function (e) {
          var target = e.target;

          if (target.closest("[data-popup-close]")) {
            _this2.removePopup();
            _this2.setFocusInput();
          }
        });

        this.setFocusInput();

        return container;
      }
    }, {
      key: "removePopup",
      value: function removePopup() {
        var popup = document.querySelector("[data-popup=\"concierge\"]");
        if (!popup) return false;

        popup.remove();
      }
    }, {
      key: "getInfoTicket",
      value: function getInfoTicket(value) {
        var _this3 = this;

        var STATUS_CODE = {
          OK: 200,
          OTHER: "Unknown status"
        },
            OPTIONS = {
          method: 'GET'
        };

        var url = "/api/v1/tickets/activate/" + this.evtID + "/" + value;

        fetch(url, OPTIONS).then(function (response) {
          return response.json();
        }).then(function (data) {
          _this3.ticketServerInfo = data;
          // console.log(data);
          _this3.removePopup();
          _this3.createFeedBack();
          document.body.appendChild(_this3.generateElementFeedBack());
        }).catch(function (err) {
          _this3.ticketServerInfo.message = "\u041D\u0435\u0432\u0456\u0440\u043D\u0438\u0439 \u043A\u043E\u0434 \u043A\u0432\u0438\u0442\u043A\u0430";
          _this3.ticketServerInfo.status = false;
          _this3.ticketServerInfo.ticket = undefined;
          _this3.ticketServerInfo.activated_at = undefined;
          _this3.removePopup();
          _this3.createFeedBack();
          document.body.appendChild(_this3.generateElementFeedBack());
          // this.enteredWrongTicketDate();
        });
      }
    }]);

    return ConciergeSelectEvent;
  }();

  window.addEventListener("load", function () {
    new ConciergeSelectEvent(document.querySelector("[data-concierge]"));
  });
})();
"use strict";

(function () {
  var dateBlock = document.querySelector("[data-current-date]"),
      timeBlock = document.querySelector("[data-current-time]");

  if (!dateBlock && !timeBlock) return false;

  function getCurrentDate() {
    var date = new Date();

    var formatTime = new Intl.DateTimeFormat("uk", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    }),
        formatDate = new Intl.DateTimeFormat("uk");

    dateBlock.innerHTML = formatDate.format(date);
    timeBlock.innerHTML = formatTime.format(date);

    // console.log(formatDate.format(date) ); // 31.12.2014

    // console.log(formatTime.format(date) ); // 12:30:00
  }

  setInterval(function () {
    getCurrentDate();
  }, 1000);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9ibG9ja3MvZXZlbnQvZXZlbnQuanMiLCJfYmxvY2tzL3RpbWUtZGF0ZS90aW1lLWRhdGUuanMiXSwibmFtZXMiOlsiQ29uY2llcmdlU2VsZWN0RXZlbnQiLCJpdGVtIiwiYnRuQmFjayIsInF1ZXJ5U2VsZWN0b3IiLCJldnRMaXN0IiwiZXZ0Rm9ybSIsImV2dElucHV0IiwiZXZ0QmxvY2siLCJldnRUaXRsZSIsImV2dERhdGUiLCJldnRUaW1lIiwiZXZ0SGFsbCIsImV2dElEIiwidGlja2V0U2VydmVySW5mbyIsImZlZWRiYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZUJ0bkJhY2siLCJ0b2dnbGVFdmVudEJsb2NrIiwidGFyZ2V0IiwiY2xvc2VzdCIsInNldEV2ZW50RGF0YSIsImZvY3VzIiwidGlja2V0Q29kZSIsInZhbHVlIiwiZ2V0SW5mb1RpY2tldCIsImVsIiwiaW5uZXJIVE1MIiwiZ2V0QXR0cmlidXRlIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiY2xlYXJUaWNrZXRJbnB1dFZhbHVlIiwib2JqIiwibWVzc2FnZSIsInN0YXR1cyIsInRpbWUiLCJhY3RpdmF0ZWRfYXQiLCJ0aXRsZSIsImhhbGwiLCJzZWN0aW9uIiwicm93Iiwic2VhdCIsInRpY2tldCIsImRhdGEiLCJwZXJmb3JtYW5jZUNhbGVuZGFyIiwicGVyZm9ybWFuY2UiLCJzZWF0UHJpY2UiLCJzZWN0aW9uX251bWJlciIsInJvd19udW1iZXIiLCJzZWF0X251bWJlciIsImNvbnRhaW5lciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFkZCIsImRhdGFzZXQiLCJwb3B1cCIsInJlbW92ZVBvcHVwIiwic2V0Rm9jdXNJbnB1dCIsInJlbW92ZSIsIlNUQVRVU19DT0RFIiwiT0siLCJPVEhFUiIsIk9QVElPTlMiLCJtZXRob2QiLCJ1cmwiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjcmVhdGVGZWVkQmFjayIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImdlbmVyYXRlRWxlbWVudEZlZWRCYWNrIiwiY2F0Y2giLCJlcnIiLCJ1bmRlZmluZWQiLCJ3aW5kb3ciLCJkYXRlQmxvY2siLCJ0aW1lQmxvY2siLCJnZXRDdXJyZW50RGF0ZSIsImRhdGUiLCJEYXRlIiwiZm9ybWF0VGltZSIsIkludGwiLCJEYXRlVGltZUZvcm1hdCIsImhvdXIiLCJtaW51dGUiLCJzZWNvbmQiLCJmb3JtYXREYXRlIiwiZm9ybWF0Iiwic2V0SW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLENBQUMsWUFBTTtBQUFBLE1BQ0NBLG9CQUREO0FBRUgsa0NBQVlDLElBQVosRUFBa0I7QUFBQTs7QUFBQTs7QUFDaEIsV0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsV0FBS0MsT0FBTCxHQUFlLEtBQUtELElBQUwsQ0FBVUUsYUFBVixtQkFBZjtBQUNBLFdBQUtDLE9BQUwsR0FBZSxLQUFLSCxJQUFMLENBQVVFLGFBQVYscUJBQWY7QUFDQSxXQUFLRSxPQUFMLEdBQWUsS0FBS0osSUFBTCxDQUFVRSxhQUFWLGVBQWY7QUFDQSxXQUFLRyxRQUFMLEdBQWdCLEtBQUtELE9BQUwsQ0FBYUYsYUFBYixzQkFBaEI7QUFDQSxXQUFLSSxRQUFMLEdBQWdCLEtBQUtOLElBQUwsQ0FBVUUsYUFBVixzQkFBaEI7QUFDQSxXQUFLSyxRQUFMLEdBQWdCLEtBQUtELFFBQUwsQ0FBY0osYUFBZCxzQkFBaEI7QUFDQSxXQUFLTSxPQUFMLEdBQWUsS0FBS0YsUUFBTCxDQUFjSixhQUFkLHFCQUFmO0FBQ0EsV0FBS08sT0FBTCxHQUFlLEtBQUtILFFBQUwsQ0FBY0osYUFBZCxxQkFBZjtBQUNBLFdBQUtRLE9BQUwsR0FBZSxLQUFLSixRQUFMLENBQWNKLGFBQWQscUJBQWY7QUFDQSxXQUFLUyxLQUFMLEdBQWEsSUFBYjtBQUNBLFdBQUtDLGdCQUFMLEdBQXdCLEVBQXhCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQixJQUFoQjs7QUFFQSxXQUFLWixPQUFMLENBQWFhLGdC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LEVBQThCLE9BQU8sS0FBUDs7QUFFOUIsV0FBU0MsY0FBVCxHQUF5QjtBQUN2QixRQUFNQyxPQUFPLElBQUlDLElBQUosRUFBYjs7QUFFQSxRQUFJQyxhQUFhLElBQUlDLEtBQUtDLGNBQVQsQ0FBd0IsSUFBeEIsRUFBOEI7QUFDekNDLFlBQU0sU0FEbUM7QUFFekNDLGNBQVEsU0FGaUM7QUFHekNDLGNBQVE7QUFIaUMsS0FBOUIsQ0FBakI7QUFBQSxRQUtJQyxhQUFhLElBQUlMLEtBQUtDLGNBQVQsQ0FBd0IsSUFBeEIsQ0FMakI7O0FBT0FQLGNBQVVsRCxTQUFWLEdBQXNCNkQsV0FBV0MsTUFBWCxDQUFrQlQsSUFBbEIsQ0FBdEI7QUFDQUYsY0FBVW5ELFNBQVYsR0FBc0J1RCxXQUFXTyxNQUFYLENBQWtCVCxJQUFsQixDQUF0Qjs7QUFFQTs7QUFFQTtBQUNEOztBQUVEVSxjQUFZLFlBQU07QUFBQ1g7QUFBaUIsR0FBcEMsRUFBc0MsSUFBdEM7QUFFSCxDQTFCRCIsImZpbGUiOiJjb25jaWVyZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbigoKSA9PiB7XG4gIGNsYXNzIENvbmNpZXJnZVNlbGVjdEV2ZW50ICB7XG4gICAgY29uc3RydWN0b3IoaXRlbSkge1xuICAgICAgdGhpcy5pdGVtID0gaXRlbTtcbiAgICAgIHRoaXMuYnRuQmFjayA9IHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1idG4tYmFja11gKTtcbiAgICAgIHRoaXMuZXZ0TGlzdCA9IHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ldmVudC1saXN0XWApO1xuICAgICAgdGhpcy5ldnRGb3JtID0gdGhpcy5pdGVtLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWZvcm1dYCk7XG4gICAgICB0aGlzLmV2dElucHV0ID0gdGhpcy5ldnRGb3JtLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRpY2tldC1jb2RlXWApO1xuICAgICAgdGhpcy5ldnRCbG9jayA9IHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ldmVudC1ibG9ja11gKTtcbiAgICAgIHRoaXMuZXZ0VGl0bGUgPSB0aGlzLmV2dEJsb2NrLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWV2ZW50LXRpdGxlXWApO1xuICAgICAgdGhpcy5ldnREYXRlID0gdGhpcy5ldnRCbG9jay5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ldmVudC1kYXRlXWApO1xuICAgICAgdGhpcy5ldnRUaW1lID0gdGhpcy5ldnRCbG9jay5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ldmVudC10aW1lXWApO1xuICAgICAgdGhpcy5ldnRIYWxsID0gdGhpcy5ldnRCbG9jay5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ldmVudC1oYWxsXWApO1xuICAgICAgdGhpcy5ldnRJRCA9IG51bGw7XG4gICAgICB0aGlzLnRpY2tldFNlcnZlckluZm8gPSB7fTtcbiAgICAgIHRoaXMuZmVlZGJhY2sgPSBudWxsO1xuXG4gICAgICB0aGlzLmJ0bkJhY2suYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMudG9nZ2xlQnRuQmFjaygpO1xuICAgICAgICB0aGlzLnRvZ2dsZUV2ZW50QmxvY2soKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmV2dExpc3QuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KGBhYCk7XG4gICAgICAgIGlmICghdGFyZ2V0KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHRoaXMuc2V0RXZlbnREYXRhKHRhcmdldCk7XG4gICAgICAgIHRoaXMuZXZ0SW5wdXQuZm9jdXMoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmV2dEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihgc3VibWl0YCwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgdGlja2V0Q29kZSA9IHRoaXMuZXZ0SW5wdXQudmFsdWVcbiAgICAgICAgdGhpcy5nZXRJbmZvVGlja2V0KHRpY2tldENvZGUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0RXZlbnREYXRhKGVsKXtcbiAgICAgIHRoaXMuZXZ0VGl0bGUuaW5uZXJIVE1MID0gZWwuZ2V0QXR0cmlidXRlKGBkYXRhLXRpdGxlYCk7XG4gICAgICB0aGlzLmV2dERhdGUuaW5uZXJIVE1MID0gZWwuZ2V0QXR0cmlidXRlKGBkYXRhLWRhdGVgKTtcbiAgICAgIHRoaXMuZXZ0VGltZS5pbm5lckhUTUwgPSBlbC5nZXRBdHRyaWJ1dGUoYGRhdGEtdGltZWApO1xuICAgICAgdGhpcy5ldnRIYWxsLmlubmVySFRNTCA9IGVsLmdldEF0dHJpYnV0ZShgZGF0YS1oYWxsYCk7XG4gICAgICB0aGlzLmV2dElEID0gZWwuZ2V0QXR0cmlidXRlKGBkYXRhLWlkYCk7XG5cbiAgICAgIHRoaXMudG9nZ2xlRXZlbnRCbG9jaygpO1xuICAgICAgdGhpcy50b2dnbGVCdG5CYWNrKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRXZlbnRCbG9jaygpIHtcbiAgICAgIHRoaXMuZXZ0QmxvY2suY2xhc3NMaXN0LnRvZ2dsZShgdmlzaWJsZWApO1xuICAgICAgdGhpcy5ldnRMaXN0LmNsYXNzTGlzdC50b2dnbGUoYHZpc2libGVgKTtcbiAgICB9XG5cbiAgICB0b2dnbGVCdG5CYWNrKCkge1xuICAgICAgdGhpcy5idG5CYWNrLmNsYXNzTGlzdC50b2dnbGUoYHZpc2libGVgKTtcbiAgICAgIHRoaXMuY2xlYXJUaWNrZXRJbnB1dFZhbHVlKCk7XG4gICAgfVxuXG4gICAgY2xlYXJUaWNrZXRJbnB1dFZhbHVlKCkge1xuICAgICAgdGhpcy5ldnRJbnB1dC52YWx1ZSA9IGBgO1xuICAgIH1cblxuICAgIHNldEZvY3VzSW5wdXQoKSB7XG4gICAgICB0aGlzLmV2dElucHV0LnZhbHVlID0gYGA7XG4gICAgICB0aGlzLmV2dElucHV0LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgY3JlYXRlRmVlZEJhY2soKSB7XG4gICAgICBsZXQgb2JqID0gdGhpcy50aWNrZXRTZXJ2ZXJJbmZvLFxuICAgICAgICAgIG1lc3NhZ2UgPSBvYmoubWVzc2FnZSB8fCBgLWAsXG4gICAgICAgICAgc3RhdHVzID0gb2JqLnN0YXR1cyxcbiAgICAgICAgICB0aW1lID0gb2JqLmFjdGl2YXRlZF9hdCB8fCBgLWAsXG4gICAgICAgICAgdGl0bGUgPSBgLWAsXG4gICAgICAgICAgaGFsbCA9IGAtYCxcbiAgICAgICAgICBzZWN0aW9uID0gYC1gLFxuICAgICAgICAgIHJvdyA9IGAtYCxcbiAgICAgICAgICBzZWF0ID0gYC1gO1xuXG4gICAgICBpZihvYmoudGlja2V0KXtcbiAgICAgICAgdGl0bGUgPSBvYmoudGlja2V0LmRhdGEucGVyZm9ybWFuY2VDYWxlbmRhci5kYXRhLnBlcmZvcm1hbmNlLmRhdGEudGl0bGUgfHwgYC1gLFxuICAgICAgICBoYWxsID0gb2JqLnRpY2tldC5kYXRhLnBlcmZvcm1hbmNlQ2FsZW5kYXIuZGF0YS5oYWxsLmRhdGEudGl0bGUgfHwgYC1gLFxuICAgICAgICBzZWN0aW9uID0gb2JqLnRpY2tldC5kYXRhLnNlYXRQcmljZS5kYXRhLnNlY3Rpb25fbnVtYmVyIHx8IGAtYCxcbiAgICAgICAgcm93ID0gb2JqLnRpY2tldC5kYXRhLnNlYXRQcmljZS5kYXRhLnJvd19udW1iZXIgfHwgYC1gLFxuICAgICAgICBzZWF0ID0gb2JqLnRpY2tldC5kYXRhLnNlYXRQcmljZS5kYXRhLnNlYXRfbnVtYmVyIHx8IGAtYDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5mZWVkYmFjayA9IGA8ZGl2IGNsYXNzPVwicG9wdXBfX2lubmVyXCIgZGF0YS1zdGF0dXM9XCIke3N0YXR1c31cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3B1cF9fd3JhcFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9wdXBfX2NvbmNpZXJnZVwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicG9wdXBfX2NvbmNpZXJnZS1zdGF0dXNcIj4ke21lc3NhZ2V9PC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicG9wdXBfX2NvbmNpZXJnZS10aWNrZXQgcG9wdXBfX2NvbmNpZXJnZS10aWNrZXQtLXRpbWVcIj48Yj7QkNC60YLQuNCy0L7QstCw0L3QvjombmJzcDs8L2I+JHt0aW1lfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInBvcHVwX19jb25jaWVyZ2UtdGl0bGVcIj4ke3RpdGxlfTwvcD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9wdXBfX2NvbmNpZXJnZS1pbmZvXCI+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInBvcHVwX19jb25jaWVyZ2UtdGlja2V0IHBvcHVwX19jb25jaWVyZ2UtdGlja2V0LS1oYWxsXCI+PGI+0JfQsNC7OiZuYnNwOzwvYj4ke2hhbGx9PC9wPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwb3B1cF9fY29uY2llcmdlLXRpY2tldCBwb3B1cF9fY29uY2llcmdlLXRpY2tldC0tc2VjdGlvblwiPjxiPtCh0LXQutGC0L7RgDombmJzcDs8L2I+JHtzZWN0aW9ufTwvcD5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicG9wdXBfX2NvbmNpZXJnZS10aWNrZXQgcG9wdXBfX2NvbmNpZXJnZS10aWNrZXQtLXJvd1wiPjxiPtCg0Y/QtDombmJzcDs8L2I+JHtyb3d9PC9wPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwb3B1cF9fY29uY2llcmdlLXRpY2tldCBwb3B1cF9fY29uY2llcmdlLXRpY2tldC0tc2VhdFwiPjxiPtCc0ZbRgdGG0LU6Jm5ic3A7PC9iPiR7c2VhdH08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInBvcHVwX19jbG9zZS1mZWVkYmFjay1va1wiIGRhdGEtcG9wdXAtY2xvc2U9XCJcIj7Ql9Cw0LrRgNC40YLQuDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+YDtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUVsZW1lbnRGZWVkQmFjaygpIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwb3B1cFwiKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicG9wdXAtLWZlZWRiYWNrXCIpO1xuICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwb3B1cC0tYWN0aXZlXCIpO1xuICAgICAgICAgICAgY29udGFpbmVyLmRhdGFzZXQucG9wdXAgPSBcImNvbmNpZXJnZVwiO1xuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IHRoaXMuZmVlZGJhY2s7XG5cbiAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG5cbiAgICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtcG9wdXAtY2xvc2VdXCIpKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVQb3B1cCgpO1xuICAgICAgICAgIHRoaXMuc2V0Rm9jdXNJbnB1dCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zZXRGb2N1c0lucHV0KCk7XG5cbiAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfTtcblxuICAgIHJlbW92ZVBvcHVwKCkge1xuICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1wb3B1cD1cImNvbmNpZXJnZVwiXWApO1xuICAgICAgaWYoIXBvcHVwKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHBvcHVwLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGdldEluZm9UaWNrZXQodmFsdWUpIHtcbiAgICAgIGNvbnN0IFNUQVRVU19DT0RFID0ge1xuICAgICAgICAgIE9LOiAyMDAsXG4gICAgICAgICAgT1RIRVI6IGBVbmtub3duIHN0YXR1c2BcbiAgICAgICAgfSxcbiAgICAgICAgICAgIE9QVElPTlMgPSB7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICB9O1xuXG4gICAgICBsZXQgdXJsID0gYC9hcGkvdjEvdGlja2V0cy9hY3RpdmF0ZS8ke3RoaXMuZXZ0SUR9LyR7dmFsdWV9YDtcblxuICAgICAgZmV0Y2godXJsLCBPUFRJT05TKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gICAgICB9KVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIHRoaXMudGlja2V0U2VydmVySW5mbyA9IGRhdGE7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB0aGlzLnJlbW92ZVBvcHVwKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlRmVlZEJhY2soKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmdlbmVyYXRlRWxlbWVudEZlZWRCYWNrKCkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIHRoaXMudGlja2V0U2VydmVySW5mby5tZXNzYWdlID0gYNCd0LXQstGW0YDQvdC40Lkg0LrQvtC0INC60LLQuNGC0LrQsGA7XG4gICAgICAgIHRoaXMudGlja2V0U2VydmVySW5mby5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWNrZXRTZXJ2ZXJJbmZvLnRpY2tldCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy50aWNrZXRTZXJ2ZXJJbmZvLmFjdGl2YXRlZF9hdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5yZW1vdmVQb3B1cCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZUZlZWRCYWNrKCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5nZW5lcmF0ZUVsZW1lbnRGZWVkQmFjaygpKTtcbiAgICAgICAgLy8gdGhpcy5lbnRlcmVkV3JvbmdUaWNrZXREYXRlKCk7XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGBsb2FkYCwgKCkgPT4ge1xuICAgIG5ldyBDb25jaWVyZ2VTZWxlY3RFdmVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb25jaWVyZ2VdYCkpO1xuICB9KTtcbn0pKCk7XG5cbiIsIigoKSA9PiB7XG4gIGxldCBkYXRlQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jdXJyZW50LWRhdGVdYCksXG4gICAgICB0aW1lQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jdXJyZW50LXRpbWVdYCk7XG5cbiAgICBpZiAoIWRhdGVCbG9jayAmJiAhdGltZUJsb2NrKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBnZXRDdXJyZW50RGF0ZSgpe1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgIGxldCBmb3JtYXRUaW1lID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJ1a1wiLCB7XG4gICAgICAgICAgICBob3VyOiBcIm51bWVyaWNcIixcbiAgICAgICAgICAgIG1pbnV0ZTogXCJudW1lcmljXCIsXG4gICAgICAgICAgICBzZWNvbmQ6IFwibnVtZXJpY1wiXG4gICAgICAgICAgfSksXG4gICAgICAgICAgZm9ybWF0RGF0ZSA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KFwidWtcIik7XG5cbiAgICAgIGRhdGVCbG9jay5pbm5lckhUTUwgPSBmb3JtYXREYXRlLmZvcm1hdChkYXRlKTtcbiAgICAgIHRpbWVCbG9jay5pbm5lckhUTUwgPSBmb3JtYXRUaW1lLmZvcm1hdChkYXRlKTtcblxuICAgICAgLy8gY29uc29sZS5sb2coZm9ybWF0RGF0ZS5mb3JtYXQoZGF0ZSkgKTsgLy8gMzEuMTIuMjAxNFxuXG4gICAgICAvLyBjb25zb2xlLmxvZyhmb3JtYXRUaW1lLmZvcm1hdChkYXRlKSApOyAvLyAxMjozMDowMFxuICAgIH1cblxuICAgIHNldEludGVydmFsKCgpID0+IHtnZXRDdXJyZW50RGF0ZSgpfSwgMTAwMCk7XG5cbn0pKCk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
