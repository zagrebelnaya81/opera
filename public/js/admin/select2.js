let select2Render = function (el) {
  el.select2({
    multiple: true,
    ajax : {
      url : '/actor/search',
      dataType : 'json',
      delay : 200,
      data : function(params){
        return {
          q : params.term,
          page : params.page
        };
      },
      processResults : function(data, params){
        params.page = params.page || 1;
        return {
          results : data.data,
          pagination: {
            more : (params.page  * 10) < data.total
          }
        };
      }
    },
    minimumInputLength : 1,
    templateResult : function (repo){
      // console.log(repo);
      if(repo.loading) return repo.fullName;
      return repo.fullName;
    },
    templateSelection : function(repo) {
      return repo.fullName || repo.text;
    },
    escapeMarkup : function(markup){ return markup; }
  });
  if (el.data('selected')) {
    const data = el.data('selected');
    data.forEach(item => {
      const option = new Option(item.fullName, item.id, true, true);
      el.append(option).trigger('change');
    });

    el.trigger({
      type: 'select2:select',
      params: {
        data: data
      }
    });
  }
};

let select2RenderPerformances = function (el) {
  el.select2({
    multiple: true,
    ajax : {
      url : '/performance/search',
      dataType : 'json',
      delay : 200,
      data : function(params){
        return {
          q : params.term,
          page : params.page
        };
      },
      processResults : function(data, params){
        params.page = params.page || 1;
        return {
          results : data.data,
          pagination: {
            more : (params.page  * 10) < data.total
          }
        };
      }
    },
    minimumInputLength : 1,
    templateResult : function (repo){
      if(repo.loading) return repo.title;
      let markup = repo.title;
      return markup;
    },
    templateSelection : function(repo) {
      return repo.title || repo.text;
    },
    escapeMarkup : function(markup){ return markup; }
  });
  if (el.data('selected')) {
    const data = el.data('selected');
    console.log(data)
    data.forEach(item => {
      const option = new Option(item.title, item.id, true, true);
      el.append(option).trigger('change');
    });

    el.trigger({
      type: 'select2:select',
      params: {
        data: data
      }
    });
  }
};

