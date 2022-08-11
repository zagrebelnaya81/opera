export default function kasirPricePatterns() {
  (() => {
    if(!document.querySelector(`#price-table`)) return false;

    const clearMessage = () => {
            [...document.querySelectorAll(`.alert`)].forEach(item => item.style = `display: none`);
          },
          changeTitle = (id, title) => {
            [...document.querySelectorAll(`.global__table tbody tr`)].forEach(item => {
              if (item.children[0].textContent === id) item.children[1].textContent = title;
            })
          };


    $(`[data-form-price-patterns="create"]`).on(`submit`, function(e){
        e.preventDefault();
        const form = this,
              btnSubmit = this.querySelector(`[type="submit"]`);

        function message(flag, data){
          const alert = document.querySelector(`#create .alert`),
              alertContent = alert.querySelector(`.alert-content`);

          alert.classList.remove(`alert-success`);
          alert.classList.remove(`alert-danger`);
          alertContent.innerHTML = ``;

          if (flag) {
              alert.classList.add(`alert-success`);
              alertContent.textContent = `Ціновий шаблон ${data} створено`
          } else {
              alert.classList.add(`alert-danger`);
              const ul = document.createElement(`ul`);
              ul.style = `margin:0;padding:0;list-style:none`;
              for (const key in data.responseJSON.errors) {
                  ul.insertAdjacentHTML(`beforeEnd`, `<li>` + key + `: ` + data.responseJSON.errors[key] + `</li>`);
              }
              alertContent.appendChild(ul);
          }

          $(alert).fadeIn();
        };

        $.ajax({
            url: this.action,
            method: `POST`,
            data: $(this).serialize(),
            success: function(dataServer) {
              const data = dataServer.data,
                    template = document.querySelector(`#template-create`).content.querySelector(`[data-tr-template]`).cloneNode(true);

              $(template).find(`[data-td]`).each(function(index, item){
                  const itemAttribute = item.getAttribute(`data-td`);

                  if (itemAttribute === `color_code`) {
                      item.style.backgroundColor = data.color_code;
                  } else if(itemAttribute === 'is_active') {
                      let icon = '<i class="fa ' + (data.is_active ? 'fa-check' : 'fa-times') + '" style="color: ' + (data.is_active ? '#449d44' : '#af0007') + '"></i>';
                      item.innerHTML = icon;
                  } else if (itemAttribute === `edit`) {
                      item.setAttribute(`href`, item.getAttribute(`href`).replace(`current-id`, data.id));
                  } else if (itemAttribute === `delete`) {
                      // item.setAttribute(`action`, item.getAttribute(`action`).replace(`current-id`, data.id));
                      item.setAttribute(`action`, item.getAttribute(`action`) + "/" + data.id);
                  } else if (itemAttribute === `settings`){
                      item.setAttribute(`href`, item.getAttribute(`href`).replace(`current-id`, data.id));
                  } else if (itemAttribute === `hall_title`) {
                      const select = form.hall_id,
                          selectedSelectedIndex = select.options.selectedIndex;

                      item.textContent = select.options[selectedSelectedIndex].textContent;
                  } else if (itemAttribute === `price_pattern_title`) {
                    const select = form.price_pattern_id,
                    selectedSelectedIndex = select.options.selectedIndex;

                    item.textContent = select.options[selectedSelectedIndex].textContent;
                  } else {
                    item.textContent = data[itemAttribute];
                  }
              });

              $(`.global__table tbody`).prepend(template);

              message(`success`, data.title);
              const input = form.querySelector(`#title`);

              input.value = ``;
              input.focus();

              if (btnSubmit) btnSubmit.removeAttribute(`disabled`);
              $(`#create`).modal(`hide`);
            },
            error: function(data){
                message(false, data);
                if (btnSubmit) btnSubmit.removeAttribute(`disabled`);
            }
        })
    });

    $(`#create`).on(`hidden.bs.modal`, function (e) {
        clearMessage();
    });

    document.querySelector(`.global__table tbody`).addEventListener(`click`, e => {
      const target = e.target.closest(`[data-td="edit"]`),
            targetDelete = e.target.closest(`[data-td="delete"]`),
            targetTitle = $(target).closest(`tr`).find(`td`)[1];

      if (target) {
        e.preventDefault();
        const edit = $(`#edit`),
              editForm = edit.find($(`form`)),
              editUrl = $(target).attr(`href`).slice(0, $(target).attr(`href`).lastIndexOf(`/`));

        editForm.attr(`action`, editUrl);
        editForm.attr(`method`, `PATCH`);


        edit.modal(`show`);

        $.ajax({
            url: target.getAttribute(`href`),
            method: `GET`,
            success: function(dataServer) {
              const data = dataServer.data;

              for (const key in data) {
                const element = document.querySelector(`#edit .modal-content [name=${key}]`);

                if (element) {
                  element.value = data[key];
                }
              }

            },
            error: function(data){
                alert(`Обновіть сторінку`)
            }
        })
      }

      if (targetDelete) {
        $(targetDelete).on(`submit`, function(e){
            e.preventDefault();

            const form = this,
                  row = form.closest(`tr`);

            $.ajax({
              url: this.action,
              method: `POST`,
              data: $(this).serialize(),
              success: function(dataServer) {
                  const data = dataServer.data;
                  row.remove();
              },
              error: function(data){
                console.log(false, data);
              }
            })
        });
      }
    })

    $(`[data-form-price-patterns="edit"]`).on(`submit`, function(e){
      e.preventDefault();
      const form = this,
            btnSubmit = this.querySelector(`[type="submit"]`);

      function message(flag, data){
        const alert = document.querySelector(`#edit .alert`),
              alertContent = alert.querySelector(`.alert-content`);

        alert.classList.remove(`alert-success`);
        alert.classList.remove(`alert-danger`);
        alertContent.innerHTML = "";

        if (flag) {
          alert.classList.add(`alert-success`);
          alertContent.textContent = `Ціновий шаблон ${data} змінено`;

          $(edit).modal(`hide`);
          $(edit).on(`hidden.bs.modal`, function (e) {
            clearMessage();
          });

        } else {
          alert.classList.add(`alert-danger`);
          const ul = document.createElement(`ul`);
          ul.style="margin:0;padding:0;list-style:none";
          for (const key in data.responseJSON.errors) {
              ul.insertAdjacentHTML(`beforeEnd`, `<li>` + key + `: ` + data.responseJSON.errors[key] + `</li>`);
          }
          alertContent.appendChild(ul);
        }

        $(alert).fadeIn();
      };

      $.ajax({
        url: this.action,
        method: `PATCH`,
        data: $(this).serialize(),
        success: function(data) {

            console.log(data);

          message(`success`, data.title);
          const input = form.querySelector(`#title`);

          input.value = ``;
          input.focus();

          changeTitle(this.url.slice(this.url.lastIndexOf(`/`) + 1), data.title);

          const table = document.querySelector(`#price-table`),
                tableCurrentRow = [...table.rows].find(row => row.cells[0].textContent == data.id),
                tableHall = tableCurrentRow.cells[2],
                tablePattern = tableCurrentRow.cells[3];

          if (btnSubmit) btnSubmit.removeAttribute(`disabled`);

            const hallId = form.hall_id;

            if (hallId) {
              const hallIdSelectedIndex = hallId.options.selectedIndex;
              tableHall.textContent = hallId.options[hallIdSelectedIndex].textContent;
            }

            const pricePatternId = form.price_pattern_id;

            if (pricePatternId) {
              const pricePatternIdSelectedIndex = pricePatternId.options.selectedIndex;
              tablePattern.textContent = pricePatternId.options[pricePatternIdSelectedIndex].textContent;
            }
        },
        error: function(data){
            message(false, data);
            if (btnSubmit) btnSubmit.removeAttribute(`disabled`);
        }
      })
    });
  })();
}
