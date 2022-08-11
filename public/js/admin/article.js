$(document).ready(function () {
  select2Render($('select[name="actors[]"]'));
  select2RenderPerformances($('select[name="performances[]"]'));

  $('.btn.photo').click(function () {
    var div = $(this).parent('.row');
    div.remove();
    $('#photo').val('');

  });

  $('input:file').change(function () {
    if (this.files.length > 0) {
      $(this).css('display', 'none');
    }
  });
});

