$(function () {

    //SVG Fallback
    // if(!Modernizr.svg) {
    //  $("img[src*='svg']").attr("src", function() {
    //      return $(this).attr("src").replace(".svg", ".png");
    //  });
    // };


});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.header_nav a').each(function () {
        var currLink = $(this);

        // var refElement = $("[data-scroll-block="+currLink.data("scroll")+"]");
        var refElement = $( currLink.attr('src') );

        // console.log(currLink.attr('src'));
        var refElement = $(currLink.attr("href"));

        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.outerHeight() > scrollPos) {
            $('.header_nav a').removeClass("active");
            currLink.addClass("active");
            var left = $(currLink).position().left;
            var w = $(currLink).width();
            left += (w / 2 ) - 25;
            $('.menu__line').css({
                'left': left ,
            });
        }
        else{
            // currLink.removeClass("active");
        }
    });
}

$(document).ready(function() {


    onScroll();
    $(document).on("scroll", onScroll);

    $('.header_nav a').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('.header_nav a').each(function () {
            $(this).removeClass('active');
        });
        var left = $(this).position().left;
        var w = $(this).width();

        left += (w / 2 ) - 25;

        $('.menu__line').css({
            'left': left,
        });

        $(this).addClass('active');
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': refElement.offset().top+2
        }, 500, 'swing', function () {
            // window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
    //



    // Добавление фона input при заполнении
    $('.header_form input').bind('input', function() {
        if( $(this).val() != "") {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

    // Карусель в блоке Для кого подходит лендинг пейдж
    $(".who_need_lp_slider").owlCarousel({
        loop: true,
        items: 3,
        dots: false,
        nav: true,
        navText: [],
        margin: 50,
        responsive : {
            320 : {
                items: 1
            },
            480 : {
                items: 2
            },
            992 : {
                items: 3
            }
        }
    });


    $(".comment_slider").owlCarousel({
        loop: true,
        items: 2,
        dots: false,
        nav: true,
        navText: [],
        margin: 50,
        responsive : {
            320 : {
                items: 1
            },
            480 : {
                items: 2
            },
            992 : {
                items: 2
            }
        }
    });

    // View more
    var countClicksPortfolioForMobile = 0;
    function newPortfolioItem(data) {
        var figure = $('.view-more-block figure:first').clone();
        $('.view-more-block').append(figure);
        $('.view-more-block figure:last img').attr('src', data.links[countClicksPortfolioForMobile].url);
        $('.view-more-block figure:last h4').text(data.links[countClicksPortfolioForMobile].header);
        $('.view-more-block figure:last p').text(data.links[countClicksPortfolioForMobile].text);
        $('.view-more-block figure:last a').attr('href', data.links[countClicksPortfolioForMobile].url_link);
        $('.view-more-block figure:last').addClass('animated zoomIn');
        countClicksPortfolioForMobile++;
    }
    if($(document).width() <= 768 ) {
        $('button.view-more').click(function() {
            $.getJSON('./ajax/portfolio.json', function(data) {
                if(data.links[countClicksPortfolioForMobile] === undefined) {
                    $('.view-more').hide();
                    return;
                }
                newPortfolioItem(data);
            });
        });
        $('.navbar-nav > li > a').on('click',function(){
            $(this).parents('.navbar-collapse').removeClass('in');
        })
    }
    else {
        $('button.view-more').click(function() {
            for(var i = 0; i < 3; ++i) {
                $.getJSON('../ajax/portfolio.json', function(data) {
                    if(data.links[countClicksPortfolioForMobile] === undefined) {
                        $('.view-more').hide();
                        return;
                    }
                    newPortfolioItem(data);
                });
            }
        });
    }

    $('.button_go_portfolio a').click(function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top
        }, 1000);
    });

    // Show menu in mobile version
    $('.navbar-toggle').on('click', function(){
        $(this).toggleClass('active');
        $('.header_nav').toggleClass('active');
    });

    // для инициализации tooltips
    // $( document ).tooltip({
    //   track: true
    // });
    // скролл по ссылке с атрибутом href
    // $(".header_nav a[href*=#]").on("click", function(e) {
    //     e.preventDefault();
    //     var anchor = $(this);
    //     $('html, body').stop().animate({
    //         scrollTop: $(anchor.attr('href')).offset().top
    //     }, 500);
    //     return false;
    // });
    // Скролл по классу .scroll_to и атрибуту data-scroll у кнопки к примеру (data-scroll="куда скроллим" в элементе куда скроллим ставим id потом впишем в куда скроллим)
    // $(".scroll_to").on("click", function(e) {
    //     e.preventDefault();
    //     var anchor = $(this);
    //     $('html, body').stop().animate({
    //         scrollTop: $("#" + anchor.data('scroll')).offset().top
    //     }, 500);
    //     return false;
    // });


    // Select в модальном окне
    $(document).click(function() {
        $('.slct').removeClass('active');
        $('.slct').parent().find('.drop').slideUp("fast");
    });
    $('.slct').click(function() {
        /* Заносим выпадающий список в переменную */
        var dropBlock = $(this).parent().find('.drop');
        //  закрываем все открытые
        $('.slct').removeClass('active').parent().find('.drop').slideUp("fast");

        /* Делаем проверку: Если выпадающий блок скрыт то делаем его видимым*/
        if (dropBlock.is(':hidden')) {
            dropBlock.slideDown();

            /* Выделяем ссылку открывающую select */
            $(this).addClass('active');
            $(this).siblings(".slct_arrow").addClass('active');


            /* Работаем с событием клика по элементам выпадающего списка */
            $('.drop').find('li').click(function() {

                /* Заносим в переменную HTML код элемента
                списка по которому кликнули */
                var selectResult = $(this).html();

                /* Находим наш скрытый инпут и передаем в него
                значение из переменной selectResult */
                $(this).parent().parent().find('input').val(selectResult);

                /* Передаем значение переменной selectResult в ссылку которая
                открывает наш выпадающий список и удаляем активность */
                $(this).parent().parent().find(".slct").removeClass('active').html(selectResult);
                $(".slct_arrow").removeClass('active');

                /* Скрываем выпадающий блок */
                dropBlock.slideUp();
            });

            /* Продолжаем проверку: Если выпадающий блок не скрыт то скрываем его */
        } else {
            $(this).removeClass('active');
            $(".slct_arrow").removeClass('active');
            dropBlock.slideUp();
        }

        /* Предотвращаем обычное поведение ссылки при клике */
        return false;
    });
    // Открываем модальное окно
    $(".modal").click(function() {
        var id = $(this).data('modal');
        var txt =  $(this).data('info');
        $(".popup[data-modal="+id+"]").toggle("fade", 500).find("form").css('display', 'block');
        $(".popup[data-modal="+id+"] input[name=form_name").val(txt);
        $("body").css({ "overflow": "hidden", "padding-right": "17px" });

    });
    $(".overlay").click(function() {
        $(this).parent().toggle("fade", 500);
        $("body").css({ "overflow": "inherit", "padding-right": "0" });
    });
    // закрываем модальное окно
    $(".popup .close").click(function(e) {
        e.preventDefault();
        $(this).parents(".popup").toggle("fade", 500);
        $("body").css({ "overflow": "inherit", "padding-right": "0" });
    });
    //  Send form
    $("form").submit(function() { // перехватываем все при событии отправки
        var form = $(this); // запишем форму, чтобы потом не было проблем с this
        var error = [];
        form.find('.modal_form_input').each(function() { // пробежим по каждому полю в форме

            if ($(this).val() == '') { // если находим пустое
                $(this).siblings().addClass('form_error');
                error.push(true); // ошибка
            } else if ($(this).val() !== '') { // если находим не пустое
                $(this).siblings().removeClass('form_error');
                error.push(false); // нет ошибки
            }
            $(this).focus(function() {
                $(this).siblings().removeClass('form_error');
            });

        });
        form.find('.modal_form_phone').each(function() { // пробежим по каждому полю в форме
            var pattern = /^\d[\d\(\)\-]{4,14}\d$/;
            if ($(this).val() == '') { // если пустое
                $(this).siblings().addClass('form_error');
                error.push(true); // ошибка
                if ($(this).siblings().hasClass('input_error_phone')) {
                    $(this).siblings().removeClass('input_error_phone').text("").prepend("Заполните поле<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                }
            } else if ($(this).val() !== '') {
                if ($(this).val().match(pattern)) {
                    $(this).siblings().removeClass('form_error');
                    error.push(false); // нет ошибок
                } else {
                    $(this).siblings().addClass('input_error_phone form_error').text("").prepend("Введите правильный телефон<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                    error.push(true); // ошибка
                }
            }
            $(this).focus(function() {
                $(this).siblings().removeClass('form_error');
            });

        });
        form.find('.modal_form_email').each(function() { // пробежим по каждому полю в форме
            var pattern = /^(([a-zA-Z0-9]|[!#$%\*\/\?\|^\{\}`~&'\+=-_])+\.)*([a-zA-Z0-9]|[!#$%\*\/\?\|^\{\}`~&'\+=-_])+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+$/;
            if ($(this).val() == '') { // если пустое
                $(this).siblings().addClass('form_error');
                error.push(true); // ошибка
                if ($(this).siblings().hasClass('input_error_email')) {
                    $(this).siblings().removeClass('input_error_email').text("").prepend("Заполните поле<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                }

            } else if ($(this).val() !== '') {
                if ($(this).val().match(pattern)) {
                    $(this).siblings().removeClass('form_error input_error_email');
                    error.push(false); // нет ошибок
                } else {
                    $(this).siblings().addClass('input_error_email form_error').text("").prepend("Введите правильный Email<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                    error.push(true); // ошибка
                }
            }
            $(this).focus(function() {
                $(this).siblings().removeClass('form_error');
            });

        });
        var erorr_finish = 0;
        for (var i = 0; i < error.length; i++) {
            if (error[i] == false) {
                erorr_finish = erorr_finish + 1;
            };
            console.log(error[i]);
        }
        console.log(erorr_finish);
        var size = error.length - 1;
        if (erorr_finish > size) { // в зависимости от полей которые проверяются (в нашем случае 3 поля)
            var data = form.serialize(); // подготавливаем данные
            $.ajax({ // инициализируем ajax запрос
                type: 'POST', // отправляем в POST формате, можно GET
                url: 'mail.php', // путь до обработчика, у нас он лежит в той же папке
                dataType: 'json', // ответ ждем в json формате
                data: data, // данные для отправки
                beforeSend: function(data) { // событие до отправки
                    form.find('input[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
                },
                success: function(data) { // событие после удачного обращения к серверу и получения ответа
                    if (data['error']) { // если обработчик вернул ошибку
                        alert(data['error']); // покажем её текст
                    } else { // если все прошло ок

                        console.log(data['form_type']);

                        if(data['form_type'] == 'modal') {
                            $('.dm-modal form').hide(); // пишем что все ок
                            form.trigger('reset');
                            $('.dm-modal .sucess_mail').addClass('active');
                            setTimeout(function(){
                               form.parents('.popup').hide("clip", 500);
                                $("body").css({ "overflow": "inherit", "padding-right": "0" });
                            }, 3000);
                        }
                        if( data['form_type'] == 'normal' ){
                            form.trigger('reset');
                            form.find('input').removeClass('active');
                            $('.popup[data-modal=modal-res]').toggle("fade", 500);
                            $("body").css({ "overflow": "hidden", "padding-right": "17px" });
                            setTimeout(function(){
                                $('.popup[data-modal=modal-res]').hide("clip", 500);
                                $("body").css({ "overflow": "inherit", "padding-right": "0" });
                            }, 3000);
                        }

                    }
                },
                error: function(xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
                    alert(xhr.status); // покажем ответ сервера
                    alert(thrownError); // и текст ошибки
                },
                complete: function(data) { // событие после любого исхода
                    form.find('input[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
                }

            });
        }
        return false; // вырубаем стандартную отправку формы
    });

    // Height first window
    nain_window_height();

    // Fixed menu
    if ($(window).scrollTop() > 0) {
        $(".fixed_menu").addClass("fixed");
    } else {
        $('.fixed_menu').removeClass("fixed");
    }
    // remove br
    remove_br();
    // init calculate
    init_calc();
    // Calculator tab
    calc_tab();
});

$(".loader_inner").fadeOut();
$(".loader").delay(400).fadeOut("slow");

$(window).resize(function(){
    // Height first window
    nain_window_height();
});

function nain_window_height(){
    var h = $(window).height();
    if ( !window.matchMedia("(max-width: 1200px)").matches) {
        if (h < 600) {
            $(".button_go_portfolio").css('margin-bottom', '5px');
        } else {
            $(".button_go_portfolio").css('margin-bottom', '40px');
        }
    }
}
// Fixed menu
$(window).scroll(function() {
    if ($(window).scrollTop() > 0) {
        $(".fixed_menu").addClass("fixed");
    } else {
        $('.fixed_menu').removeClass("fixed");
    }
});

// Remove <br>
function remove_br(){
    if ( window.matchMedia("(max-width: 768px)").matches) {
        $('.subtitle br').remove();
    }
}

// Calculator tab
function calc_tab() {
    $('.calculate .col_custom_2 button').on('click', function() {
        var data = $(this).data('slide');
        $('.calculate .col_custom_2 button').removeClass('active');
        $(this).addClass('active');
        $('.calculate .slide_calc_wrap').removeClass('active');
        $('.calculate .slide_calc_wrap[data-slide='+data+']').addClass('active');
        calc_slide();
        set_value_slider();
        return false;
    })
}

// Calculator
function init_calc(){
    // standart
    init_slider( $( "#custom-handle span" ), $( "#slider" ), $('#input-slider-1'), 0, 500, 20 );
    init_slider( $( "#custom-handle-2 span" ), $( "#slider-2" ),$('#input-slider-2'), 0, 300, 10, 100 );
    init_slider( $( "#custom-handle-3 span" ), $( "#slider-3" ), $('#input-slider-3'), 300, 600, 10, 400 );
    // premium
    init_slider( $( "#custom-handle-4 span" ), $( "#slider-4" ), $('#input-slider-4'), 0, 400, 20, 50 );
    init_slider( $( "#custom-handle-5 span" ), $( "#slider-5" ),$('#input-slider-5'), 0, 300, 10, 100 );
    init_slider( $( "#custom-handle-6 span" ), $( "#slider-6" ), $('#input-slider-6'), 300, 600, 10, 400 );
    // gold
    init_slider( $( "#custom-handle-7 span" ), $( "#slider-7" ), $('#input-slider-7'), 0, 500, 20, 90 );
    init_slider( $( "#custom-handle-8 span" ), $( "#slider-8" ),$('#input-slider-8'), 0, 300, 10, 100 );
    init_slider( $( "#custom-handle-9 span" ), $( "#slider-9" ), $('#input-slider-9'), 300, 600, 10, 400 );
    // standart
    init_change( $( "#input-slider-1" ), $( "#slider" ) );
    init_change( $( "#input-slider-2" ), $( "#slider-2" ) );
    init_change( $( "#input-slider-3" ), $( "#slider-3" ) );
    // premium
    init_change( $( "#input-slider-4" ), $( "#slider-4" ) );
    init_change( $( "#input-slider-5" ), $( "#slider-5" ) );
    init_change( $( "#input-slider-6" ), $( "#slider-6" ) );
    // gold
    init_change( $( "#input-slider-7" ), $( "#slider-7" ) );
    init_change( $( "#input-slider-8" ), $( "#slider-8" ) );
    init_change( $( "#input-slider-9" ), $( "#slider-9" ) );

    calc_slide_change();

}

function calc_slide_change(){
    $('.slide_calc_wrap.active input').on( "change", function() {
        calc_slide();
    });
}
function calc_slide() {
    var res = 0;
    var quantity_order = $('.slide_calc_wrap.active input[name=quantity_order]').val();
    var cost_goods = $('.slide_calc_wrap.active input[name=cost_goods]').val();
    var price_goods = $('.slide_calc_wrap.active input[name=price_goods]').val();
    var price = $('.slide_calc_wrap.active input[name=price]').val();
    res = (price_goods - cost_goods) * quantity_order;
    $('#slide_porfit span').html( parseInt(res) );
    $('#slide_time span').html(  parseInt( (price/res) *30 )  );

}
function set_value_slider(){
    var data = $('.slide_calc_wrap.active').data('slide');
    var quantity_order = $('.slide_calc_wrap.active input[name=quantity_order]').val();
    var cost_goods = $('.slide_calc_wrap.active input[name=cost_goods]').val();
    var price_goods = $('.slide_calc_wrap.active input[name=price_goods]').val();

    $('.slide_calc_wrap.active .slide_item').eq(0).find('.ui-slider-handle span').html(quantity_order);
    $('.slide_calc_wrap.active .slide_item').eq(1).find('.ui-slider-handle span').html(cost_goods);
    $('.slide_calc_wrap.active .slide_item').eq(2).find('.ui-slider-handle span').html(price_goods);

}
function init_change( input, slider ){
    input.on( "change", function() {
        var val = $(this).val();
        var min = slider.slider( "option", "min" );
        var max = slider.slider( "option", "max" );
        var res = 0;
        if( val < min ) {
            res = min;
            input.val( res );
        }
        else if( val > max ) {
            res = max;
            input.val( max );
        } else {
            res = val;
        }
        slider.find('.ui-slider-handle span').html(res);
        slider.slider( "value", res );
    });
}
function init_slider(handle_text, slider, input, min, max, step, value ) {
    if( min == undefined ) {
        min = 0;
    }
    if( max == undefined ) {
        max = 300;
    }
    if( step == undefined ) {
        step = 10;
    }
    if( value == undefined ) {
        value = 100;
    }
    slider.slider({
        range: "min",
        value:value,
        min: min,
        max: max,
        step: step,
        create: function () {
            handle_text.text($(this).slider("value"));
            input.val(value);
            calc_slide();
        },
        slide: function (event, ui) {
            handle_text.text(ui.value);
            input.val(ui.value);
            calc_slide();
        }
    });
}
$('.select_service p').on('click', function() {
    $(this).toggleClass('active');
    $('.select_service ul').slideToggle('slow').toggleClass('active');
});
$('.select_service ul li').on('click', function() {
    var data = $(this).data('slide');
    $('.select_service ul li').removeClass('active');
    $(this).addClass('active');

    $('.select_service p').html( $(this).text() );
    $('.calculate .slide_calc_wrap').removeClass('active');
    $('.calculate .slide_calc_wrap[data-slide='+data+']').addClass('active');
    $('.select_service ul').slideToggle('slow').toggleClass('active');
    $('.select_service p').removeClass('active');
    calc_slide();
    set_value_slider();
    return false;
});