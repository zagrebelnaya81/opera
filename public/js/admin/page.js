let counter = 0,
    blockCounter = document.querySelector('#blockCounter');

(() => {
  const attributesObj = JSON.parse(document.querySelector(`[data-attributes-list]`).getAttribute(`data-attributes-list`)),
        optionsArr = Object.keys(attributesObj).map((key, i) => new Option(attributesObj[key], key, (i == 0), (i == 0))),
        template = document.createDocumentFragment();

  optionsArr.forEach(item => template.appendChild(item));

  document.querySelector(`[data-attributes-select]`).appendChild(template);
})();

const toggleLang = (e) => {
  const btnLink = e.target.closest(`[data-href]`);

  if (!btnLink) return false;
  if (btnLink.classList.contains(`active`)) return false;

  const href = btnLink.getAttribute(`data-href`);

  [...btnLink.closest(`[role="tablist"]`).querySelectorAll(`[data-href]`)].forEach(item => item.getAttribute(`data-href`) === href ? item.parentElement.classList.add(`active`) : item.parentElement.classList.remove(`active`));
  [...btnLink.closest(`[role="tablist"]`).nextElementSibling.querySelectorAll(`[data-id]`)].forEach(item => item.getAttribute(`data-id`) === href ? item.classList.add(`active`) : item.classList.remove(`active`));
}

[...document.querySelectorAll(`[data-panel-section]`)].forEach(item => item.addEventListener(`click`, toggleLang));

document.querySelector(`.additional__block`).addEventListener(`click`, function(e) {
  const select = document.querySelector(`[data-attributes-select]`),
        selectValue = select.value,
        selectType = select.options[select.selectedIndex],
        selectCheckedText = selectType.textContent,
        templateObj = {
          description: `
            <section class="panel panel-primary" data-panel-section>
              <input type="hidden" name="attribute_id_${counter}" value="${selectValue}">
              <input type="hidden" name="attribute_name_${counter}" value="${selectCheckedText}">
              <div class="panel-heading">
                <h2 class="panel-title panel-section-title" data-block-number>Block ${counter + 1} <span class="badge">${selectCheckedText}</span></h2>
              </div>
              <div class="panel-body">
                <ul class="nav nav-tabs" role="tablist">
                  <li role="presentation" class="active"><a data-href="en">EN</a></li>
                  <li role="presentation"><a data-href="ru">RU</a></li>
                  <li role="presentation"><a data-href="ua">UA</a></li>
                </ul>
                <div class="tab-content" data-tab-parent>
                  <div role="tabpanel" class="tab-pane active" data-id="en">
                    <div class="row">
                      <div class="col-md-6 form-group">
                        <label for="title_en_${counter}">Title</label>
                        <input type="text" id="title_en_${counter}" name="title_en_${counter}" class="form-control">
                      </div>
                      <div class="col-md-12 form-group">
                        <label for="descriptions_en_${counter}">Description</label>
                        <textarea id="descriptions_en_${counter}" name="descriptions_en_${counter}" class="form-control" data-ckeditor></textarea>
                      </div>
                    </div>
                  </div>
                  <div role="tabpanel" class="tab-pane" data-id="ru">
                    <div class="row">
                      <div class="col-md-6 form-group">
                        <label for="title_ru_${counter}">Title</label>
                        <input type="text" id="title_ru_${counter}" name="title_ru_${counter}" class="form-control">
                      </div>
                      <div class="col-md-12 form-group">
                        <label for="descriptions_ru_${counter}">Description</label>
                        <textarea id="descriptions_ru_${counter}" name="descriptions_ru_${counter}" class="form-control" data-ckeditor></textarea>
                      </div>
                    </div>
                  </div>
                  <div role="tabpanel" class="tab-pane" data-id="ua">
                    <div class="row">
                      <div class="col-md-6 form-group">
                        <label for="title_ua_${counter}">Title</label>
                        <input type="text" id="title_ua_${counter}" name="title_ua_${counter}" class="form-control">
                      </div>
                      <div class="col-md-12 form-group">
                        <label for="descriptions_ua_${counter}">Description</label>
                        <textarea id="descriptions_ua_${counter}" name="descriptions_ua_${counter}" class="form-control" data-ckeditor></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 form-group">
                    <div class="file-load" data-file>
                      <label class="file-load__label">
                        <input type="file" name="poster_${counter}" class="visually-hidden" data-file-input accept='image/*'>
                        <span class="file-load__text">Image</span>
                      </label>

                      <div class="file-load__list" data-file-list></div>

                      <button type="button" class="btn btn-success" data-file-btn>
                        <span class="glyphicon glyphicon-download-alt"></span> Add img...
                      </button>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <button type="button" class="btn btn-danger" data-btn-remove><i class="fa fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </section>
          `,
          'call-us': `
            <section class="panel panel-primary" data-panel-section>
              <input type="hidden" name="attribute_id_${counter}" value="${selectValue}">
              <input type="hidden" name="attribute_name_${counter}" value="${selectCheckedText}">
              <div class="panel-heading">
                <h2 class="panel-title panel-section-title" data-block-number>Block ${counter + 1} <span class="badge">${selectCheckedText}</span></h2>
              </div>
              <div class="panel-body">
                <ul class="nav nav-tabs" role="tablist">
                  <li role="presentation" class="active"><a data-href="en">EN</a></li>
                  <li role="presentation"><a data-href="ru">RU</a></li>
                  <li role="presentation"><a data-href="ua">UA</a></li>
                </ul>
                <div class="tab-content" data-tab-parent>
                  <div role="tabpanel" class="tab-pane active" data-id="en">
                    <div class="row">
                      <div class="col-md-6 form-group">
                        <label for="title_en_${counter}">Title</label>
                        <input type="text" id="title_en_${counter}" name="title_en_${counter}" class="form-control">
                      </div>
                      <div class="col-md-12 form-group">
                        <label for="descriptions_en_${counter}">Description</label>
                        <textarea id="descriptions_en_${counter}" name="descriptions_en_${counter}" class="form-control" data-ckeditor></textarea>
                      </div>
                    </div>
                  </div>
                  <div role="tabpanel" class="tab-pane" data-id="ru">
                    <div class="row">
                      <div class="col-md-6 form-group">
                        <label for="title_ru_${counter}">Title</label>
                        <input type="text" id="title_ru_${counter}" name="title_ru_${counter}" class="form-control">
                      </div>
                      <div class="col-md-12 form-group">
                        <label for="descriptions_ru_${counter}">Description</label>
                        <textarea id="descriptions_ru_${counter}" name="descriptions_ru_${counter}" class="form-control" data-ckeditor></textarea>
                      </div>
                    </div>
                  </div>
                  <div role="tabpanel" class="tab-pane" data-id="ua">
                    <div class="row">
                      <div class="col-md-6 form-group">
                        <label for="title_ua_${counter}">Title</label>
                        <input type="text" id="title_ua_${counter}" name="title_ua_${counter}" class="form-control">
                      </div>
                      <div class="col-md-12 form-group">
                        <label for="descriptions_ua_${counter}">Description</label>
                        <textarea id="descriptions_ua_${counter}" name="descriptions_ua_${counter}" class="form-control" data-ckeditor></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 form-group">
                    <div class="file-load" data-file>
                      <label class="file-load__label">
                        <input type="file" name="poster_${counter}" class="visually-hidden" data-file-input accept='image/*'>
                        <span class="file-load__text">Image</span>
                      </label>

                      <div class="file-load__list" data-file-list></div>

                      <button type="button" class="btn btn-success" data-file-btn>
                        <span class="glyphicon glyphicon-download-alt"></span> Add img...
                      </button>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <button type="button" class="btn btn-danger" data-btn-remove><i class="fa fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </section>
          `,
          email: `
            <section class="panel panel-primary" data-panel-section>
              <input type="hidden" name="attribute_id_${counter}" value="${selectValue}">
              <input type="hidden" name="attribute_name_${counter}" value="${selectCheckedText}">
              <div class="panel-heading">
                <h2 class="panel-title panel-section-title" data-block-number>Block ${counter + 1} <span class="badge">${selectCheckedText}</span></h2>
              </div>
              <div class="panel-body">
                <ul class="nav nav-tabs" role="tablist">
                  <li role="presentation" class="active"><a data-href="en">EN</a></li>
                  <li role="presentation"><a data-href="ru">RU</a></li>
                  <li role="presentation"><a data-href="ua">UA</a></li>
                </ul>
                <div class="row">
                  <div class="col-md-6">
                    <div class="tab-content" data-tab-parent>
                      <div role="tabpanel" class="tab-pane active" data-id="en">
                        <div class="form-group">
                          <label for="title_en_${counter}">Title</label>
                          <input type="text" id="title_en_${counter}" name="title_en_${counter}" class="form-control">
                        </div>
                      </div>
                      <div role="tabpanel" class="tab-pane" data-id="ru">
                        <div class="form-group">
                          <label for="title_ru_${counter}">Title</label>
                          <input type="text" id="title_ru_${counter}" name="title_ru_${counter}" class="form-control">
                        </div>
                      </div>
                      <div role="tabpanel" class="tab-pane" data-id="ua">
                        <div class="form-group">
                          <label for="title_ua_${counter}">Title</label>
                          <input type="text" id="title_ua_${counter}" name="title_ua_${counter}" class="form-control">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 form-group" style="margin-top: 10px">
                    <label for="descriptions_${counter}">Email</label>
                    <input id="descriptions_${counter}" type="email" name="descriptions_${counter}" class="form-control">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <button type="button" class="btn btn-danger" data-btn-remove><i class="fa fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </section>
          `,
          link: `
            <section class="panel panel-primary" data-panel-section>
              <input type="hidden" name="attribute_id_${counter}" value="${selectValue}">
              <input type="hidden" name="attribute_name_${counter}" value="${selectCheckedText}">
              <div class="panel-heading">
                <h2 class="panel-title panel-section-title" data-block-number>Block ${counter + 1} <span class="badge">${selectCheckedText}</span></h2>
              </div>
              <div class="panel-body">
                <ul class="nav nav-tabs" role="tablist">
                  <li role="presentation" class="active"><a data-href="en">EN</a></li>
                  <li role="presentation"><a data-href="ru">RU</a></li>
                  <li role="presentation"><a data-href="ua">UA</a></li>
                </ul>
                <div class="row">
                  <div class="col-md-6">
                    <div class="tab-content" data-tab-parent>
                      <div role="tabpanel" class="tab-pane active" data-id="en">
                        <div class="form-group">
                          <label for="title_en_${counter}">Title</label>
                          <input type="text" id="title_en_${counter}" name="title_en_${counter}" class="form-control">
                        </div>
                      </div>
                      <div role="tabpanel" class="tab-pane" data-id="ru">
                        <div class="form-group">
                          <label for="title_ru_${counter}">Title</label>
                          <input type="text" id="title_ru_${counter}" name="title_ru_${counter}" class="form-control">
                        </div>
                      </div>
                      <div role="tabpanel" class="tab-pane" data-id="ua">
                        <div class="form-group">
                          <label for="title_ua_${counter}">Title</label>
                          <input type="text" id="title_ua_${counter}" name="title_ua_${counter}" class="form-control">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-6" style="margin-top: 10px">
                    <label for="descriptions_${counter}">Paste link or Youtube Video Id (For example, if link is https://www.youtube.com/watch?v=VideoId111, paste VideoId111)</label>
                    <input type="text" id="descriptions_${counter}" name="descriptions_${counter}" class="form-control">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <button type="button" class="btn btn-danger" data-btn-remove><i class="fa fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </section>
          `,
          phone: `
            <section class="panel panel-primary" data-panel-section>
              <input type="hidden" name="attribute_id_${counter}" value="${selectValue}">
              <input type="hidden" name="attribute_name_${counter}" value="${selectCheckedText}">
              <div class="panel-heading">
                <h2 class="panel-title panel-section-title" data-block-number>Block ${counter + 1} <span class="badge">${selectCheckedText}</span></h2>
              </div>
              <div class="panel-body">
                <ul class="nav nav-tabs" role="tablist">
                  <li role="presentation" class="active"><a data-href="en">EN</a></li>
                  <li role="presentation"><a data-href="ru">RU</a></li>
                  <li role="presentation"><a data-href="ua">UA</a></li>
                </ul>
                <div class="row">
                  <div class="col-md-6">
                    <div class="tab-content" data-tab-parent>
                      <div role="tabpanel" class="tab-pane active" data-id="en">
                        <div class="form-group">
                          <label for="title_en_${counter}">Title</label>
                          <input type="text" id="title_en_${counter}" name="title_en_${counter}" class="form-control">
                        </div>
                      </div>
                      <div role="tabpanel" class="tab-pane" data-id="ru">
                        <div class="form-group">
                          <label for="title_ru_${counter}">Title</label>
                          <input type="text" id="title_ru_${counter}" name="title_ru_${counter}" class="form-control">
                        </div>
                      </div>
                      <div role="tabpanel" class="tab-pane" data-id="ua">
                        <div class="form-group">
                          <label for="title_ua_${counter}">Title</label>
                          <input type="text" id="title_ua_${counter}" name="title_ua_${counter}" class="form-control">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 form-group" style="margin-top: 10px">
                    <label for="descriptions_${counter}">Phone</label>
                    <input type="tel" id="descriptions_${counter}" name="descriptions_${counter}" class="form-control">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <button type="button" class="btn btn-danger" data-btn-remove><i class="fa fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </section>
          `,
          file: `
            <section class="panel panel-primary" data-panel-section>
              <input type="hidden" name="attribute_id_${counter}" value="${selectValue}">
              <input type="hidden" name="attribute_name_${counter}" value="${selectCheckedText}">
              <div class="panel-heading">
                <h2 class="panel-title panel-section-title" data-block-number>Block ${counter+1} <span class="badge">${selectCheckedText}</span></h2>
              </div>
              <div class="panel-body">
                <ul class="nav nav-tabs" role="tablist">
                  <li role="presentation" class="active"><a data-href="en">EN</a></li>
                  <li role="presentation"><a data-href="ru">RU</a></li>
                  <li role="presentation"><a data-href="ua">UA</a></li>
                </ul>
                <div class="row">
                  <div class="col-md-6">
                    <div class="tab-content" data-tab-parent>
                      <div role="tabpanel" class="tab-pane active" data-id="en">
                        <div class="form-group">
                          <label for="title_en_${counter}">Title</label>
                          <input type="text" id="title_en_${counter}" name="title_en_${counter}" class="form-control">
                        </div>
                      </div>
                      <div role="tabpanel" class="tab-pane" data-id="ru">
                        <div class="form-group">
                          <label for="title_ru_${counter}">Title</label>
                          <input type="text" id="title_ru_${counter}" name="title_ru_${counter}" class="form-control">
                        </div>
                      </div>
                      <div role="tabpanel" class="tab-pane" data-id="ua">
                        <div class="form-group">
                          <label for="title_ua_${counter}">Title</label>
                          <input type="text" id="title_ua_${counter}" name="title_ua_${counter}" class="form-control">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 form-group">
                    <div class="file-load" data-file>
                      <label class="file-load__label">
                        <input type="file" name="descriptions_${counter}" class="visually-hidden" data-file-input accept="application/pdf">
                        <span class="file-load__text">File download</span>
                      </label>

                      <div class="file-load__list" data-file-list></div>

                      <button type="button" class="btn btn-success" data-file-btn>
                        <span class="glyphicon glyphicon-download-alt"></span> Upload file
                      </button>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <button type="button" class="btn btn-danger" data-btn-remove><i class="fa fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </section>
          `,
          map_coordinates: `
            <section class="panel panel-primary" data-panel-section>
              <input type="hidden" name="attribute_id_${counter}" value="${selectValue}">
              <input type="hidden" name="attribute_name_${counter}" value="${selectCheckedText}">
              <div class="panel-heading">
                <h2 class="panel-title panel-section-title" data-block-number>Block ${counter+1} <span class="badge">${selectCheckedText}</span></h2>
              </div>
              <div class="panel-body">
                <ul class="nav nav-tabs" role="tablist">
                  <li role="presentation" class="active"><a data-href="en">EN</a></li>
                  <li role="presentation"><a data-href="ru">RU</a></li>
                  <li role="presentation"><a data-href="ua">UA</a></li>
                </ul>
                <div class="row">
                  <div class="col-md-6">
                    <div class="tab-content" data-tab-parent>
                      <div role="tabpanel" class="tab-pane active" data-id="en">
                        <div class="form-group">
                          <label for="title_en_${counter}">Title</label>
                          <input type="text" id="title_en_${counter}" name="title_en_${counter}" class="form-control">
                        </div>
                      </div>
                      <div role="tabpanel" class="tab-pane" data-id="ru">
                        <div class="form-group">
                          <label for="title_ru_${counter}">Title</label>
                          <input type="text" id="title_ru_${counter}" name="title_ru_${counter}" class="form-control">
                        </div>
                      </div>
                      <div role="tabpanel" class="tab-pane" data-id="ua">
                        <div class="form-group">
                          <label for="title_ua_${counter}">Title</label>
                          <input type="text" id="title_ua_${counter}" name="title_ua_${counter}" class="form-control">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 form-group" style="margin-top: 10px">
                    <label for="descriptions_${counter}">Map coordinates</label>
                    <input type="text" id="descriptions_${counter}" name="descriptions_${counter}" class="form-control">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <button type="button" class="btn btn-danger" data-btn-remove><i class="fa fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </section>
          `,
          gallery: `
            <section class="panel panel-primary" data-panel-section>
              <input type="hidden" name="attribute_id_${counter}" value="${selectValue}">
              <input type="hidden" name="attribute_name_${counter}" value="${selectCheckedText}">
              <div class="panel-heading">
                <h2 class="panel-title panel-section-title" data-block-number>Block ${counter + 1} <span class="badge">${selectCheckedText}</span></h2>
              </div>
              <div class="panel-body">
                <ul class="nav nav-tabs" role="tablist">
                  <li role="presentation" class="active"><a data-href="en">EN</a></li>
                  <li role="presentation"><a data-href="ru">RU</a></li>
                  <li role="presentation"><a data-href="ua">UA</a></li>
                </ul>
                <div class="row">
                  <div class="col-md-6">
                    <div class="tab-content" data-tab-parent>
                      <div role="tabpanel" class="tab-pane active" data-id="en">
                        <div class="form-group">
                          <label for="title_en_${counter}">Title</label>
                          <input type="text" id="title_en_${counter}" name="title_en_${counter}" class="form-control">
                        </div>
                      </div>
                      <div role="tabpanel" class="tab-pane" data-id="ru">
                        <div class="form-group">
                          <label for="title_ru_${counter}">Title</label>
                          <input type="text" id="title_ru_${counter}" name="title_ru_${counter}" class="form-control">
                        </div>
                      </div>
                      <div role="tabpanel" class="tab-pane" data-id="ua">
                        <div class="form-group">
                          <label for="title_ua_${counter}">Title</label>
                          <input type="text" id="title_ua_${counter}" name="title_ua_${counter}" class="form-control">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12 form-group">
                    <div class="file-load" data-file>
                      <label class="file-load__label">
                        <input type="file" name="gallery_${counter}[]" class="visually-hidden" multiple data-file-input accept='image/*'>
                        <span class="file-load__text">Image</span>
                      </label>

                      <div class="file-load__list" data-file-list></div>

                      <button type="button" class="btn btn-success" data-file-btn>
                        <span class="glyphicon glyphicon-download-alt"></span> Upload images
                      </button>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <button type="button" class="btn btn-danger" data-btn-remove><i class="fa fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </section>
          `,
        },
        divElement = document.createElement(`div`);

  divElement.innerHTML = selectCheckedText in templateObj ? templateObj[selectCheckedText] : templateObj.description;

  divElement.setAttribute(`data-parent`, true);
  divElement.addEventListener(`click`, toggleLang);

  this.closest(`[data-panel-block]`).insertAdjacentElement(`beforeBegin`, divElement);

  const firstInput = divElement.querySelector(`input:not([type="hidden"])`),
        divElementTop = divElement.getBoundingClientRect().top + document.querySelector(`.content`).scrollTop;

  setTimeout(() => {
    $(`.content`).animate({
      scrollTop: divElementTop
    }, 300, () => {
      firstInput.focus();
    });
  }, 100);

  counter++;
  blockCounter.value++;

  const eventCreated = new CustomEvent(`newBlockCreated`, {
    bubbles: true,
    cancelable: true,
    detail: {
      item: divElement
    }
  });

  divElement.dispatchEvent(eventCreated);
});

(() => {
  const recalcBlocksNumber = () => {
    [...document.querySelectorAll(`[data-block-number]`)].forEach((item, i, arr) => {
      item.innerHTML = `Block ${i+1}`
    })
  };

  window.addEventListener(`newBlockCreated`, (e) => {
    const textarea = e.detail.item.querySelectorAll(`[data-ckeditor]`);
    $(textarea).ckeditor();

    const dataFileArr = [...e.detail.item.querySelectorAll(`[data-file]`)];

    if (!dataFileArr) return false;

    dataFileArr.forEach(item => {
      imagesUpload(item);
    });

    recalcBlocksNumber();
  });

  window.addEventListener(`click`, (e) => {
    const btnRemove = e.target.closest(`[data-btn-remove]`);

    if (btnRemove) {
      btnRemove.closest(`[data-parent]`).remove();
      recalcBlocksNumber();
    }
  });
})();
