$(document).ready(function () {
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Select/Deselect checkboxes
    var checkbox = $('table tbody input[type="checkbox"]');
    $("#selectAll").click(function () {
        if (this.checked) {
            checkbox.each(function () {
                this.checked = true;
            });
        } else {
            checkbox.each(function () {
                this.checked = false;
            });
        }
    });
    checkbox.click(function () {
        if (!this.checked) {
            $("#selectAll").prop("checked", false);
        }
    });
});

if ($('input[name="dob"]').length) {
  $('input[name="dob"]').datetimepicker({
      format: 'YYYY-MM-DD HH:mm:ss',
  });
}
$('input[name="dob"]').click(function () {
    $(this).val('');
});


$('.btn.photo').click(function () {
    var div = $(this).parent('.row');
    div.remove();
    $('#photo').val('');

});

$('.btn.images').click(function () {
    var div = $(this).parent('.row');
    div.remove();
});

$('input:file').change(function () {
    if (this.files.length > 0) {
        $(this).css('display', 'none');
    }
})
