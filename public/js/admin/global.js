$(document).ready(function() {
  $(document).on('click', "form[data-confirm] button[type='submit']", function (e) {
    e.preventDefault();

    let button = $(this);
    let form = button.closest('form');
    let msg = form.data('confirm');

    if (confirm(msg)) form.submit();
  })
});


(() => {
  // Add/Delete video url
  const video = document.querySelector(`#video`);

  if (!video) return false;

  video.addEventListener(`click`, function(e) {
    const addElement = e.target.closest(`[data-video-add]`),
          removeElement = e.target.closest(`[data-video-remove]`),
          videoList = document.querySelector(`[data-video-list]`);

    if (addElement) {
      e.preventDefault();

      let defaultId = document.getElementById("default-id"),
          id = defaultId.value;

      id++;

      videoList.insertAdjacentHTML(`beforeEnd`, `
        <div class="form-group col-md-6 df fwn" id="div-${id}">
          <input class="form-control mr15" name="videos[]" id="input-${id}" value="">
          <a class="btn btn-danger" data-video-remove>
            <i class="fa fa-trash"></i>
          </a>
        </div>`
      );

      videoList.querySelector(`#input-${id}`).focus();

      defaultId.value = id;
    }

    if (removeElement) {
      e.preventDefault();

      removeElement.closest(`.form-group`).remove();
    }
  });
})();

(() => {
  // Upload a lot of images

  window.imagesUpload = (item) => {
    if (!item) {
      console.warn(`Item not transfered!`);
      return false;
    }

    const fileList = item.querySelector(`[data-file-list]`),
          fileBtn = item.querySelector(`[data-file-btn]`),
          fileInput = item.querySelector(`[data-file-input]`),
          fileMultiple = fileInput.multiple,
          FILE_TYPES = [
            `image/jpeg`,
            `image/pjpeg`,
            `image/png`
          ];

    item.addEventListener(`click`, (e) => {
      const btnDelete = e.target.closest(`[data-file-remove]`);

      if (btnDelete) {
        if (btnDelete.closest(`ul`).children.length <= 1) {
          btnDelete.closest(`ul`).remove();
        } else {
          btnDelete.closest(`li`).remove();
        }
      }
    });

    const updateImageDisplay = () => {
      const listImg = fileList.querySelector(`ul`);

      const createLi = (files) => {
        const template = document.createDocumentFragment();

        [...curFiles].forEach(file => {
          let li = document.createElement(`li`),
                image,
                btnTrash = document.createElement(`button`),
                span = document.createElement(`span`);

          btnTrash.type = `button`;
          btnTrash.className = `btn btn-danger`;
          btnTrash.setAttribute(`data-file-remove`, true);
          span.className = `fa fa-trash`;
          btnTrash.appendChild(span);

          if (FILE_TYPES.indexOf(file.type) == -1) {
            image = document.createElement(`div`);
            image.innerHTML = `<svg viewBox="0 0 60 60" width="60" height="60" xmlns="http://www.w3.org/2000/svg">
              <path d="m42.5 22h-25c-0.552 0-1 0.447-1 1s0.448 1 1 1h25c0.552 0 1-0.447 1-1s-0.448-1-1-1z"/>
              <path d="m17.5 16h10c0.552 0 1-0.447 1-1s-0.448-1-1-1h-10c-0.552 0-1 0.447-1 1s0.448 1 1 1z"/>
              <path d="m42.5 30h-25c-0.552 0-1 0.447-1 1s0.448 1 1 1h25c0.552 0 1-0.447 1-1s-0.448-1-1-1z"/>
              <path d="m42.5 38h-25c-0.552 0-1 0.447-1 1s0.448 1 1 1h25c0.552 0 1-0.447 1-1s-0.448-1-1-1z"/>
              <path d="m42.5 46h-25c-0.552 0-1 0.447-1 1s0.448 1 1 1h25c0.552 0 1-0.447 1-1s-0.448-1-1-1z"/>
              <path d="M38.914,0H6.5v60h47V14.586L38.914,0z M39.5,3.414L50.086,14H39.5V3.414z M8.5,58V2h29v14h14v42H8.5z"/>
              </svg>`;
          } else {
            image = document.createElement(`img`);
            image.src = window.URL.createObjectURL(file);
          }

          li.appendChild(image);
          li.appendChild(btnTrash);

          template.appendChild(li);
        });

        return template;
      };

      if (!fileMultiple) {
        if (listImg) listImg.remove();
      }

      const curFiles = fileInput.files;

      if (curFiles.length === 0) return false;

      if (fileMultiple && listImg) {
        listImg.appendChild(createLi(curFiles));
      } else {
        const list = document.createElement(`ul`);

        list.appendChild(createLi(curFiles));
        fileList.appendChild(list);
      }
    };

    fileBtn.addEventListener(`click`, (e) => {
      fileInput.click();
    });

    fileInput.addEventListener(`change`, updateImageDisplay);
  };

  [...document.querySelectorAll(`[data-file]`)].forEach(item => {
    imagesUpload(item);
  });
})();
