$(document).ready(function () {
    let maskBehavior = function (val) {
        val = val.split(":");
        return (parseInt(val[0]) > 19) ? "HZ:M0" : "H0:M0";
    }
    let spOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(maskBehavior.apply({}, arguments), options);
        },
        translation: {
            'H': {pattern: /[0-2]/, optional: false},
            'Z': {pattern: /[0-3]/, optional: false},
            'M': {pattern: /[0-5]/, optional: false}
        }
    };
    $('input[name="duration"]').mask(maskBehavior, spOptions);


    [...document.querySelectorAll(`select[name="special_actors[]"]`)].forEach((item) => {
        select2Render($(item));
    });

    [...document.querySelectorAll(`select[name="general_actors[]"]`)].forEach((item) => {
        select2Render($(item));
    });

    $('input[name="performance_date"]').datetimepicker({
        format: 'YYYY-MM-DD HH:mm'
    });

    $(document).on('click', '.add-date', function () {
        //performance-dates

        $.get('/admin/performance/get-new-date-section', function (res) {
            if (res.success) {
                let datesList = document.querySelector(`.performance-dates [data-dates]`);
                $(datesList).append(res.html);
                select2Render($('select[name="special_actors[]"]:last-child'));
                $(datesList).find('input[name="performance_date"]').datetimepicker();
                deleteDatePerfomance(datesList);
            }
        });
    });

    $(document).on('click', '.delete-actor-role', function () {
        $(this).parent().parent().remove();
    });

    $(document).on('click', '.add-actor-role', function () {
        let datesList = $('.performance-dates-actors');
        let appendHtml = $('#actor-template').clone().css('display', 'block');
        $(datesList).append(appendHtml);
    });

    $('#create-performance, #edit-performance').submit(function (e) {
        $('.performance-date').map((i, el) => {
            let performance = {};
            performance['date_id'] = $(el).find('input[name="performance_date_id"]').val();
            performance['date'] = $(el).find('input[name="performance_date"]').val();
            performance['special_actors'] = $(el).find('select[name="special_actors[]"]').val();
            $('<input />').attr('type', 'hidden')
                .attr('name', "performances[]")
                .attr('value', JSON.stringify(performance))
                .appendTo($(this));
        });
        return true;
    });


    //delete perfomance dates
    let deleteDatePerfomance = function (parentEl) {
        const delBntArr = [...parentEl.querySelectorAll(`[data-date-remove]`)];

        delBntArr.forEach((item) => {
            item.addEventListener(`click`, function () {
                item.closest(`[data-perfomance-date-row]`).remove();
            })
        });
    }

    deleteDatePerfomance(document);
});
