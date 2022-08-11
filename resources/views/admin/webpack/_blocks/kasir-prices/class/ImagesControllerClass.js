export default class ImagesControllerClass {
    constructor(item, images) {
      this.item = item;
      this.imageList = item.querySelector(`.kasir__prices-image`);
      this.images = images;
      this.activeImageId = null;
      this.imageShowObj = document.querySelector(`[data-img-preview]`);

      this.render();

      this.item.addEventListener(`click`, (e) => {
        const target = e.target.closest(`.kasir__prices-image-item`);

        if (!target) return false;

        const active = this.imageList.querySelector(`[data-active]`);
        if (active) active.removeAttribute(`data-active`);
        target.setAttribute(`data-active`, true);

        this.activeImageId = target.getAttribute(`data-id`);

        this.createEventChangeImage();

        if (e.target.hasAttribute(`data-show-preview`)) {
          const el = this.images.find(image => image.id == this.activeImageId);

          if (el && this.imageShowObj) {
            const imgBody = this.imageShowObj.querySelector(`.modal-body`),
                  imgHeader = this.imageShowObj.querySelector(`.modal-header .modal-title`),
                  img = document.createElement(`img`);

            img.src = el.poster;

            imgBody.innerHTML = ``;
            imgBody.appendChild(img);
            imgHeader.textContent = el.title;

            $(this.imageShowObj).modal(`show`);
          }
        }
      });

      [...this.imageList.querySelectorAll(`.kasir__prices-image-item`)].forEach(item => {
        item.addEventListener(`mouseenter`, (e) => {
          this.item.dispatchEvent(
            new CustomEvent(`showSeatsForImage`, {
              bubbles: true,
              cancelable: true,
              detail: {
                activeImageId: e.target.getAttribute(`data-id`)
              }
            })
          );
        });
      });

      this.imageList.addEventListener(`mouseleave`, (e) => {
        clearTimeout(this.timerId);

        this.item.dispatchEvent(
          new CustomEvent(`resetShowSeatsForImage`, {
            bubbles: true,
            cancelable: true
          })
        );
      })
    }

    render() {
      this.imageList.innerHTML = this.images.map(image => {
        return `<div class="kasir__prices-image-item" data-id="${image.id}">
            <img src="${image.preview}" alt="">
            <div class="info">
              <h2 class="title">${image.title}</h2>
              <button type="button" class="btn btn-primary btn-xs" data-show-preview>Зображення</button>
            </div>
          </div>`
      }).join(``);
    }

    createEventChangeImage() {
      this.item.dispatchEvent(
        new CustomEvent(`changeImage`, {
          bubbles: true,
          cancelable: true,
          detail: {
            activeImageId: this.activeImageId
          }
        })
      )
    }

    checkImageId(id) {
      return this.images.find(image => image.id == id)
    }
  }
