// class ToggleBtn  {
//   constructor(item) {
//     this.item = item;
//     // this.type = this.item.dataset.filterItem;
//     this.list = this.item.querySelector(`[data-toggle-list]`);
//     this.button = this.item.querySelector(`[data-toggle-btn]`);
//     this.button.addEventListener(`click`, (e) => {
//       this.drop();
//     });
//   }

//   drop(){
//     if (this.item.hasAttribute(`data-active`)){
//       this.item.removeAttribute(`data-active`);
//       this.list.style = ``;
//     } else {

//       const heightToPageBottom = window.innerHeight - this.button.getBoundingClientRect().top - this.button.offsetHeight;
//       if (heightToPageBottom < parseInt(window.getComputedStyle(this.list).maxHeight)) {
//         this.list.style.maxHeight = `${heightToPageBottom}px`;
//       }
//       this.item.setAttribute(`data-active`, true);

//     }
//   }
// }

// [...document.querySelectorAll(`[data-toggle-item]`)].map((item) => {
//   if (!item || window.innerWidth >= 768) return false;
//     return new ToggleBtn(item);
// });
"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var getCurrentDate = function getCurrentDate(value) {
    var date = void 0;

    if (value) {
      date = new Date(value);
    } else {
      date = new Date();
    }

    return {
      fullDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate()
    };
  };

  // const checkSessionStorage = () => {
  //   try {
  //     return `sessionStorage` in window && window[`sessionStorage`] !== null;
  //   } catch (e) {
  //     return false;
  //   }
  // };

  if (document.querySelector("[data-calendar]")) {

    window.Calendar = function () {
      function _class(params) {
        var _this = this;

        _classCallCheck(this, _class);

        this.item = params.item;
        this.parentURL = params.urlName;

        this.type = "";

        this.minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        this.maxDate = new Date(new Date().getFullYear(), 11, 1);

        this.search = "";

        this.filter = {
          event: "",
          time: "",
          scene: "",
          daterange: "",
          date: {
            fullDate: "",
            year: "",
            month: "",
            date: ""
          }
        };

        this.serverData = null;
        this.serverDataFiltered = null;
        this.dateRangeInnerValue = null;
        this.hoveredObject = {
          title: null,
          imgURL: null,
          elements: []
        };

        this.elements = {
          clearAllFiltersBtn: this.item.querySelector("[data-reset-all-filters]"),
          calendarTypeListLink: this.item.querySelector("[data-calendar-type-link-list]"),
          events: this.item.querySelector("[data-calendar-events]"),
          type: new CalendarTypeToggle({
            item: this.item.querySelector("[data-calendar-type]")
          }),
          monthToggler: new CalendarMonthToggle({
            item: this.item.querySelector("[data-calendar-month-change]")
          }),
          search: new CalendarSearch(this.item.querySelector("[data-event-search]")),
          filters: {
            event: new FilterValue(this.item.querySelector("[data-filter-item='event']")),
            time: new FilterValue(this.item.querySelector("[data-filter-item='time']")),
            scene: new FilterValue(this.item.querySelector("[data-filter-item='scene']")),
            daterange: new FilterRange(this.item.querySelector("[data-filter-item='daterange']")),
            date: new FilterValue(this.item.querySelector("[data-filter-item='date']"))
          }
        };

        this.CONSTANT = window.CONSTANT;

        this.item.addEventListener("filterChanged", function (e) {
          var eventName = e.detail.type,
              eventValue = e.detail.value;

          if (eventValue === "") {
            _this.filter[eventName] = "";
          } else {
            if (eventName === "date") {
              var parseHrefArr = eventValue.split("&"),
                  year = parseHrefArr[0].split("=")[1],
                  month = parseHrefArr[1].split("=")[1],
                  newDate = new Date() > new Date(year, month) ? newDate = new Date(year, month, new Date().getDate()) : new Date(year, month, 1);
              _this.filter.date = getCurrentDate(newDate);
            } else if (eventName == "daterange") {
              _this.filter.daterange = eventValue.map(function (item) {
                return new Date(item).getMonth() + "." + new Date(item).getDate() + "." + new Date(item).getFullYear();
              }).join(",");
            } else {
              _this.filter[eventName] = eventValue;
            }
          }

          _this.router(true);
        });

        this.item.addEventListener("searchChanged", function (e) {
          _this.search = e.detail.value;

          _this.router(true);
        });

        this.item.addEventListener("monthToggle", function (e) {
          var year = _this.filter.date.year,
              month = _this.filter.date.month,
              date = _this.filter.date.date,
              newDate = void 0;

          if (e.detail.month > 0) {
            month++;
            date = 1;
          } else {
            month--;

            if (month == new Date().getMonth()) {
              date = new Date().getDate();
            }
          }

          newDate = new Date(year, month, date);

          _this.filter.date = {
            fullDate: newDate,
            year: newDate.getFullYear(),
            month: newDate.getMonth(),
            date: newDate.getDate()
          };

          _this.router(true);
        });

        this.item.addEventListener("typeToggle", function (e) {
          if (e.detail.type === _this.type) return false;

          _this.type = e.detail.type;

          if (_this.type === "#/calendar") {
            _this.filter.daterange = "";
            _this.filter.date = getCurrentDate();
          } else {
            _this.filter.date = "";
            // Set default detarange value when change type
            // this.filter.daterange = this.getCurrentDaterange();
          }

          _this.elements.type.setEvent(_this.type);
          _this.router(true);
        });

        this.elements.clearAllFiltersBtn.addEventListener("click", function () {
          _this.filter = {
            event: "",
            time: "",
            scene: "",
            daterange: "",
            date: {
              fullDate: "",
              year: "",
              month: "",
              date: ""
            }
          };

          _this.changeHash();
        });

        window.addEventListener("mouseover", function (e) {
          var calendarEvent = e.target.closest("[data-calendar-event]"),
              windowWidth = window.innerWidth > 767;

          if (!windowWidth) return false;

          if (calendarEvent) {
            _this.hoverOnEvent(calendarEvent);
          } else {
            _this.hoverOnEvent();
          }
        });

        window.addEventListener("hashchange", function (e) {
          _this.router();
        });

        window.addEventListener("resize", function (e) {
          _this.setCalendarOnMobile();
        });

        this.setMinMaxDateValue();
        this.router();
        this.setCalendarOnMobile();
      }

      _createClass(_class, [{
        key: "setCalendarOnMobile",
        value: function setCalendarOnMobile() {
          var link = this.elements.calendarTypeListLink;

          if (window.innerWidth < 768 && !link.hasAttribute("data-active")) {
            link.click();
          }
        }
      }, {
        key: "router",
        value: function router(flag) {
          if (!flag) {
            this.decodeHash(window.location.hash);
          }

          this.setFilters();
          this.getData();
          this.changeHash();
        }
      }, {
        key: "changeHash",
        value: function changeHash() {
          var hashArr = [],
              type = this.type;

          for (var key in this.filter) {
            if (this.filter[key] != "") {
              if (key == "date") {
                hashArr.push("year=" + this.filter.date.year);
                hashArr.push("month=" + this.filter.date.month);
              } else if (key == "daterange") {
                hashArr.push("daterange=" + this.filter.daterange);
              } else {
                hashArr.push("" + this.filter[key]);
              }
            }
          }

          window.location.hash = type + "?" + hashArr.join("&");
        }
      }, {
        key: "decodeHash",
        value: function decodeHash(hash) {
          var parseType = void 0,
              parseYear = void 0,
              parseMonth = void 0,
              parseDate = null,
              parseEvent = void 0,
              parseTime = void 0,
              parseScene = void 0,
              parseDaterange = void 0;

          if (hash) {
            var parseHashSplitArr = hash.split("?"),
                parseFilterSplitArr = parseHashSplitArr[1].split("&");

            parseType = parseHashSplitArr[0];

            // Проходим по массиву и заполняем не достающие значения
            parseFilterSplitArr.forEach(function (item) {
              if (item.indexOf("year") != -1) {
                parseYear = item.split("=")[1];
              } else if (item.indexOf("month") != -1) {
                parseMonth = item.split("=")[1];
              } else if (item.indexOf("event") != -1) {
                parseEvent = item;
              } else if (item.indexOf("time") != -1) {
                parseTime = item;
              } else if (item.indexOf("scene") != -1) {
                parseScene = item;
              } else if (item.indexOf("daterange") != -1) {
                parseDaterange = item.split("=")[1];
              }
            });
          } else {
            parseType = "#/calendar";
          }

          if (parseType == "#/calendar") {
            if (parseYear > new Date().getFullYear() || parseMonth > new Date().getMonth()) {
              this.filter.date = getCurrentDate(new Date(parseYear, parseMonth, 1));
            } else {
              this.filter.date = getCurrentDate();
            }
            parseDaterange = "";
          } else {
            this.filter.date = "";
          }

          this.type = parseType || "";
          this.filter.event = parseEvent || "";
          this.filter.time = parseTime || "";
          this.filter.scene = parseScene || "";
          this.filter.daterange = parseDaterange || "";
        }
      }, {
        key: "setFilters",
        value: function setFilters() {
          var calendarType = this.type == "#/calendar" ? true : false,
              searchType = this.type == "#/search" ? true : false,
              eventType = this.type == "#/events" ? true : false;

          // Установка фильтра смены типа календарь/список
          this.elements.type.setEvent(this.type);

          // Установка фильтра смены переключения месяца
          if (this.elements.monthToggler) {
            var obj = {
              text: "",
              elementVisible: calendarType,
              prevBtnDisabled: false,
              nextBtnDisabled: false
            };

            if (calendarType) {
              obj.text = this.CONSTANT.MONTH[this.filter.date.month][this.CONSTANT.LANG];
              obj.prevBtnDisabled = +this.minDate == +this.filter.date.fullDate;
              obj.nextBtnDisabled = +this.maxDate == +this.filter.date.fullDate;
            }

            this.elements.monthToggler.setMonth(obj);
          }

          // Установка фильтра события
          this.elements.filters.event.setFilter({
            value: this.filter.event
          });

          // Установка фильтра времени
          this.elements.filters.time.setFilter({
            value: this.filter.time
          });

          // Установка фильтра сцены
          this.elements.filters.scene.setFilter({
            value: this.filter.scene
          });

          // Установка фильтра daterange
          if (eventType || searchType) {
            var dateArr = [];

            if (this.filter.daterange) {
              dateArr = this.filter.daterange.split(",").map(function (item) {
                var itemArr = item.split("."),
                    itemDate = +itemArr[1],
                    itemMonth = +itemArr[0],
                    itemYear = +itemArr[2];

                return new Date(itemYear, itemMonth, itemDate);
              });
            }

            this.elements.filters.daterange.setDate({
              value: dateArr,
              hidden: false
            });
          } else {
            this.elements.filters.daterange.setDate({
              value: [],
              hidden: true
            });
          }

          // Установка фильтра месяца
          if (eventType || searchType) {
            this.elements.filters.date.setFilter({
              value: this.filter.date,
              hidden: true
            });
          } else {
            this.elements.filters.date.setFilter({
              value: "year=" + this.filter.date.year + "&month=" + this.filter.date.month,
              hidden: false
            });
          }

          // Установка фильтра поиска
          searchType === true ? this.elements.search.showElement(true) : this.elements.search.showElement();
        }
      }, {
        key: "setMinMaxDateValue",
        value: function setMinMaxDateValue() {
          var dateArr = this.elements.filters.date.list.querySelectorAll("a"),
              minValue = dateArr[0].getAttribute("href"),
              maxValue = dateArr[dateArr.length - 1].getAttribute("href");

          var createDateFromHref = function createDateFromHref(value, minValueFlag) {
            var monthYearArr = value.split("&"),
                month = monthYearArr[1].split("=")[1],
                year = monthYearArr[0].split("=")[1],
                date = minValueFlag === true ? +new Date().getDate() : 1;

            return new Date(year, month, date);
          };

          this.minDate = createDateFromHref(minValue, true);
          this.maxDate = createDateFromHref(maxValue);
        }
      }, {
        key: "hoverOnEvent",
        value: function hoverOnEvent(event) {
          var _this2 = this;

          var resetHoveredObject = function resetHoveredObject() {
            _this2.hoveredObject.title = null;
            _this2.hoveredObject.imgURL = null;
            _this2.hoveredObject.elements.map(function (item) {

              var parent = item.closest("[data-event-bg]");
              parent.style = "";
              parent.classList.remove("hovered");
              return false;
            });
          };

          if (!event) {
            if (this.hoveredObject.title) {
              resetHoveredObject();
            }
          } else {
            var eventTitle = event.querySelector("[data-calendar-event-name]").textContent;

            if (this.hoveredObject.title == eventTitle) return false;
            if (this.hoveredObject.title) resetHoveredObject();

            this.hoveredObject.title = eventTitle;
            this.hoveredObject.imgURL = this.serverDataFiltered.filter(function (item) {
              return item.title == eventTitle ? true : false;
            })[0].imageUrl;

            this.hoveredObject.elements = [].concat(_toConsumableArray(this.item.querySelectorAll("[data-calendar-event]"))).filter(function (item) {
              return item.querySelector("[data-calendar-event-name]").textContent == eventTitle ? true : false;
            });

            this.hoveredObject.elements.forEach(function (item) {
              var parent = item.closest("[data-event-bg]");
              parent.style.cssText = "background-image: url(" + _this2.hoveredObject.imgURL + "); color: #fff";
              parent.classList.add("hovered");
            });
          }
        }
      }, {
        key: "getData",


        // -------------------------------------------------
        value: function getData() {
          var _this3 = this;

          var dateStringNow = new Date(),
              yearNow = dateStringNow.getFullYear(),
              monthNowPlusOne = dateStringNow.getMonth() + 1,
              monthNow = monthNowPlusOne < 10 ? "0" + monthNowPlusOne : monthNowPlusOne,
              dateNow = dateStringNow.getDate() < 10 ? "0" + dateStringNow.getDate() : dateStringNow.getDate();

          var getAJAXData = function getAJAXData() {
            return fetch(window.location.origin + "/api/v1/calendar?from=" + yearNow + "-" + monthNow + "-" + dateNow + "&to=" + (yearNow + 1) + "-" + monthNow + "-" + dateNow, {
              method: "GET",
              json: true
            }).then(function (response) {
              return response.json();
            }).then(function (data) {
              if (data.data) {
                _this3.serverData = data.data;
                return data.data;
              } else {
                throw data;
              }
            }).catch(function (err) {
              return console.warn(err);
            });
          };

          new Promise(function (resolve, reject) {
            return _this3.serverData ? resolve(Promise.resolve(_this3.serverData)) : resolve(getAJAXData());
          }).then(function (data) {
            var activeFilter = {},
                checkSearchFilter = _this3.type === "#/search";

            for (var key in _this3.filter) {
              if (_this3.filter[key] == "") continue;

              if (key == "date") {
                if (_this3.filter.date.year) {
                  activeFilter.year = _this3.filter.date.year;
                }

                if (_this3.filter.date.month) {
                  activeFilter.month = _this3.filter.date.month;
                }

                continue;
              }

              if (_this3.filter[key].indexOf("=") != -1) {
                activeFilter[key] = _this3.filter[key].split("=")[1];
              } else {
                activeFilter[key] = _this3.filter[key];
              }
            }

            if (checkSearchFilter) activeFilter.search = _this3.search;

            _this3.serverDataFiltered = data.filter(function (item) {
              var itemFormatDate = new Date(item.dateTime);

              var obj = {
                year: itemFormatDate.getFullYear(),
                month: itemFormatDate.getMonth(),
                date: itemFormatDate.getDate(),
                fullDate: new Date(itemFormatDate.getFullYear(), itemFormatDate.getMonth(), itemFormatDate.getDate()),
                event: item.type,
                scene: item.scene,
                time: new Date(item.dateTime).getHours() > _this3.CONSTANT.DAY_SPLIT ? "night" : "daytime",
                search: [item.title, item.author, item.actors]
              };

              for (var _key in activeFilter) {
                if (_key == "daterange") {
                  var convertDate = function convertDate(item) {
                    var itemArr = item.split("."),
                        year = itemArr[2],
                        month = itemArr[0],
                        date = itemArr[1];

                    return new Date(year, month, date);
                  };

                  var rangeArr = _this3.filter.daterange.split(","),
                      rangeSize = rangeArr.length > 1 ? true : false,
                      rangeMin = void 0,
                      rangeMax = void 0;

                  if (rangeSize) {
                    rangeMax = convertDate(rangeArr[1]);
                  }

                  rangeMin = convertDate(rangeArr[0]);

                  if (rangeSize) {
                    if (obj.fullDate < rangeMin || obj.fullDate > rangeMax) return false;
                  } else {
                    if (+obj.fullDate != +rangeMin) return false;
                  }
                } else if (_key === "search") {
                  if (activeFilter.search === "") return false;
                  if (obj[_key].join(" ").toUpperCase().indexOf(activeFilter.search.toUpperCase()) === -1) return false;
                } else {
                  if (activeFilter[_key] != obj[_key]) return false;
                }
              }

              return true;
            });

            if (checkSearchFilter) activeFilter.search === "" ? _this3.elements.search.setTitleResult() : _this3.elements.search.setTitleResult(_this3.serverDataFiltered.length > 0);

            _this3.createEvents();
          }).catch(function (err) {
            console.warn(err);
            // Что-то вернуть, чтобы не было ошибки
          });
        }
      }, {
        key: "createEvents",
        value: function createEvents() {
          this.type === "#/calendar" ? this.createCalendar() : this.createList();
        }
      }, {
        key: "createCalendar",
        value: function createCalendar() {
          var _this4 = this;

          var validDayNumber = function validDayNumber(day) {
            return day == 0 ? 6 : day - 1;
          };

          var template = document.createDocumentFragment(),
              tableTemplate = document.createElement("div"),
              tableHeaderTemplate = "\n                <div class=\"calendar__table-row calendar__table-thead\">\n                  <div class=\"calendar__table-td\" data-event-bg>" + this.CONSTANT.DAY["1"][this.CONSTANT.LANG] + "</div>\n                  <div class=\"calendar__table-td\" data-event-bg>" + this.CONSTANT.DAY["2"][this.CONSTANT.LANG] + "</div>\n                  <div class=\"calendar__table-td\" data-event-bg>" + this.CONSTANT.DAY["3"][this.CONSTANT.LANG] + "</div>\n                  <div class=\"calendar__table-td\" data-event-bg>" + this.CONSTANT.DAY["4"][this.CONSTANT.LANG] + "</div>\n                  <div class=\"calendar__table-td\" data-event-bg>" + this.CONSTANT.DAY["5"][this.CONSTANT.LANG] + "</div>\n                  <div class=\"calendar__table-td\" data-event-bg>" + this.CONSTANT.DAY["6"][this.CONSTANT.LANG] + "</div>\n                  <div class=\"calendar__table-td\" data-event-bg>" + this.CONSTANT.DAY["0"][this.CONSTANT.LANG] + "</div>\n                </div>\n              ";

          tableTemplate.classList.add("calendar__table");
          tableTemplate.innerHTML = tableHeaderTemplate;

          var firstDay = new Date(new Date(this.filter.date.fullDate).setMonth(+this.filter.date.month + 1, 0)),
              lastDay = new Date(firstDay).getDate(),
              startDay = validDayNumber(new Date(new Date(this.filter.date.fullDate).setMonth(this.filter.date.month, 1)).getDay()),
              finishDay = validDayNumber(new Date(new Date(this.filter.date.fullDate).setMonth(+this.filter.date.month + 1, 0)).getDay()),
              weekLength = Math.ceil((lastDay + startDay) / 7);
          var dateNumber = 0;

          for (var i = 0; i < weekLength; i++) {
            // Create table row
            var tableRow = document.createElement("div");
            tableRow.classList.add("calendar__table-row");

            for (var j = 0; j < 7; j++) {
              // Create table cell
              var tableTd = document.createElement("div");
              tableTd.classList.add("calendar__table-td");
              tableTd.setAttribute("data-event-bg", true);

              if (i == 0 && j < startDay || i == weekLength - 1 && j > finishDay) {
                tableTd.classList.add("calendar__table-td--empty");
              } else {
                dateNumber++;
                tableTd.innerHTML = "\n                <div class=\"calendar__table-content\">\n                  " + this.serverDataFiltered.filter(function (item) {
                  return new Date(item.dateTime).getDate() == dateNumber;
                }).map(function (item) {
                  return _this4.createEvent(item);
                }).join("") + "\n                </div>";
              }

              tableRow.appendChild(tableTd);
            }

            tableTemplate.appendChild(tableRow);
          }

          template.appendChild(tableTemplate);
          this.elements.events.innerHTML = "";
          this.elements.events.appendChild(template);
        }
      }, {
        key: "createList",
        value: function createList() {
          var _this5 = this;

          var preparedDataFunc = function preparedDataFunc() {
            var preparedData = [],
                getDateType = function getDateType(date) {
              return new Date(date);
            };

            var _loop = function _loop(i) {
              // Check our arr if we have need month?
              var arrMonthNumber = null,
                  arrDaysNumber = null;

              // Check month
              preparedData.forEach(function (item, position) {
                if (item.month == getDateType(_this5.serverDataFiltered[i].dateTime).getMonth()) {
                  arrMonthNumber = position;
                }
              });

              if (arrMonthNumber == null) {
                preparedData.push({
                  month: getDateType(_this5.serverDataFiltered[i].dateTime).getMonth(),
                  days: []
                });

                arrMonthNumber = preparedData.length - 1;
              }

              preparedData[arrMonthNumber].days.forEach(function (item, position) {
                if (item.date == getDateType(_this5.serverDataFiltered[i].dateTime).getDate()) {
                  arrDaysNumber = position;
                }
              });

              if (arrDaysNumber == null) {
                preparedData[arrMonthNumber].days.push({
                  month: getDateType(_this5.serverDataFiltered[i].dateTime).getMonth(),
                  date: getDateType(_this5.serverDataFiltered[i].dateTime).getDate(),
                  day: _this5.CONSTANT.DAY[getDateType(_this5.serverDataFiltered[i].dateTime).getDay()][_this5.CONSTANT.LANG],
                  events: []
                });

                arrDaysNumber = preparedData[arrMonthNumber].days.length - 1;
              }

              preparedData[arrMonthNumber].days[arrDaysNumber].events.push(_this5.serverDataFiltered[i]);
            };

            for (var i = 0; i < _this5.serverDataFiltered.length; i++) {
              _loop(i);
            }

            // preparedData.sort((a, b) => {
            //   return a.month > b.month ? true : false;
            // });

            return preparedData;
          };

          var sortData = preparedDataFunc(),
              template = document.createDocumentFragment(),
              listTemplate = document.createElement("ul"),
              getEventDate = function getEventDate(date) {
            return date > 9 ? date : "0" + date;
          };

          listTemplate.classList.add("calendar-list");

          var listItemTemplate = ("\n          " + sortData.map(function (itemMonth) {
            return "<li class=\"calendar-list__month\">\n              <ul class=\"calendar-list__days\">\n                " + itemMonth.days.map(function (itemDay) {
              return "<li class=\"calendar-list__day\">\n                    <p class=\"calendar-list__day-info\">\n                      <span class=\"calendar-list__day-number\">" + getEventDate(itemDay.date) + "</span>\n                      <span class=\"calendar-list__day-month\">" + _this5.CONSTANT.MONTH_GENITIVE[itemDay.month][_this5.CONSTANT.LANG] + "</span>\n                      <span class=\"calendar-list__day-name\">" + itemDay.day + "</span>\n                    </p>\n                    <ul class=\"calendar-list__events\" data-event-bg>\n                      " + itemDay.events.map(function (itemEvent) {
                return "<li>\n                          " + _this5.createEvent(itemEvent) + "\n                        </li>";
              }).join("") + "\n                    </ul>\n                  </li>";
            }).join("") + "\n              </ul>\n            </li>";
          }).join("") + "\n        ").trim();

          listTemplate.innerHTML = listItemTemplate;
          template.appendChild(listTemplate);
          this.elements.events.innerHTML = "";
          this.elements.events.appendChild(template);
        }
      }, {
        key: "createEvent",
        value: function createEvent(item) {
          var template = void 0;
          var getEventTime = function getEventTime(item) {
            var date = new Date(item.dateTime),
                checkTime = function checkTime(time) {
              return time > 9 ? time : "0" + time;
            };

            return checkTime(date.getHours()) + ":" + checkTime(date.getMinutes());
          };

          // const getEventType = (type) => {
          //   if (this.CONSTANT.EVENT_TYPE[type]) {
          //     return this.CONSTANT.EVENT_TYPE[type][this.CONSTANT.LANG]
          //   } else {
          //     console.warn(`Not valid type ${type}`);
          //     return `ERROR`;
          //   }
          // };

          var getEventPrice = function getEventPrice(item, price) {
            if (item.price === undefined && item.price === null) {
              console.warn("The variable price does not exist");
              return "ERROR";
            }

            switch (price) {
              case "min":
                try {
                  return item.price.min;
                } catch (err) {
                  console.warn("The variable min does not exist");
                  return "ERROR";
                }
                break;

              case "max":
                try {
                  return item.price.max;
                } catch (err) {
                  console.warn("The variable max does not exist");
                  return "ERROR";
                }
                break;

              default:
                console.warn("Not valid price " + price);
                return "ERROR";
            }
          };

          if (this.type == "#/calendar") {
            template = "\n            <div data-sold=\"" + !item.isTicketsAvailable + "\" data-online-close=\"" + !item.isSoldOnline + "\" data-tickets-not-exist=\"" + !item.price.min + "\" class=\"calendar-table-event\" data-calendar-event>\n              <a href=\"" + item.performanceUrl + "\" class=\"calendar-table-event__name\" data-calendar-event-name>" + item.title + "</a>\n              <time datetime=\"" + item.dateTime + "\" class=\"calendar-table-event__time\">\n                " + getEventTime(item) + "\n              </time>\n              <p class=\"calendar-table-event__type\">" + item.typeName + "</p>\n              <a href=\"" + item.eventUrl + "\" class=\"btn-buy calendar-table-event__btn\">" + this.CONSTANT.BUY_TICKET[this.CONSTANT.LANG] + "</a>\n              <p class=\"calendar-table-event__sold\">" + this.CONSTANT.TICKETS_SOLD[this.CONSTANT.LANG] + "</p>\n              <p class=\"calendar-table-event__online\">" + this.CONSTANT.TICKETS_ONLINE[this.CONSTANT.LANG] + "</p>\n            </div>\n          ";
          } else {
            template = "\n            <div data-sold=\"" + !item.isTicketsAvailable + "\" data-online-close=\"" + !item.isSoldOnline + "\" data-tickets-not-exist=\"" + !item.price.min + "\" class=\"calendar-list-event\" data-calendar-event>\n              <div class=\"calendar-list-event__descr\">\n                <p class=\"calendar-list-event__scene\">" + item.sceneName + "</p>\n                <time datetime=\"" + item.dateTime + "\" class=\"calendar-list-event__time\">\n                  " + getEventTime(item) + "\n                </time>\n                <p class=\"calendar-list-event__type\">" + item.typeName + "</p>\n              </div>\n              <div class=\"calendar-list-event__info\">\n                " + (item.author != "undefined" ? "<p class=\"calendar-list-event__author\">" + item.author + "</p>" : "") + "\n                <a href=\"" + item.performanceDateUrl + "\" class=\"calendar-list-event__name\" data-calendar-event-name>" + item.title + "</a>\n                <p class=\"calendar-list-event__artists\">\n                  " + (item.actors != "undefined" ? "" + item.actors.join(", ") : "") + "\n                </p>\n              </div>\n              <div class=\"col-xl-4 calendar-list-event__buy\">\n                <p class=\"calendar-list-event__price-range\">" + this.CONSTANT.TICKETS[this.CONSTANT.LANG] + " " + this.CONSTANT.FROM[this.CONSTANT.LANG] + " " + getEventPrice(item, 'min') + " " + this.CONSTANT.TO[this.CONSTANT.LANG] + " " + getEventPrice(item, 'max') + " " + this.CONSTANT.UAH[this.CONSTANT.LANG] + "</p>\n                <a href=\"" + item.eventUrl + "\" class=\"btn-buy calendar-list-event__btn\">" + this.CONSTANT.BUY_TICKET[this.CONSTANT.LANG] + "</a>\n                <p class=\"calendar-list-event__sold\">" + this.CONSTANT.TICKETS_SOLD[this.CONSTANT.LANG] + "</p>\n                <p class=\"calendar-list-event__online\">" + this.CONSTANT.TICKETS_ONLINE[this.CONSTANT.LANG] + "</p>\n              </div>\n            </div>\n          ";
          }

          return template;
        }
      }, {
        key: "getCurrentDaterange",

        // -------------------------------------------------

        value: function getCurrentDaterange() {
          var date = new Date();
          var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

          return date.getMonth() + "." + date.getDate() + "." + date.getFullYear() + "," + date.getMonth() + "." + lastDate + "." + date.getFullYear();
        }
      }]);

      return _class;
    }();

    window.addEventListener("load", function () {
      var calendar = new Calendar({
        item: document.querySelector("[data-calendar]"),
        urlName: "calendar"
      });
    });
  }
})();
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

;(function () {
  var getDateSvgCalendar = function getDateSvgCalendar() {

    var svgCalendarArr = [].concat(_toConsumableArray(document.querySelectorAll("[data-svg-calendar]")));

    if (!svgCalendarArr) return false;

    svgCalendarArr.forEach(function (item) {

      var svgWidth = 20,
          svgHeight = 22,
          textElement = item.querySelector("text");
      textElement.innerHTML = new Date().getDate();

      var textElementWidth = Math.round(textElement.textLength.baseVal.value);

      textElement.setAttribute("x", (svgWidth - textElementWidth) / 2);
      textElement.setAttribute("y", svgHeight - 3);
    });
  };

  getDateSvgCalendar();

  window.addEventListener("resize", getDateSvgCalendar);
})();
"use strict";

(function () {
  var faq = document.querySelector("[data-faq]");

  if (!faq) return false;

  faq.addEventListener("click", function (e) {
    var target = e.target.closest("[data-faq-btn]");

    if (!target) return false;

    var parent = target.closest("[data-faq-item]"),
        description = parent.querySelector("[data-faq-description]"),
        descriptionHeight = description.scrollHeight;

    if (!description) return false;

    if (parent.hasAttribute("data-active")) {
      parent.removeAttribute("data-active");
      description.style.height = "0";
      // description.style.marginTop = `0`;
    } else {
      parent.setAttribute("data-active", true);
      description.style.height = descriptionHeight + "px";
      // if(window.innerWidth < 768) description.style.marginTop = `30px`;
    }
  });
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  if (document.querySelector("[data-event-parent]")) {
    var FilterEvent = function () {
      function FilterEvent(item) {
        var _this = this;

        _classCallCheck(this, FilterEvent);

        this.item = item;
        this.unicDateArr = [];
        this.actorsArr = this.item.querySelectorAll("[data-event-artist]");
        this.filter = new FilterValue(this.item.querySelector("[data-filter-item=\"date\"]"));
        this.CONSTANT = window.CONSTANT;

        this.getUnicDates();
        this.addDateItems();

        this.item.addEventListener("filterChanged", function (e) {
          return _this.sortArtistForDates(e.detail.value);
        });
      }

      _createClass(FilterEvent, [{
        key: "transformDate",
        value: function transformDate(numericDate) {
          var fullDate = new Date(Date.parse(numericDate)),
              dateDay = fullDate.getDate(),
              dateMonth = fullDate.getMonth(),
              dateYear = fullDate.getFullYear();
          return dateDay + " " + this.CONSTANT.MONTH_GENITIVE[dateMonth][this.CONSTANT.LANG] + " " + dateYear;
        }
      }, {
        key: "getUnicDates",
        value: function getUnicDates() {
          var _this2 = this;

          this.actorsArr.forEach(function (item) {
            item.getAttribute("data-date").split(",").forEach(function (date) {
              if (_this2.unicDateArr.find(function (item) {
                return item == date;
              })) return false;

              _this2.unicDateArr.push(date);
            });
          });

          this.unicDateArr.sort(function (a, b) {
            return +new Date(a) > +new Date(b) ? 1 : -1;
          });
        }

        // Функция наполнения списка

      }, {
        key: "addDateItems",
        value: function addDateItems() {
          var _this3 = this;

          this.filter.list.insertAdjacentHTML("beforeEnd", this.unicDateArr.map(function (item) {
            return "<li><a href=\"" + item + "\">" + _this3.transformDate(item) + "</a></li>";
          }).join(""));
        }
      }, {
        key: "sortArtistForDates",
        value: function sortArtistForDates(choosedDate) {
          this.actorsArr.forEach(function (item) {
            if (item.getAttribute("data-date").indexOf(choosedDate) != -1) {
              item.removeAttribute("data-hidden");
            } else {
              item.setAttribute("data-hidden", true);
            }
          });
        }
      }]);

      return FilterEvent;
    }();

    window.addEventListener("load", function () {
      new FilterEvent(document.querySelector("[data-event-parent]"));
    });
  }
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  if (document.querySelector("[data-filter-media]")) {
    var FilterMedia = function () {
      function FilterMedia(item) {
        var _this = this;

        _classCallCheck(this, FilterMedia);

        this.item = item;
        this.filtersActive = [];
        this.mediaContainer = this.item.querySelector("[data-media-container]");
        this.mobile = 768;
        this.elmsQuantityOnPage = 9;
        this.activePage = 1;
        this.serverData = null;
        this.serverDataFiltered = null;
        this.pagination = new PaginationFrontend(document.querySelector("[data-filter-pagination]"));
        this.mediaType = this.item.hasAttribute("data-media-video") ? "video" : "photo";

        this.filters = [].concat(_toConsumableArray(this.item.querySelectorAll("[data-filter-item]"))).map(function (item) {
          return new FilterValue(item);
        });

        this.item.addEventListener("filterChanged", function (e) {
          var obj = e.detail,
              index = _this.filtersActive.findIndex(function (item) {
            return item.type == obj.type;
          });

          if (index !== -1) _this.filtersActive.splice(index, 1);
          if (obj.value !== "?") _this.filtersActive.push(obj);

          _this.getData(true);
        });

        this.item.addEventListener("changePage", function (e) {
          _this.activePage = e.detail.value;
          _this.filterServerData();
        });

        this.item.addEventListener("filterApply", function (e) {
          return _this.getData();
        });
        this.getData();
      }

      _createClass(FilterMedia, [{
        key: "filterServerData",
        value: function filterServerData() {
          this.serverDataFiltered = this.serverData.slice((this.activePage - 1) * this.elmsQuantityOnPage, this.activePage * this.elmsQuantityOnPage);
          this.insertData();
        }
      }, {
        key: "getData",
        value: function getData(flag) {
          var _this2 = this;

          if (flag) {
            if (window.innerWidth < this.mobile) return false;
          }

          var serverDataUrl = "",
              typeUrl = "";

          if (this.mediaType == "video") {
            typeUrl = "media_videos";
          } else if (this.mediaType == "photo") {
            typeUrl = "media_albums";
          }

          if (this.filtersActive.length) {
            serverDataUrl += "?";

            this.filtersActive.forEach(function (item, i, arr) {
              serverDataUrl += item.value.slice(1);
              if (i !== arr.length - 1) {
                serverDataUrl += "&";
              }
            });
          }
          // console.log(`${window.location.origin}/api/v1/${typeUrl}${serverDataUrl}`);
          return window.customAjax({
            url: window.location.origin + "/api/v1/" + typeUrl + serverDataUrl,
            method: "GET",
            json: true
          }).then(function (data) {
            _this2.serverData = data.data;
            _this2.filterServerData();
            _this2.pagination.setLength(Math.ceil(_this2.serverData.length / _this2.elmsQuantityOnPage));

            // console.log(this.serverData);
            return _this2.serverData;
          }, function (error) {
            console.warn(error);
          });
        }
      }, {
        key: "insertData",
        value: function insertData() {
          var _this3 = this;

          var content = "";
          this.serverDataFiltered.forEach(function (item, index) {
            var template = "";
            if (_this3.mediaType == "video") {
              template = "\n              <div class=\"col-md-6 col-xl-4\">\n                <article class=\"video\" data-video>\n                  <a href=\"" + item.url + "\" class=\"video__link\" data-fancybox>\n                    <div class=\"video__img\">\n                      <img src=\"" + (item.img ? item.img : '//img.youtube.com/vi/' + item.youtubeimg + '/0.jpg') + "\" alt=\"" + item.title + "\">\n                      <p class=\"video__icon-play\">\n                        <svg width=\"45\" height=\"45\" fill=\"#fff\">\n                          <use xlink:href=\"#icon-play\" />\n                        </svg>\n                      </p>\n                    </div>\n                    <div class=\"video__container\">\n                      <h3 class=\"video__title\">" + item.title + "</h3>\n                      <p class=\"video__type\">" + item.cat + "</p>\n                    </div>\n                  </a>\n                </article>\n              </div>";
            } else if (_this3.mediaType == "photo") {
              template = "\n              <div class=\"col-md-6 col-xl-4\">\n                <article class=\"album\">\n                  <a class=\"album__link\" href=\"" + item.url + "\">\n                    <figure class=\"album__img\">\n                      <img src=\"" + item.img + "\" alt=\"" + item.title + "\">\n                    </figure>\n                    <div class=\"album__container\">\n                      <h3 class=\"album__title\">" + item.title + "</h3>\n                      <p class=\"album__type\">" + item.cat + "</p>\n                    </div>\n                  </a>\n                </article>\n              </div>";
            }

            content += template;
          });
          this.mediaContainer.innerHTML = content;
        }
      }]);

      return FilterMedia;
    }();

    window.addEventListener("load", function () {
      new FilterMedia(document.querySelector("[data-filter-media]"));
    });
  }
})();

(function () {
  var FilterApply = function () {
    function FilterApply(item) {
      var _this4 = this;

      _classCallCheck(this, FilterApply);

      this.item = item;
      this.item.addEventListener("click", function (e) {
        return _this4.btnApply();
      });
    }

    _createClass(FilterApply, [{
      key: "btnApply",
      value: function btnApply() {
        var event = new CustomEvent("filterApply", {
          bubbles: true,
          cancelable: true
        });
        this.item.dispatchEvent(event);

        var close = new CustomEvent("popupClose", {
          bubbles: true,
          cancelable: true
        });
        this.item.dispatchEvent(close);
      }
    }]);

    return FilterApply;
  }();

  [].concat(_toConsumableArray(document.querySelectorAll("[data-filter-apply]"))).forEach(function (item) {
    return new FilterApply(item);
  });
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filter = function () {
  function Filter(item) {
    var _this = this;

    _classCallCheck(this, Filter);

    this.item = item;
    this.type = this.item.dataset.filterItem;
    this.list = this.item.querySelector("[data-filter-list]");
    this.button = this.item.querySelector("[data-filter-name]");
    this.button.addEventListener("click", function (e) {
      _this.drop();
    });
  }

  _createClass(Filter, [{
    key: "drop",
    value: function drop() {
      if (this.item.hasAttribute("data-active")) {
        this.item.removeAttribute("data-active");
        this.list.style = "";
      } else {
        if (window.innerWidth < 768) {

          var childrenArr = [].concat(_toConsumableArray(this.item.parentNode.children));
          childrenArr.forEach(function (itm) {
            if (itm.hasAttribute("data-active")) {
              itm.removeAttribute("data-active");
            }
          });
        }

        var heightToPageBottom = window.innerHeight - this.button.getBoundingClientRect().top - this.button.offsetHeight;
        if (heightToPageBottom < parseInt(window.getComputedStyle(this.list).maxHeight)) {
          this.list.style.maxHeight = heightToPageBottom + "px";
        }
        this.item.setAttribute("data-active", true);
      }
    }
  }]);

  return Filter;
}();

var FilterValue = function (_Filter) {
  _inherits(FilterValue, _Filter);

  function FilterValue(item) {
    _classCallCheck(this, FilterValue);

    var _this2 = _possibleConstructorReturn(this, (FilterValue.__proto__ || Object.getPrototypeOf(FilterValue)).call(this, item));

    _this2.buttonText = _this2.button.querySelector("span");
    _this2.list.addEventListener("click", function (e) {
      e.preventDefault();
      var target = e.target.closest("a");

      if (!target) return false;

      _this2.changeFilter(target);
    });

    // this.clearAllFiltersBtn.addEventListener(`click`, () => {
    //   this.setFilter();
    //   this.clearDate();
    // });
    return _this2;
  }

  _createClass(FilterValue, [{
    key: "changeFilter",
    value: function changeFilter(target) {
      if (!target.hasAttribute("data-active")) {
        [].concat(_toConsumableArray(this.list.querySelectorAll("a"))).forEach(function (item) {
          return item.removeAttribute("data-active");
        });
        target.setAttribute("data-active", true);
        this.buttonText.innerHTML = target.innerHTML;

        var targetValue = target.getAttribute("href");

        if (targetValue === "all") targetValue = "";

        var event = new CustomEvent("filterChanged", {
          bubbles: true,
          cancelable: true,
          detail: {
            type: this.item.dataset.filterItem,
            item: this.item,
            value: targetValue
          }
        });
        this.item.dispatchEvent(event);
      }

      this.drop();
    }
  }, {
    key: "setFilter",
    value: function setFilter(obj) {
      var itemText = void 0;
      if (obj) {
        var value = obj.value,
            hidden = obj.hidden || false,
            list = [].concat(_toConsumableArray(this.list.querySelectorAll("a")));

        list.forEach(function (item) {
          return item.removeAttribute("data-active");
        });

        var valueInArr = list.some(function (item) {
          return item.getAttribute("href") == value;
        });
        if (value && valueInArr) {
          list.forEach(function (item) {
            if (item.getAttribute("href") == value) {
              item.setAttribute("data-active", true);
              itemText = item.innerHTML;
            }
          });
        } else {
          var element = [].concat(_toConsumableArray(this.list.querySelectorAll("a")))[0];

          element.setAttribute("data-active", true);
          itemText = element.innerHTML;
          // console.warn(`Значение ${value} не определено`);
        }

        if (hidden) {
          this.item.dataset.hidden = true;
        } else {
          this.item.removeAttribute("data-hidden");
        }
      } else {
        var _element = [].concat(_toConsumableArray(this.list.querySelectorAll("a")))[0];

        _element.setAttribute("data-active", true);
        itemText = _element.innerHTML;
        // console.warn(`Значение ${value} не определено`);
      }
      this.buttonText.innerHTML = itemText;
    }
  }]);

  return FilterValue;
}(Filter);

var FilterRange = function (_Filter2) {
  _inherits(FilterRange, _Filter2);

  function FilterRange(item, link) {
    _classCallCheck(this, FilterRange);

    var _this3 = _possibleConstructorReturn(this, (FilterRange.__proto__ || Object.getPrototypeOf(FilterRange)).call(this, item));

    _this3.dateSpan = _this3.item.querySelector("[data-filter-name]");
    _this3.apply = _this3.item.querySelector("[data-datepicker-apply]");
    _this3.link = link;
    _this3.filterItem = $(_this3.item.querySelector("[data-datepicker]")).datepicker({
      range: true
    }).data("datepicker");

    _this3.apply.addEventListener("click", function (e) {

      if (!_this3.link) {
        e.preventDefault();
        _this3.applyDate();
      } else {
        e.preventDefault();

        var datesArrString = _this3.filterItem.selectedDates.map(function (item) {
          return new Date(item).getMonth() + "." + new Date(item).getDate() + "." + new Date(item).getFullYear();
        }).join(",");

        window.location.href = window.location.origin + "/calendar#/events?daterange=" + datesArrString;
      }
    });

    _this3.CONSTANT = window.CONSTANT;
    return _this3;
  }

  _createClass(FilterRange, [{
    key: "applyDate",
    value: function applyDate(clear) {
      var event = new CustomEvent("filterChanged", {
        bubbles: true,
        cancelable: true,
        detail: {
          type: this.item.dataset.filterItem,
          item: this.item,
          value: this.filterItem.selectedDates
        }
      });

      this.item.dispatchEvent(event);

      if (!clear) this.drop();

      if (document.querySelector("[data-calendar]") && !clear) this.setDaterangeHtml(this.filterItem.selectedDates);
    }
  }, {
    key: "setDate",
    value: function setDate(obj) {
      var value = obj.value,
          hidden = obj.hidden || false;

      if (hidden) {
        this.item.dataset.hidden = true;
      } else {
        this.item.removeAttribute("data-hidden");
        this.item.style = "";
      }

      this.filterItem.selectDate(value);

      if (document.querySelector("[data-calendar]")) {
        this.setDaterangeHtml(value);
      };
    }
  }, {
    key: "setDaterangeHtml",
    value: function setDaterangeHtml(arrDates) {
      var _this4 = this;

      if (document.querySelector(".calendar-daterange")) document.querySelector(".calendar-daterange").remove();

      if (arrDates.length) {
        var formatValue = function formatValue(value) {
          return value > 9 ? value : "0" + value;
        };

        var template = document.createElement("div"),
            daterangeValue = "\n              " + arrDates.map(function (item) {
          return "<span data-daterange class=\"filter__name-daterange\">" + formatValue(new Date(item).getDate()) + "." + formatValue(new Date(item).getMonth() + 1) + "." + new Date(item).getFullYear() + "</span>";
        }).join("") + "\n            ",
            daterangeInner = "\n                <p class=\"calendar-daterange__dates\">\n                  <svg width=\"15\" height=\"15\" fill=\"#333\" class=\"calendar-daterange__icon\">\n                    <use xlink:href=\"#icon-calendar\" />\n                  </svg>\n                  " + daterangeValue + "\n                </p>\n\n              <button type=\"submit\" class=\"btn-more\" data-calendar-daterange-reset>" + this.CONSTANT.RESET_DATA[this.CONSTANT.LANG] + "</button>\n            ";

        template.addEventListener("click", function (e) {
          var target = e.target.closest("[data-calendar-daterange-reset]");

          if (!target) return false;
          _this4.clearDate();
        });

        template.classList.add("calendar-daterange");
        template.innerHTML = daterangeInner;
        document.querySelector(".calendar__filter").appendChild(template);

        if (!this.dateSpan.querySelector("[data-daterange]")) this.dateSpan.insertAdjacentHTML("afterBegin", daterangeValue);
      }
    }
  }, {
    key: "clearDate",
    value: function clearDate() {
      // console.log(`run`);

      this.filterItem.clear();
      if (document.querySelector(".calendar-daterange")) document.querySelector(".calendar-daterange").remove();

      this.dateSpan.querySelectorAll("[data-daterange]").forEach(function (item) {
        if (item) item.remove();
      });

      this.applyDate(true);
    }
  }]);

  return FilterRange;
}(Filter);

[].concat(_toConsumableArray(document.querySelectorAll("[data-filter-item]"))).map(function (item) {
  if (!item.closest("[data-filter-calendar]") && !document.querySelector("[data-event]") && !document.querySelector("[data-filter-media]")) {
    if (item.getAttribute("data-filter-item") == "daterange") {
      return new FilterRange(item, true);
    } else {
      return new Filter(item);
    }
  }
});
"use strict";

(function () {
  var enter = document.querySelector("[data-header-enter]");

  if (!enter) return false;

  var token = localStorage.getItem("token");

  if (!token) return false;

  fetch("/api/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (!data.data) {
      throw data;
    }

    return data.data;
  }).then(function (data) {
    var template = "\n        <a href=\"#\" class=\"header__exit\" data-header-exit>\n          <svg width=\"10\" height=\"10\">\n            <use xlink:href=\"#icon-exit\" />\n          </svg>\n          <span>" + CONSTANT.EXIT[CONSTANT.LANG] + "</span>\n        </a>";

    enter.querySelector("span").textContent = data.email;
    enter.insertAdjacentHTML("afterEnd", template);
  }).then(function () {
    var parent = document.querySelector("[data-header-link]");

    if (!parent) return false;

    parent.addEventListener("click", function (e) {
      var target = e.target.closest("[data-header-exit]");

      if (target) {
        e.preventDefault();

        fetch("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token
          }
        }).then(function () {
          localStorage.removeItem("token");

          parent.querySelector("[data-header-exit]").remove();
          enter.querySelector("span").textContent = CONSTANT.ENTER[CONSTANT.LANG];
        }).catch(function (error) {
          return console.log(error);
        });
      }
    });
  }).catch(function (error) {
    return console.warn("Your token is invalid");
  });
})();
"use strict";

(function () {
  var langBlock = document.querySelector("[data-lang]"),
      lang = document.documentElement.lang;

  if (!langBlock) return false;

  var form = langBlock.querySelector("[data-lang-form]"),
      select = form.querySelector("select"),
      listLinkArr = langBlock.querySelector("[data-lang-list]").querySelectorAll("a");

  form.addEventListener("change", function (e) {
    this.submit();
  });

  listLinkArr.forEach(function (link) {
    var defaultSelected = lang === link.getAttribute("href") ? true : false;

    var option = new Option(link.textContent, link.getAttribute("href"), defaultSelected, defaultSelected);

    select.appendChild(option);

    link.addEventListener("click", function (e) {
      e.preventDefault();

      if (!link.closest("li").classList.contains("lang__list-active")) {
        option.selected = true;

        var event = new Event("change", { bubbles: true, cancelable: true });

        option.dispatchEvent(event);
      }
    });
  });
})();
"use strict";

(function () {
  var replaceMap = function replaceMap() {
    var pageTitle = document.querySelector("[data-mob-map-innit]");
    if (!pageTitle) return false;

    var replaced = pageTitle.getAttribute("data-replaced"),
        replaceMapParent = document.querySelector("[data-map-parent]"),
        replaceMap = document.querySelector("[data-map]");
    // parentAbout = replaceSocialParent.querySelector(`[data-about]`);
    if (!replaced) {
      if (window.innerWidth < 768 && replaceMap) {
        pageTitle.parentNode.insertBefore(replaceMap, pageTitle.nextSibling);
        pageTitle.setAttribute("data-replaced", "replaced");
      }
    } else {
      if (window.innerWidth >= 768) {
        replaceMapParent.appendChild(replaceMap);
        pageTitle.removeAttribute("data-replaced");
      }
    }
  };

  replaceMap();
  window.addEventListener("resize", replaceMap);
})();
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  var mediaContainer = document.querySelector('[data-media]');
  var galleryClickedFlag = false;
  // const imgArr = ["http://bipbap.ru/wp-content/uploads/2017/09/Cool-High-Resolution-Wallpaper-1920x1080.jpg", "http://bipbap.ru/wp-content/uploads/2017/05/VOLKI-krasivye-i-ochen-umnye-zhivotnye.jpg", "https://www.youtube.com/watch?v=_sI_Ps7JSEk"];

  if (!mediaContainer) return false;

  var insertVideosToGallery = function insertVideosToGallery(data, targetUrl) {

    var arr = data.map(function (item) {
      return item.url;
    });

    [].concat(_toConsumableArray(mediaContainer.querySelectorAll('[data-video] a'))).forEach(function (item) {
      return arr.push(item.getAttribute('href'));
    });

    arr.forEach(function (item, i) {
      if (item == targetUrl) {
        arr.splice(i, 1);
      }
    });
    arr.unshift(targetUrl);

    innitGallery(arr);
  };

  var innitGallery = function innitGallery(arr) {
    var getObjArr = arr.map(function (item) {
      return { src: item };
    });

    $.fancybox.open(getObjArr, {
      loop: true,
      'onStart': galleryClickedFlag = false
    });
  };

  var getData = function getData(requestUrl, albumId, targetUrl, urlArr) {
    if (albumId) {
      window.customAjax({
        url: requestUrl + '?id=' + albumId,
        method: 'GET',
        json: true
      }).then(function (data) {
        insertVideosToGallery(data.data, targetUrl);
      }, function (error) {
        console.warn("Data has not getting " + error);
      });
    } else {
      insertVideosToGallery(urlArr, targetUrl);
    }
  };

  mediaContainer.addEventListener('click', function (e) {
    e.preventDefault();

    if (galleryClickedFlag) return false;

    galleryClickedFlag = true;

    var target = e.target.closest('a');

    if (!target) return false;
    var targetContainer = target.closest('[data-media-item]'),
        targetUrl = target.getAttribute('href'),
        requestUrl = mediaContainer.getAttribute('data-action'),
        gallery = e.target.closest('[data-media]');

    var albumId = mediaContainer.getAttribute('data-id'),
        urlArr = [];

    if (gallery.hasAttribute('data-media-without-album')) {
      [].concat(_toConsumableArray(gallery.querySelectorAll('[data-media-item] a'))).forEach(function (item) {
        return urlArr.push(item.getAttribute('href'));
      });
      urlArr = urlArr.map(function (item) {
        return { url: item };
      });
      albumId = null;
    }

    if (targetContainer.hasAttribute('data-video')) {

      $.fancybox.open({
        src: targetUrl,
        'onStart': galleryClickedFlag = false
      });
    } else {
      getData(requestUrl, albumId, targetUrl, urlArr);
    }
  });
})();

// innit Slick Slider for Media
(function () {
  var timer = void 0;

  var innitSliderMedia = function innitSliderMedia() {
    var dataSlick = document.querySelector('[data-slick-slider-media]');
    if (!dataSlick) return false;

    var sliderItemLength = dataSlick.querySelectorAll('[data-media-item]').length,
        slickSliderActive = dataSlick.getAttribute('data-slick-slider-media');

    if (sliderItemLength >= 2 && window.innerWidth < 768) {
      var _$$slick;

      if (slickSliderActive) return false;
      dataSlick.setAttribute('data-slick-slider-media', true);

      $(dataSlick).slick((_$$slick = {
        dots: true,
        autoplay: true,
        arrows: false,
        infinite: true,
        slidesToScroll: 1
      }, _defineProperty(_$$slick, 'autoplay', false), _defineProperty(_$$slick, 'centerMode', true), _defineProperty(_$$slick, 'slidesToShow', 1), _defineProperty(_$$slick, 'centerPadding', '80px'), _defineProperty(_$$slick, 'responsive', [{
        breakpoint: 481,
        settings: {
          centerMode: false,
          slidesToShow: 1
        }
      }]), _$$slick));

      calcHeightSlick($('[data-slick-slider-media]'));
    } else {
      if (!slickSliderActive) return false;

      $(dataSlick).slick('unslick');
      dataSlick.setAttribute('data-slick-slider-media', '');
    }
  };

  innitSliderMedia();
  window.addEventListener('resize', function () {
    clearTimeout(timer);

    timer = setTimeout(innitSliderMedia, 300);
  });
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  var closeMenu = function closeMenu(e) {
    if (e.target.parentElement && e.target.parentElement.querySelector("[data-menu-second]") || e.target.parentElement && e.target.parentElement.hasAttribute("data-menu-item")) {
      e.preventDefault();
    }
    var menu = document.querySelector("[data-menu]");
    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
      [].concat(_toConsumableArray(menu.querySelectorAll("[data-menu-item]"))).forEach(function (item) {
        if (item.classList.contains("active")) {
          var secondElenentsArr = [].concat(_toConsumableArray(item.querySelectorAll("a[tabindex]")));
          item.classList.remove("active");
          secondElenentsArr.forEach(function (item) {
            item.tabIndex = "-1";
          });
        }
      });
    }
  },
      openMenu = function openMenu(e, element) {
    if (element.querySelector("[data-menu-second]")) {
      e.preventDefault();
      var menu = element.closest("[data-menu]"),
          secondElenentsArr = [].concat(_toConsumableArray(element.querySelectorAll("a[tabindex]")));

      if (!menu.classList.contains("active")) {
        menu.classList.add("active");
      } else {
        [].concat(_toConsumableArray(menu.querySelectorAll("[data-menu-item]"))).forEach(function (item) {
          if (item.classList.contains("active")) {
            e.preventDefault();
            item.classList.remove("active");
            [].concat(_toConsumableArray(item.querySelectorAll("a[tabindex]"))).forEach(function (item) {
              item.tabIndex = "-1";
            });
          }
        });
      }
      element.classList.add("active");
      secondElenentsArr.forEach(function (item) {
        item.tabIndex = "";
      });
    }
  };

  window.addEventListener("click", function (e) {
    var element = e.target.closest("[data-menu-item]");
    if (!element || element.classList.contains("active")) {
      closeMenu(e);
    } else {
      openMenu(e, element);
    }
  });

  window.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
      if (document.querySelector("[data-menu]").classList.contains("active")) {
        e.preventDefault();
        closeMenu(e);
      }
    }
  });
})();

(function () {
  window.Menu = function () {
    function _class(options) {
      var _this = this;

      _classCallCheck(this, _class);

      this._elem = options.elem;
      this._header = document.querySelector("[data-header]");
      this._btn = document.querySelector("[data-menu-btn]");
      this._opened = options.opened || false;
      this._btn.addEventListener("click", function (e) {
        _this._onClick(e);
      });
    }

    _createClass(_class, [{
      key: "_onClick",
      value: function _onClick(e) {
        e.preventDefault();
        this._menuToggle();
      }

      // Menu

    }, {
      key: "_onMenuChange",
      value: function _onMenuChange() {
        this._elem.dispatchEvent(new CustomEvent("bodyOverflow", {
          bubbles: true,
          detail: {
            open: this._opened,
            openedObj: this._elem
          }
        }));
      }
    }, {
      key: "_menuToggle",
      value: function _menuToggle() {
        this._header.dataset.active == "true" ? this._menuClose() : this._menuOpen();
      }
    }, {
      key: "_menuOpen",
      value: function _menuOpen() {
        this._header.dataset.active = true;
        this._opened = true;
        this._onMenuChange();
      }
    }, {
      key: "_menuClose",
      value: function _menuClose() {
        this._header.removeAttribute("data-active");
        this._opened = false;
        this._onMenuChange();
      }
    }]);

    return _class;
  }();

  if (document.querySelector("[data-menu]")) {
    window.pageMenu = new Menu({
      elem: document.querySelector("[data-menu]")
    });
  }
})();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  window.PaginationFrontend = function () {
    function _class(item) {
      var _this = this;

      _classCallCheck(this, _class);

      this.item = item;
      this.length = 0;
      if (item) {
        this.item.addEventListener('click', function (e) {
          e.preventDefault();
          var target = e.target.closest('a');

          if (!target) return false;

          _this.generateEventClick(target);
        });
      }
    }

    _createClass(_class, [{
      key: 'insertPagination',
      value: function insertPagination() {

        this.item.innerHTML = this.generatePagination();
      }
    }, {
      key: 'setLength',
      value: function setLength(length) {
        this.length = new Array(length).fill(true);
        if (length <= 1) {
          this.item.innerHTML = '';
        } else {
          this.insertPagination();
        }
      }
    }, {
      key: 'generateEventClick',
      value: function generateEventClick(btn) {
        var page = '';

        var pageActiveEl = this.item.querySelector('[data-active]'),
            clickedItem = btn.textContent,
            pageActive = +pageActiveEl.textContent;

        // console.log(pageActive);
        if (clickedItem == pageActive) return false;

        if (btn.rel == 'prev') {
          if (pageActive - 1 == 0) return false;
          page = pageActive - 1;
        } else if (btn.rel == 'next') {
          if (pageActive + 1 > this.length.length) return false;
          page = pageActive + 1;
        } else {
          page = clickedItem;
        }

        var event = new CustomEvent('changePage', {
          bubbles: true,
          cancelable: true,
          detail: {
            value: page
          }
        });
        pageActiveEl.parentElement.children[page].setAttribute('data-active', true);
        pageActiveEl.removeAttribute('data-active');

        this.item.dispatchEvent(event);
      }
    }, {
      key: 'setPaginationQuantity',
      value: function setPaginationQuantity() {
        return this.length.map(function (item, index) {
          return '\n          <li class="pagination__item" ' + (index == 0 ? 'data-active' : null) + '>\n            <a class="pagination__link">' + (index + 1) + '</a>\n          </li>';
        }).join('');
      }
    }, {
      key: 'generatePagination',
      value: function generatePagination() {
        return '\n          <ul class="pagination__list">\n            <li class="pagination__item">\n              <a class="pagination__link" rel="prev">\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F\n                <svg width="10" height="10" fill="#999999">\n                  <use xlink:href="#icon-arrow-right" />\n                </svg>\n              </a>\n            </li>\n            ' + this.setPaginationQuantity() + '\n            <li class="pagination__item">\n              <a class="pagination__link" rel="next">\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F\n                <svg width="10" height="10" fill="#999999">\n                  <use xlink:href="#icon-arrow-right" />\n                </svg>\n              </a>\n            </li>\n          </ul>';
      }
    }]);

    return _class;
  }();
})();
// (() => {

//   const titleArr = [...document.querySelectorAll(`[data-partner-title]`)];

//   if (!document.querySelector(`[data-partner-title]`)) return false;

//   const getTitleHeight = () => {
//           const titleHeightArr = titleArr.map((item) => item.offsetHeight);

//           getMaxValue(titleHeightArr);
//         },

//         getMaxValue = (arr) => {
//           let maxValue = arr[0];

//           arr.forEach((item) => {
//             if (maxValue < item) maxValue = item;
//           });

//           setTitleHeight(maxValue);
//         },

//         setTitleHeight = (heigth) => {
//           titleArr.forEach((item) => {
//             item.style.height = `${heigth}px`;
//           });
//         };

//   getTitleHeight();
//   window.addEventListener(`resize`, getTitleHeight);

// })();
"use strict";
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  var perfomances = document.querySelector("[data-performances]");

  if (!perfomances) return false;

  [].concat(_toConsumableArray(document.querySelectorAll("[data-performances-item]"))).forEach(function (item) {
    var itemHover = item.querySelector("[data-performances-hover]");

    itemHover.addEventListener("mouseenter", function () {
      return item.classList.add("performances__item--hover");
    });

    item.addEventListener("mouseleave", function () {
      return item.classList.remove("performances__item--hover");
    });
  });
})();
'use strict';

(function () {

  var promoLow = document.querySelector('[data-promo-low]');

  if (!promoLow) return false;

  var fixPromoLowPosition = function fixPromoLowPosition() {
    var divElement = document.createElement('div'),
        parentBlock = promoLow.parentElement;

    divElement.classList.add('promo-low__twin');
    divElement.setAttribute('data-promo-low-twin', true);

    if (window.innerWidth <= 1024) {

      if (promoLow.hasAttribute('data-active')) {
        promoLow.removeAttribute('data-active');
        promoLow.style = '';
        parentBlock.removeChild(parentBlock.querySelector('[data-promo-low-twin]'));
      }
    } else {
      var parentPosition = {
        top: parentBlock.getBoundingClientRect().top,
        height: parentBlock.offsetHeight
      };

      if (parentPosition.top < 0) {

        if (parentPosition.top + parentPosition.height < 0) {
          if (promoLow.hasAttribute('data-active')) return false;

          promoLow.setAttribute('data-active', true);
          divElement.style.height = parentPosition.height + 'px';
          parentBlock.appendChild(divElement);
        } else {
          if (!promoLow.hasAttribute('data-active')) return false;
          promoLow.removeAttribute('data-active');
          parentBlock.removeChild(parentBlock.querySelector('[data-promo-low-twin]'));
        }
      } else {
        promoLow.style = '';
      }
    }
  };

  window.addEventListener('scroll', fixPromoLowPosition);
  window.addEventListener('resize', fixPromoLowPosition);
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  window.CalendarSearch = function () {
    function _class(el) {
      var _this = this;

      _classCallCheck(this, _class);

      this.item = el;
      this.title = this.item.querySelector("[data-search-title]");
      this.form = this.item.querySelector("[data-search-form]");
      this.input = this.item.querySelector("[data-search-input]");
      this.btn = this.item.querySelector("[data-search-btn]");
      this.btnReset = this.item.querySelector("[data-search-reset]");
      this.searchValue = "";
      this.CONSTANT = window.CONSTANT;

      this.form.addEventListener("submit", function (e) {
        e.preventDefault();

        _this.searchValue = _this.input.value.trim();
        _this.search();
      });

      this.btnReset.addEventListener("click", function (e) {
        e.preventDefault();

        _this.input.value = "";
        _this.searchValue = "";
        _this.search();
      });
    }

    _createClass(_class, [{
      key: "search",
      value: function search() {
        if (this.searchValue === "") {
          this.btnReset.removeAttribute("data-active");
        } else {
          this.btnReset.setAttribute("data-active", true);
        }

        var event = new CustomEvent("searchChanged", {
          bubbles: true,
          cancelable: true,
          detail: {
            type: "search",
            item: this.item,
            value: this.searchValue
          }
        });

        this.item.dispatchEvent(event);
      }
    }, {
      key: "setTitleResult",
      value: function setTitleResult(flag) {
        if (flag === undefined) {
          this.title.innerHTML = "" + this.CONSTANT.SEARCH.DEFAULT[this.CONSTANT.LANG];
          return false;
        }

        if (flag) {
          this.title.innerHTML = this.CONSTANT.SEARCH.RESULT[this.CONSTANT.LANG] + ": <small>" + this.searchValue + "</small>";
        } else {
          this.title.innerHTML = this.CONSTANT.SEARCH.RESULT[this.CONSTANT.LANG] + ": <small>" + this.CONSTANT.SEARCH.EMPTY[this.CONSTANT.LANG] + "</small>";
        }
      }
    }, {
      key: "showElement",
      value: function showElement(flag) {
        if (flag) {
          this.item.setAttribute("data-active", true);
        } else {
          this.item.removeAttribute("data-active");
        }
      }
    }]);

    return _class;
  }();
})();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  window.GetInputValue = function () {
    function _class(item) {
      var _this = this;

      _classCallCheck(this, _class);

      this.item = item;

      this.item.addEventListener('input', function (e) {
        var event = new CustomEvent('inputSearchChanged', {
          bubbles: true,
          cancelable: true,
          detail: {
            value: _this.item.value
          }
        });
        _this.item.dispatchEvent(event);
      });
    }

    return _class;
  }();
})();

(function () {
  window.GetTypeValue = function () {
    function _class2(item) {
      var _this2 = this;

      _classCallCheck(this, _class2);

      this.item = item;

      this.item.addEventListener('click', function (e) {
        e.preventDefault();
        var target = e.target.closest('a');

        if (!target) return false;

        _this2.item.querySelector('[data-active]').removeAttribute('data-active');
        target.setAttribute('data-active', true);

        var event = new CustomEvent('typeSearchChanged', {
          bubbles: true,
          cancelable: true,
          detail: {
            value: target.href.substring(target.href.lastIndexOf('?')),
            dataType: target.getAttribute('data-serverdata-type')
          }
        });
        _this2.item.dispatchEvent(event);
      });
    }

    return _class2;
  }();
})();

(function () {
  if (document.querySelector('[data-search-main]')) {
    var SearchMain = function () {
      function SearchMain(item) {
        var _this3 = this;

        _classCallCheck(this, SearchMain);

        this.item = item;
        this.searchTitle = this.item.querySelector('[data-search-main-title]');
        this.searchTitleTextInitial = this.searchTitle.textContent;
        this.searchBtn = this.item.querySelector('[data-search-main-btn-submit]');
        this.typeSelect = this.item.querySelector('[data-search-main-type]');
        this.searchTypeActive = this.typeSelect.querySelector('[data-active]');
        this.resultContainer = this.item.querySelector('[data-search-main-result]');
        this.resultNoResult = this.item.querySelector('[data-search-main-answer]');
        this.resultArticles = this.item.querySelector('[data-type-articles]');
        this.resultPerformances = this.item.querySelector('[data-type-performances]');
        this.resultMedia = this.item.querySelector('[data-type-media]');
        this.resultActors = this.item.querySelector('[data-type-actors]');
        this.serverData = null;
        this.serverDataType = 'list';
        this.activePage = 1;
        this.serverDataFiltered = null;
        this.elmsQuantityOnPage = 9;
        this.searchTypeValue = this.searchTypeActive.href.substring(this.searchTypeActive.href.lastIndexOf('?'));
        this.searchInputValue = null;
        this.getInputValue = new GetInputValue(document.querySelector('[data-search-main-input]'));
        this.pagination = new PaginationFrontend(document.querySelector('[data-search-main-pagination]'));
        this.getTypeValue = new GetTypeValue(this.typeSelect);

        if (this.getInputValue.item.value) {
          this.searchInputValue = this.getInputValue.item.value;
          this.setTitle();
          this.getData(this.searchTypeValue, this.searchInputValue);
        }

        this.item.addEventListener('inputSearchChanged', function (e) {
          _this3.searchInputValue = e.detail.value;
        });

        this.item.addEventListener('typeSearchChanged', function (e) {
          _this3.searchTypeValue = e.detail.value;
          _this3.serverDataType = e.detail.dataType;
          if (_this3.searchTypeValue && _this3.searchInputValue) {
            _this3.getData(_this3.searchTypeValue, _this3.searchInputValue);
          }
        });

        this.searchBtn.addEventListener('click', function (e) {
          e.preventDefault();
          if (_this3.searchTypeValue && _this3.searchInputValue) {
            _this3.setTitle();
            _this3.getData(_this3.searchTypeValue, _this3.searchInputValue);
          }
        });

        this.item.addEventListener('changePage', function (e) {
          _this3.activePage = e.detail.value;
          _this3.filterServerData();
        });
      }

      _createClass(SearchMain, [{
        key: 'getData',
        value: function getData(type, value) {
          var _this4 = this;

          var serverDataUrl = '';

          // console.log(`${window.location.origin}/api/v1/search${type}&q=${value}`);
          window.customAjax({
            url: window.location.origin + '/api/v1/search-count' + type + '&q=' + value,
            method: 'GET',
            json: true
          }).then(function (data) {
            $(_this4.resultArticles).find('span').remove();
            $(_this4.resultPerformances).find('span').remove();
            $(_this4.resultMedia).find('span').remove();
            $(_this4.resultActors).find('span').remove();

            var span = $('<span>').css('color', 'green');

            $(_this4.resultArticles).append(span.clone().html(' (' + data['articles'] + ')'));
            $(_this4.resultPerformances).append(span.clone().html(' (' + data['performances'] + ')'));
            $(_this4.resultMedia).append(span.clone().html(' (' + data['media'] + ')'));
            $(_this4.resultActors).append(span.clone().html(' (' + data['actors'] + ')'));

            return _this4.serverData;
          }, function (error) {
            console.warn(error);
          });

          return window.customAjax({
            url: window.location.origin + '/api/v1/search' + type + '&q=' + value,
            method: 'GET',
            json: true
          }).then(function (data) {
            _this4.serverData = data.data;
            _this4.filterServerData();
            _this4.pagination.setLength(Math.ceil(_this4.serverData.length / _this4.elmsQuantityOnPage));
            // console.log(this.serverData);
            return _this4.serverData;
          }, function (error) {
            console.warn(error);
          });
        }
      }, {
        key: 'filterServerData',
        value: function filterServerData() {
          this.serverDataFiltered = this.serverData.slice((this.activePage - 1) * this.elmsQuantityOnPage, this.activePage * this.elmsQuantityOnPage);
          this.activePage = 1;
          this.insertData();
        }
      }, {
        key: 'setTitle',
        value: function setTitle() {
          this.searchTitle.innerHTML = '' + this.searchTitleTextInitial + this.searchInputValue;
          this.searchTitle.classList.add('active');
        }
      }, {
        key: 'insertData',
        value: function insertData() {
          var _this5 = this;

          var content = '',
              container = '';

          if (this.serverDataFiltered.length > 0) {
            this.serverDataFiltered.forEach(function (item, index) {
              var template = '',
                  getImgUrl = function getImgUrl() {
                var imgUrl = '';
                if (item.img) {
                  imgUrl = item.img;
                } else {
                  imgUrl = '//img.youtube.com/vi/' + item.youtubeimg + '/0.jpg';
                }
                return imgUrl;
              };
              if (_this5.serverDataType == 'list') {
                template = '\n                <li class="search-main__result-item">\n                  <h2 class="search-main__result-title">\n                    <a href="' + item.url + '" class="search-main__result-link">' + item.title + '</a>\n                  </h2>\n                  <p class="search-main__descr">' + item.descr + '</p>\n                </li>';
              } else if (_this5.serverDataType == 'media') {
                template = '\n                <li class="search-main__result-item col-md-6 col-xl-4">\n                  <a href="' + item.url + '" ' + (item.type == "video" ? "data-fancybox" : "") + ' class="search-main__result-link">\n                    <h2 class="search-main__result-title">' + item.title + '</h2>\n                    <figure class="search-main__result-img ' + (item.type == "video" || item.type == "album" ? "search-main__result-img--media" : "search-main__result-img--actors") + '">\n                      <img src="' + getImgUrl() + '" alt="' + item.title + '">\n                      ' + (item.type == "video" ? '<p class="search-main__icon-play"><svg width="45" height="45" fill="#fff"><use xlink:href="#icon-play" /></svg></p>' : "") + '\n                    </figure>\n                  </a>\n                </li>';
              }

              content += template;
            });

            if (this.serverDataType == 'media') {
              container = '\n              <div class="search-main__result">\n                <ul class="search-main__result-list row">\n                ' + content + '\n                </ul>\n              </div>';
            } else if (this.serverDataType == 'list') {
              container = '\n              <div class="search-main__result">\n                <ul class="search-main__result-list">\n                ' + content + '\n                </ul>\n              </div>';
            }

            this.resultNoResult.classList.remove('active');
          } else {
            this.resultNoResult.classList.add('active');
          }
          this.resultContainer.innerHTML = container;
        }
      }]);

      return SearchMain;
    }();

    window.addEventListener('load', function () {
      new SearchMain(document.querySelector('[data-search-main]'));
    });
  }
})();
// ;(function(){
//   const replaceSocialBlock = function(){
//     let footerSocialBlock = document.querySelector(`[data-footer-social]`),
//           headerSocialBlock = document.querySelector(`[data-header-social]`),
//           socialBlockInFooter = footerSocialBlock.querySelector(`[data-social]`),
//           socialBlockInHeader = headerSocialBlock.querySelector(`[data-social]`);

//     if(window.innerWidth <= 1024) {
//       if(socialBlockInFooter) {
//         return false;
//       } else {
//         socialBlockInHeader = headerSocialBlock.querySelector(`[data-social]`);
//         if(socialBlockInHeader) {
//           socialBlockInFooter = socialBlockInHeader;
//           socialBlockInHeader.remove();
//           footerSocialBlock.appendChild(socialBlockInFooter);
//         }
//       }
//     } else {
//       if(socialBlockInHeader) {
//         return false;
//       } else {
//         socialBlockInFooter = footerSocialBlock.querySelector(`[data-social]`);
//         if(socialBlockInFooter) {
//           socialBlockInHeader = socialBlockInFooter;
//           socialBlockInFooter.remove();
//           headerSocialBlock.appendChild(socialBlockInHeader);
//         }
//       }
//     }
//   }

//   replaceSocialBlock();
//   window.addEventListener(`resize`, replaceSocialBlock);
// })();
"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  window.CalendarMonthToggle = function () {
    function _class(option) {
      var _this = this;

      _classCallCheck(this, _class);

      this.item = option.item;
      this.nextBtn = this.item.querySelector("[data-calendar-month=\"next\"]");
      this.prevBtn = this.item.querySelector("[data-calendar-month=\"prev\"]");
      this.monthName = this.item.querySelector("[data-calendar-month-name]");

      this.item.addEventListener("click", function (e) {
        var target = e.target.closest("button");

        if (!target) return false;
        _this.changeMonth(target);
      });
    }

    _createClass(_class, [{
      key: "changeMonth",
      value: function changeMonth(target) {
        var monthDirection = target.dataset.calendarMonth == "prev" ? -1 : 1;

        var event = new CustomEvent("monthToggle", {
          bubbles: true,
          cancelable: true,
          detail: {
            month: monthDirection
          }
        });

        this.item.dispatchEvent(event);
      }
    }, {
      key: "setMonth",
      value: function setMonth(option) {
        this.monthName.textContent = option.text;
        this.prevBtn.dataset.disabled = option.prevBtnDisabled;
        this.nextBtn.dataset.disabled = option.nextBtnDisabled;
        this.changeVisibleElement(option.elementVisible);
      }
    }, {
      key: "changeVisibleElement",
      value: function changeVisibleElement(flag) {
        if (flag) {
          this.item.removeAttribute("data-hidden");
        } else {
          this.item.dataset.hidden = true;
        }
      }
    }]);

    return _class;
  }();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  window.CalendarTypeToggle = function () {
    function _class(option) {
      var _this = this;

      _classCallCheck(this, _class);

      this.item = option.item;
      this.linkArr = this.item.querySelectorAll("[data-calendar-type-link]");

      this.item.addEventListener("click", function (e) {
        e.preventDefault();

        var target = e.target.closest("[data-calendar-type-link]");

        if (!target) return false;
        _this.changeEvent(target);
      });
    }

    _createClass(_class, [{
      key: "changeEvent",
      value: function changeEvent(target) {
        var event = new CustomEvent("typeToggle", {
          bubbles: true,
          cancelable: true,
          detail: {
            type: target.getAttribute("href")
          }
        });

        this.item.dispatchEvent(event);
      }
    }, {
      key: "setEvent",
      value: function setEvent(type) {
        [].concat(_toConsumableArray(this.linkArr)).forEach(function (item) {
          if (type === item.getAttribute("href")) {
            item.setAttribute("data-active", true);
            item.closest("li").setAttribute("data-active", true);
          } else {
            item.removeAttribute("data-active");
            item.closest("li").removeAttribute("data-active");
          }
        });
      }
    }]);

    return _class;
  }();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ0bi10b2dnbGUvYnRuLXRvZ2dsZS5qcyIsImNhbGVuZGFyL2NhbGVuZGFyLmpzIiwiY2FsZW5kYXItYnRuL2NhbGVuZGFyLWJ0bi5qcyIsImZhcS9mYXEuanMiLCJmaWx0ZXIvZmlsdGVyLWV2ZW50LmpzIiwiZmlsdGVyL2ZpbHRlci1tZWRpYS5qcyIsImZpbHRlci9maWx0ZXIuanMiLCJoZWFkZXIvaGVhZGVyLmpzIiwibGFuZy9sYW5nLmpzIiwibWFwL21hcC5qcyIsIm1lZGlhL21lZGlhLmpzIiwibWVudS9tZW51LmpzIiwicGFnaW5hdGlvbi1mcm9udGVuZC9wYWdpbmF0aW9uLWZyb250ZW5kLmpzIiwicGFydG5lcnMvcGFydG5lcnMuanMiLCJwZXJmb3JtYW5jZXMvcGVyZm9ybWFuY2VzLmpzIiwicHJvbW8tbG93L3Byb21vLWxvdy5qcyIsInNlYXJjaC9zZWFyY2guanMiLCJzZWFyY2gtbWFpbi9zZWFyY2gtbWFpbi5qcyIsInNvY2lhbC9zb2NpYWwuanMiLCJjYWxlbmRhci9jYWxlbmRhci1tb250aC10b2dnbGUvY2FsZW5kYXItbW9udGgtdG9nZ2xlLmpzIiwiY2FsZW5kYXIvY2FsZW5kYXItdHlwZS9jYWxlbmRhci10eXBlLmpzIl0sIm5hbWVzIjpbImdldEN1cnJlbnREYXRlIiwidmFsdWUiLCJkYXRlIiwiRGF0ZSIsImZ1bGxEYXRlIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJ5ZWFyIiwibW9udGgiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ3aW5kb3ciLCJDYWxlbmRhciIsInBhcmFtcyIsIml0ZW0iLCJwYXJlbnRVUkwiLCJ1cmxOYW1lIiwidHlwZSIsIm1pbkRhdGUiLCJtYXhEYXRlIiwic2VhcmNoIiwiZmlsdGVyIiwiZXZlbnQiLCJ0aW1lIiwic2NlbmUiLCJkYXRlcmFuZ2UiLCJzZXJ2ZXJEYXRhIiwic2VydmVyRGF0YUZpbHRlcmVkIiwiZGF0ZVJhbmdlSW5uZXJWYWx1ZSIsImhvdmVyZWRPYmplY3QiLCJ0aXRsZSIsImltZ1VSTCIsImVsZW1lbnRzIiwiY2xlYXJBbGxGaWx0ZXJzQnRuIiwiY2FsZW5kYXJUeXBlTGlzdExpbmsiLCJldmVudHMiLCJDYWxlbmRhclR5cGVUb2dnbGUiLCJtb250aFRvZ2dsZXIiLCJDYWxlbmRhck1vbnRoVG9nZ2xlIiwiQ2FsZW5kYXJTZWFyY2giLCJmaWx0ZXJzIiwiRmlsdGVyVmFsdWUiLCJGaWx0ZXJSYW5nZSIsIkNPTlNUQU5UIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJldmVudE5hbWUiLCJkZXRhaWwiLCJldmVudFZhbHVlIiwicGFyc2VIcmVmQXJyIiwic3BsaXQiLCJuZXdEYXRlIiwibWFwIiwiam9pbiIsInJvdXRlciIsInNldEV2ZW50IiwiY2hhbmdlSGFzaCIsImNhbGVuZGFyRXZlbnQiLCJ0YXJnZXQiLCJjbG9zZXN0Iiwid2luZG93V2lkdGgiLCJpbm5lcldpZHRoIiwiaG92ZXJPbkV2ZW50Iiwic2V0Q2FsZW5kYXJPbk1vYmlsZSIsInNldE1pbk1heERhdGVWYWx1ZSIsImxpbmsiLCJoYXNBdHRyaWJ1dGUiLCJjbGljayIsImZsYWciLCJkZWNvZGVIYXNoIiwibG9jYXRpb24iLCJoYXNoIiwic2V0RmlsdGVycyIsImdldERhdGEiLCJoYXNoQXJyIiwia2V5IiwicHVzaCIsInBhcnNlVHlwZSIsInBhcnNlWWVhciIsInBhcnNlTW9udGgiLCJwYXJzZURhdGUiLCJwYXJzZUV2ZW50IiwicGFyc2VUaW1lIiwicGFyc2VTY2VuZSIsInBhcnNlRGF0ZXJhbmdlIiwicGFyc2VIYXNoU3BsaXRBcnIiLCJwYXJzZUZpbHRlclNwbGl0QXJyIiwiZm9yRWFjaCIsImluZGV4T2YiLCJjYWxlbmRhclR5cGUiLCJzZWFyY2hUeXBlIiwiZXZlbnRUeXBlIiwib2JqIiwidGV4dCIsImVsZW1lbnRWaXNpYmxlIiwicHJldkJ0bkRpc2FibGVkIiwibmV4dEJ0bkRpc2FibGVkIiwiTU9OVEgiLCJMQU5HIiwic2V0TW9udGgiLCJzZXRGaWx0ZXIiLCJkYXRlQXJyIiwiaXRlbUFyciIsIml0ZW1EYXRlIiwiaXRlbU1vbnRoIiwiaXRlbVllYXIiLCJzZXREYXRlIiwiaGlkZGVuIiwic2hvd0VsZW1lbnQiLCJsaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsIm1pblZhbHVlIiwiZ2V0QXR0cmlidXRlIiwibWF4VmFsdWUiLCJsZW5ndGgiLCJjcmVhdGVEYXRlRnJvbUhyZWYiLCJtaW5WYWx1ZUZsYWciLCJtb250aFllYXJBcnIiLCJyZXNldEhvdmVyZWRPYmplY3QiLCJwYXJlbnQiLCJzdHlsZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImV2ZW50VGl0bGUiLCJ0ZXh0Q29udGVudCIsImltYWdlVXJsIiwiY3NzVGV4dCIsImFkZCIsImRhdGVTdHJpbmdOb3ciLCJ5ZWFyTm93IiwibW9udGhOb3dQbHVzT25lIiwibW9udGhOb3ciLCJkYXRlTm93IiwiZ2V0QUpBWERhdGEiLCJmZXRjaCIsIm9yaWdpbiIsIm1ldGhvZCIsImpzb24iLCJ0aGVuIiwicmVzcG9uc2UiLCJkYXRhIiwiY2F0Y2giLCJjb25zb2xlIiwid2FybiIsImVyciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiYWN0aXZlRmlsdGVyIiwiY2hlY2tTZWFyY2hGaWx0ZXIiLCJpdGVtRm9ybWF0RGF0ZSIsImRhdGVUaW1lIiwiZ2V0SG91cnMiLCJEQVlfU1BMSVQiLCJhdXRob3IiLCJhY3RvcnMiLCJjb252ZXJ0RGF0ZSIsInJhbmdlQXJyIiwicmFuZ2VTaXplIiwicmFuZ2VNaW4iLCJyYW5nZU1heCIsInRvVXBwZXJDYXNlIiwic2V0VGl0bGVSZXN1bHQiLCJjcmVhdGVFdmVudHMiLCJjcmVhdGVDYWxlbmRhciIsImNyZWF0ZUxpc3QiLCJ2YWxpZERheU51bWJlciIsImRheSIsInRlbXBsYXRlIiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsInRhYmxlVGVtcGxhdGUiLCJjcmVhdGVFbGVtZW50IiwidGFibGVIZWFkZXJUZW1wbGF0ZSIsIkRBWSIsImlubmVySFRNTCIsImZpcnN0RGF5IiwibGFzdERheSIsInN0YXJ0RGF5IiwiZ2V0RGF5IiwiZmluaXNoRGF5Iiwid2Vla0xlbmd0aCIsIk1hdGgiLCJjZWlsIiwiZGF0ZU51bWJlciIsImkiLCJ0YWJsZVJvdyIsImoiLCJ0YWJsZVRkIiwic2V0QXR0cmlidXRlIiwiY3JlYXRlRXZlbnQiLCJhcHBlbmRDaGlsZCIsInByZXBhcmVkRGF0YUZ1bmMiLCJwcmVwYXJlZERhdGEiLCJnZXREYXRlVHlwZSIsImFyck1vbnRoTnVtYmVyIiwiYXJyRGF5c051bWJlciIsInBvc2l0aW9uIiwiZGF5cyIsInNvcnREYXRhIiwibGlzdFRlbXBsYXRlIiwiZ2V0RXZlbnREYXRlIiwibGlzdEl0ZW1UZW1wbGF0ZSIsIml0ZW1EYXkiLCJNT05USF9HRU5JVElWRSIsIml0ZW1FdmVudCIsInRyaW0iLCJnZXRFdmVudFRpbWUiLCJjaGVja1RpbWUiLCJnZXRNaW51dGVzIiwiZ2V0RXZlbnRQcmljZSIsInByaWNlIiwidW5kZWZpbmVkIiwibWluIiwibWF4IiwiaXNUaWNrZXRzQXZhaWxhYmxlIiwiaXNTb2xkT25saW5lIiwicGVyZm9ybWFuY2VVcmwiLCJ0eXBlTmFtZSIsImV2ZW50VXJsIiwiQlVZX1RJQ0tFVCIsIlRJQ0tFVFNfU09MRCIsIlRJQ0tFVFNfT05MSU5FIiwic2NlbmVOYW1lIiwicGVyZm9ybWFuY2VEYXRlVXJsIiwiVElDS0VUUyIsIkZST00iLCJUTyIsIlVBSCIsImxhc3REYXRlIiwiY2FsZW5kYXIiLCJnZXREYXRlU3ZnQ2FsZW5kYXIiLCJzdmdDYWxlbmRhckFyciIsInN2Z1dpZHRoIiwic3ZnSGVpZ2h0IiwidGV4dEVsZW1lbnQiLCJ0ZXh0RWxlbWVudFdpZHRoIiwicm91bmQiLCJ0ZXh0TGVuZ3RoIiwiYmFzZVZhbCIsImZhcSIsImRlc2NyaXB0aW9uIiwiZGVzY3JpcHRpb25IZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJoZWlnaHQiLCJGaWx0ZXJFdmVudCIsInVuaWNEYXRlQXJyIiwiYWN0b3JzQXJyIiwiZ2V0VW5pY0RhdGVzIiwiYWRkRGF0ZUl0ZW1zIiwic29ydEFydGlzdEZvckRhdGVzIiwibnVtZXJpY0RhdGUiLCJwYXJzZSIsImRhdGVEYXkiLCJkYXRlTW9udGgiLCJkYXRlWWVhciIsImZpbmQiLCJzb3J0IiwiYSIsImIiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJ0cmFuc2Zvcm1EYXRlIiwiY2hvb3NlZERhdGUiLCJGaWx0ZXJNZWRpYSIsImZpbHRlcnNBY3RpdmUiLCJtZWRpYUNvbnRhaW5lciIsIm1vYmlsZSIsImVsbXNRdWFudGl0eU9uUGFnZSIsImFjdGl2ZVBhZ2UiLCJwYWdpbmF0aW9uIiwiUGFnaW5hdGlvbkZyb250ZW5kIiwibWVkaWFUeXBlIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJzcGxpY2UiLCJmaWx0ZXJTZXJ2ZXJEYXRhIiwic2xpY2UiLCJpbnNlcnREYXRhIiwic2VydmVyRGF0YVVybCIsInR5cGVVcmwiLCJhcnIiLCJjdXN0b21BamF4IiwidXJsIiwic2V0TGVuZ3RoIiwiZXJyb3IiLCJjb250ZW50IiwiaW1nIiwieW91dHViZWltZyIsImNhdCIsIkZpbHRlckFwcGx5IiwiYnRuQXBwbHkiLCJDdXN0b21FdmVudCIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiZGlzcGF0Y2hFdmVudCIsImNsb3NlIiwiRmlsdGVyIiwiZGF0YXNldCIsImZpbHRlckl0ZW0iLCJidXR0b24iLCJkcm9wIiwiY2hpbGRyZW5BcnIiLCJwYXJlbnROb2RlIiwiY2hpbGRyZW4iLCJpdG0iLCJoZWlnaHRUb1BhZ2VCb3R0b20iLCJpbm5lckhlaWdodCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsIm9mZnNldEhlaWdodCIsInBhcnNlSW50IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsIm1heEhlaWdodCIsImJ1dHRvblRleHQiLCJwcmV2ZW50RGVmYXVsdCIsImNoYW5nZUZpbHRlciIsInRhcmdldFZhbHVlIiwiaXRlbVRleHQiLCJ2YWx1ZUluQXJyIiwic29tZSIsImVsZW1lbnQiLCJkYXRlU3BhbiIsImFwcGx5IiwiJCIsImRhdGVwaWNrZXIiLCJyYW5nZSIsImFwcGx5RGF0ZSIsImRhdGVzQXJyU3RyaW5nIiwic2VsZWN0ZWREYXRlcyIsImhyZWYiLCJjbGVhciIsInNldERhdGVyYW5nZUh0bWwiLCJzZWxlY3REYXRlIiwiYXJyRGF0ZXMiLCJmb3JtYXRWYWx1ZSIsImRhdGVyYW5nZVZhbHVlIiwiZGF0ZXJhbmdlSW5uZXIiLCJSRVNFVF9EQVRBIiwiY2xlYXJEYXRlIiwiZW50ZXIiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJoZWFkZXJzIiwiRVhJVCIsImVtYWlsIiwicmVtb3ZlSXRlbSIsIkVOVEVSIiwibG9nIiwibGFuZ0Jsb2NrIiwibGFuZyIsImRvY3VtZW50RWxlbWVudCIsImZvcm0iLCJzZWxlY3QiLCJsaXN0TGlua0FyciIsInN1Ym1pdCIsImRlZmF1bHRTZWxlY3RlZCIsIm9wdGlvbiIsIk9wdGlvbiIsImNvbnRhaW5zIiwic2VsZWN0ZWQiLCJFdmVudCIsInJlcGxhY2VNYXAiLCJwYWdlVGl0bGUiLCJyZXBsYWNlZCIsInJlcGxhY2VNYXBQYXJlbnQiLCJpbnNlcnRCZWZvcmUiLCJuZXh0U2libGluZyIsImdhbGxlcnlDbGlja2VkRmxhZyIsImluc2VydFZpZGVvc1RvR2FsbGVyeSIsInRhcmdldFVybCIsInVuc2hpZnQiLCJpbm5pdEdhbGxlcnkiLCJnZXRPYmpBcnIiLCJzcmMiLCJmYW5jeWJveCIsIm9wZW4iLCJsb29wIiwicmVxdWVzdFVybCIsImFsYnVtSWQiLCJ1cmxBcnIiLCJ0YXJnZXRDb250YWluZXIiLCJnYWxsZXJ5IiwidGltZXIiLCJpbm5pdFNsaWRlck1lZGlhIiwiZGF0YVNsaWNrIiwic2xpZGVySXRlbUxlbmd0aCIsInNsaWNrU2xpZGVyQWN0aXZlIiwic2xpY2siLCJkb3RzIiwiYXV0b3BsYXkiLCJhcnJvd3MiLCJpbmZpbml0ZSIsInNsaWRlc1RvU2Nyb2xsIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwiY2VudGVyTW9kZSIsInNsaWRlc1RvU2hvdyIsImNhbGNIZWlnaHRTbGljayIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJjbG9zZU1lbnUiLCJwYXJlbnRFbGVtZW50IiwibWVudSIsInNlY29uZEVsZW5lbnRzQXJyIiwidGFiSW5kZXgiLCJvcGVuTWVudSIsImtleUNvZGUiLCJNZW51Iiwib3B0aW9ucyIsIl9lbGVtIiwiZWxlbSIsIl9oZWFkZXIiLCJfYnRuIiwiX29wZW5lZCIsIm9wZW5lZCIsIl9vbkNsaWNrIiwiX21lbnVUb2dnbGUiLCJvcGVuZWRPYmoiLCJhY3RpdmUiLCJfbWVudUNsb3NlIiwiX21lbnVPcGVuIiwiX29uTWVudUNoYW5nZSIsInBhZ2VNZW51IiwiZ2VuZXJhdGVFdmVudENsaWNrIiwiZ2VuZXJhdGVQYWdpbmF0aW9uIiwiQXJyYXkiLCJmaWxsIiwiaW5zZXJ0UGFnaW5hdGlvbiIsImJ0biIsInBhZ2UiLCJwYWdlQWN0aXZlRWwiLCJjbGlja2VkSXRlbSIsInBhZ2VBY3RpdmUiLCJyZWwiLCJzZXRQYWdpbmF0aW9uUXVhbnRpdHkiLCJwZXJmb21hbmNlcyIsIml0ZW1Ib3ZlciIsInByb21vTG93IiwiZml4UHJvbW9Mb3dQb3NpdGlvbiIsImRpdkVsZW1lbnQiLCJwYXJlbnRCbG9jayIsInJlbW92ZUNoaWxkIiwicGFyZW50UG9zaXRpb24iLCJlbCIsImlucHV0IiwiYnRuUmVzZXQiLCJzZWFyY2hWYWx1ZSIsIlNFQVJDSCIsIkRFRkFVTFQiLCJSRVNVTFQiLCJFTVBUWSIsIkdldElucHV0VmFsdWUiLCJHZXRUeXBlVmFsdWUiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsImRhdGFUeXBlIiwiU2VhcmNoTWFpbiIsInNlYXJjaFRpdGxlIiwic2VhcmNoVGl0bGVUZXh0SW5pdGlhbCIsInNlYXJjaEJ0biIsInR5cGVTZWxlY3QiLCJzZWFyY2hUeXBlQWN0aXZlIiwicmVzdWx0Q29udGFpbmVyIiwicmVzdWx0Tm9SZXN1bHQiLCJyZXN1bHRBcnRpY2xlcyIsInJlc3VsdFBlcmZvcm1hbmNlcyIsInJlc3VsdE1lZGlhIiwicmVzdWx0QWN0b3JzIiwic2VydmVyRGF0YVR5cGUiLCJzZWFyY2hUeXBlVmFsdWUiLCJzZWFyY2hJbnB1dFZhbHVlIiwiZ2V0SW5wdXRWYWx1ZSIsImdldFR5cGVWYWx1ZSIsInNldFRpdGxlIiwic3BhbiIsImNzcyIsImFwcGVuZCIsImNsb25lIiwiaHRtbCIsImNvbnRhaW5lciIsImdldEltZ1VybCIsImltZ1VybCIsImRlc2NyIiwibmV4dEJ0biIsInByZXZCdG4iLCJtb250aE5hbWUiLCJjaGFuZ2VNb250aCIsIm1vbnRoRGlyZWN0aW9uIiwiY2FsZW5kYXJNb250aCIsImRpc2FibGVkIiwiY2hhbmdlVmlzaWJsZUVsZW1lbnQiLCJsaW5rQXJyIiwiY2hhbmdlRXZlbnQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM5QkEsQ0FBQyxZQUFXO0FBQ1YsTUFBTUEsaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFDQyxLQUFELEVBQVc7QUFDaEMsUUFBSUMsYUFBSjs7QUFFQSxRQUFJRCxLQUFKLEVBQVc7QUFDVEMsYUFBTyxJQUFJQyxJQUFKLENBQVNGLEtBQVQsQ0FBUDtBQUNELEtBRkQsTUFFTztBQUNMQyxhQUFPLElBQUlDLElBQUosRUFBUDtBQUNEOztBQUVELFdBQU87QUFDTEMsZ0JBQVUsSUFBSUQsSUFBSixDQUFTRCxLQUFLRyxXQUFMLEVBQVQsRUFBNkJILEtBQUtJLFFBQUwsRUFBN0IsRUFBOENKLEtBQUtLLE9BQUwsRUFBOUMsQ0FETDtBQUVMQyxZQUFNTixLQUFLRyxXQUFMLEVBRkQ7QUFHTEksYUFBT1AsS0FBS0ksUUFBTCxFQUhGO0FBSUxKLFlBQU1BLEtBQUtLLE9BQUw7QUFKRCxLQUFQO0FBTUQsR0FmRDs7QUFpQkE7QUFDQTtBQUNBO0FBQ0E7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OEI7QUFHMUN0UCxrQkFBUTtBQUNOOUIsa0JBQU15QyxPQUFPc0QsWUFBUDtBQURBO0FBSGtDLFNBQTlCLENBQWQ7O0FBUUEsYUFBS2xHLElBQUwsQ0FBVXdSLGFBQVYsQ0FBd0JoUixLQUF4QjtBQUNEO0FBekJIO0FBQUE7QUFBQSwrQkEyQldMLElBM0JYLEVBMkJpQjtBQUNiLHFDQUFJLEtBQUsyZCxPQUFULEdBQWtCclosT0FBbEIsQ0FBMEIsVUFBQ3pFLElBQUQsRUFBVTtBQUNsQyxjQUFHRyxTQUFTSCxLQUFLa0csWUFBTCxRQUFaLEVBQXVDO0FBQ3JDbEcsaUJBQUs4SyxZQUFMLGdCQUFpQyxJQUFqQztBQUNBOUssaUJBQUs2QyxPQUFMLE9BQW1CaUksWUFBbkIsZ0JBQStDLElBQS9DO0FBQ0QsV0FIRCxNQUdPO0FBQ0w5SyxpQkFBS3FPLGVBQUw7QUFDQXJPLGlCQUFLNkMsT0FBTCxPQUFtQndMLGVBQW5CO0FBQ0Q7QUFDRixTQVJEO0FBU0Q7QUFyQ0g7O0FBQUE7QUFBQTtBQXVDRCxDQXhDRCIsImZpbGUiOiJ0aGVhdHJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gY2xhc3MgVG9nZ2xlQnRuICB7XG4vLyAgIGNvbnN0cnVjdG9yKGl0ZW0pIHtcbi8vICAgICB0aGlzLml0ZW0gPSBpdGVtO1xuLy8gICAgIC8vIHRoaXMudHlwZSA9IHRoaXMuaXRlbS5kYXRhc2V0LmZpbHRlckl0ZW07XG4vLyAgICAgdGhpcy5saXN0ID0gdGhpcy5pdGVtLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRvZ2dsZS1saXN0XWApO1xuLy8gICAgIHRoaXMuYnV0dG9uID0gdGhpcy5pdGVtLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRvZ2dsZS1idG5dYCk7XG4vLyAgICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuLy8gICAgICAgdGhpcy5kcm9wKCk7XG4vLyAgICAgfSk7XG4vLyAgIH1cblxuLy8gICBkcm9wKCl7XG4vLyAgICAgaWYgKHRoaXMuaXRlbS5oYXNBdHRyaWJ1dGUoYGRhdGEtYWN0aXZlYCkpe1xuLy8gICAgICAgdGhpcy5pdGVtLnJlbW92ZUF0dHJpYnV0ZShgZGF0YS1hY3RpdmVgKTtcbi8vICAgICAgIHRoaXMubGlzdC5zdHlsZSA9IGBgO1xuLy8gICAgIH0gZWxzZSB7XG5cbi8vICAgICAgIGNvbnN0IGhlaWdodFRvUGFnZUJvdHRvbSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMuYnV0dG9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHRoaXMuYnV0dG9uLm9mZnNldEhlaWdodDtcbi8vICAgICAgIGlmIChoZWlnaHRUb1BhZ2VCb3R0b20gPCBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmxpc3QpLm1heEhlaWdodCkpIHtcbi8vICAgICAgICAgdGhpcy5saXN0LnN0eWxlLm1heEhlaWdodCA9IGAke2hlaWdodFRvUGFnZUJvdHRvbX1weGA7XG4vLyAgICAgICB9XG4vLyAgICAgICB0aGlzLml0ZW0uc2V0QXR0cmlidXRlKGBkYXRhLWFjdGl2ZWAsIHRydWUpO1xuXG4vLyAgICAgfVxuLy8gICB9XG4vLyB9XG5cbi8vIFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS10b2dnbGUtaXRlbV1gKV0ubWFwKChpdGVtKSA9PiB7XG4vLyAgIGlmICghaXRlbSB8fCB3aW5kb3cuaW5uZXJXaWR0aCA+PSA3NjgpIHJldHVybiBmYWxzZTtcbi8vICAgICByZXR1cm4gbmV3IFRvZ2dsZUJ0bihpdGVtKTtcbi8vIH0pO1xuXG5cbiIsIihmdW5jdGlvbigpIHtcbiAgY29uc3QgZ2V0Q3VycmVudERhdGUgPSAodmFsdWUpID0+IHtcbiAgICBsZXQgZGF0ZTtcblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgZGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGZ1bGxEYXRlOiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpLFxuICAgICAgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgbW9udGg6IGRhdGUuZ2V0TW9udGgoKSxcbiAgICAgIGRhdGU6IGRhdGUuZ2V0RGF0ZSgpXG4gICAgfVxuICB9O1xuXG4gIC8vIGNvbnN0IGNoZWNrU2Vzc2lvblN0b3JhZ2UgPSAoKSA9PiB7XG4gIC8vICAgdHJ5IHtcbiAgLy8gICAgIHJldHVybiBgc2Vzc2lvblN0b3JhZ2VgIGluIHdpbmRvdyAmJiB3aW5kb3dbYHNlc3Npb25TdG9yYWdlYF0gIT09IG51bGw7XG4gIC8vICAgfSBjYXRjaCAoZSkge1xuICAvLyAgICAgcmV0dXJuIGZhbHNlO1xuICAvLyAgIH1cbiAgLy8gfTtcblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWNhbGVuZGFyXVwiKSkge1xuXG4gICAgd2luZG93LkNhbGVuZGFyID0gY2xhc3MgIHtcbiAgICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgICAgICB0aGlzLml0ZW0gPSBwYXJhbXMuaXRlbTtcbiAgICAgICAgdGhpcy5wYXJlbnRVUkwgPSBwYXJhbXMudXJsTmFtZTtcblxuICAgICAgICB0aGlzLnR5cGUgPSBgYDtcblxuICAgICAgICB0aGlzLm1pbkRhdGUgPSBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCksIG5ldyBEYXRlKCkuZ2V0TW9udGgoKSwgbmV3IERhdGUoKS5nZXREYXRlKCkpO1xuICAgICAgICB0aGlzLm1heERhdGUgPSBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCksIDExLCAxKTtcblxuICAgICAgICB0aGlzLnNlYXJjaCA9IGBgO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyID0ge1xuICAgICAgICAgIGV2ZW50OiBgYCxcbiAgICAgICAgICB0aW1lOiBgYCxcbiAgICAgICAgICBzY2VuZTogYGAsXG4gICAgICAgICAgZGF0ZXJhbmdlOiBgYCxcbiAgICAgICAgICBkYXRlOiB7XG4gICAgICAgICAgICBmdWxsRGF0ZTogXCJcIixcbiAgICAgICAgICAgIHllYXI6IFwiXCIsXG4gICAgICAgICAgICBtb250aDogXCJcIixcbiAgICAgICAgICAgIGRhdGU6IFwiXCJcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zZXJ2ZXJEYXRhID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZXJ2ZXJEYXRhRmlsdGVyZWQgPSBudWxsO1xuICAgICAgICB0aGlzLmRhdGVSYW5nZUlubmVyVmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLmhvdmVyZWRPYmplY3QgPSB7XG4gICAgICAgICAgdGl0bGU6IG51bGwsXG4gICAgICAgICAgaW1nVVJMOiBudWxsLFxuICAgICAgICAgIGVsZW1lbnRzOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSB7XG4gICAgICAgICAgY2xlYXJBbGxGaWx0ZXJzQnRuOiB0aGlzLml0ZW0ucXVlcnlTZWxlY3RvcihgW2RhdGEtcmVzZXQtYWxsLWZpbHRlcnNdYCksXG4gICAgICAgICAgY2FsZW5kYXJUeXBlTGlzdExpbms6IHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jYWxlbmRhci10eXBlLWxpbmstbGlzdF1gKSxcbiAgICAgICAgICBldmVudHM6IHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtY2FsZW5kYXItZXZlbnRzXVwiKSxcbiAgICAgICAgICB0eXBlOiBuZXcgQ2FsZW5kYXJUeXBlVG9nZ2xlKHtcbiAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jYWxlbmRhci10eXBlXWApXG4gICAgICAgICAgfSksXG4gICAgICAgICAgbW9udGhUb2dnbGVyOiBuZXcgQ2FsZW5kYXJNb250aFRvZ2dsZSh7XG4gICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW0ucXVlcnlTZWxlY3RvcihgW2RhdGEtY2FsZW5kYXItbW9udGgtY2hhbmdlXWApXG4gICAgICAgICAgfSksXG4gICAgICAgICAgc2VhcmNoOiBuZXcgQ2FsZW5kYXJTZWFyY2godGhpcy5pdGVtLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWV2ZW50LXNlYXJjaF1gKSksXG4gICAgICAgICAgZmlsdGVyczoge1xuICAgICAgICAgICAgZXZlbnQ6IG5ldyBGaWx0ZXJWYWx1ZSh0aGlzLml0ZW0ucXVlcnlTZWxlY3RvcihgW2RhdGEtZmlsdGVyLWl0ZW09J2V2ZW50J11gKSksXG4gICAgICAgICAgICB0aW1lOiBuZXcgRmlsdGVyVmFsdWUodGhpcy5pdGVtLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWZpbHRlci1pdGVtPSd0aW1lJ11gKSksXG4gICAgICAgICAgICBzY2VuZTogbmV3IEZpbHRlclZhbHVlKHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1maWx0ZXItaXRlbT0nc2NlbmUnXWApKSxcbiAgICAgICAgICAgIGRhdGVyYW5nZTogbmV3IEZpbHRlclJhbmdlKHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1maWx0ZXItaXRlbT0nZGF0ZXJhbmdlJ11gKSksXG4gICAgICAgICAgICBkYXRlOiBuZXcgRmlsdGVyVmFsdWUodGhpcy5pdGVtLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWZpbHRlci1pdGVtPSdkYXRlJ11gKSlcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5DT05TVEFOVCA9IHdpbmRvdy5DT05TVEFOVDtcblxuICAgICAgICB0aGlzLml0ZW0uYWRkRXZlbnRMaXN0ZW5lcihgZmlsdGVyQ2hhbmdlZGAsIChlKSA9PiB7XG4gICAgICAgICAgY29uc3QgZXZlbnROYW1lID0gZS5kZXRhaWwudHlwZSxcbiAgICAgICAgICAgICAgICBldmVudFZhbHVlID0gZS5kZXRhaWwudmFsdWU7XG5cbiAgICAgICAgICBpZiAoZXZlbnRWYWx1ZSA9PT0gYGApIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyW2V2ZW50TmFtZV0gPSBgYDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGV2ZW50TmFtZSA9PT0gYGRhdGVgKSB7XG4gICAgICAgICAgICAgIGxldCBwYXJzZUhyZWZBcnIgPSBldmVudFZhbHVlLnNwbGl0KGAmYCksXG4gICAgICAgICAgICAgICAgICB5ZWFyID0gcGFyc2VIcmVmQXJyWzBdLnNwbGl0KGA9YClbMV0sXG4gICAgICAgICAgICAgICAgICBtb250aCA9IHBhcnNlSHJlZkFyclsxXS5zcGxpdChgPWApWzFdLFxuICAgICAgICAgICAgICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKCkgPiBuZXcgRGF0ZSh5ZWFyLCBtb250aCkgPyBuZXdEYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIG5ldyBEYXRlKCkuZ2V0RGF0ZSgpKSA6IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAxKTtcbiAgICAgICAgICAgICAgdGhpcy5maWx0ZXIuZGF0ZSA9IGdldEN1cnJlbnREYXRlKG5ld0RhdGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudE5hbWUgPT0gYGRhdGVyYW5nZWApIHtcbiAgICAgICAgICAgICAgdGhpcy5maWx0ZXIuZGF0ZXJhbmdlID0gZXZlbnRWYWx1ZS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7bmV3IERhdGUoaXRlbSkuZ2V0TW9udGgoKX0uJHtuZXcgRGF0ZShpdGVtKS5nZXREYXRlKCl9LiR7bmV3IERhdGUoaXRlbSkuZ2V0RnVsbFllYXIoKX1gXG4gICAgICAgICAgICAgIH0pLmpvaW4oXCIsXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5maWx0ZXJbZXZlbnROYW1lXSA9IGV2ZW50VmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5yb3V0ZXIodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaXRlbS5hZGRFdmVudExpc3RlbmVyKGBzZWFyY2hDaGFuZ2VkYCwgKGUpID0+IHtcbiAgICAgICAgICB0aGlzLnNlYXJjaCA9IGUuZGV0YWlsLnZhbHVlO1xuXG4gICAgICAgICAgdGhpcy5yb3V0ZXIodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaXRlbS5hZGRFdmVudExpc3RlbmVyKGBtb250aFRvZ2dsZWAsIChlKSA9PiB7XG4gICAgICAgICAgbGV0IHllYXIgPSB0aGlzLmZpbHRlci5kYXRlLnllYXIsXG4gICAgICAgICAgICAgIG1vbnRoID0gdGhpcy5maWx0ZXIuZGF0ZS5tb250aCxcbiAgICAgICAgICAgICAgZGF0ZSA9IHRoaXMuZmlsdGVyLmRhdGUuZGF0ZSxcbiAgICAgICAgICAgICAgbmV3RGF0ZTtcblxuICAgICAgICAgIGlmIChlLmRldGFpbC5tb250aCA+IDApIHtcbiAgICAgICAgICAgIG1vbnRoKys7XG4gICAgICAgICAgICBkYXRlID0gMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9udGgtLTtcblxuICAgICAgICAgICAgaWYgKG1vbnRoID09IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSkge1xuICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKS5nZXREYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXRlKTtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyLmRhdGUgPSB7XG4gICAgICAgICAgICBmdWxsRGF0ZTogbmV3RGF0ZSxcbiAgICAgICAgICAgIHllYXI6IG5ld0RhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgIG1vbnRoOiBuZXdEYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICBkYXRlOiBuZXdEYXRlLmdldERhdGUoKVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB0aGlzLnJvdXRlcih0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pdGVtLmFkZEV2ZW50TGlzdGVuZXIoYHR5cGVUb2dnbGVgLCAoZSkgPT4ge1xuICAgICAgICAgIGlmIChlLmRldGFpbC50eXBlID09PSB0aGlzLnR5cGUpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgIHRoaXMudHlwZSA9IGUuZGV0YWlsLnR5cGU7XG5cbiAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBcIiMvY2FsZW5kYXJcIikge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIuZGF0ZXJhbmdlID0gYGA7XG4gICAgICAgICAgICB0aGlzLmZpbHRlci5kYXRlID0gZ2V0Q3VycmVudERhdGUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIuZGF0ZSA9IGBgO1xuICAgICAgICAgICAgLy8gU2V0IGRlZmF1bHQgZGV0YXJhbmdlIHZhbHVlIHdoZW4gY2hhbmdlIHR5cGVcbiAgICAgICAgICAgIC8vIHRoaXMuZmlsdGVyLmRhdGVyYW5nZSA9IHRoaXMuZ2V0Q3VycmVudERhdGVyYW5nZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuZWxlbWVudHMudHlwZS5zZXRFdmVudCh0aGlzLnR5cGUpO1xuICAgICAgICAgIHRoaXMucm91dGVyKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRzLmNsZWFyQWxsRmlsdGVyc0J0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsICgpID0+IHtcbiAgICAgICAgICB0aGlzLmZpbHRlciA9IHtcbiAgICAgICAgICAgIGV2ZW50OiBgYCxcbiAgICAgICAgICAgIHRpbWU6IGBgLFxuICAgICAgICAgICAgc2NlbmU6IGBgLFxuICAgICAgICAgICAgZGF0ZXJhbmdlOiBgYCxcbiAgICAgICAgICAgIGRhdGU6IHtcbiAgICAgICAgICAgICAgZnVsbERhdGU6IFwiXCIsXG4gICAgICAgICAgICAgIHllYXI6IFwiXCIsXG4gICAgICAgICAgICAgIG1vbnRoOiBcIlwiLFxuICAgICAgICAgICAgICBkYXRlOiBcIlwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHRoaXMuY2hhbmdlSGFzaCgpO1xuICAgICAgICB9KVxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGBtb3VzZW92ZXJgLCAoZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNhbGVuZGFyRXZlbnQgPSBlLnRhcmdldC5jbG9zZXN0KGBbZGF0YS1jYWxlbmRhci1ldmVudF1gKSxcbiAgICAgICAgICAgICAgICB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoID4gNzY3O1xuXG4gICAgICAgICAgaWYgKCF3aW5kb3dXaWR0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgaWYgKGNhbGVuZGFyRXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaG92ZXJPbkV2ZW50KGNhbGVuZGFyRXZlbnQpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaG92ZXJPbkV2ZW50KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgaGFzaGNoYW5nZWAsIChlKSA9PiB7XG4gICAgICAgICAgdGhpcy5yb3V0ZXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoYHJlc2l6ZWAsIChlKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRDYWxlbmRhck9uTW9iaWxlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2V0TWluTWF4RGF0ZVZhbHVlKCk7XG4gICAgICAgIHRoaXMucm91dGVyKCk7XG4gICAgICAgIHRoaXMuc2V0Q2FsZW5kYXJPbk1vYmlsZSgpO1xuICAgICAgfVxuXG4gICAgICBzZXRDYWxlbmRhck9uTW9iaWxlKCkge1xuICAgICAgICBsZXQgbGluayA9IHRoaXMuZWxlbWVudHMuY2FsZW5kYXJUeXBlTGlzdExpbms7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4ICYmICFsaW5rLmhhc0F0dHJpYnV0ZShgZGF0YS1hY3RpdmVgKSkge1xuICAgICAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByb3V0ZXIoZmxhZykge1xuICAgICAgICBpZiAoIWZsYWcpIHtcbiAgICAgICAgICB0aGlzLmRlY29kZUhhc2god2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRGaWx0ZXJzKCk7XG4gICAgICAgIHRoaXMuZ2V0RGF0YSgpO1xuICAgICAgICB0aGlzLmNoYW5nZUhhc2goKTtcbiAgICAgIH07XG5cbiAgICAgIGNoYW5nZUhhc2goKSB7XG4gICAgICAgIGNvbnN0IGhhc2hBcnIgPSBbXSxcbiAgICAgICAgICAgICAgdHlwZSA9IHRoaXMudHlwZTtcblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmZpbHRlcikge1xuICAgICAgICAgIGlmICh0aGlzLmZpbHRlcltrZXldICE9IGBgKSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09IGBkYXRlYCkge1xuICAgICAgICAgICAgICBoYXNoQXJyLnB1c2goYHllYXI9JHt0aGlzLmZpbHRlci5kYXRlLnllYXJ9YCk7XG4gICAgICAgICAgICAgIGhhc2hBcnIucHVzaChgbW9udGg9JHt0aGlzLmZpbHRlci5kYXRlLm1vbnRofWApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT0gYGRhdGVyYW5nZWApIHtcbiAgICAgICAgICAgICAgaGFzaEFyci5wdXNoKGBkYXRlcmFuZ2U9JHt0aGlzLmZpbHRlci5kYXRlcmFuZ2V9YCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBoYXNoQXJyLnB1c2goYCR7dGhpcy5maWx0ZXJba2V5XX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGAke3R5cGV9PyR7aGFzaEFyci5qb2luKFwiJlwiKX1gO1xuICAgICAgfTtcblxuICAgICAgZGVjb2RlSGFzaChoYXNoKSB7XG4gICAgICAgIGxldCBwYXJzZVR5cGUsXG4gICAgICAgICAgICBwYXJzZVllYXIsXG4gICAgICAgICAgICBwYXJzZU1vbnRoLFxuICAgICAgICAgICAgcGFyc2VEYXRlID0gbnVsbCxcbiAgICAgICAgICAgIHBhcnNlRXZlbnQsXG4gICAgICAgICAgICBwYXJzZVRpbWUsXG4gICAgICAgICAgICBwYXJzZVNjZW5lLFxuICAgICAgICAgICAgcGFyc2VEYXRlcmFuZ2U7XG5cbiAgICAgICAgaWYgKGhhc2gpIHtcbiAgICAgICAgICBsZXQgcGFyc2VIYXNoU3BsaXRBcnIgPSBoYXNoLnNwbGl0KFwiP1wiKSxcbiAgICAgICAgICAgICAgcGFyc2VGaWx0ZXJTcGxpdEFyciA9IHBhcnNlSGFzaFNwbGl0QXJyWzFdLnNwbGl0KFwiJlwiKTtcblxuICAgICAgICAgIHBhcnNlVHlwZSA9IHBhcnNlSGFzaFNwbGl0QXJyWzBdO1xuXG4gICAgICAgICAgLy8g0J/RgNC+0YXQvtC00LjQvCDQv9C+INC80LDRgdGB0LjQstGDINC4INC30LDQv9C+0LvQvdGP0LXQvCDQvdC1INC00L7RgdGC0LDRjtGJ0LjQtSDQt9C90LDRh9C10L3QuNGPXG4gICAgICAgICAgcGFyc2VGaWx0ZXJTcGxpdEFyci5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5pbmRleE9mKGB5ZWFyYCkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgcGFyc2VZZWFyID0gaXRlbS5zcGxpdChgPWApWzFdO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLmluZGV4T2YoYG1vbnRoYCkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgcGFyc2VNb250aCA9IGl0ZW0uc3BsaXQoYD1gKVsxXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5pbmRleE9mKGBldmVudGApICE9IC0xKSB7XG4gICAgICAgICAgICAgIHBhcnNlRXZlbnQgPSBpdGVtO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLmluZGV4T2YoYHRpbWVgKSAhPSAtMSkge1xuICAgICAgICAgICAgICBwYXJzZVRpbWUgPSBpdGVtO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLmluZGV4T2YoYHNjZW5lYCkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgcGFyc2VTY2VuZSA9IGl0ZW07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uaW5kZXhPZihgZGF0ZXJhbmdlYCkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgcGFyc2VEYXRlcmFuZ2UgPSBpdGVtLnNwbGl0KGA9YClbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFyc2VUeXBlID0gYCMvY2FsZW5kYXJgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlVHlwZSA9PSBgIy9jYWxlbmRhcmApIHtcbiAgICAgICAgICBpZiAocGFyc2VZZWFyID4gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpIHx8IHBhcnNlTW9udGggPiBuZXcgRGF0ZSgpLmdldE1vbnRoKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLmRhdGUgPSBnZXRDdXJyZW50RGF0ZShuZXcgRGF0ZShwYXJzZVllYXIsIHBhcnNlTW9udGgsIDEpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIuZGF0ZSA9IGdldEN1cnJlbnREYXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcnNlRGF0ZXJhbmdlID0gYGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5maWx0ZXIuZGF0ZSA9IGBgO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50eXBlID0gcGFyc2VUeXBlIHx8IGBgO1xuICAgICAgICB0aGlzLmZpbHRlci5ldmVudCA9IHBhcnNlRXZlbnQgfHwgYGA7XG4gICAgICAgIHRoaXMuZmlsdGVyLnRpbWUgPSBwYXJzZVRpbWUgfHwgYGA7XG4gICAgICAgIHRoaXMuZmlsdGVyLnNjZW5lID0gcGFyc2VTY2VuZSB8fCBgYDtcbiAgICAgICAgdGhpcy5maWx0ZXIuZGF0ZXJhbmdlID0gcGFyc2VEYXRlcmFuZ2UgfHwgYGA7XG4gICAgICB9O1xuXG4gICAgICBzZXRGaWx0ZXJzKCkge1xuICAgICAgICBsZXQgY2FsZW5kYXJUeXBlID0gdGhpcy50eXBlID09IGAjL2NhbGVuZGFyYCA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgIHNlYXJjaFR5cGUgPSB0aGlzLnR5cGUgPT0gYCMvc2VhcmNoYCA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgIGV2ZW50VHlwZSA9IHRoaXMudHlwZSA9PSBgIy9ldmVudHNgID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIC8vINCj0YHRgtCw0L3QvtCy0LrQsCDRhNC40LvRjNGC0YDQsCDRgdC80LXQvdGLINGC0LjQv9CwINC60LDQu9C10L3QtNCw0YDRjC/RgdC/0LjRgdC+0LpcbiAgICAgICAgdGhpcy5lbGVtZW50cy50eXBlLnNldEV2ZW50KHRoaXMudHlwZSk7XG5cbiAgICAgICAgLy8g0KPRgdGC0LDQvdC+0LLQutCwINGE0LjQu9GM0YLRgNCwINGB0LzQtdC90Ysg0L/QtdGA0LXQutC70Y7Rh9C10L3QuNGPINC80LXRgdGP0YbQsFxuICAgICAgICBpZiAodGhpcy5lbGVtZW50cy5tb250aFRvZ2dsZXIpIHtcbiAgICAgICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgICAgICB0ZXh0OiBgYCxcbiAgICAgICAgICAgIGVsZW1lbnRWaXNpYmxlOiBjYWxlbmRhclR5cGUsXG4gICAgICAgICAgICBwcmV2QnRuRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgbmV4dEJ0bkRpc2FibGVkOiBmYWxzZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoY2FsZW5kYXJUeXBlKSB7XG4gICAgICAgICAgICBvYmoudGV4dCA9IHRoaXMuQ09OU1RBTlQuTU9OVEhbdGhpcy5maWx0ZXIuZGF0ZS5tb250aF1bdGhpcy5DT05TVEFOVC5MQU5HXTtcbiAgICAgICAgICAgIG9iai5wcmV2QnRuRGlzYWJsZWQgPSArdGhpcy5taW5EYXRlID09ICt0aGlzLmZpbHRlci5kYXRlLmZ1bGxEYXRlO1xuICAgICAgICAgICAgb2JqLm5leHRCdG5EaXNhYmxlZCA9ICt0aGlzLm1heERhdGUgPT0gK3RoaXMuZmlsdGVyLmRhdGUuZnVsbERhdGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5lbGVtZW50cy5tb250aFRvZ2dsZXIuc2V0TW9udGgob2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINCj0YHRgtCw0L3QvtCy0LrQsCDRhNC40LvRjNGC0YDQsCDRgdC+0LHRi9GC0LjRj1xuICAgICAgICB0aGlzLmVsZW1lbnRzLmZpbHRlcnMuZXZlbnQuc2V0RmlsdGVyKHtcbiAgICAgICAgICB2YWx1ZTogdGhpcy5maWx0ZXIuZXZlbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8g0KPRgdGC0LDQvdC+0LLQutCwINGE0LjQu9GM0YLRgNCwINCy0YDQtdC80LXQvdC4XG4gICAgICAgIHRoaXMuZWxlbWVudHMuZmlsdGVycy50aW1lLnNldEZpbHRlcih7XG4gICAgICAgICAgdmFsdWU6IHRoaXMuZmlsdGVyLnRpbWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8g0KPRgdGC0LDQvdC+0LLQutCwINGE0LjQu9GM0YLRgNCwINGB0YbQtdC90YtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5maWx0ZXJzLnNjZW5lLnNldEZpbHRlcih7XG4gICAgICAgICAgdmFsdWU6IHRoaXMuZmlsdGVyLnNjZW5lXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vINCj0YHRgtCw0L3QvtCy0LrQsCDRhNC40LvRjNGC0YDQsCBkYXRlcmFuZ2VcbiAgICAgICAgaWYgKGV2ZW50VHlwZSB8fCBzZWFyY2hUeXBlKSB7XG4gICAgICAgICAgbGV0IGRhdGVBcnIgPSBbXTtcblxuICAgICAgICAgIGlmICh0aGlzLmZpbHRlci5kYXRlcmFuZ2UpIHtcbiAgICAgICAgICAgIGRhdGVBcnIgPSB0aGlzLmZpbHRlci5kYXRlcmFuZ2Uuc3BsaXQoYCxgKS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaXRlbUFyciA9IGl0ZW0uc3BsaXQoYC5gKSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbURhdGUgPSAraXRlbUFyclsxXSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbU1vbnRoID0gK2l0ZW1BcnJbMF0sXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1ZZWFyID0gK2l0ZW1BcnJbMl07XG5cbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGl0ZW1ZZWFyLCBpdGVtTW9udGgsIGl0ZW1EYXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuZWxlbWVudHMuZmlsdGVycy5kYXRlcmFuZ2Uuc2V0RGF0ZSh7XG4gICAgICAgICAgICB2YWx1ZTogZGF0ZUFycixcbiAgICAgICAgICAgIGhpZGRlbjogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVsZW1lbnRzLmZpbHRlcnMuZGF0ZXJhbmdlLnNldERhdGUoe1xuICAgICAgICAgICAgdmFsdWU6IFtdLFxuICAgICAgICAgICAgaGlkZGVuOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDQo9GB0YLQsNC90L7QstC60LAg0YTQuNC70YzRgtGA0LAg0LzQtdGB0Y/RhtCwXG4gICAgICAgIGlmIChldmVudFR5cGUgfHwgc2VhcmNoVHlwZSkge1xuICAgICAgICAgIHRoaXMuZWxlbWVudHMuZmlsdGVycy5kYXRlLnNldEZpbHRlcih7XG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5maWx0ZXIuZGF0ZSxcbiAgICAgICAgICAgIGhpZGRlbjogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZWxlbWVudHMuZmlsdGVycy5kYXRlLnNldEZpbHRlcih7XG4gICAgICAgICAgICB2YWx1ZTogYHllYXI9JHt0aGlzLmZpbHRlci5kYXRlLnllYXJ9Jm1vbnRoPSR7dGhpcy5maWx0ZXIuZGF0ZS5tb250aH1gLFxuICAgICAgICAgICAgaGlkZGVuOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0KPRgdGC0LDQvdC+0LLQutCwINGE0LjQu9GM0YLRgNCwINC/0L7QuNGB0LrQsFxuICAgICAgICBzZWFyY2hUeXBlID09PSB0cnVlID8gdGhpcy5lbGVtZW50cy5zZWFyY2guc2hvd0VsZW1lbnQodHJ1ZSkgOiB0aGlzLmVsZW1lbnRzLnNlYXJjaC5zaG93RWxlbWVudCgpO1xuICAgICAgfTtcblxuICAgICAgc2V0TWluTWF4RGF0ZVZhbHVlKCkge1xuICAgICAgICBjb25zdCBkYXRlQXJyID0gdGhpcy5lbGVtZW50cy5maWx0ZXJzLmRhdGUubGlzdC5xdWVyeVNlbGVjdG9yQWxsKGBhYCksXG4gICAgICAgICAgICAgIG1pblZhbHVlID0gZGF0ZUFyclswXS5nZXRBdHRyaWJ1dGUoYGhyZWZgKSxcbiAgICAgICAgICAgICAgbWF4VmFsdWUgPSBkYXRlQXJyW2RhdGVBcnIubGVuZ3RoIC0gMV0uZ2V0QXR0cmlidXRlKGBocmVmYCk7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlRGF0ZUZyb21IcmVmID0gKHZhbHVlLCBtaW5WYWx1ZUZsYWcpID0+IHtcbiAgICAgICAgICBjb25zdCBtb250aFllYXJBcnIgPSB2YWx1ZS5zcGxpdChgJmApLFxuICAgICAgICAgICAgICAgIG1vbnRoID0gbW9udGhZZWFyQXJyWzFdLnNwbGl0KGA9YClbMV0sXG4gICAgICAgICAgICAgICAgeWVhciA9IG1vbnRoWWVhckFyclswXS5zcGxpdChgPWApWzFdLFxuICAgICAgICAgICAgICAgIGRhdGUgPSBtaW5WYWx1ZUZsYWcgPT09IHRydWUgPyArbmV3IERhdGUoKS5nZXREYXRlKCkgOiAxO1xuXG4gICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXRlKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm1pbkRhdGUgPSBjcmVhdGVEYXRlRnJvbUhyZWYobWluVmFsdWUsIHRydWUpO1xuICAgICAgICB0aGlzLm1heERhdGUgPSBjcmVhdGVEYXRlRnJvbUhyZWYobWF4VmFsdWUpO1xuICAgICAgfTtcblxuICAgICAgaG92ZXJPbkV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHJlc2V0SG92ZXJlZE9iamVjdCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmhvdmVyZWRPYmplY3QudGl0bGUgPSBudWxsO1xuICAgICAgICAgIHRoaXMuaG92ZXJlZE9iamVjdC5pbWdVUkwgPSBudWxsO1xuICAgICAgICAgIHRoaXMuaG92ZXJlZE9iamVjdC5lbGVtZW50cy5tYXAoKGl0ZW0pID0+IHtcblxuICAgICAgICAgICAgbGV0IHBhcmVudCA9IGl0ZW0uY2xvc2VzdChgW2RhdGEtZXZlbnQtYmddYCk7XG4gICAgICAgICAgICBwYXJlbnQuc3R5bGUgPSBgYDtcbiAgICAgICAgICAgIHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKGBob3ZlcmVkYCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCFldmVudCkge1xuICAgICAgICAgIGlmICh0aGlzLmhvdmVyZWRPYmplY3QudGl0bGUpIHtcbiAgICAgICAgICAgIHJlc2V0SG92ZXJlZE9iamVjdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBldmVudFRpdGxlID0gZXZlbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY2FsZW5kYXItZXZlbnQtbmFtZV1gKS50ZXh0Q29udGVudDtcblxuICAgICAgICAgIGlmICh0aGlzLmhvdmVyZWRPYmplY3QudGl0bGUgPT0gZXZlbnRUaXRsZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIGlmICh0aGlzLmhvdmVyZWRPYmplY3QudGl0bGUpIHJlc2V0SG92ZXJlZE9iamVjdCgpO1xuXG4gICAgICAgICAgdGhpcy5ob3ZlcmVkT2JqZWN0LnRpdGxlID0gZXZlbnRUaXRsZTtcbiAgICAgICAgICB0aGlzLmhvdmVyZWRPYmplY3QuaW1nVVJMID0gdGhpcy5zZXJ2ZXJEYXRhRmlsdGVyZWQuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS50aXRsZSA9PSBldmVudFRpdGxlID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgIH0pWzBdLmltYWdlVXJsO1xuXG4gICAgICAgICAgdGhpcy5ob3ZlcmVkT2JqZWN0LmVsZW1lbnRzID0gWy4uLnRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1jYWxlbmRhci1ldmVudF1gKV0uZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jYWxlbmRhci1ldmVudC1uYW1lXWApLnRleHRDb250ZW50ID09IGV2ZW50VGl0bGUgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLmhvdmVyZWRPYmplY3QuZWxlbWVudHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgbGV0IHBhcmVudCA9IGl0ZW0uY2xvc2VzdChgW2RhdGEtZXZlbnQtYmddYCk7XG4gICAgICAgICAgICBwYXJlbnQuc3R5bGUuY3NzVGV4dCA9IGBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHt0aGlzLmhvdmVyZWRPYmplY3QuaW1nVVJMfSk7IGNvbG9yOiAjZmZmYDtcbiAgICAgICAgICAgIHBhcmVudC5jbGFzc0xpc3QuYWRkKGBob3ZlcmVkYCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgZ2V0RGF0YSgpIHtcbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZ05vdyA9IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgIHllYXJOb3cgPSBkYXRlU3RyaW5nTm93LmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICAgIG1vbnRoTm93UGx1c09uZSA9IGRhdGVTdHJpbmdOb3cuZ2V0TW9udGgoKSArIDEsXG4gICAgICAgICAgICAgIG1vbnRoTm93ID0gbW9udGhOb3dQbHVzT25lIDwgMTAgPyBgMCR7bW9udGhOb3dQbHVzT25lfWAgOiBtb250aE5vd1BsdXNPbmUsXG4gICAgICAgICAgICAgIGRhdGVOb3cgPSBkYXRlU3RyaW5nTm93LmdldERhdGUoKSA8IDEwID8gYDAke2RhdGVTdHJpbmdOb3cuZ2V0RGF0ZSgpfWAgOiBkYXRlU3RyaW5nTm93LmdldERhdGUoKTtcblxuICAgICAgICBjb25zdCBnZXRBSkFYRGF0YSA9ICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gZmV0Y2goYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYXBpL3YxL2NhbGVuZGFyP2Zyb209JHt5ZWFyTm93fS0ke21vbnRoTm93fS0ke2RhdGVOb3d9JnRvPSR7eWVhck5vdyArIDF9LSR7bW9udGhOb3d9LSR7ZGF0ZU5vd31gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IGBHRVRgLFxuICAgICAgICAgICAganNvbjogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEuZGF0YSkge1xuICAgICAgICAgICAgICB0aGlzLnNlcnZlckRhdGEgPSBkYXRhLmRhdGE7XG4gICAgICAgICAgICAgIHJldHVybiBkYXRhLmRhdGE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBkYXRhXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUud2FybihlcnIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHRoaXMuc2VydmVyRGF0YSA/IHJlc29sdmUoUHJvbWlzZS5yZXNvbHZlKHRoaXMuc2VydmVyRGF0YSkpIDogcmVzb2x2ZShnZXRBSkFYRGF0YSgpKSlcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgbGV0IGFjdGl2ZUZpbHRlciA9IHt9LFxuICAgICAgICAgICAgICAgIGNoZWNrU2VhcmNoRmlsdGVyID0gdGhpcy50eXBlID09PSBgIy9zZWFyY2hgO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmZpbHRlcikge1xuICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJba2V5XSA9PSBgYCkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgaWYgKGtleSA9PSBgZGF0ZWApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXIuZGF0ZS55ZWFyKSB7XG4gICAgICAgICAgICAgICAgICBhY3RpdmVGaWx0ZXIueWVhciA9IHRoaXMuZmlsdGVyLmRhdGUueWVhcjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXIuZGF0ZS5tb250aCkge1xuICAgICAgICAgICAgICAgICAgYWN0aXZlRmlsdGVyLm1vbnRoID0gdGhpcy5maWx0ZXIuZGF0ZS5tb250aDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcltrZXldLmluZGV4T2YoYD1gKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIGFjdGl2ZUZpbHRlcltrZXldID0gdGhpcy5maWx0ZXJba2V5XS5zcGxpdChgPWApWzFdO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFjdGl2ZUZpbHRlcltrZXldID0gdGhpcy5maWx0ZXJba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2hlY2tTZWFyY2hGaWx0ZXIpIGFjdGl2ZUZpbHRlci5zZWFyY2ggPSB0aGlzLnNlYXJjaDtcblxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJEYXRhRmlsdGVyZWQgPSBkYXRhLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaXRlbUZvcm1hdERhdGUgPSBuZXcgRGF0ZShpdGVtLmRhdGVUaW1lKTtcblxuICAgICAgICAgICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgICAgICAgICAgeWVhcjogaXRlbUZvcm1hdERhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICBtb250aDogaXRlbUZvcm1hdERhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICBkYXRlOiBpdGVtRm9ybWF0RGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgZnVsbERhdGU6IG5ldyBEYXRlKGl0ZW1Gb3JtYXREYXRlLmdldEZ1bGxZZWFyKCksIGl0ZW1Gb3JtYXREYXRlLmdldE1vbnRoKCksIGl0ZW1Gb3JtYXREYXRlLmdldERhdGUoKSksXG4gICAgICAgICAgICAgICAgZXZlbnQ6IGl0ZW0udHlwZSxcbiAgICAgICAgICAgICAgICBzY2VuZTogaXRlbS5zY2VuZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZShpdGVtLmRhdGVUaW1lKS5nZXRIb3VycygpID4gdGhpcy5DT05TVEFOVC5EQVlfU1BMSVQgPyBgbmlnaHRgIDogYGRheXRpbWVgLFxuICAgICAgICAgICAgICAgIHNlYXJjaDogW2l0ZW0udGl0bGUsIGl0ZW0uYXV0aG9yLCBpdGVtLmFjdG9yc11cbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBhY3RpdmVGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09IGBkYXRlcmFuZ2VgKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgcmFuZ2VBcnIgPSB0aGlzLmZpbHRlci5kYXRlcmFuZ2Uuc3BsaXQoYCxgKSxcbiAgICAgICAgICAgICAgICAgICAgICByYW5nZVNpemUgPSByYW5nZUFyci5sZW5ndGggPiAxID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgIHJhbmdlTWluLFxuICAgICAgICAgICAgICAgICAgICAgIHJhbmdlTWF4O1xuXG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbiBjb252ZXJ0RGF0ZShpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtQXJyID0gaXRlbS5zcGxpdChgLmApLFxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhciA9IGl0ZW1BcnJbMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGl0ZW1BcnJbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlID0gaXRlbUFyclsxXTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGgsIGRhdGUpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZiAocmFuZ2VTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlTWF4ID0gY29udmVydERhdGUocmFuZ2VBcnJbMV0pO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICByYW5nZU1pbiA9IGNvbnZlcnREYXRlKHJhbmdlQXJyWzBdKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmZ1bGxEYXRlIDwgcmFuZ2VNaW4gfHwgb2JqLmZ1bGxEYXRlID4gcmFuZ2VNYXgpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgrb2JqLmZ1bGxEYXRlICE9ICtyYW5nZU1pbikgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBgc2VhcmNoYCkge1xuICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUZpbHRlci5zZWFyY2ggPT09IGBgKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICBpZiAob2JqW2tleV0uam9pbihgIGApLnRvVXBwZXJDYXNlKCkuaW5kZXhPZihhY3RpdmVGaWx0ZXIuc2VhcmNoLnRvVXBwZXJDYXNlKCkpID09PSAtMSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlRmlsdGVyW2tleV0gIT0gb2JqW2tleV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoY2hlY2tTZWFyY2hGaWx0ZXIpIGFjdGl2ZUZpbHRlci5zZWFyY2ggPT09IGBgID8gdGhpcy5lbGVtZW50cy5zZWFyY2guc2V0VGl0bGVSZXN1bHQoKSA6IHRoaXMuZWxlbWVudHMuc2VhcmNoLnNldFRpdGxlUmVzdWx0KHRoaXMuc2VydmVyRGF0YUZpbHRlcmVkLmxlbmd0aCA+IDApO1xuXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUV2ZW50cygpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgICAgICAgICAgIC8vINCn0YLQvi3RgtC+INCy0LXRgNC90YPRgtGMLCDRh9GC0L7QsdGLINC90LUg0LHRi9C70L4g0L7RiNC40LHQutC4XG4gICAgICAgICAgfSlcbiAgICAgIH07XG5cbiAgICAgIGNyZWF0ZUV2ZW50cygpIHtcbiAgICAgICAgdGhpcy50eXBlID09PSBgIy9jYWxlbmRhcmAgPyB0aGlzLmNyZWF0ZUNhbGVuZGFyKCkgOiB0aGlzLmNyZWF0ZUxpc3QoKTtcbiAgICAgIH1cblxuICAgICAgY3JlYXRlQ2FsZW5kYXIoKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkRGF5TnVtYmVyID0gKGRheSkgPT4gZGF5ID09IDAgPyA2IDogZGF5IC0gMTtcblxuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcbiAgICAgICAgICAgICAgdGFibGVUZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksXG4gICAgICAgICAgICAgIHRhYmxlSGVhZGVyVGVtcGxhdGUgPSBgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyX190YWJsZS1yb3cgY2FsZW5kYXJfX3RhYmxlLXRoZWFkXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXJfX3RhYmxlLXRkXCIgZGF0YS1ldmVudC1iZz4ke3RoaXMuQ09OU1RBTlQuREFZW1wiMVwiXVt0aGlzLkNPTlNUQU5ULkxBTkddfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyX190YWJsZS10ZFwiIGRhdGEtZXZlbnQtYmc+JHt0aGlzLkNPTlNUQU5ULkRBWVtcIjJcIl1bdGhpcy5DT05TVEFOVC5MQU5HXX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhcl9fdGFibGUtdGRcIiBkYXRhLWV2ZW50LWJnPiR7dGhpcy5DT05TVEFOVC5EQVlbXCIzXCJdW3RoaXMuQ09OU1RBTlQuTEFOR119PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXJfX3RhYmxlLXRkXCIgZGF0YS1ldmVudC1iZz4ke3RoaXMuQ09OU1RBTlQuREFZW1wiNFwiXVt0aGlzLkNPTlNUQU5ULkxBTkddfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyX190YWJsZS10ZFwiIGRhdGEtZXZlbnQtYmc+JHt0aGlzLkNPTlNUQU5ULkRBWVtcIjVcIl1bdGhpcy5DT05TVEFOVC5MQU5HXX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhcl9fdGFibGUtdGRcIiBkYXRhLWV2ZW50LWJnPiR7dGhpcy5DT05TVEFOVC5EQVlbXCI2XCJdW3RoaXMuQ09OU1RBTlQuTEFOR119PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXJfX3RhYmxlLXRkXCIgZGF0YS1ldmVudC1iZz4ke3RoaXMuQ09OU1RBTlQuREFZW1wiMFwiXVt0aGlzLkNPTlNUQU5ULkxBTkddfTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICBgO1xuXG4gICAgICAgIHRhYmxlVGVtcGxhdGUuY2xhc3NMaXN0LmFkZChcImNhbGVuZGFyX190YWJsZVwiKTtcbiAgICAgICAgdGFibGVUZW1wbGF0ZS5pbm5lckhUTUwgPSB0YWJsZUhlYWRlclRlbXBsYXRlO1xuXG4gICAgICAgIGNvbnN0IGZpcnN0RGF5ID0gbmV3IERhdGUobmV3IERhdGUodGhpcy5maWx0ZXIuZGF0ZS5mdWxsRGF0ZSkuc2V0TW9udGgoK3RoaXMuZmlsdGVyLmRhdGUubW9udGggKyAxLCAwKSksXG4gICAgICAgICAgICAgIGxhc3REYXkgPSBuZXcgRGF0ZShmaXJzdERheSkuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgICBzdGFydERheSA9IHZhbGlkRGF5TnVtYmVyKG5ldyBEYXRlKG5ldyBEYXRlKHRoaXMuZmlsdGVyLmRhdGUuZnVsbERhdGUpLnNldE1vbnRoKHRoaXMuZmlsdGVyLmRhdGUubW9udGgsIDEpKS5nZXREYXkoKSksXG4gICAgICAgICAgICAgIGZpbmlzaERheSA9IHZhbGlkRGF5TnVtYmVyKG5ldyBEYXRlKG5ldyBEYXRlKHRoaXMuZmlsdGVyLmRhdGUuZnVsbERhdGUpLnNldE1vbnRoKCt0aGlzLmZpbHRlci5kYXRlLm1vbnRoICsgMSwgMCkpLmdldERheSgpKSxcbiAgICAgICAgICAgICAgd2Vla0xlbmd0aCA9IE1hdGguY2VpbCgobGFzdERheSArIHN0YXJ0RGF5KSAvIDcpO1xuICAgICAgICBsZXQgZGF0ZU51bWJlciA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWVrTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAvLyBDcmVhdGUgdGFibGUgcm93XG4gICAgICAgICAgY29uc3QgdGFibGVSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHRhYmxlUm93LmNsYXNzTGlzdC5hZGQoXCJjYWxlbmRhcl9fdGFibGUtcm93XCIpO1xuXG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA3OyBqKyspIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0YWJsZSBjZWxsXG4gICAgICAgICAgICBjb25zdCB0YWJsZVRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICAgIHRhYmxlVGQuY2xhc3NMaXN0LmFkZChcImNhbGVuZGFyX190YWJsZS10ZFwiKTtcbiAgICAgICAgICAgICAgICAgIHRhYmxlVGQuc2V0QXR0cmlidXRlKGBkYXRhLWV2ZW50LWJnYCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmIChpID09IDAgJiYgaiA8IHN0YXJ0RGF5IHx8IGkgPT0gd2Vla0xlbmd0aCAtIDEgJiYgaiA+IGZpbmlzaERheSkge1xuICAgICAgICAgICAgICB0YWJsZVRkLmNsYXNzTGlzdC5hZGQoXCJjYWxlbmRhcl9fdGFibGUtdGQtLWVtcHR5XCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGF0ZU51bWJlcisrO1xuICAgICAgICAgICAgICB0YWJsZVRkLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXJfX3RhYmxlLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICR7dGhpcy5zZXJ2ZXJEYXRhRmlsdGVyZWRcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gbmV3IERhdGUoaXRlbS5kYXRlVGltZSkuZ2V0RGF0ZSgpID09IGRhdGVOdW1iZXIpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGl0ZW0pID0+IHRoaXMuY3JlYXRlRXZlbnQoaXRlbSkpXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKFwiXCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGFibGVSb3cuYXBwZW5kQ2hpbGQodGFibGVUZCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGFibGVUZW1wbGF0ZS5hcHBlbmRDaGlsZCh0YWJsZVJvdyk7XG4gICAgICAgIH1cblxuICAgICAgICB0ZW1wbGF0ZS5hcHBlbmRDaGlsZCh0YWJsZVRlbXBsYXRlKTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5ldmVudHMuaW5uZXJIVE1MID0gYGA7XG4gICAgICAgIHRoaXMuZWxlbWVudHMuZXZlbnRzLmFwcGVuZENoaWxkKHRlbXBsYXRlKTtcbiAgICAgIH07XG5cbiAgICAgIGNyZWF0ZUxpc3QoKSB7XG4gICAgICAgIGNvbnN0IHByZXBhcmVkRGF0YUZ1bmMgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcHJlcGFyZWREYXRhID0gW10sXG4gICAgICAgICAgICAgICAgZ2V0RGF0ZVR5cGUgPSAoZGF0ZSkgPT4gbmV3IERhdGUoZGF0ZSk7XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VydmVyRGF0YUZpbHRlcmVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBDaGVjayBvdXIgYXJyIGlmIHdlIGhhdmUgbmVlZCBtb250aD9cbiAgICAgICAgICAgIGxldCBhcnJNb250aE51bWJlciA9IG51bGwsXG4gICAgICAgICAgICAgICAgYXJyRGF5c051bWJlciA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIG1vbnRoXG4gICAgICAgICAgICBwcmVwYXJlZERhdGEuZm9yRWFjaCgoaXRlbSwgcG9zaXRpb24pID0+IHtcbiAgICAgICAgICAgICAgaWYgKGl0ZW0ubW9udGggPT0gZ2V0RGF0ZVR5cGUodGhpcy5zZXJ2ZXJEYXRhRmlsdGVyZWRbaV0uZGF0ZVRpbWUpLmdldE1vbnRoKCkpIHtcbiAgICAgICAgICAgICAgICBhcnJNb250aE51bWJlciA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGFyck1vbnRoTnVtYmVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcHJlcGFyZWREYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgIG1vbnRoOiBnZXREYXRlVHlwZSh0aGlzLnNlcnZlckRhdGFGaWx0ZXJlZFtpXS5kYXRlVGltZSkuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICBkYXlzOiBbXVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBhcnJNb250aE51bWJlciA9IHByZXBhcmVkRGF0YS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcmVwYXJlZERhdGFbYXJyTW9udGhOdW1iZXJdLmRheXMuZm9yRWFjaCgoaXRlbSwgcG9zaXRpb24pID0+IHtcbiAgICAgICAgICAgICAgaWYgKGl0ZW0uZGF0ZSA9PSBnZXREYXRlVHlwZSh0aGlzLnNlcnZlckRhdGFGaWx0ZXJlZFtpXS5kYXRlVGltZSkuZ2V0RGF0ZSgpKSB7XG4gICAgICAgICAgICAgICAgYXJyRGF5c051bWJlciA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGFyckRheXNOdW1iZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICBwcmVwYXJlZERhdGFbYXJyTW9udGhOdW1iZXJdLmRheXMucHVzaCh7XG4gICAgICAgICAgICAgICAgbW9udGg6IGdldERhdGVUeXBlKHRoaXMuc2VydmVyRGF0YUZpbHRlcmVkW2ldLmRhdGVUaW1lKS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIGRhdGU6IGdldERhdGVUeXBlKHRoaXMuc2VydmVyRGF0YUZpbHRlcmVkW2ldLmRhdGVUaW1lKS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgZGF5OiB0aGlzLkNPTlNUQU5ULkRBWVtnZXREYXRlVHlwZSh0aGlzLnNlcnZlckRhdGFGaWx0ZXJlZFtpXS5kYXRlVGltZSkuZ2V0RGF5KCldW3RoaXMuQ09OU1RBTlQuTEFOR10sXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbXVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBhcnJEYXlzTnVtYmVyID0gcHJlcGFyZWREYXRhW2Fyck1vbnRoTnVtYmVyXS5kYXlzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByZXBhcmVkRGF0YVthcnJNb250aE51bWJlcl0uZGF5c1thcnJEYXlzTnVtYmVyXS5ldmVudHMucHVzaCh0aGlzLnNlcnZlckRhdGFGaWx0ZXJlZFtpXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcHJlcGFyZWREYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAvLyAgIHJldHVybiBhLm1vbnRoID4gYi5tb250aCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgIHJldHVybiBwcmVwYXJlZERhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzb3J0RGF0YSA9IHByZXBhcmVkRGF0YUZ1bmMoKSxcbiAgICAgICAgICAgICAgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG4gICAgICAgICAgICAgIGxpc3RUZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKSxcbiAgICAgICAgICAgICAgZ2V0RXZlbnREYXRlID0gKGRhdGUpID0+IGRhdGUgPiA5ID8gZGF0ZSA6IGAwJHtkYXRlfWA7XG5cbiAgICAgICAgbGlzdFRlbXBsYXRlLmNsYXNzTGlzdC5hZGQoXCJjYWxlbmRhci1saXN0XCIpO1xuXG4gICAgICAgIGNvbnN0IGxpc3RJdGVtVGVtcGxhdGUgPSBgXG4gICAgICAgICAgJHtzb3J0RGF0YS5tYXAoKGl0ZW1Nb250aCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGA8bGkgY2xhc3M9XCJjYWxlbmRhci1saXN0X19tb250aFwiPlxuICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJjYWxlbmRhci1saXN0X19kYXlzXCI+XG4gICAgICAgICAgICAgICAgJHtpdGVtTW9udGguZGF5cy5tYXAoKGl0ZW1EYXkpID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBgPGxpIGNsYXNzPVwiY2FsZW5kYXItbGlzdF9fZGF5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FsZW5kYXItbGlzdF9fZGF5LWluZm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbGVuZGFyLWxpc3RfX2RheS1udW1iZXJcIj4ke2dldEV2ZW50RGF0ZShpdGVtRGF5LmRhdGUpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbGVuZGFyLWxpc3RfX2RheS1tb250aFwiPiR7dGhpcy5DT05TVEFOVC5NT05USF9HRU5JVElWRVtpdGVtRGF5Lm1vbnRoXVt0aGlzLkNPTlNUQU5ULkxBTkddfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbGVuZGFyLWxpc3RfX2RheS1uYW1lXCI+JHtpdGVtRGF5LmRheX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiY2FsZW5kYXItbGlzdF9fZXZlbnRzXCIgZGF0YS1ldmVudC1iZz5cbiAgICAgICAgICAgICAgICAgICAgICAke2l0ZW1EYXkuZXZlbnRzLm1hcCgoaXRlbUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNyZWF0ZUV2ZW50KGl0ZW1FdmVudCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPmBcbiAgICAgICAgICAgICAgICAgICAgICB9KS5qb2luKGBgKX1cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgIDwvbGk+YFxuICAgICAgICAgICAgICAgIH0pLmpvaW4oYGApfVxuICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9saT5gXG4gICAgICAgICAgfSkuam9pbihgYCl9XG4gICAgICAgIGAudHJpbSgpO1xuXG4gICAgICAgIGxpc3RUZW1wbGF0ZS5pbm5lckhUTUwgPSBsaXN0SXRlbVRlbXBsYXRlO1xuICAgICAgICB0ZW1wbGF0ZS5hcHBlbmRDaGlsZChsaXN0VGVtcGxhdGUpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLmV2ZW50cy5pbm5lckhUTUwgPSBgYDtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5ldmVudHMuYXBwZW5kQ2hpbGQodGVtcGxhdGUpO1xuICAgICAgfTtcblxuICAgICAgY3JlYXRlRXZlbnQoaXRlbSkge1xuICAgICAgICBsZXQgdGVtcGxhdGU7XG4gICAgICAgIGNvbnN0IGdldEV2ZW50VGltZSA9IChpdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGl0ZW0uZGF0ZVRpbWUpLFxuICAgICAgICAgICAgICAgIGNoZWNrVGltZSA9ICh0aW1lKSA9PiB0aW1lID4gOSA/IHRpbWUgOiBgMCR7dGltZX1gO1xuXG4gICAgICAgICAgcmV0dXJuIGAke2NoZWNrVGltZShkYXRlLmdldEhvdXJzKCkpfToke2NoZWNrVGltZShkYXRlLmdldE1pbnV0ZXMoKSl9YFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGNvbnN0IGdldEV2ZW50VHlwZSA9ICh0eXBlKSA9PiB7XG4gICAgICAgIC8vICAgaWYgKHRoaXMuQ09OU1RBTlQuRVZFTlRfVFlQRVt0eXBlXSkge1xuICAgICAgICAvLyAgICAgcmV0dXJuIHRoaXMuQ09OU1RBTlQuRVZFTlRfVFlQRVt0eXBlXVt0aGlzLkNPTlNUQU5ULkxBTkddXG4gICAgICAgIC8vICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUud2FybihgTm90IHZhbGlkIHR5cGUgJHt0eXBlfWApO1xuICAgICAgICAvLyAgICAgcmV0dXJuIGBFUlJPUmA7XG4gICAgICAgIC8vICAgfVxuICAgICAgICAvLyB9O1xuXG4gICAgICAgIGNvbnN0IGdldEV2ZW50UHJpY2UgPSAoaXRlbSwgcHJpY2UpID0+IHtcbiAgICAgICAgICBpZiAoaXRlbS5wcmljZSA9PT0gdW5kZWZpbmVkICYmIGl0ZW0ucHJpY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGhlIHZhcmlhYmxlIHByaWNlIGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICAgICAgICByZXR1cm4gYEVSUk9SYDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzd2l0Y2ggKHByaWNlKSB7XG4gICAgICAgICAgICBjYXNlIGBtaW5gOlxuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnByaWNlLm1pblxuICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFRoZSB2YXJpYWJsZSBtaW4gZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYEVSUk9SYDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgYG1heGA6XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucHJpY2UubWF4XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGhlIHZhcmlhYmxlIG1heCBkb2VzIG5vdCBleGlzdGApO1xuICAgICAgICAgICAgICAgIHJldHVybiBgRVJST1JgO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBOb3QgdmFsaWQgcHJpY2UgJHtwcmljZX1gKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGBFUlJPUmA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSBgIy9jYWxlbmRhcmApIHtcbiAgICAgICAgICB0ZW1wbGF0ZSA9IGBcbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb2xkPVwiJHshaXRlbS5pc1RpY2tldHNBdmFpbGFibGV9XCIgZGF0YS1vbmxpbmUtY2xvc2U9XCIkeyFpdGVtLmlzU29sZE9ubGluZX1cIiBkYXRhLXRpY2tldHMtbm90LWV4aXN0PVwiJHshaXRlbS5wcmljZS5taW59XCIgY2xhc3M9XCJjYWxlbmRhci10YWJsZS1ldmVudFwiIGRhdGEtY2FsZW5kYXItZXZlbnQ+XG4gICAgICAgICAgICAgIDxhIGhyZWY9XCIke2l0ZW0ucGVyZm9ybWFuY2VVcmx9XCIgY2xhc3M9XCJjYWxlbmRhci10YWJsZS1ldmVudF9fbmFtZVwiIGRhdGEtY2FsZW5kYXItZXZlbnQtbmFtZT4ke2l0ZW0udGl0bGV9PC9hPlxuICAgICAgICAgICAgICA8dGltZSBkYXRldGltZT1cIiR7aXRlbS5kYXRlVGltZX1cIiBjbGFzcz1cImNhbGVuZGFyLXRhYmxlLWV2ZW50X190aW1lXCI+XG4gICAgICAgICAgICAgICAgJHtnZXRFdmVudFRpbWUoaXRlbSl9XG4gICAgICAgICAgICAgIDwvdGltZT5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYWxlbmRhci10YWJsZS1ldmVudF9fdHlwZVwiPiR7aXRlbS50eXBlTmFtZX08L3A+XG4gICAgICAgICAgICAgIDxhIGhyZWY9XCIke2l0ZW0uZXZlbnRVcmx9XCIgY2xhc3M9XCJidG4tYnV5IGNhbGVuZGFyLXRhYmxlLWV2ZW50X19idG5cIj4ke3RoaXMuQ09OU1RBTlQuQlVZX1RJQ0tFVFt0aGlzLkNPTlNUQU5ULkxBTkddfTwvYT5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYWxlbmRhci10YWJsZS1ldmVudF9fc29sZFwiPiR7dGhpcy5DT05TVEFOVC5USUNLRVRTX1NPTERbdGhpcy5DT05TVEFOVC5MQU5HXX08L3A+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FsZW5kYXItdGFibGUtZXZlbnRfX29ubGluZVwiPiR7dGhpcy5DT05TVEFOVC5USUNLRVRTX09OTElORVt0aGlzLkNPTlNUQU5ULkxBTkddfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGVtcGxhdGUgPSBgXG4gICAgICAgICAgICA8ZGl2IGRhdGEtc29sZD1cIiR7IWl0ZW0uaXNUaWNrZXRzQXZhaWxhYmxlfVwiIGRhdGEtb25saW5lLWNsb3NlPVwiJHshaXRlbS5pc1NvbGRPbmxpbmV9XCIgZGF0YS10aWNrZXRzLW5vdC1leGlzdD1cIiR7IWl0ZW0ucHJpY2UubWlufVwiIGNsYXNzPVwiY2FsZW5kYXItbGlzdC1ldmVudFwiIGRhdGEtY2FsZW5kYXItZXZlbnQ+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1saXN0LWV2ZW50X19kZXNjclwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FsZW5kYXItbGlzdC1ldmVudF9fc2NlbmVcIj4ke2l0ZW0uc2NlbmVOYW1lfTwvcD5cbiAgICAgICAgICAgICAgICA8dGltZSBkYXRldGltZT1cIiR7aXRlbS5kYXRlVGltZX1cIiBjbGFzcz1cImNhbGVuZGFyLWxpc3QtZXZlbnRfX3RpbWVcIj5cbiAgICAgICAgICAgICAgICAgICR7Z2V0RXZlbnRUaW1lKGl0ZW0pfVxuICAgICAgICAgICAgICAgIDwvdGltZT5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhbGVuZGFyLWxpc3QtZXZlbnRfX3R5cGVcIj4ke2l0ZW0udHlwZU5hbWV9PC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWxpc3QtZXZlbnRfX2luZm9cIj5cbiAgICAgICAgICAgICAgICAke2l0ZW0uYXV0aG9yICE9IGB1bmRlZmluZWRgID8gYDxwIGNsYXNzPVwiY2FsZW5kYXItbGlzdC1ldmVudF9fYXV0aG9yXCI+JHtpdGVtLmF1dGhvcn08L3A+YCA6IGBgfVxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke2l0ZW0ucGVyZm9ybWFuY2VEYXRlVXJsfVwiIGNsYXNzPVwiY2FsZW5kYXItbGlzdC1ldmVudF9fbmFtZVwiIGRhdGEtY2FsZW5kYXItZXZlbnQtbmFtZT4ke2l0ZW0udGl0bGV9PC9hPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FsZW5kYXItbGlzdC1ldmVudF9fYXJ0aXN0c1wiPlxuICAgICAgICAgICAgICAgICAgJHtpdGVtLmFjdG9ycyAhPSBgdW5kZWZpbmVkYCA/IGAke2l0ZW0uYWN0b3JzLmpvaW4oYCwgYCl9YCA6IGBgfVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteGwtNCBjYWxlbmRhci1saXN0LWV2ZW50X19idXlcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhbGVuZGFyLWxpc3QtZXZlbnRfX3ByaWNlLXJhbmdlXCI+JHt0aGlzLkNPTlNUQU5ULlRJQ0tFVFNbdGhpcy5DT05TVEFOVC5MQU5HXX0gJHt0aGlzLkNPTlNUQU5ULkZST01bdGhpcy5DT05TVEFOVC5MQU5HXX0gJHtnZXRFdmVudFByaWNlKGl0ZW0sICdtaW4nKX0gJHt0aGlzLkNPTlNUQU5ULlRPW3RoaXMuQ09OU1RBTlQuTEFOR119ICR7Z2V0RXZlbnRQcmljZShpdGVtLCAnbWF4Jyl9ICR7dGhpcy5DT05TVEFOVC5VQUhbdGhpcy5DT05TVEFOVC5MQU5HXX08L3A+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7aXRlbS5ldmVudFVybH1cIiBjbGFzcz1cImJ0bi1idXkgY2FsZW5kYXItbGlzdC1ldmVudF9fYnRuXCI+JHt0aGlzLkNPTlNUQU5ULkJVWV9USUNLRVRbdGhpcy5DT05TVEFOVC5MQU5HXX08L2E+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYWxlbmRhci1saXN0LWV2ZW50X19zb2xkXCI+JHt0aGlzLkNPTlNUQU5ULlRJQ0tFVFNfU09MRFt0aGlzLkNPTlNUQU5ULkxBTkddfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhbGVuZGFyLWxpc3QtZXZlbnRfX29ubGluZVwiPiR7dGhpcy5DT05TVEFOVC5USUNLRVRTX09OTElORVt0aGlzLkNPTlNUQU5ULkxBTkddfTwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBgO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgfTtcbiAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgZ2V0Q3VycmVudERhdGVyYW5nZSgpIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBsYXN0RGF0ZSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF0ZSgpO1xuXG4gICAgICAgIHJldHVybiBgJHtkYXRlLmdldE1vbnRoKCl9LiR7ZGF0ZS5nZXREYXRlKCl9LiR7ZGF0ZS5nZXRGdWxsWWVhcigpfSwke2RhdGUuZ2V0TW9udGgoKX0uJHtsYXN0RGF0ZX0uJHtkYXRlLmdldEZ1bGxZZWFyKCl9YDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoYGxvYWRgLCAoKSA9PiB7XG4gICAgICBsZXQgY2FsZW5kYXIgPSBuZXcgQ2FsZW5kYXIoe1xuICAgICAgICBpdGVtOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jYWxlbmRhcl1gKSxcbiAgICAgICAgdXJsTmFtZTogYGNhbGVuZGFyYFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn0pKCk7XG5cbiIsIjsoKCkgPT4ge1xuICBjb25zdCBnZXREYXRlU3ZnQ2FsZW5kYXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBzdmdDYWxlbmRhckFyciA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1zdmctY2FsZW5kYXJdYCldO1xuXG4gICAgaWYgKCFzdmdDYWxlbmRhckFycikgcmV0dXJuIGZhbHNlO1xuXG4gICAgc3ZnQ2FsZW5kYXJBcnIuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG4gICAgICBsZXQgc3ZnV2lkdGggPSAyMCxcbiAgICAgICAgICAgIHN2Z0hlaWdodCA9IDIyLFxuICAgICAgICAgICAgdGV4dEVsZW1lbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoYHRleHRgKTtcbiAgICAgIHRleHRFbGVtZW50LmlubmVySFRNTCA9IG5ldyBEYXRlKCkuZ2V0RGF0ZSgpO1xuXG4gICAgICBjb25zdCB0ZXh0RWxlbWVudFdpZHRoID0gTWF0aC5yb3VuZCh0ZXh0RWxlbWVudC50ZXh0TGVuZ3RoLmJhc2VWYWwudmFsdWUpO1xuXG4gICAgICB0ZXh0RWxlbWVudC5zZXRBdHRyaWJ1dGUoYHhgLCAoc3ZnV2lkdGggLSB0ZXh0RWxlbWVudFdpZHRoKSAvIDIpO1xuICAgICAgdGV4dEVsZW1lbnQuc2V0QXR0cmlidXRlKGB5YCwgc3ZnSGVpZ2h0IC0gMyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXREYXRlU3ZnQ2FsZW5kYXIoKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgcmVzaXplYCwgZ2V0RGF0ZVN2Z0NhbGVuZGFyKTtcbn0pKCk7XG4iLCIoKCkgPT4ge1xuICBjb25zdCBmYXEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1mYXFdYCk7XG5cbiAgaWYgKCFmYXEpIHJldHVybiBmYWxzZTtcblxuICBmYXEuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoYFtkYXRhLWZhcS1idG5dYCk7XG5cbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgcGFyZW50ID0gdGFyZ2V0LmNsb3Nlc3QoYFtkYXRhLWZhcS1pdGVtXWApLFxuICAgICAgICAgIGRlc2NyaXB0aW9uID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWZhcS1kZXNjcmlwdGlvbl1gKSxcbiAgICAgICAgICBkZXNjcmlwdGlvbkhlaWdodCA9IGRlc2NyaXB0aW9uLnNjcm9sbEhlaWdodDtcblxuICAgIGlmICghZGVzY3JpcHRpb24pIHJldHVybiBmYWxzZTtcblxuICAgIGlmIChwYXJlbnQuaGFzQXR0cmlidXRlKGBkYXRhLWFjdGl2ZWApKSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQXR0cmlidXRlKGBkYXRhLWFjdGl2ZWApO1xuICAgICAgZGVzY3JpcHRpb24uc3R5bGUuaGVpZ2h0ID0gYDBgO1xuICAgICAgLy8gZGVzY3JpcHRpb24uc3R5bGUubWFyZ2luVG9wID0gYDBgO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJlbnQuc2V0QXR0cmlidXRlKGBkYXRhLWFjdGl2ZWAsIHRydWUpO1xuICAgICAgZGVzY3JpcHRpb24uc3R5bGUuaGVpZ2h0ID0gYCR7ZGVzY3JpcHRpb25IZWlnaHR9cHhgO1xuICAgICAgLy8gaWYod2luZG93LmlubmVyV2lkdGggPCA3NjgpIGRlc2NyaXB0aW9uLnN0eWxlLm1hcmdpblRvcCA9IGAzMHB4YDtcbiAgICB9XG4gIH0pO1xufSkoKVxuIiwiKCgpID0+IHtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWV2ZW50LXBhcmVudF1gKSkge1xuXG4gICAgY2xhc3MgRmlsdGVyRXZlbnQgIHtcbiAgICAgIGNvbnN0cnVjdG9yKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5pdGVtID0gaXRlbTtcbiAgICAgICAgdGhpcy51bmljRGF0ZUFyciA9IFtdO1xuICAgICAgICB0aGlzLmFjdG9yc0FyciA9IHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1ldmVudC1hcnRpc3RdYCk7XG4gICAgICAgIHRoaXMuZmlsdGVyID0gbmV3IEZpbHRlclZhbHVlKHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1maWx0ZXItaXRlbT1cImRhdGVcIl1gKSk7XG4gICAgICAgIHRoaXMuQ09OU1RBTlQgPSB3aW5kb3cuQ09OU1RBTlQ7XG5cbiAgICAgICAgdGhpcy5nZXRVbmljRGF0ZXMoKTtcbiAgICAgICAgdGhpcy5hZGREYXRlSXRlbXMoKTtcblxuICAgICAgICB0aGlzLml0ZW0uYWRkRXZlbnRMaXN0ZW5lcihgZmlsdGVyQ2hhbmdlZGAsIChlKSA9PiB0aGlzLnNvcnRBcnRpc3RGb3JEYXRlcyhlLmRldGFpbC52YWx1ZSkpO1xuICAgICAgfVxuXG4gICAgICB0cmFuc2Zvcm1EYXRlKG51bWVyaWNEYXRlKSB7XG4gICAgICAgIGNvbnN0IGZ1bGxEYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShudW1lcmljRGF0ZSkpLFxuICAgICAgICAgICAgICBkYXRlRGF5ID0gZnVsbERhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgICBkYXRlTW9udGggPSBmdWxsRGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICBkYXRlWWVhciA9IGZ1bGxEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHJldHVybiBgJHtkYXRlRGF5fSAke3RoaXMuQ09OU1RBTlQuTU9OVEhfR0VOSVRJVkVbZGF0ZU1vbnRoXVt0aGlzLkNPTlNUQU5ULkxBTkddfSAke2RhdGVZZWFyfWA7XG4gICAgICB9XG5cbiAgICAgIGdldFVuaWNEYXRlcygpIHtcbiAgICAgICAgdGhpcy5hY3RvcnNBcnIuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBpdGVtLmdldEF0dHJpYnV0ZShgZGF0YS1kYXRlYCkuc3BsaXQoYCxgKS5mb3JFYWNoKGRhdGUgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudW5pY0RhdGVBcnIuZmluZChpdGVtID0+IGl0ZW0gPT0gZGF0ZSkpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy51bmljRGF0ZUFyci5wdXNoKGRhdGUpO1xuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy51bmljRGF0ZUFyci5zb3J0KChhLCBiKSA9PiArbmV3IERhdGUoYSkgPiArbmV3IERhdGUoYikgPyAxIDogLTEpO1xuICAgICAgfVxuXG4gICAgICAvLyDQpNGD0L3QutGG0LjRjyDQvdCw0L/QvtC70L3QtdC90LjRjyDRgdC/0LjRgdC60LBcbiAgICAgIGFkZERhdGVJdGVtcygpIHtcbiAgICAgICAgdGhpcy5maWx0ZXIubGlzdC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVFbmRcIiwgdGhpcy51bmljRGF0ZUFyci5tYXAoaXRlbSA9PiBgPGxpPjxhIGhyZWY9XCIke2l0ZW19XCI+JHt0aGlzLnRyYW5zZm9ybURhdGUoaXRlbSl9PC9hPjwvbGk+YCkuam9pbihgYCkpO1xuICAgICAgfVxuXG5cbiAgICAgIHNvcnRBcnRpc3RGb3JEYXRlcyhjaG9vc2VkRGF0ZSkge1xuICAgICAgICB0aGlzLmFjdG9yc0Fyci5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaWYoaXRlbS5nZXRBdHRyaWJ1dGUoYGRhdGEtZGF0ZWApLmluZGV4T2YoY2hvb3NlZERhdGUpICE9IC0xKXtcbiAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQXR0cmlidXRlKGBkYXRhLWhpZGRlbmApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZShgZGF0YS1oaWRkZW5gLCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoYGxvYWRgLCAoKSA9PiB7XG4gICAgICBuZXcgRmlsdGVyRXZlbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtZXZlbnQtcGFyZW50XWApKTtcbiAgICB9KTtcbiAgfVxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWZpbHRlci1tZWRpYV1gKSkge1xuXG4gICAgY2xhc3MgRmlsdGVyTWVkaWEgIHtcbiAgICAgIGNvbnN0cnVjdG9yKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5pdGVtID0gaXRlbTtcbiAgICAgICAgdGhpcy5maWx0ZXJzQWN0aXZlID0gW107XG4gICAgICAgIHRoaXMubWVkaWFDb250YWluZXIgPSB0aGlzLml0ZW0ucXVlcnlTZWxlY3RvcihgW2RhdGEtbWVkaWEtY29udGFpbmVyXWApO1xuICAgICAgICB0aGlzLm1vYmlsZSA9IDc2ODtcbiAgICAgICAgdGhpcy5lbG1zUXVhbnRpdHlPblBhZ2UgPSA5O1xuICAgICAgICB0aGlzLmFjdGl2ZVBhZ2UgPSAxO1xuICAgICAgICB0aGlzLnNlcnZlckRhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLnNlcnZlckRhdGFGaWx0ZXJlZCA9IG51bGw7XG4gICAgICAgIHRoaXMucGFnaW5hdGlvbiA9IG5ldyBQYWdpbmF0aW9uRnJvbnRlbmQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtZmlsdGVyLXBhZ2luYXRpb25dYCkpO1xuICAgICAgICB0aGlzLm1lZGlhVHlwZSA9IHRoaXMuaXRlbS5oYXNBdHRyaWJ1dGUoYGRhdGEtbWVkaWEtdmlkZW9gKSA/IGB2aWRlb2AgOiBgcGhvdG9gO1xuXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IFsuLi50aGlzLml0ZW0ucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtZmlsdGVyLWl0ZW1dYCldLm1hcChpdGVtID0+ICBuZXcgRmlsdGVyVmFsdWUoaXRlbSkpO1xuXG4gICAgICAgIHRoaXMuaXRlbS5hZGRFdmVudExpc3RlbmVyKGBmaWx0ZXJDaGFuZ2VkYCwgKGUpID0+IHtcbiAgICAgICAgICBjb25zdCBvYmogPSBlLmRldGFpbCxcbiAgICAgICAgICAgICAgICBpbmRleCA9IHRoaXMuZmlsdGVyc0FjdGl2ZS5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLnR5cGUgPT0gb2JqLnR5cGUpO1xuXG4gICAgICAgICAgaWYoaW5kZXggIT09IC0xKSB0aGlzLmZpbHRlcnNBY3RpdmUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICBpZihvYmoudmFsdWUgIT09IFwiP1wiKSB0aGlzLmZpbHRlcnNBY3RpdmUucHVzaChvYmopO1xuXG4gICAgICAgICAgdGhpcy5nZXREYXRhKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLml0ZW0uYWRkRXZlbnRMaXN0ZW5lcihgY2hhbmdlUGFnZWAsIChlKSA9PiB7XG4gICAgICAgICAgIHRoaXMuYWN0aXZlUGFnZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICB0aGlzLmZpbHRlclNlcnZlckRhdGEoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pdGVtLmFkZEV2ZW50TGlzdGVuZXIoYGZpbHRlckFwcGx5YCwgKGUpID0+IHRoaXMuZ2V0RGF0YSgpKTtcbiAgICAgICAgdGhpcy5nZXREYXRhKCk7XG4gICAgICB9XG5cbiAgICAgIGZpbHRlclNlcnZlckRhdGEoKXtcbiAgICAgICAgdGhpcy5zZXJ2ZXJEYXRhRmlsdGVyZWQgPSB0aGlzLnNlcnZlckRhdGEuc2xpY2UoKHRoaXMuYWN0aXZlUGFnZSAtIDEpICogdGhpcy5lbG1zUXVhbnRpdHlPblBhZ2UgLCAodGhpcy5hY3RpdmVQYWdlICogdGhpcy5lbG1zUXVhbnRpdHlPblBhZ2UpKTtcbiAgICAgICAgdGhpcy5pbnNlcnREYXRhKCk7XG4gICAgICB9XG5cbiAgICAgIGdldERhdGEoZmxhZykge1xuICAgICAgICBpZiAoZmxhZykge1xuICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IHRoaXMubW9iaWxlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VydmVyRGF0YVVybCA9IGBgLFxuICAgICAgICAgICAgdHlwZVVybCA9IGBgO1xuXG4gICAgICAgIGlmICh0aGlzLm1lZGlhVHlwZSA9PSBgdmlkZW9gKSB7XG4gICAgICAgICAgdHlwZVVybCA9IGBtZWRpYV92aWRlb3NgO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWVkaWFUeXBlID09IGBwaG90b2ApIHtcbiAgICAgICAgICB0eXBlVXJsID0gYG1lZGlhX2FsYnVtc2A7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJzQWN0aXZlLmxlbmd0aCkge1xuICAgICAgICAgIHNlcnZlckRhdGFVcmwgKz0gXCI/XCI7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlcnNBY3RpdmUuZm9yRWFjaCgoaXRlbSwgaSwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgIHNlcnZlckRhdGFVcmwgKz0gaXRlbS52YWx1ZS5zbGljZSgxKTtcbiAgICAgICAgICAgIGlmIChpICE9PSBhcnIubGVuZ3RoLTEpIHtcbiAgICAgICAgICAgICAgc2VydmVyRGF0YVVybCArPSBcIiZcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2FwaS92MS8ke3R5cGVVcmx9JHtzZXJ2ZXJEYXRhVXJsfWApO1xuICAgICAgICByZXR1cm4gd2luZG93LmN1c3RvbUFqYXgoe1xuICAgICAgICAgIHVybDogYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYXBpL3YxLyR7dHlwZVVybH0ke3NlcnZlckRhdGFVcmx9YCxcbiAgICAgICAgICBtZXRob2Q6IGBHRVRgLFxuICAgICAgICAgIGpzb246IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICB0aGlzLnNlcnZlckRhdGEgPSBkYXRhLmRhdGE7XG4gICAgICAgICAgdGhpcy5maWx0ZXJTZXJ2ZXJEYXRhKCk7XG4gICAgICAgICAgdGhpcy5wYWdpbmF0aW9uLnNldExlbmd0aChNYXRoLmNlaWwodGhpcy5zZXJ2ZXJEYXRhLmxlbmd0aC90aGlzLmVsbXNRdWFudGl0eU9uUGFnZSkpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VydmVyRGF0YSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyRGF0YTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS53YXJuKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGluc2VydERhdGEoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gYGA7XG4gICAgICAgIHRoaXMuc2VydmVyRGF0YUZpbHRlcmVkLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgbGV0IHRlbXBsYXRlID0gYGA7XG4gICAgICAgICAgaWYgKHRoaXMubWVkaWFUeXBlID09IGB2aWRlb2ApIHtcbiAgICAgICAgICAgIHRlbXBsYXRlID0gYFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTYgY29sLXhsLTRcIj5cbiAgICAgICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cInZpZGVvXCIgZGF0YS12aWRlbz5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke2l0ZW0udXJsfVwiIGNsYXNzPVwidmlkZW9fX2xpbmtcIiBkYXRhLWZhbmN5Ym94PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlkZW9fX2ltZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtpdGVtLmltZyA/IGl0ZW0uaW1nIDogJy8vaW1nLnlvdXR1YmUuY29tL3ZpLycgKyBpdGVtLnlvdXR1YmVpbWcgKyAnLzAuanBnJ31cIiBhbHQ9XCIke2l0ZW0udGl0bGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ2aWRlb19faWNvbi1wbGF5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiNDVcIiBoZWlnaHQ9XCI0NVwiIGZpbGw9XCIjZmZmXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXBsYXlcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpZGVvX19jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJ2aWRlb19fdGl0bGVcIj4ke2l0ZW0udGl0bGV9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInZpZGVvX190eXBlXCI+JHtpdGVtLmNhdH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWVkaWFUeXBlID09IGBwaG90b2ApIHtcbiAgICAgICAgICAgIHRlbXBsYXRlID0gYFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTYgY29sLXhsLTRcIj5cbiAgICAgICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cImFsYnVtXCI+XG4gICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImFsYnVtX19saW5rXCIgaHJlZj1cIiR7aXRlbS51cmx9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJhbGJ1bV9faW1nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke2l0ZW0uaW1nfVwiIGFsdD1cIiR7aXRlbS50aXRsZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPC9maWd1cmU+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbGJ1bV9fY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwiYWxidW1fX3RpdGxlXCI+JHtpdGVtLnRpdGxlfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJhbGJ1bV9fdHlwZVwiPiR7aXRlbS5jYXR9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICAgICAgIDwvZGl2PmA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGVudCArPSB0ZW1wbGF0ZTtcblxuICAgICAgICB9KVxuICAgICAgICB0aGlzLm1lZGlhQ29udGFpbmVyLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoYGxvYWRgLCAoKSA9PiB7XG4gICAgICBuZXcgRmlsdGVyTWVkaWEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtZmlsdGVyLW1lZGlhXWApKTtcbiAgICB9KTtcbiAgfVxufSkoKTtcblxuKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBGaWx0ZXJBcHBseSB7XG4gICAgY29uc3RydWN0b3IoaXRlbSkge1xuICAgICAgdGhpcy5pdGVtID0gaXRlbTtcbiAgICAgIHRoaXMuaXRlbS5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB0aGlzLmJ0bkFwcGx5KCkpXG4gICAgfVxuXG4gICAgYnRuQXBwbHkoKXtcbiAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGBmaWx0ZXJBcHBseWAsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICB0aGlzLml0ZW0uZGlzcGF0Y2hFdmVudChldmVudCk7XG5cbiAgICAgIGNvbnN0IGNsb3NlID0gbmV3IEN1c3RvbUV2ZW50KGBwb3B1cENsb3NlYCwge1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHRoaXMuaXRlbS5kaXNwYXRjaEV2ZW50KGNsb3NlKTtcbiAgICB9XG4gIH1cblxuICBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtZmlsdGVyLWFwcGx5XWApXS5mb3JFYWNoKGl0ZW0gPT4gbmV3IEZpbHRlckFwcGx5KGl0ZW0pKVxuXG59KSgpO1xuXG4iLCJjbGFzcyBGaWx0ZXIgIHtcbiAgY29uc3RydWN0b3IoaXRlbSkge1xuICAgIHRoaXMuaXRlbSA9IGl0ZW07XG4gICAgdGhpcy50eXBlID0gdGhpcy5pdGVtLmRhdGFzZXQuZmlsdGVySXRlbTtcbiAgICB0aGlzLmxpc3QgPSB0aGlzLml0ZW0ucXVlcnlTZWxlY3RvcihgW2RhdGEtZmlsdGVyLWxpc3RdYCk7XG4gICAgdGhpcy5idXR0b24gPSB0aGlzLml0ZW0ucXVlcnlTZWxlY3RvcihgW2RhdGEtZmlsdGVyLW5hbWVdYCk7XG4gICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgdGhpcy5kcm9wKCk7XG4gICAgfSk7XG4gIH1cblxuICBkcm9wKCl7XG4gICAgaWYgKHRoaXMuaXRlbS5oYXNBdHRyaWJ1dGUoYGRhdGEtYWN0aXZlYCkpe1xuICAgICAgdGhpcy5pdGVtLnJlbW92ZUF0dHJpYnV0ZShgZGF0YS1hY3RpdmVgKTtcbiAgICAgIHRoaXMubGlzdC5zdHlsZSA9IGBgO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCl7XG5cbiAgICAgICAgbGV0IGNoaWxkcmVuQXJyID0gWy4uLnRoaXMuaXRlbS5wYXJlbnROb2RlLmNoaWxkcmVuXTtcbiAgICAgICAgY2hpbGRyZW5BcnIuZm9yRWFjaCgoaXRtKSA9PiB7XG4gICAgICAgICAgaWYoaXRtLmhhc0F0dHJpYnV0ZShgZGF0YS1hY3RpdmVgKSkge1xuICAgICAgICAgICBpdG0ucmVtb3ZlQXR0cmlidXRlKGBkYXRhLWFjdGl2ZWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGhlaWdodFRvUGFnZUJvdHRvbSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMuYnV0dG9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHRoaXMuYnV0dG9uLm9mZnNldEhlaWdodDtcbiAgICAgIGlmIChoZWlnaHRUb1BhZ2VCb3R0b20gPCBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmxpc3QpLm1heEhlaWdodCkpIHtcbiAgICAgICAgdGhpcy5saXN0LnN0eWxlLm1heEhlaWdodCA9IGAke2hlaWdodFRvUGFnZUJvdHRvbX1weGA7XG4gICAgICB9XG4gICAgICB0aGlzLml0ZW0uc2V0QXR0cmlidXRlKGBkYXRhLWFjdGl2ZWAsIHRydWUpO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBGaWx0ZXJWYWx1ZSBleHRlbmRzIEZpbHRlciB7XG4gIGNvbnN0cnVjdG9yKGl0ZW0pIHtcbiAgICBzdXBlcihpdGVtKTtcbiAgICB0aGlzLmJ1dHRvblRleHQgPSB0aGlzLmJ1dHRvbi5xdWVyeVNlbGVjdG9yKGBzcGFuYCk7XG4gICAgdGhpcy5saXN0LmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KGBhYCk7XG5cbiAgICAgIGlmICghdGFyZ2V0KSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHRoaXMuY2hhbmdlRmlsdGVyKHRhcmdldCk7XG4gICAgfSk7XG5cbiAgICAvLyB0aGlzLmNsZWFyQWxsRmlsdGVyc0J0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsICgpID0+IHtcbiAgICAvLyAgIHRoaXMuc2V0RmlsdGVyKCk7XG4gICAgLy8gICB0aGlzLmNsZWFyRGF0ZSgpO1xuICAgIC8vIH0pO1xuICB9XG5cbiAgY2hhbmdlRmlsdGVyKHRhcmdldCl7XG4gICAgaWYoIXRhcmdldC5oYXNBdHRyaWJ1dGUoYGRhdGEtYWN0aXZlYCkpIHtcbiAgICAgIFsuLi50aGlzLmxpc3QucXVlcnlTZWxlY3RvckFsbChgYWApXS5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLnJlbW92ZUF0dHJpYnV0ZShgZGF0YS1hY3RpdmVgKSk7XG4gICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKGBkYXRhLWFjdGl2ZWAsIHRydWUpO1xuICAgICAgdGhpcy5idXR0b25UZXh0LmlubmVySFRNTCA9IHRhcmdldC5pbm5lckhUTUw7XG5cbiAgICAgIGxldCB0YXJnZXRWYWx1ZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoYGhyZWZgKTtcblxuICAgICAgaWYgKHRhcmdldFZhbHVlID09PSBgYWxsYCkgdGFyZ2V0VmFsdWUgPSBgYDtcblxuICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoYGZpbHRlckNoYW5nZWRgLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIHR5cGU6IHRoaXMuaXRlbS5kYXRhc2V0LmZpbHRlckl0ZW0sXG4gICAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxuICAgICAgICAgIHZhbHVlOiB0YXJnZXRWYWx1ZVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuaXRlbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLmRyb3AoKTtcbiAgfVxuXG4gIHNldEZpbHRlcihvYmopIHtcbiAgICBsZXQgaXRlbVRleHQ7XG4gICAgaWYgKG9iaikge1xuICAgICAgY29uc3QgdmFsdWUgPSBvYmoudmFsdWUsXG4gICAgICAgICAgICBoaWRkZW4gPSBvYmouaGlkZGVuIHx8IGZhbHNlLFxuICAgICAgICAgICAgbGlzdCA9IFsuLi50aGlzLmxpc3QucXVlcnlTZWxlY3RvckFsbChgYWApXTtcblxuICAgICAgbGlzdC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLnJlbW92ZUF0dHJpYnV0ZShgZGF0YS1hY3RpdmVgKSk7XG5cbiAgICAgIGxldCB2YWx1ZUluQXJyID0gbGlzdC5zb21lKChpdGVtKSA9PiBpdGVtLmdldEF0dHJpYnV0ZShgaHJlZmApID09IHZhbHVlKTtcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZUluQXJyKSB7XG4gICAgICAgIGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGlmIChpdGVtLmdldEF0dHJpYnV0ZShgaHJlZmApID09IHZhbHVlKSB7XG4gICAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZShgZGF0YS1hY3RpdmVgLCB0cnVlKTtcbiAgICAgICAgICAgIGl0ZW1UZXh0ID0gaXRlbS5pbm5lckhUTUw7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gWy4uLnRoaXMubGlzdC5xdWVyeVNlbGVjdG9yQWxsKGBhYCldWzBdO1xuXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGBkYXRhLWFjdGl2ZWAsIHRydWUpO1xuICAgICAgICBpdGVtVGV4dCA9IGVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICAvLyBjb25zb2xlLndhcm4oYNCX0L3QsNGH0LXQvdC40LUgJHt2YWx1ZX0g0L3QtSDQvtC/0YDQtdC00LXQu9C10L3QvmApO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGlkZGVuKSB7XG4gICAgICAgIHRoaXMuaXRlbS5kYXRhc2V0LmhpZGRlbiA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLml0ZW0ucmVtb3ZlQXR0cmlidXRlKGBkYXRhLWhpZGRlbmApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZWxlbWVudCA9IFsuLi50aGlzLmxpc3QucXVlcnlTZWxlY3RvckFsbChgYWApXVswXTtcblxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYGRhdGEtYWN0aXZlYCwgdHJ1ZSk7XG4gICAgICBpdGVtVGV4dCA9IGVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgLy8gY29uc29sZS53YXJuKGDQl9C90LDRh9C10L3QuNC1ICR7dmFsdWV9INC90LUg0L7Qv9GA0LXQtNC10LvQtdC90L5gKTtcbiAgICB9XG4gICAgdGhpcy5idXR0b25UZXh0LmlubmVySFRNTCA9IGl0ZW1UZXh0O1xuICB9XG59XG5cbmNsYXNzIEZpbHRlclJhbmdlIGV4dGVuZHMgRmlsdGVyIHtcbiAgY29uc3RydWN0b3IoaXRlbSwgbGluaykge1xuICAgIHN1cGVyKGl0ZW0pO1xuICAgIHRoaXMuZGF0ZVNwYW4gPSB0aGlzLml0ZW0ucXVlcnlTZWxlY3RvcihgW2RhdGEtZmlsdGVyLW5hbWVdYCk7XG4gICAgdGhpcy5hcHBseSA9IHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1kYXRlcGlja2VyLWFwcGx5XWApO1xuICAgIHRoaXMubGluayA9IGxpbms7XG4gICAgdGhpcy5maWx0ZXJJdGVtID0gJCh0aGlzLml0ZW0ucXVlcnlTZWxlY3RvcihgW2RhdGEtZGF0ZXBpY2tlcl1gKSkuZGF0ZXBpY2tlcih7XG4gICAgICByYW5nZTogdHJ1ZVxuICAgIH0pLmRhdGEoYGRhdGVwaWNrZXJgKTtcblxuICAgIHRoaXMuYXBwbHkuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuXG4gICAgICBpZiAoIXRoaXMubGluaykge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuYXBwbHlEYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgZGF0ZXNBcnJTdHJpbmcgPSB0aGlzLmZpbHRlckl0ZW0uc2VsZWN0ZWREYXRlcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICByZXR1cm4gYCR7bmV3IERhdGUoaXRlbSkuZ2V0TW9udGgoKX0uJHtuZXcgRGF0ZShpdGVtKS5nZXREYXRlKCl9LiR7bmV3IERhdGUoaXRlbSkuZ2V0RnVsbFllYXIoKX1gXG4gICAgICAgIH0pLmpvaW4oXCIsXCIpO1xuXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vY2FsZW5kYXIjL2V2ZW50cz9kYXRlcmFuZ2U9JHtkYXRlc0FyclN0cmluZ31gO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5DT05TVEFOVCA9IHdpbmRvdy5DT05TVEFOVDtcbiAgfVxuXG4gIGFwcGx5RGF0ZShjbGVhcikge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGBmaWx0ZXJDaGFuZ2VkYCwge1xuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICBkZXRhaWw6IHtcbiAgICAgICAgdHlwZTogdGhpcy5pdGVtLmRhdGFzZXQuZmlsdGVySXRlbSxcbiAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxuICAgICAgICB2YWx1ZTogdGhpcy5maWx0ZXJJdGVtLnNlbGVjdGVkRGF0ZXNcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuaXRlbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblxuICAgIGlmICghY2xlYXIpIHRoaXMuZHJvcCgpO1xuXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNhbGVuZGFyXWApICYmICFjbGVhcikgdGhpcy5zZXREYXRlcmFuZ2VIdG1sKHRoaXMuZmlsdGVySXRlbS5zZWxlY3RlZERhdGVzKTtcbiAgfVxuXG4gIHNldERhdGUob2JqKSB7XG4gICAgY29uc3QgdmFsdWUgPSBvYmoudmFsdWUsXG4gICAgICAgICAgaGlkZGVuID0gb2JqLmhpZGRlbiB8fCBmYWxzZTtcblxuICAgIGlmIChoaWRkZW4pIHtcbiAgICAgIHRoaXMuaXRlbS5kYXRhc2V0LmhpZGRlbiA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXRlbS5yZW1vdmVBdHRyaWJ1dGUoYGRhdGEtaGlkZGVuYCk7XG4gICAgICB0aGlzLml0ZW0uc3R5bGUgPSBgYDtcbiAgICB9XG5cbiAgICB0aGlzLmZpbHRlckl0ZW0uc2VsZWN0RGF0ZSh2YWx1ZSk7XG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY2FsZW5kYXJdYCkpe1xuICAgICAgdGhpcy5zZXREYXRlcmFuZ2VIdG1sKHZhbHVlKTtcbiAgICB9O1xuICB9XG5cbiAgc2V0RGF0ZXJhbmdlSHRtbChhcnJEYXRlcykge1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2FsZW5kYXItZGF0ZXJhbmdlYCkpIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jYWxlbmRhci1kYXRlcmFuZ2VgKS5yZW1vdmUoKTtcblxuICAgIGlmIChhcnJEYXRlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGZvcm1hdFZhbHVlID0gKHZhbHVlKSA9PiB2YWx1ZSA+IDkgPyB2YWx1ZSA6IGAwJHt2YWx1ZX1gO1xuXG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApLFxuICAgICAgICAgICAgZGF0ZXJhbmdlVmFsdWUgPSBgXG4gICAgICAgICAgICAgICR7YXJyRGF0ZXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGA8c3BhbiBkYXRhLWRhdGVyYW5nZSBjbGFzcz1cImZpbHRlcl9fbmFtZS1kYXRlcmFuZ2VcIj4ke2Zvcm1hdFZhbHVlKG5ldyBEYXRlKGl0ZW0pLmdldERhdGUoKSl9LiR7Zm9ybWF0VmFsdWUobmV3IERhdGUoaXRlbSkuZ2V0TW9udGgoKSArIDEpfS4ke25ldyBEYXRlKGl0ZW0pLmdldEZ1bGxZZWFyKCl9PC9zcGFuPmBcbiAgICAgICAgICAgICAgfSkuam9pbihcIlwiKX1cbiAgICAgICAgICAgIGAsXG4gICAgICAgICAgICBkYXRlcmFuZ2VJbm5lciA9IGBcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhbGVuZGFyLWRhdGVyYW5nZV9fZGF0ZXNcIj5cbiAgICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxNVwiIGhlaWdodD1cIjE1XCIgZmlsbD1cIiMzMzNcIiBjbGFzcz1cImNhbGVuZGFyLWRhdGVyYW5nZV9faWNvblwiPlxuICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1jYWxlbmRhclwiIC8+XG4gICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICR7ZGF0ZXJhbmdlVmFsdWV9XG4gICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuLW1vcmVcIiBkYXRhLWNhbGVuZGFyLWRhdGVyYW5nZS1yZXNldD4ke3RoaXMuQ09OU1RBTlQuUkVTRVRfREFUQVt0aGlzLkNPTlNUQU5ULkxBTkddfTwvYnV0dG9uPlxuICAgICAgICAgICAgYDtcblxuICAgICAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1jYWxlbmRhci1kYXRlcmFuZ2UtcmVzZXRdXCIpO1xuXG4gICAgICAgIGlmICghdGFyZ2V0KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xlYXJEYXRlKCk7XG4gICAgICB9KTtcblxuICAgICAgdGVtcGxhdGUuY2xhc3NMaXN0LmFkZChgY2FsZW5kYXItZGF0ZXJhbmdlYCk7XG4gICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBkYXRlcmFuZ2VJbm5lcjtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jYWxlbmRhcl9fZmlsdGVyYCkuYXBwZW5kQ2hpbGQodGVtcGxhdGUpO1xuXG4gICAgICBpZiAoIXRoaXMuZGF0ZVNwYW4ucXVlcnlTZWxlY3RvcihgW2RhdGEtZGF0ZXJhbmdlXWApKSB0aGlzLmRhdGVTcGFuLmluc2VydEFkamFjZW50SFRNTChgYWZ0ZXJCZWdpbmAsIGRhdGVyYW5nZVZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBjbGVhckRhdGUoKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhgcnVuYCk7XG5cbiAgICB0aGlzLmZpbHRlckl0ZW0uY2xlYXIoKTtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNhbGVuZGFyLWRhdGVyYW5nZWApKSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2FsZW5kYXItZGF0ZXJhbmdlYCkucmVtb3ZlKCk7XG5cbiAgICB0aGlzLmRhdGVTcGFuLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWRhdGVyYW5nZV1gKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbSkgaXRlbS5yZW1vdmUoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYXBwbHlEYXRlKHRydWUpO1xuICB9XG59XG5cblsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1maWx0ZXItaXRlbV1gKV0ubWFwKChpdGVtKSA9PiB7XG4gIGlmICghaXRlbS5jbG9zZXN0KGBbZGF0YS1maWx0ZXItY2FsZW5kYXJdYCkgJiYgIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWV2ZW50XWApICYmICFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1maWx0ZXItbWVkaWFdYCkpIHtcbiAgICBpZiAoaXRlbS5nZXRBdHRyaWJ1dGUoYGRhdGEtZmlsdGVyLWl0ZW1gKSA9PSBgZGF0ZXJhbmdlYCkge1xuICAgICAgcmV0dXJuIG5ldyBGaWx0ZXJSYW5nZShpdGVtLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBGaWx0ZXIoaXRlbSk7XG4gICAgfVxuICB9XG59KTtcblxuXG4iLCIoKCkgPT4ge1xuICBjb25zdCBlbnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWhlYWRlci1lbnRlcl1gKTtcblxuICBpZiAoIWVudGVyKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgdG9rZW5gKTtcblxuICBpZiAoIXRva2VuKSByZXR1cm4gZmFsc2U7XG5cbiAgZmV0Y2goYC9hcGkvcHJvZmlsZWAsIHtcbiAgICBtZXRob2Q6IGBHRVRgLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IGBhcHBsaWNhdGlvbi9qc29uYCxcbiAgICAgIFwiQWNjZXB0XCI6IGBhcHBsaWNhdGlvbi9qc29uYCxcbiAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7dG9rZW59YFxuICAgIH0sXG4gIH0pXG4gIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgLnRoZW4oZGF0YSA9PiB7XG4gICAgaWYgKCFkYXRhLmRhdGEpIHtcbiAgICAgIHRocm93IGRhdGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGEuZGF0YVxuICB9KVxuICAudGhlbihkYXRhID0+IHtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGBcbiAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImhlYWRlcl9fZXhpdFwiIGRhdGEtaGVhZGVyLWV4aXQ+XG4gICAgICAgICAgPHN2ZyB3aWR0aD1cIjEwXCIgaGVpZ2h0PVwiMTBcIj5cbiAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWV4aXRcIiAvPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDxzcGFuPiR7Q09OU1RBTlQuRVhJVFtDT05TVEFOVC5MQU5HXX08L3NwYW4+XG4gICAgICAgIDwvYT5gO1xuXG4gICAgZW50ZXIucXVlcnlTZWxlY3Rvcihgc3BhbmApLnRleHRDb250ZW50ID0gZGF0YS5lbWFpbDtcbiAgICBlbnRlci5pbnNlcnRBZGphY2VudEhUTUwoYGFmdGVyRW5kYCwgdGVtcGxhdGUpO1xuICB9KVxuICAudGhlbigoKSA9PiB7XG4gICAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaGVhZGVyLWxpbmtdYCk7XG5cbiAgICBpZiAoIXBhcmVudCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoYFtkYXRhLWhlYWRlci1leGl0XWApO1xuXG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBmZXRjaChgL2FwaS9sb2dvdXRgLCB7XG4gICAgICAgICAgbWV0aG9kOiBgUE9TVGAsXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogYGFwcGxpY2F0aW9uL2pzb25gLFxuICAgICAgICAgICAgXCJBY2NlcHRcIjogYGFwcGxpY2F0aW9uL2pzb25gLFxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYHRva2VuYCk7XG5cbiAgICAgICAgICBwYXJlbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaGVhZGVyLWV4aXRdYCkucmVtb3ZlKCk7XG4gICAgICAgICAgZW50ZXIucXVlcnlTZWxlY3Rvcihgc3BhbmApLnRleHRDb250ZW50ID0gQ09OU1RBTlQuRU5URVJbQ09OU1RBTlQuTEFOR107XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbiAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUud2FybihgWW91ciB0b2tlbiBpcyBpbnZhbGlkYCkpO1xufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICBjb25zdCBsYW5nQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1sYW5nXWApLFxuICAgICAgICBsYW5nID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lmxhbmc7XG5cbiAgaWYgKCFsYW5nQmxvY2spIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBmb3JtID0gbGFuZ0Jsb2NrLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWxhbmctZm9ybV1gKSxcbiAgICAgICAgc2VsZWN0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKGBzZWxlY3RgKSxcbiAgICAgICAgbGlzdExpbmtBcnIgPSBsYW5nQmxvY2sucXVlcnlTZWxlY3RvcihgW2RhdGEtbGFuZy1saXN0XWApLnF1ZXJ5U2VsZWN0b3JBbGwoYGFgKTtcblxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoYGNoYW5nZWAsIGZ1bmN0aW9uKGUpIHtcbiAgICB0aGlzLnN1Ym1pdCgpO1xuICB9KTtcblxuICBsaXN0TGlua0Fyci5mb3JFYWNoKGxpbmsgPT4ge1xuICAgIGNvbnN0IGRlZmF1bHRTZWxlY3RlZCA9IGxhbmcgPT09IGxpbmsuZ2V0QXR0cmlidXRlKGBocmVmYCkgPyB0cnVlIDogZmFsc2U7XG5cbiAgICBsZXQgb3B0aW9uID0gbmV3IE9wdGlvbihsaW5rLnRleHRDb250ZW50LCBsaW5rLmdldEF0dHJpYnV0ZShgaHJlZmApLCBkZWZhdWx0U2VsZWN0ZWQsIGRlZmF1bHRTZWxlY3RlZCk7XG5cbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcblxuICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAoIWxpbmsuY2xvc2VzdChgbGlgKS5jbGFzc0xpc3QuY29udGFpbnMoYGxhbmdfX2xpc3QtYWN0aXZlYCkpIHtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudChgY2hhbmdlYCwge2J1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWV9KTtcblxuICAgICAgICBvcHRpb24uZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufSkoKTtcbiIsIigoKSA9PiB7XG4gIGNvbnN0IHJlcGxhY2VNYXAgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHBhZ2VUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLW1vYi1tYXAtaW5uaXRdYCk7XG4gICAgaWYgKCFwYWdlVGl0bGUpIHJldHVybiBmYWxzZTtcblxuICAgIGxldCByZXBsYWNlZCA9IHBhZ2VUaXRsZS5nZXRBdHRyaWJ1dGUoYGRhdGEtcmVwbGFjZWRgKSxcbiAgICAgICAgcmVwbGFjZU1hcFBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLW1hcC1wYXJlbnRdYCksXG4gICAgICAgIHJlcGxhY2VNYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1tYXBdYCk7XG4gICAgICAgIC8vIHBhcmVudEFib3V0ID0gcmVwbGFjZVNvY2lhbFBhcmVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hYm91dF1gKTtcbiAgICBpZiAoIXJlcGxhY2VkKSB7XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjggJiYgcmVwbGFjZU1hcCkge1xuICAgICAgICBwYWdlVGl0bGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVwbGFjZU1hcCwgcGFnZVRpdGxlLm5leHRTaWJsaW5nKTtcbiAgICAgICAgcGFnZVRpdGxlLnNldEF0dHJpYnV0ZShgZGF0YS1yZXBsYWNlZGAsIGByZXBsYWNlZGApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gNzY4KSB7XG4gICAgICAgIHJlcGxhY2VNYXBQYXJlbnQuYXBwZW5kQ2hpbGQocmVwbGFjZU1hcCk7XG4gICAgICAgIHBhZ2VUaXRsZS5yZW1vdmVBdHRyaWJ1dGUoYGRhdGEtcmVwbGFjZWRgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXBsYWNlTWFwKCk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGByZXNpemVgLCByZXBsYWNlTWFwKTtcbn0pKCk7XG4iLCIoKCkgPT4ge1xuICAgIGNvbnN0IG1lZGlhQ29udGFpbmVyID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLW1lZGlhXWApO1xuICAgIGxldCBnYWxsZXJ5Q2xpY2tlZEZsYWcgPSBmYWxzZTtcbiAgICAvLyBjb25zdCBpbWdBcnIgPSBbXCJodHRwOi8vYmlwYmFwLnJ1L3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE3LzA5L0Nvb2wtSGlnaC1SZXNvbHV0aW9uLVdhbGxwYXBlci0xOTIweDEwODAuanBnXCIsIFwiaHR0cDovL2JpcGJhcC5ydS93cC1jb250ZW50L3VwbG9hZHMvMjAxNy8wNS9WT0xLSS1rcmFzaXZ5ZS1pLW9jaGVuLXVtbnllLXpoaXZvdG55ZS5qcGdcIiwgXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PV9zSV9QczdKU0VrXCJdO1xuXG4gICAgaWYgKCFtZWRpYUNvbnRhaW5lcikgcmV0dXJuIGZhbHNlO1xuXG4gICAgbGV0IGluc2VydFZpZGVvc1RvR2FsbGVyeSA9IGZ1bmN0aW9uKGRhdGEsIHRhcmdldFVybCkge1xuXG4gICAgICAgbGV0IGFyciA9IGRhdGEubWFwKChpdGVtKSA9PiBpdGVtLnVybCk7XG5cbiAgICAgIFsuLi5tZWRpYUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS12aWRlb10gYWApXS5mb3JFYWNoKChpdGVtKSA9PiBhcnIucHVzaChpdGVtLmdldEF0dHJpYnV0ZShgaHJlZmApKSk7XG5cbiAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGkpe1xuICAgICAgICBpZiAoaXRlbSA9PSB0YXJnZXRVcmwpIHtcbiAgICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGFyci51bnNoaWZ0KHRhcmdldFVybCk7XG5cbiAgICAgIGlubml0R2FsbGVyeShhcnIpO1xuICAgIH07XG5cbiAgICBsZXQgaW5uaXRHYWxsZXJ5ID0gZnVuY3Rpb24oYXJyKSB7XG4gICAgICBsZXQgZ2V0T2JqQXJyID0gYXJyLm1hcCgoaXRlbSkgPT4gKHtzcmM6IGl0ZW19KSk7XG5cbiAgICAgICQuZmFuY3lib3gub3BlbihnZXRPYmpBcnIsIHtcbiAgICAgICAgbG9vcCA6IHRydWUsXG4gICAgICAgICdvblN0YXJ0JzogZ2FsbGVyeUNsaWNrZWRGbGFnID0gZmFsc2VcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsZXQgZ2V0RGF0YSA9IGZ1bmN0aW9uKHJlcXVlc3RVcmwsIGFsYnVtSWQsIHRhcmdldFVybCwgdXJsQXJyKSB7XG4gICAgICBpZiAoYWxidW1JZCl7XG4gICAgICAgIHdpbmRvdy5jdXN0b21BamF4KHtcbiAgICAgICAgICB1cmw6IGAke3JlcXVlc3RVcmx9P2lkPSR7YWxidW1JZH1gLFxuICAgICAgICAgIG1ldGhvZDogYEdFVGAsXG4gICAgICAgICAganNvbjogdHJ1ZVxuICAgICAgICB9KS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgaW5zZXJ0VmlkZW9zVG9HYWxsZXJ5KGRhdGEuZGF0YSwgdGFyZ2V0VXJsKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFwiRGF0YSBoYXMgbm90IGdldHRpbmcgXCIgKyBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5zZXJ0VmlkZW9zVG9HYWxsZXJ5KHVybEFyciwgdGFyZ2V0VXJsKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbWVkaWFDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmIChnYWxsZXJ5Q2xpY2tlZEZsYWcpIHJldHVybiBmYWxzZTtcblxuICAgICAgZ2FsbGVyeUNsaWNrZWRGbGFnID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KGBhYCk7XG5cbiAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgdGFyZ2V0Q29udGFpbmVyID0gdGFyZ2V0LmNsb3Nlc3QoYFtkYXRhLW1lZGlhLWl0ZW1dYCksXG4gICAgICAgICAgICAgIHRhcmdldFVybCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoYGhyZWZgKSxcbiAgICAgICAgICAgICAgcmVxdWVzdFVybCA9IG1lZGlhQ29udGFpbmVyLmdldEF0dHJpYnV0ZShgZGF0YS1hY3Rpb25gKSxcbiAgICAgICAgICAgICAgZ2FsbGVyeSA9IGUudGFyZ2V0LmNsb3Nlc3QoYFtkYXRhLW1lZGlhXWApO1xuXG4gICAgICAgIGxldCBhbGJ1bUlkID0gbWVkaWFDb250YWluZXIuZ2V0QXR0cmlidXRlKGBkYXRhLWlkYCksXG4gICAgICAgICAgICB1cmxBcnIgPSBbXTtcblxuICAgICAgICBpZiAoZ2FsbGVyeS5oYXNBdHRyaWJ1dGUoYGRhdGEtbWVkaWEtd2l0aG91dC1hbGJ1bWApKSB7XG4gICAgICAgICAgWy4uLmdhbGxlcnkucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtbWVkaWEtaXRlbV0gYWApXS5mb3JFYWNoKChpdGVtKSA9PiB1cmxBcnIucHVzaChpdGVtLmdldEF0dHJpYnV0ZShgaHJlZmApKSk7XG4gICAgICAgICAgdXJsQXJyID0gdXJsQXJyLm1hcCgoaXRlbSkgPT4gKHt1cmw6IGl0ZW19KSk7XG4gICAgICAgICAgYWxidW1JZCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0YXJnZXRDb250YWluZXIuaGFzQXR0cmlidXRlKGBkYXRhLXZpZGVvYCkpe1xuXG4gICAgICAgICAgJC5mYW5jeWJveC5vcGVuKHtcbiAgICAgICAgICAgICAgICBzcmM6IHRhcmdldFVybCxcbiAgICAgICAgICAgICAgICAnb25TdGFydCc6IGdhbGxlcnlDbGlja2VkRmxhZyA9IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2V0RGF0YShyZXF1ZXN0VXJsLCBhbGJ1bUlkLCB0YXJnZXRVcmwsIHVybEFycik7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pKCk7XG5cblxuLy8gaW5uaXQgU2xpY2sgU2xpZGVyIGZvciBNZWRpYVxuKCgpID0+IHtcbiAgbGV0IHRpbWVyO1xuXG4gIGNvbnN0IGlubml0U2xpZGVyTWVkaWEgPSAoKSA9PiB7XG4gICAgY29uc3QgZGF0YVNsaWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtc2xpY2stc2xpZGVyLW1lZGlhXWApO1xuICAgIGlmICghZGF0YVNsaWNrKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBzbGlkZXJJdGVtTGVuZ3RoID0gZGF0YVNsaWNrLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLW1lZGlhLWl0ZW1dYCkubGVuZ3RoLFxuICAgICAgICAgIHNsaWNrU2xpZGVyQWN0aXZlID0gZGF0YVNsaWNrLmdldEF0dHJpYnV0ZShgZGF0YS1zbGljay1zbGlkZXItbWVkaWFgKTtcblxuICAgIGlmIChzbGlkZXJJdGVtTGVuZ3RoID49IDIgJiYgd2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgIGlmIChzbGlja1NsaWRlckFjdGl2ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgZGF0YVNsaWNrLnNldEF0dHJpYnV0ZShgZGF0YS1zbGljay1zbGlkZXItbWVkaWFgLCB0cnVlKTtcblxuICAgICAgJChkYXRhU2xpY2spLnNsaWNrKHtcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgIGNlbnRlclBhZGRpbmc6IGA4MHB4YCxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2UsXG4gICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pO1xuXG4gICAgICBjYWxjSGVpZ2h0U2xpY2soJChgW2RhdGEtc2xpY2stc2xpZGVyLW1lZGlhXWApKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFzbGlja1NsaWRlckFjdGl2ZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAkKGRhdGFTbGljaykuc2xpY2soYHVuc2xpY2tgKTtcbiAgICAgIGRhdGFTbGljay5zZXRBdHRyaWJ1dGUoYGRhdGEtc2xpY2stc2xpZGVyLW1lZGlhYCwgYGApO1xuICAgIH1cbiAgfTtcblxuICBpbm5pdFNsaWRlck1lZGlhKCk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGByZXNpemVgLCAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcblxuICAgIHRpbWVyID0gc2V0VGltZW91dChpbm5pdFNsaWRlck1lZGlhLCAzMDApO1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgY29uc3QgY2xvc2VNZW51ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBpZihlLnRhcmdldC5wYXJlbnRFbGVtZW50ICYmIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtbWVudS1zZWNvbmRdYCkgfHwgZS50YXJnZXQucGFyZW50RWxlbWVudCAmJiBlLnRhcmdldC5wYXJlbnRFbGVtZW50Lmhhc0F0dHJpYnV0ZShgZGF0YS1tZW51LWl0ZW1gKSl7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtbWVudV1gKTtcbiAgICAgICAgaWYobWVudS5jbGFzc0xpc3QuY29udGFpbnMoYGFjdGl2ZWApKXtcbiAgICAgICAgICBtZW51LmNsYXNzTGlzdC5yZW1vdmUoYGFjdGl2ZWApO1xuICAgICAgICAgIFsuLi5tZW51LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLW1lbnUtaXRlbV1gKV0uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoYGFjdGl2ZWApKSB7XG4gICAgICAgICAgICAgIGxldCBzZWNvbmRFbGVuZW50c0FyciA9IFsuLi5pdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoYGFbdGFiaW5kZXhdYCldO1xuICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoYGFjdGl2ZWApO1xuICAgICAgICAgICAgICBzZWNvbmRFbGVuZW50c0Fyci5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS50YWJJbmRleCA9IGAtMWA7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvcGVuTWVudSA9IGZ1bmN0aW9uKGUsIGVsZW1lbnQpIHtcbiAgICAgICAgaWYoZWxlbWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1tZW51LXNlY29uZF1gKSl7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGxldCBtZW51ID0gZWxlbWVudC5jbG9zZXN0KGBbZGF0YS1tZW51XWApLFxuICAgICAgICAgICAgICBzZWNvbmRFbGVuZW50c0FyciA9IFsuLi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYGFbdGFiaW5kZXhdYCldO1xuXG4gICAgICAgICAgaWYoIW1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKGBhY3RpdmVgKSkge1xuICAgICAgICAgICAgbWVudS5jbGFzc0xpc3QuYWRkKGBhY3RpdmVgKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBbLi4ubWVudS5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1tZW51LWl0ZW1dYCldLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoYGFjdGl2ZWApKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgICAgICAgICAgWy4uLml0ZW0ucXVlcnlTZWxlY3RvckFsbChgYVt0YWJpbmRleF1gKV0uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaXRlbS50YWJJbmRleCA9IGAtMWA7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChgYWN0aXZlYCk7XG4gICAgICAgICAgc2Vjb25kRWxlbmVudHNBcnIuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS50YWJJbmRleCA9IGBgO1xuXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgIGxldCBlbGVtZW50ID0gZS50YXJnZXQuY2xvc2VzdChgW2RhdGEtbWVudS1pdGVtXWApO1xuICAgIGlmKCFlbGVtZW50IHx8IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGBhY3RpdmVgKSkge1xuICAgICAgY2xvc2VNZW51KGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcGVuTWVudShlLCBlbGVtZW50KTtcbiAgICB9XG4gfSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoYGtleWRvd25gLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1tZW51XWApLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNsb3NlTWVudShlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59KSgpO1xuXG5cblxuKGZ1bmN0aW9uKCkge1xuICB3aW5kb3cuTWVudSA9IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICB0aGlzLl9lbGVtID0gb3B0aW9ucy5lbGVtO1xuICAgICAgdGhpcy5faGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaGVhZGVyXWApO1xuICAgICAgdGhpcy5fYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtbWVudS1idG5dYCk7XG4gICAgICB0aGlzLl9vcGVuZWQgPSBvcHRpb25zLm9wZW5lZCB8fCBmYWxzZTtcbiAgICAgIHRoaXMuX2J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgdGhpcy5fb25DbGljayhlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIF9vbkNsaWNrKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl9tZW51VG9nZ2xlKCk7XG4gICAgfVxuXG4gICAgLy8gTWVudVxuICAgIF9vbk1lbnVDaGFuZ2UoKSB7XG4gICAgICB0aGlzLl9lbGVtLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiYm9keU92ZXJmbG93XCIsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgb3BlbjogdGhpcy5fb3BlbmVkLFxuICAgICAgICAgIG9wZW5lZE9iajogdGhpcy5fZWxlbVxuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgX21lbnVUb2dnbGUoKSB7XG4gICAgICB0aGlzLl9oZWFkZXIuZGF0YXNldC5hY3RpdmUgPT0gYHRydWVgID8gdGhpcy5fbWVudUNsb3NlKCkgOiB0aGlzLl9tZW51T3BlbigpO1xuICAgIH1cblxuICAgIF9tZW51T3BlbigpIHtcbiAgICAgIHRoaXMuX2hlYWRlci5kYXRhc2V0LmFjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLl9vcGVuZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fb25NZW51Q2hhbmdlKCk7XG4gICAgfTtcblxuICAgIF9tZW51Q2xvc2UoKSB7XG4gICAgICB0aGlzLl9oZWFkZXIucmVtb3ZlQXR0cmlidXRlKGBkYXRhLWFjdGl2ZWApO1xuICAgICAgdGhpcy5fb3BlbmVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9vbk1lbnVDaGFuZ2UoKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLW1lbnVdYCkpIHtcbiAgICB3aW5kb3cucGFnZU1lbnUgPSBuZXcgTWVudSh7XG4gICAgICBlbGVtOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1tZW51XWApXG4gICAgfSk7XG4gIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gIHdpbmRvdy5QYWdpbmF0aW9uRnJvbnRlbmQgPSBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoaXRlbSkge1xuICAgICAgdGhpcy5pdGVtID0gaXRlbTtcbiAgICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICAgIGlmKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5pdGVtLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoYGFgKTtcblxuICAgICAgICAgIGlmICghdGFyZ2V0KSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnRDbGljayh0YXJnZXQpO1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGluc2VydFBhZ2luYXRpb24oKXtcblxuICAgICAgdGhpcy5pdGVtLmlubmVySFRNTCA9IHRoaXMuZ2VuZXJhdGVQYWdpbmF0aW9uKCk7XG4gICAgfVxuXG4gICAgc2V0TGVuZ3RoKGxlbmd0aCl7XG4gICAgICB0aGlzLmxlbmd0aCA9IG5ldyBBcnJheShsZW5ndGgpLmZpbGwodHJ1ZSk7XG4gICAgICBpZiAobGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgdGhpcy5pdGVtLmlubmVySFRNTCA9IGBgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbnNlcnRQYWdpbmF0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVFdmVudENsaWNrKGJ0bil7XG4gICAgICBsZXQgcGFnZSA9IGBgO1xuXG4gICAgICBjb25zdCBwYWdlQWN0aXZlRWwgPSB0aGlzLml0ZW0ucXVlcnlTZWxlY3RvcihgW2RhdGEtYWN0aXZlXWApLFxuICAgICAgICAgICAgY2xpY2tlZEl0ZW0gPSBidG4udGV4dENvbnRlbnQsXG4gICAgICAgICAgICBwYWdlQWN0aXZlID0gKyhwYWdlQWN0aXZlRWwudGV4dENvbnRlbnQpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBhZ2VBY3RpdmUpO1xuICAgICAgaWYgKGNsaWNrZWRJdGVtID09IHBhZ2VBY3RpdmUpIHJldHVybiBmYWxzZTtcblxuICAgICAgaWYgKGJ0bi5yZWwgPT0gYHByZXZgKSB7XG4gICAgICAgIGlmIChwYWdlQWN0aXZlIC0gMSA9PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHBhZ2UgPSBwYWdlQWN0aXZlIC0gMTtcbiAgICAgIH0gZWxzZSBpZiAoYnRuLnJlbCA9PSBgbmV4dGApIHtcbiAgICAgICAgaWYgKHBhZ2VBY3RpdmUgKyAxID4gdGhpcy5sZW5ndGgubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHBhZ2UgPSBwYWdlQWN0aXZlICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhZ2UgPSBjbGlja2VkSXRlbTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoYGNoYW5nZVBhZ2VgLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIHZhbHVlOiBwYWdlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcGFnZUFjdGl2ZUVsLnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bcGFnZV0uc2V0QXR0cmlidXRlKGBkYXRhLWFjdGl2ZWAsIHRydWUpO1xuICAgICAgcGFnZUFjdGl2ZUVsLnJlbW92ZUF0dHJpYnV0ZShgZGF0YS1hY3RpdmVgKTtcblxuICAgICAgdGhpcy5pdGVtLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIHNldFBhZ2luYXRpb25RdWFudGl0eSgpe1xuICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICA8bGkgY2xhc3M9XCJwYWdpbmF0aW9uX19pdGVtXCIgJHtpbmRleCA9PSAwID8gJ2RhdGEtYWN0aXZlJyA6IG51bGx9PlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJwYWdpbmF0aW9uX19saW5rXCI+JHtpbmRleCsxfTwvYT5cbiAgICAgICAgICA8L2xpPmA7XG4gICAgICB9KS5qb2luKGBgKTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZVBhZ2luYXRpb24oKXtcbiAgICAgIHJldHVybiBgXG4gICAgICAgICAgPHVsIGNsYXNzPVwicGFnaW5hdGlvbl9fbGlzdFwiPlxuICAgICAgICAgICAgPGxpIGNsYXNzPVwicGFnaW5hdGlvbl9faXRlbVwiPlxuICAgICAgICAgICAgICA8YSBjbGFzcz1cInBhZ2luYXRpb25fX2xpbmtcIiByZWw9XCJwcmV2XCI+0J/RgNC10LTRi9C00YPRidCw0Y9cbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTBcIiBoZWlnaHQ9XCIxMFwiIGZpbGw9XCIjOTk5OTk5XCI+XG4gICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1hcnJvdy1yaWdodFwiIC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAke3RoaXMuc2V0UGFnaW5hdGlvblF1YW50aXR5KCl9XG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJwYWdpbmF0aW9uX19pdGVtXCI+XG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwicGFnaW5hdGlvbl9fbGlua1wiIHJlbD1cIm5leHRcIj7QodC70LXQtNGD0Y7RidCw0Y9cbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTBcIiBoZWlnaHQ9XCIxMFwiIGZpbGw9XCIjOTk5OTk5XCI+XG4gICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1hcnJvdy1yaWdodFwiIC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5gO1xuICAgIH1cbiAgfVxufSkoKTtcbiIsIi8vICgoKSA9PiB7XG5cbi8vICAgY29uc3QgdGl0bGVBcnIgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtcGFydG5lci10aXRsZV1gKV07XG5cbi8vICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1wYXJ0bmVyLXRpdGxlXWApKSByZXR1cm4gZmFsc2U7XG5cbi8vICAgY29uc3QgZ2V0VGl0bGVIZWlnaHQgPSAoKSA9PiB7XG4vLyAgICAgICAgICAgY29uc3QgdGl0bGVIZWlnaHRBcnIgPSB0aXRsZUFyci5tYXAoKGl0ZW0pID0+IGl0ZW0ub2Zmc2V0SGVpZ2h0KTtcblxuLy8gICAgICAgICAgIGdldE1heFZhbHVlKHRpdGxlSGVpZ2h0QXJyKTtcbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBnZXRNYXhWYWx1ZSA9IChhcnIpID0+IHtcbi8vICAgICAgICAgICBsZXQgbWF4VmFsdWUgPSBhcnJbMF07XG5cbi8vICAgICAgICAgICBhcnIuZm9yRWFjaCgoaXRlbSkgPT4ge1xuLy8gICAgICAgICAgICAgaWYgKG1heFZhbHVlIDwgaXRlbSkgbWF4VmFsdWUgPSBpdGVtO1xuLy8gICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgICAgc2V0VGl0bGVIZWlnaHQobWF4VmFsdWUpO1xuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIHNldFRpdGxlSGVpZ2h0ID0gKGhlaWd0aCkgPT4ge1xuLy8gICAgICAgICAgIHRpdGxlQXJyLmZvckVhY2goKGl0ZW0pID0+IHtcbi8vICAgICAgICAgICAgIGl0ZW0uc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ3RofXB4YDtcbi8vICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICBnZXRUaXRsZUhlaWdodCgpO1xuLy8gICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgcmVzaXplYCwgZ2V0VGl0bGVIZWlnaHQpO1xuXG4vLyB9KSgpO1xuIiwiKCgpID0+IHtcbiAgY29uc3QgcGVyZm9tYW5jZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1wZXJmb3JtYW5jZXNdYCk7XG5cbiAgaWYgKCFwZXJmb21hbmNlcykgcmV0dXJuIGZhbHNlO1xuXG4gIFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1wZXJmb3JtYW5jZXMtaXRlbV1gKV0uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGl0ZW1Ib3ZlciA9IGl0ZW0ucXVlcnlTZWxlY3RvcihgW2RhdGEtcGVyZm9ybWFuY2VzLWhvdmVyXWApO1xuXG4gICAgaXRlbUhvdmVyLmFkZEV2ZW50TGlzdGVuZXIoYG1vdXNlZW50ZXJgLCAoKSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoYHBlcmZvcm1hbmNlc19faXRlbS0taG92ZXJgKSk7XG5cbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoYG1vdXNlbGVhdmVgLCAoKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoYHBlcmZvcm1hbmNlc19faXRlbS0taG92ZXJgKSk7XG4gIH0pO1xufSkoKTtcbiIsIigoKSA9PiB7XG5cbiAgY29uc3QgcHJvbW9Mb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1wcm9tby1sb3ddYCk7XG5cbiAgaWYgKCFwcm9tb0xvdykgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IGZpeFByb21vTG93UG9zaXRpb24gPSAoKSA9PiB7XG4gICAgbGV0IGRpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgcGFyZW50QmxvY2sgPSBwcm9tb0xvdy5wYXJlbnRFbGVtZW50O1xuXG4gICAgZGl2RWxlbWVudC5jbGFzc0xpc3QuYWRkKGBwcm9tby1sb3dfX3R3aW5gKTtcbiAgICBkaXZFbGVtZW50LnNldEF0dHJpYnV0ZShgZGF0YS1wcm9tby1sb3ctdHdpbmAsIHRydWUpO1xuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDEwMjQpIHtcblxuICAgICAgaWYgKHByb21vTG93Lmhhc0F0dHJpYnV0ZShgZGF0YS1hY3RpdmVgKSkge1xuICAgICAgICBwcm9tb0xvdy5yZW1vdmVBdHRyaWJ1dGUoYGRhdGEtYWN0aXZlYCk7XG4gICAgICAgIHByb21vTG93LnN0eWxlID0gYGA7XG4gICAgICAgIHBhcmVudEJsb2NrLnJlbW92ZUNoaWxkKHBhcmVudEJsb2NrLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXByb21vLWxvdy10d2luXWApKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcGFyZW50UG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgIHRvcDogcGFyZW50QmxvY2suZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLFxuICAgICAgICAgICAgICBoZWlnaHQ6IHBhcmVudEJsb2NrLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgfTtcblxuICAgICAgaWYgKHBhcmVudFBvc2l0aW9uLnRvcCA8IDApIHtcblxuICAgICAgICBpZiAocGFyZW50UG9zaXRpb24udG9wICsgcGFyZW50UG9zaXRpb24uaGVpZ2h0IDwgMCkge1xuICAgICAgICAgIGlmIChwcm9tb0xvdy5oYXNBdHRyaWJ1dGUoYGRhdGEtYWN0aXZlYCkpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgIHByb21vTG93LnNldEF0dHJpYnV0ZShgZGF0YS1hY3RpdmVgLCB0cnVlKTtcbiAgICAgICAgICBkaXZFbGVtZW50LnN0eWxlLmhlaWdodCA9IGAke3BhcmVudFBvc2l0aW9uLmhlaWdodH1weGA7XG4gICAgICAgICAgcGFyZW50QmxvY2suYXBwZW5kQ2hpbGQoZGl2RWxlbWVudCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIXByb21vTG93Lmhhc0F0dHJpYnV0ZShgZGF0YS1hY3RpdmVgKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIHByb21vTG93LnJlbW92ZUF0dHJpYnV0ZShgZGF0YS1hY3RpdmVgKTtcbiAgICAgICAgICBwYXJlbnRCbG9jay5yZW1vdmVDaGlsZChwYXJlbnRCbG9jay5xdWVyeVNlbGVjdG9yKGBbZGF0YS1wcm9tby1sb3ctdHdpbl1gKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb21vTG93LnN0eWxlID0gYGA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGBzY3JvbGxgLCBmaXhQcm9tb0xvd1Bvc2l0aW9uKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoYHJlc2l6ZWAsIGZpeFByb21vTG93UG9zaXRpb24pO1xufSkoKTtcblxuIiwiKGZ1bmN0aW9uKCl7XG4gIHdpbmRvdy5DYWxlbmRhclNlYXJjaCA9IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihlbCkge1xuICAgICAgdGhpcy5pdGVtID0gZWw7XG4gICAgICB0aGlzLnRpdGxlID0gdGhpcy5pdGVtLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNlYXJjaC10aXRsZV1gKTtcbiAgICAgIHRoaXMuZm9ybSA9IHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zZWFyY2gtZm9ybV1gKTtcbiAgICAgIHRoaXMuaW5wdXQgPSB0aGlzLml0ZW0ucXVlcnlTZWxlY3RvcihgW2RhdGEtc2VhcmNoLWlucHV0XWApO1xuICAgICAgdGhpcy5idG4gPSB0aGlzLml0ZW0ucXVlcnlTZWxlY3RvcihgW2RhdGEtc2VhcmNoLWJ0bl1gKTtcbiAgICAgIHRoaXMuYnRuUmVzZXQgPSB0aGlzLml0ZW0ucXVlcnlTZWxlY3RvcihgW2RhdGEtc2VhcmNoLXJlc2V0XWApO1xuICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9IGBgO1xuICAgICAgdGhpcy5DT05TVEFOVCA9IHdpbmRvdy5DT05TVEFOVDtcblxuICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoYHN1Ym1pdGAsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0gdGhpcy5pbnB1dC52YWx1ZS50cmltKCk7XG4gICAgICAgIHRoaXMuc2VhcmNoKCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5idG5SZXNldC5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gYGA7XG4gICAgICAgIHRoaXMuc2VhcmNoVmFsdWUgPSBgYDtcbiAgICAgICAgdGhpcy5zZWFyY2goKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlYXJjaCgpIHtcbiAgICAgIGlmICh0aGlzLnNlYXJjaFZhbHVlID09PSBgYCkge1xuICAgICAgICB0aGlzLmJ0blJlc2V0LnJlbW92ZUF0dHJpYnV0ZShgZGF0YS1hY3RpdmVgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYnRuUmVzZXQuc2V0QXR0cmlidXRlKGBkYXRhLWFjdGl2ZWAsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChgc2VhcmNoQ2hhbmdlZGAsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgdHlwZTogYHNlYXJjaGAsXG4gICAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLnNlYXJjaFZhbHVlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLml0ZW0uZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuXG4gICAgc2V0VGl0bGVSZXN1bHQoZmxhZykge1xuICAgICAgaWYgKGZsYWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IGAke3RoaXMuQ09OU1RBTlQuU0VBUkNILkRFRkFVTFRbdGhpcy5DT05TVEFOVC5MQU5HXX1gO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChmbGFnKSB7XG4gICAgICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gYCR7dGhpcy5DT05TVEFOVC5TRUFSQ0guUkVTVUxUW3RoaXMuQ09OU1RBTlQuTEFOR119OiA8c21hbGw+JHt0aGlzLnNlYXJjaFZhbHVlfTwvc21hbGw+YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gYCR7dGhpcy5DT05TVEFOVC5TRUFSQ0guUkVTVUxUW3RoaXMuQ09OU1RBTlQuTEFOR119OiA8c21hbGw+JHt0aGlzLkNPTlNUQU5ULlNFQVJDSC5FTVBUWVt0aGlzLkNPTlNUQU5ULkxBTkddfTwvc21hbGw+YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93RWxlbWVudChmbGFnKSB7XG4gICAgICBpZiAoZmxhZykge1xuICAgICAgICB0aGlzLml0ZW0uc2V0QXR0cmlidXRlKGBkYXRhLWFjdGl2ZWAsIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pdGVtLnJlbW92ZUF0dHJpYnV0ZShgZGF0YS1hY3RpdmVgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gIHdpbmRvdy5HZXRJbnB1dFZhbHVlID0gY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGl0ZW0pIHtcbiAgICAgIHRoaXMuaXRlbSA9IGl0ZW07XG5cbiAgICAgIHRoaXMuaXRlbS5hZGRFdmVudExpc3RlbmVyKGBpbnB1dGAsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGBpbnB1dFNlYXJjaENoYW5nZWRgLCB7XG4gICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgdmFsdWU6IHRoaXMuaXRlbS52YWx1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaXRlbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufSkoKTtcblxuKGZ1bmN0aW9uKCkge1xuICB3aW5kb3cuR2V0VHlwZVZhbHVlID0gY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGl0ZW0pIHtcbiAgICAgIHRoaXMuaXRlbSA9IGl0ZW07XG5cbiAgICAgIHRoaXMuaXRlbS5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoYGFgKTtcblxuICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hY3RpdmVdYCkucmVtb3ZlQXR0cmlidXRlKGBkYXRhLWFjdGl2ZWApO1xuICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKGBkYXRhLWFjdGl2ZWAsIHRydWUpO1xuXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGB0eXBlU2VhcmNoQ2hhbmdlZGAsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICB2YWx1ZTogdGFyZ2V0LmhyZWYuc3Vic3RyaW5nKHRhcmdldC5ocmVmLmxhc3RJbmRleE9mKCc/JykpLFxuICAgICAgICAgICAgZGF0YVR5cGU6IHRhcmdldC5nZXRBdHRyaWJ1dGUoYGRhdGEtc2VydmVyZGF0YS10eXBlYClcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLml0ZW0uZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pKCk7XG5cbihmdW5jdGlvbigpIHtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNlYXJjaC1tYWluXWApKSB7XG5cbiAgICBjbGFzcyBTZWFyY2hNYWluICB7XG4gICAgICBjb25zdHJ1Y3RvcihpdGVtKSB7XG4gICAgICAgIHRoaXMuaXRlbSA9IGl0ZW07XG4gICAgICAgIHRoaXMuc2VhcmNoVGl0bGUgPSB0aGlzLml0ZW0ucXVlcnlTZWxlY3RvcihgW2RhdGEtc2VhcmNoLW1haW4tdGl0bGVdYCk7XG4gICAgICAgIHRoaXMuc2VhcmNoVGl0bGVUZXh0SW5pdGlhbCA9IHRoaXMuc2VhcmNoVGl0bGUudGV4dENvbnRlbnQ7XG4gICAgICAgIHRoaXMuc2VhcmNoQnRuID0gdGhpcy5pdGVtLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNlYXJjaC1tYWluLWJ0bi1zdWJtaXRdYCk7XG4gICAgICAgIHRoaXMudHlwZVNlbGVjdCA9IHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zZWFyY2gtbWFpbi10eXBlXWApO1xuICAgICAgICB0aGlzLnNlYXJjaFR5cGVBY3RpdmUgPSB0aGlzLnR5cGVTZWxlY3QucXVlcnlTZWxlY3RvcihgW2RhdGEtYWN0aXZlXWApO1xuICAgICAgICB0aGlzLnJlc3VsdENvbnRhaW5lciA9IHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zZWFyY2gtbWFpbi1yZXN1bHRdYCk7XG4gICAgICAgIHRoaXMucmVzdWx0Tm9SZXN1bHQgPSB0aGlzLml0ZW0ucXVlcnlTZWxlY3RvcihgW2RhdGEtc2VhcmNoLW1haW4tYW5zd2VyXWApO1xuICAgICAgICB0aGlzLnJlc3VsdEFydGljbGVzID0gdGhpcy5pdGVtLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXR5cGUtYXJ0aWNsZXNdYCk7XG4gICAgICAgIHRoaXMucmVzdWx0UGVyZm9ybWFuY2VzID0gdGhpcy5pdGVtLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXR5cGUtcGVyZm9ybWFuY2VzXWApO1xuICAgICAgICB0aGlzLnJlc3VsdE1lZGlhID0gdGhpcy5pdGVtLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXR5cGUtbWVkaWFdYCk7XG4gICAgICAgIHRoaXMucmVzdWx0QWN0b3JzID0gdGhpcy5pdGVtLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXR5cGUtYWN0b3JzXWApO1xuICAgICAgICB0aGlzLnNlcnZlckRhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLnNlcnZlckRhdGFUeXBlID0gYGxpc3RgO1xuICAgICAgICB0aGlzLmFjdGl2ZVBhZ2UgPSAxO1xuICAgICAgICB0aGlzLnNlcnZlckRhdGFGaWx0ZXJlZCA9IG51bGw7XG4gICAgICAgIHRoaXMuZWxtc1F1YW50aXR5T25QYWdlID0gOTtcbiAgICAgICAgdGhpcy5zZWFyY2hUeXBlVmFsdWUgPSB0aGlzLnNlYXJjaFR5cGVBY3RpdmUuaHJlZi5zdWJzdHJpbmcodGhpcy5zZWFyY2hUeXBlQWN0aXZlLmhyZWYubGFzdEluZGV4T2YoJz8nKSk7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXRWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZ2V0SW5wdXRWYWx1ZSA9IG5ldyBHZXRJbnB1dFZhbHVlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNlYXJjaC1tYWluLWlucHV0XWApKTtcbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uID0gbmV3IFBhZ2luYXRpb25Gcm9udGVuZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zZWFyY2gtbWFpbi1wYWdpbmF0aW9uXWApKTtcbiAgICAgICAgdGhpcy5nZXRUeXBlVmFsdWUgPSBuZXcgR2V0VHlwZVZhbHVlKHRoaXMudHlwZVNlbGVjdCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0SW5wdXRWYWx1ZS5pdGVtLnZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dFZhbHVlID0gdGhpcy5nZXRJbnB1dFZhbHVlLml0ZW0udmFsdWU7XG4gICAgICAgICAgdGhpcy5zZXRUaXRsZSgpO1xuICAgICAgICAgIHRoaXMuZ2V0RGF0YSh0aGlzLnNlYXJjaFR5cGVWYWx1ZSwgdGhpcy5zZWFyY2hJbnB1dFZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXRlbS5hZGRFdmVudExpc3RlbmVyKGBpbnB1dFNlYXJjaENoYW5nZWRgLCAoZSkgPT4ge1xuICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0VmFsdWUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pdGVtLmFkZEV2ZW50TGlzdGVuZXIoYHR5cGVTZWFyY2hDaGFuZ2VkYCwgKGUpID0+IHtcbiAgICAgICAgICAgdGhpcy5zZWFyY2hUeXBlVmFsdWUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgdGhpcy5zZXJ2ZXJEYXRhVHlwZSA9IGUuZGV0YWlsLmRhdGFUeXBlO1xuICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hUeXBlVmFsdWUgJiYgdGhpcy5zZWFyY2hJbnB1dFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmdldERhdGEodGhpcy5zZWFyY2hUeXBlVmFsdWUsIHRoaXMuc2VhcmNoSW5wdXRWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlmICh0aGlzLnNlYXJjaFR5cGVWYWx1ZSAmJiB0aGlzLnNlYXJjaElucHV0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGl0bGUoKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0YSh0aGlzLnNlYXJjaFR5cGVWYWx1ZSwgdGhpcy5zZWFyY2hJbnB1dFZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaXRlbS5hZGRFdmVudExpc3RlbmVyKGBjaGFuZ2VQYWdlYCwgKGUpID0+IHtcbiAgICAgICAgICB0aGlzLmFjdGl2ZVBhZ2UgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgICB0aGlzLmZpbHRlclNlcnZlckRhdGEoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGdldERhdGEodHlwZSwgdmFsdWUpIHtcbiAgICAgICAgbGV0IHNlcnZlckRhdGFVcmwgPSBgYDtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9hcGkvdjEvc2VhcmNoJHt0eXBlfSZxPSR7dmFsdWV9YCk7XG5cdFx0ICB3aW5kb3cuY3VzdG9tQWpheCh7XG5cdFx0XHQgIHVybDogYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYXBpL3YxL3NlYXJjaC1jb3VudCR7dHlwZX0mcT0ke3ZhbHVlfWAsXG5cdFx0XHQgIG1ldGhvZDogYEdFVGAsXG5cdFx0XHQgIGpzb246IHRydWVcblx0XHQgIH0pXG5cdFx0ICAudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0ICAkKHRoaXMucmVzdWx0QXJ0aWNsZXMpLmZpbmQoJ3NwYW4nKS5yZW1vdmUoKTtcblx0XHRcdCAgJCh0aGlzLnJlc3VsdFBlcmZvcm1hbmNlcykuZmluZCgnc3BhbicpLnJlbW92ZSgpO1xuXHRcdFx0ICAkKHRoaXMucmVzdWx0TWVkaWEpLmZpbmQoJ3NwYW4nKS5yZW1vdmUoKTtcblx0XHRcdCAgJCh0aGlzLnJlc3VsdEFjdG9ycykuZmluZCgnc3BhbicpLnJlbW92ZSgpO1xuXG5cdFx0XHQgIGxldCBzcGFuID0gJCgnPHNwYW4+JykuY3NzKCdjb2xvcicsICdncmVlbicpO1xuXG5cdFx0XHQgICQodGhpcy5yZXN1bHRBcnRpY2xlcykuYXBwZW5kKHNwYW4uY2xvbmUoKS5odG1sKCcgKCcgKyBkYXRhWydhcnRpY2xlcyddICsgJyknKSk7XG5cdFx0XHQgICQodGhpcy5yZXN1bHRQZXJmb3JtYW5jZXMpLmFwcGVuZChzcGFuLmNsb25lKCkuaHRtbCgnICgnICsgZGF0YVsncGVyZm9ybWFuY2VzJ10gKyAnKScpKTtcblx0XHRcdCAgJCh0aGlzLnJlc3VsdE1lZGlhKS5hcHBlbmQoc3Bhbi5jbG9uZSgpLmh0bWwoJyAoJyArIGRhdGFbJ21lZGlhJ10gKyAnKScpKTtcblx0XHRcdCAgJCh0aGlzLnJlc3VsdEFjdG9ycykuYXBwZW5kKHNwYW4uY2xvbmUoKS5odG1sKCcgKCcgKyBkYXRhWydhY3RvcnMnXSArICcpJykpO1xuXG5cdFx0XHQgIHJldHVybiB0aGlzLnNlcnZlckRhdGE7XG5cdFx0ICB9LCAoZXJyb3IpID0+IHtcblx0XHRcdCAgY29uc29sZS53YXJuKGVycm9yKTtcblx0XHQgIH0pO1xuXG4gICAgICAgIHJldHVybiB3aW5kb3cuY3VzdG9tQWpheCh7XG4gICAgICAgICAgdXJsOiBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9hcGkvdjEvc2VhcmNoJHt0eXBlfSZxPSR7dmFsdWV9YCxcbiAgICAgICAgICBtZXRob2Q6IGBHRVRgLFxuICAgICAgICAgIGpzb246IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICB0aGlzLnNlcnZlckRhdGEgPSBkYXRhLmRhdGE7XG4gICAgICAgICAgdGhpcy5maWx0ZXJTZXJ2ZXJEYXRhKCk7XG4gICAgICAgICAgdGhpcy5wYWdpbmF0aW9uLnNldExlbmd0aChNYXRoLmNlaWwodGhpcy5zZXJ2ZXJEYXRhLmxlbmd0aC90aGlzLmVsbXNRdWFudGl0eU9uUGFnZSkpO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VydmVyRGF0YSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyRGF0YTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS53YXJuKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cblxuICAgICAgZmlsdGVyU2VydmVyRGF0YSgpe1xuICAgICAgICB0aGlzLnNlcnZlckRhdGFGaWx0ZXJlZCA9IHRoaXMuc2VydmVyRGF0YS5zbGljZSgodGhpcy5hY3RpdmVQYWdlIC0gMSkgKiB0aGlzLmVsbXNRdWFudGl0eU9uUGFnZSAsICh0aGlzLmFjdGl2ZVBhZ2UgKiB0aGlzLmVsbXNRdWFudGl0eU9uUGFnZSkpO1xuICAgICAgICB0aGlzLmFjdGl2ZVBhZ2UgPSAxO1xuICAgICAgICB0aGlzLmluc2VydERhdGEoKTtcbiAgICAgIH1cblxuICAgICAgc2V0VGl0bGUoKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoVGl0bGUuaW5uZXJIVE1MID0gYCR7dGhpcy5zZWFyY2hUaXRsZVRleHRJbml0aWFsfSR7dGhpcy5zZWFyY2hJbnB1dFZhbHVlfWA7XG4gICAgICAgIHRoaXMuc2VhcmNoVGl0bGUuY2xhc3NMaXN0LmFkZChgYWN0aXZlYCk7XG4gICAgICB9XG5cbiAgICAgIGluc2VydERhdGEoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gYGAsXG4gICAgICAgICAgICBjb250YWluZXIgPSBgYDtcblxuICAgICAgICBpZiAodGhpcy5zZXJ2ZXJEYXRhRmlsdGVyZWQubGVuZ3RoID4gMCl7XG4gICAgICAgICAgdGhpcy5zZXJ2ZXJEYXRhRmlsdGVyZWQuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IGBgLFxuICAgICAgICAgICAgICAgIGdldEltZ1VybCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxldCBpbWdVcmwgPSBgYDtcbiAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmltZykge1xuICAgICAgICAgICAgICAgICAgICBpbWdVcmwgPSBpdGVtLmltZztcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGltZ1VybCA9ICcvL2ltZy55b3V0dWJlLmNvbS92aS8nICsgaXRlbS55b3V0dWJlaW1nICsgJy8wLmpwZyc7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gaW1nVXJsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNlcnZlckRhdGFUeXBlID09IGBsaXN0YCkge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IGBcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJzZWFyY2gtbWFpbl9fcmVzdWx0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInNlYXJjaC1tYWluX19yZXN1bHQtdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7aXRlbS51cmx9XCIgY2xhc3M9XCJzZWFyY2gtbWFpbl9fcmVzdWx0LWxpbmtcIj4ke2l0ZW0udGl0bGV9PC9hPlxuICAgICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic2VhcmNoLW1haW5fX2Rlc2NyXCI+JHtpdGVtLmRlc2NyfTwvcD5cbiAgICAgICAgICAgICAgICA8L2xpPmA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VydmVyRGF0YVR5cGUgPT0gYG1lZGlhYCkge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IGBcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJzZWFyY2gtbWFpbl9fcmVzdWx0LWl0ZW0gY29sLW1kLTYgY29sLXhsLTRcIj5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke2l0ZW0udXJsfVwiICR7aXRlbS50eXBlID09IFwidmlkZW9cIiA/IFwiZGF0YS1mYW5jeWJveFwiIDogXCJcIn0gY2xhc3M9XCJzZWFyY2gtbWFpbl9fcmVzdWx0LWxpbmtcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwic2VhcmNoLW1haW5fX3Jlc3VsdC10aXRsZVwiPiR7aXRlbS50aXRsZX08L2gyPlxuICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwic2VhcmNoLW1haW5fX3Jlc3VsdC1pbWcgJHtpdGVtLnR5cGUgPT0gXCJ2aWRlb1wifHxpdGVtLnR5cGUgPT0gXCJhbGJ1bVwiID8gXCJzZWFyY2gtbWFpbl9fcmVzdWx0LWltZy0tbWVkaWFcIiA6IFwic2VhcmNoLW1haW5fX3Jlc3VsdC1pbWctLWFjdG9yc1wifVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtnZXRJbWdVcmwoKX1cIiBhbHQ9XCIke2l0ZW0udGl0bGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgJHtpdGVtLnR5cGUgPT0gXCJ2aWRlb1wiID8gJzxwIGNsYXNzPVwic2VhcmNoLW1haW5fX2ljb24tcGxheVwiPjxzdmcgd2lkdGg9XCI0NVwiIGhlaWdodD1cIjQ1XCIgZmlsbD1cIiNmZmZcIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1wbGF5XCIgLz48L3N2Zz48L3A+JyA6IFwiXCJ9XG4gICAgICAgICAgICAgICAgICAgIDwvZmlndXJlPlxuICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGVudCArPSB0ZW1wbGF0ZTtcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgaWYgKHRoaXMuc2VydmVyRGF0YVR5cGUgPT0gYG1lZGlhYCkge1xuICAgICAgICAgICAgY29udGFpbmVyID0gYFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLW1haW5fX3Jlc3VsdFwiPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInNlYXJjaC1tYWluX19yZXN1bHQtbGlzdCByb3dcIj5cbiAgICAgICAgICAgICAgICAke2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VydmVyRGF0YVR5cGUgPT0gYGxpc3RgKSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtbWFpbl9fcmVzdWx0XCI+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwic2VhcmNoLW1haW5fX3Jlc3VsdC1saXN0XCI+XG4gICAgICAgICAgICAgICAgJHtjb250ZW50fVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDwvZGl2PmA7XG4gICAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVzdWx0Tm9SZXN1bHQuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlc3VsdE5vUmVzdWx0LmNsYXNzTGlzdC5hZGQoYGFjdGl2ZWApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGNvbnRhaW5lcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgbG9hZGAsICgpID0+IHtcbiAgICAgIG5ldyBTZWFyY2hNYWluKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNlYXJjaC1tYWluXWApKTtcbiAgICB9KTtcbiAgfVxufSkoKTtcblxuIiwiLy8gOyhmdW5jdGlvbigpe1xuLy8gICBjb25zdCByZXBsYWNlU29jaWFsQmxvY2sgPSBmdW5jdGlvbigpe1xuLy8gICAgIGxldCBmb290ZXJTb2NpYWxCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWZvb3Rlci1zb2NpYWxdYCksXG4vLyAgICAgICAgICAgaGVhZGVyU29jaWFsQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1oZWFkZXItc29jaWFsXWApLFxuLy8gICAgICAgICAgIHNvY2lhbEJsb2NrSW5Gb290ZXIgPSBmb290ZXJTb2NpYWxCbG9jay5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zb2NpYWxdYCksXG4vLyAgICAgICAgICAgc29jaWFsQmxvY2tJbkhlYWRlciA9IGhlYWRlclNvY2lhbEJsb2NrLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNvY2lhbF1gKTtcblxuLy8gICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IDEwMjQpIHtcbi8vICAgICAgIGlmKHNvY2lhbEJsb2NrSW5Gb290ZXIpIHtcbi8vICAgICAgICAgcmV0dXJuIGZhbHNlO1xuLy8gICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgc29jaWFsQmxvY2tJbkhlYWRlciA9IGhlYWRlclNvY2lhbEJsb2NrLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNvY2lhbF1gKTtcbi8vICAgICAgICAgaWYoc29jaWFsQmxvY2tJbkhlYWRlcikge1xuLy8gICAgICAgICAgIHNvY2lhbEJsb2NrSW5Gb290ZXIgPSBzb2NpYWxCbG9ja0luSGVhZGVyO1xuLy8gICAgICAgICAgIHNvY2lhbEJsb2NrSW5IZWFkZXIucmVtb3ZlKCk7XG4vLyAgICAgICAgICAgZm9vdGVyU29jaWFsQmxvY2suYXBwZW5kQ2hpbGQoc29jaWFsQmxvY2tJbkZvb3Rlcik7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH1cbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgaWYoc29jaWFsQmxvY2tJbkhlYWRlcikge1xuLy8gICAgICAgICByZXR1cm4gZmFsc2U7XG4vLyAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICBzb2NpYWxCbG9ja0luRm9vdGVyID0gZm9vdGVyU29jaWFsQmxvY2sucXVlcnlTZWxlY3RvcihgW2RhdGEtc29jaWFsXWApO1xuLy8gICAgICAgICBpZihzb2NpYWxCbG9ja0luRm9vdGVyKSB7XG4vLyAgICAgICAgICAgc29jaWFsQmxvY2tJbkhlYWRlciA9IHNvY2lhbEJsb2NrSW5Gb290ZXI7XG4vLyAgICAgICAgICAgc29jaWFsQmxvY2tJbkZvb3Rlci5yZW1vdmUoKTtcbi8vICAgICAgICAgICBoZWFkZXJTb2NpYWxCbG9jay5hcHBlbmRDaGlsZChzb2NpYWxCbG9ja0luSGVhZGVyKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfVxuLy8gICAgIH1cbi8vICAgfVxuXG4vLyAgIHJlcGxhY2VTb2NpYWxCbG9jaygpO1xuLy8gICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgcmVzaXplYCwgcmVwbGFjZVNvY2lhbEJsb2NrKTtcbi8vIH0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgd2luZG93LkNhbGVuZGFyTW9udGhUb2dnbGUgPSBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9uKSB7XG4gICAgICB0aGlzLml0ZW0gPSBvcHRpb24uaXRlbTtcbiAgICAgIHRoaXMubmV4dEJ0biA9IHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jYWxlbmRhci1tb250aD1cIm5leHRcIl1gKTtcbiAgICAgIHRoaXMucHJldkJ0biA9IHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jYWxlbmRhci1tb250aD1cInByZXZcIl1gKTtcbiAgICAgIHRoaXMubW9udGhOYW1lID0gdGhpcy5pdGVtLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNhbGVuZGFyLW1vbnRoLW5hbWVdYCk7XG5cbiAgICAgIHRoaXMuaXRlbS5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoYGJ1dHRvbmApO1xuXG4gICAgICAgIGlmICghdGFyZ2V0KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHRoaXMuY2hhbmdlTW9udGgodGFyZ2V0KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoYW5nZU1vbnRoKHRhcmdldCkge1xuICAgICAgbGV0IG1vbnRoRGlyZWN0aW9uID0gdGFyZ2V0LmRhdGFzZXQuY2FsZW5kYXJNb250aCA9PSBgcHJldmAgPyAtMSA6IDE7XG5cbiAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwibW9udGhUb2dnbGVcIiwge1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBtb250aDogbW9udGhEaXJlY3Rpb25cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuaXRlbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICBzZXRNb250aChvcHRpb24pIHtcbiAgICAgIHRoaXMubW9udGhOYW1lLnRleHRDb250ZW50ID0gb3B0aW9uLnRleHQ7XG4gICAgICB0aGlzLnByZXZCdG4uZGF0YXNldC5kaXNhYmxlZCA9IG9wdGlvbi5wcmV2QnRuRGlzYWJsZWQ7XG4gICAgICB0aGlzLm5leHRCdG4uZGF0YXNldC5kaXNhYmxlZCA9IG9wdGlvbi5uZXh0QnRuRGlzYWJsZWQ7XG4gICAgICB0aGlzLmNoYW5nZVZpc2libGVFbGVtZW50KG9wdGlvbi5lbGVtZW50VmlzaWJsZSk7XG4gICAgfVxuXG4gICAgY2hhbmdlVmlzaWJsZUVsZW1lbnQoZmxhZykge1xuICAgICAgaWYgKGZsYWcpIHtcbiAgICAgICAgdGhpcy5pdGVtLnJlbW92ZUF0dHJpYnV0ZShgZGF0YS1oaWRkZW5gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXRlbS5kYXRhc2V0LmhpZGRlbiA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gIHdpbmRvdy5DYWxlbmRhclR5cGVUb2dnbGUgPSBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9uKSB7XG4gICAgICB0aGlzLml0ZW0gPSBvcHRpb24uaXRlbTtcbiAgICAgIHRoaXMubGlua0FyciA9IHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1jYWxlbmRhci10eXBlLWxpbmtdYCk7XG5cbiAgICAgIHRoaXMuaXRlbS5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KGBbZGF0YS1jYWxlbmRhci10eXBlLWxpbmtdYCk7XG5cbiAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy5jaGFuZ2VFdmVudCh0YXJnZXQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hhbmdlRXZlbnQodGFyZ2V0KSB7XG4gICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChgdHlwZVRvZ2dsZWAsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgdHlwZTogdGFyZ2V0LmdldEF0dHJpYnV0ZShgaHJlZmApXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLml0ZW0uZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuXG4gICAgc2V0RXZlbnQodHlwZSkge1xuICAgICAgWy4uLnRoaXMubGlua0Fycl0uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZih0eXBlID09PSBpdGVtLmdldEF0dHJpYnV0ZShgaHJlZmApKSB7XG4gICAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoYGRhdGEtYWN0aXZlYCwgdHJ1ZSk7XG4gICAgICAgICAgaXRlbS5jbG9zZXN0KGBsaWApLnNldEF0dHJpYnV0ZShgZGF0YS1hY3RpdmVgLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLnJlbW92ZUF0dHJpYnV0ZShgZGF0YS1hY3RpdmVgKTtcbiAgICAgICAgICBpdGVtLmNsb3Nlc3QoYGxpYCkucmVtb3ZlQXR0cmlidXRlKGBkYXRhLWFjdGl2ZWApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
