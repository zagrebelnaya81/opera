import getDistributorPageId from "../../../global/getDistributorPageId"

export default class DistributorsControllerClass {
  constructor(item, data) {
    this.item = item;
    this.title = this.item.querySelector(`.kasir__prices-title`);
    this.list = this.item.querySelector(`.kasir__prices-list`);
    this.listBtns = null;
    this.priceZonesList = data;
    this.priceZoneActive = null;

    this.createElement(this.priceZonesList);
    this.listBtns = [...this.list.querySelectorAll(`[data-xls-reserved]`)];

    this.item.addEventListener(`click`, (e) => {
      const btnPay = e.target.closest(`.kasir__prices-btn-sell`);

      if (btnPay) {
        this.item.dispatchEvent(
          new CustomEvent(`sellTickets`, {
            bubbles: true,
            cancelable: true,
            detail: {
              id: btnPay.getAttribute(`data-id`)
            }
          })
        )
      }
    });
  }

  createElement(list) {
    this.title.textContent = `Дистрибьюторы`;

    this.list.innerHTML = list.map(item => {
      return `<li data-btn-visible="false">
        <span class="kasir__prices-name">${item.title}</span>
        <input class="form-control" type="number" data-id="${item.id}">

        <a class="kasir__prices-xls btn btn-primary" data-id="${item.id}" data-xls-reserved>Заброньовані XLS</a>
        <a href="/admin/reports/event-distributor-sold?eventId=${getDistributorPageId()}&distributorId=${item.id}" class="kasir__prices-xls btn btn-primary" data-id="${item.id}" data-xls-sold>Продані XLS</a>
        <button type="button" class="kasir__prices-btn-sell btn btn-success" data-id="${item.id}">Продати</button>
      </li>`
    }).join(``);
  }

  setCount(id, value) {
    this.list.querySelector(`input[data-id="${id}"]`).value = value;
  }

  createDataForBooking() {
    const obj = {};
    [...this.list.querySelectorAll(`input[data-id]`)].forEach(item => obj[`tickets_count_${item.getAttribute(`data-id`)}`] = item.value);

    return obj;
  }

  showBtnSell(id) {
    const btn = this.listBtns.find(item => item.getAttribute(`data-id`) == id);

    if (btn) {
      const parent = btn.closest(`li`);

      parent.setAttribute(`data-btn-visible`, true);
      parent.querySelector(`[data-xls-reserved]`).href = `/admin/reports/event-distributor-booked?eventId=${getDistributorPageId()}&distributorId=${id}`;
    }
  }

  hideBtnSell(id) {
    const btn = this.listBtns.find(item => item.getAttribute(`data-id`) == id);

    if (btn) {
      const parent = btn.closest(`li`);

      parent.setAttribute(`data-btn-visible`, false);
      parent.querySelector(`[data-xls-reserved]`).removeAttribute(`href`);
    }
  }

  disabledBtnSell(id) {
    const btn = this.item.querySelector(`.kasir__prices-btn-sell[data-id="${id}"]`);

    if (btn) btn.setAttribute(`disabled`, true);
  }

  enabledBtnSell(id) {
    const btn = this.item.querySelector(`.kasir__prices-btn-sell[data-id="${id}"]`);

    if (btn) btn.removeAttribute(`disabled`);
  }
}
