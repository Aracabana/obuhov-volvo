$(document).ready(function () {
    var windowW;
    var menu = $('#js-menu-wrapper');
    var menuTop;
    $(window).resize(function () {
        windowW = $(window).width();
        menuTop = menu.offset().top;
        if (windowW >= 992) {
            $('#js-menu-btn').removeClass('open');
            $('#js-menu').removeAttr('style');
            $('.js-submenu-btn').removeClass('open');
            $('.js-submenu').removeAttr('style');
            $('#filter').addClass('in').attr('aria-expanded', true);
        } else {
            $('#filter').removeClass('in').attr('aria-expanded', false);
        }
    });
    $(window).trigger('resize');
   
    //scroll menu
    $(window).scroll(function () {
        fixMenu();
    });
    fixMenu();
    function fixMenu() {
        if ($(window).scrollTop() >= menuTop) {
                menu.addClass('fixed');
            } else {
            menu.removeClass('fixed');
        }
    }
    
    //mobile menu
    $('#js-menu-btn').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $('#js-menu').slideToggle();
    });
    $('.js-submenu-btn').click(function (e) {
        e.preventDefault();
        if (windowW < 992) {
            $(this).toggleClass('open');
            $(this).next('.js-submenu').slideToggle();
        }
    });
    
    
    //welcome-slider
    if ($('*').is('#js-welcome-slider')) {
        let welcomeSwiper = new Swiper('#js-welcome-slider', {
            preloadImages: false,
            lazy: true,
            slidesPerView: 1,
            loop: true,
            speed: 400,
            pagination: {
                el: '.swiper-pagination.welcome-slider-pagination',
                type: 'bullets',
                bulletElement: 'li',
                clickable: true
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            effect: 'slide'
        });
    }
    //articles-slider
    if ($('*').is('.js-articles-slider')) {
        let articlesSwiper = new Swiper('.js-articles-slider', {
            preloadImages: false,
            lazy: true,
            slidesPerView: 1,
            spaceBetween: 0,
            allowTouchMove: true,
            loop: true,
            speed: 400,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button.swiper-button-next.articles-swiper-button-next',
                prevEl: '.swiper-button.swiper-button-prev.articles-swiper-button-prev'
            },
            breakpoints: {
                768: {
                    allowTouchMove: true,
                    slidesPerView: 2,
                    spaceBetween: 64
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 64
                }
            }
        });
    }
    //special-offers-slider
    if ($('*').is('.js-offers-slider')) {
        let articlesSwiper = new Swiper('.js-offers-slider', {
            preloadImages: false,
            lazy: true,
            slidesPerView: 1,
            spaceBetween: 0,
            allowTouchMove: true,
            loop: false,
            speed: 400,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button.swiper-button-next.offers-swiper-button-next',
                prevEl: '.swiper-button.swiper-button-prev.offers-swiper-button-prev'
            },
            breakpoints: {
                768: {
                    allowTouchMove: true,
                    slidesPerView: 2,
                    spaceBetween: 6
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 6
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 6
                }
            }
        });
    }
    //product-slider
    if ($('*').is('.product-slider-big')) {
        var galleryThumbs = new Swiper('.product-slider-small', {
            spaceBetween: 20,
            slidesPerView: 2,
            loop: true,
            navigation: {
                nextEl: '.swiper-button.swiper-button-next.product-slider-small-button-next',
                prevEl: '.swiper-button.swiper-button-prev.product-slider-small-button-prev'
            },
            breakpoints: {
                481: {
                    slidesPerView: 3
                }
            }
        });
        var galleryTop = new Swiper('.product-slider-big', {
            loop: true,
            thumbs: {
                swiper: galleryThumbs,
            },
        });
    }
    
    $(".welcome-slider.swiper-container, .default-slider-wrapper .swiper-container").hover(function(){
        this.swiper.autoplay.stop();
    }, function(){
        this.swiper.autoplay.start();
    });
    
    //masked input
    $('input[type="tel"]').mask('+7 (999) 999 99 99');
    
    //scroll
    var links = $('.js-link');
    links.click(function(e) {
        e.preventDefault();
        var link = $(this),
            linkHref = link.attr('href'),
            top = $(linkHref).offset().top - 80;
        links.removeClass('active');
        link.addClass('active');
        $('body,html').animate({scrollTop: top}, 900);
    });
    
    //formstyler
    if ($('*').is('select')) {
        $('select').styler();
    }
    
    //ion-range-slider
    if ($('*').is('.js-ion-range-slider')) {
        var rangeSlider = $('.js-ion-range-slider'),
            rangeSliderFrom = rangeSlider.closest('.catalog-filter-item').find('.js-range-min'),
            rangeSliderTo = rangeSlider.closest('.catalog-filter-item').find('.js-range-max'),
            rangeSliderMin = rangeSlider.data('min'),
            rangeSliderMax = rangeSlider.data('max'),
            range,
            from,
            to;
        var updateValues = function (elem) {
            rangeSlider = $(elem);
            rangeSliderFrom = $(elem).closest('.catalog-filter-item').find('.js-range-min');
            rangeSliderTo = $(elem).closest('.catalog-filter-item').find('.js-range-max');
            $(rangeSliderFrom).prop("value", from);
            $(rangeSliderTo).prop("value", to);
        };
        rangeSlider.ionRangeSlider({
            type: "double",
            hide_min_max: true,
            force_edges: true,
            prettify_enabled: true,
            onChange: function (data) {
                from = data.from;
                to = data.to;
                updateValues(data.input);
            }
        });
        range = rangeSlider.data("ionRangeSlider");
        var updateRange = function (from, to) {
            range.update({
                from: from,
                to: to
            });
        };
        $(rangeSliderFrom).on("change", function (event) {
            to = $(event.target).closest('.catalog-filter-item').find('.js-range-max').prop("value");
            from = +$(this).prop("value");
            if (from < rangeSliderMin) {
                from = rangeSliderMin;
            }
            if (from > rangeSliderMax) {
                from = rangeSliderMax;
            }
            if (to >= 1 && from > to) {
                from = to;
            }
            var target = $(event.target).closest('.catalog-filter-item').find('.js-ion-range-slider');
            updateValues(target);
            range = $(target).data("ionRangeSlider");
            updateRange(from, to);
        });
        $(rangeSliderTo).on("change", function (event) {
            from = $(event.target).closest('.catalog-filter-item').find('.js-range-min').prop("value");
            to = +$(this).prop("value");
            if (to > rangeSliderMax) {
                to = rangeSliderMax;
            }
            if (to < rangeSliderMin) {
                to = rangeSliderMin;
            }
            if (from >= 1 && to < from) {
                to = from;
            }
            var target = $(event.target).closest('.catalog-filter-item').find('.js-ion-range-slider');
            updateValues(target);
            range = $(target).data("ionRangeSlider");
            updateRange(from, to);
        });
    
        //кнопка сброса фильтра
        var sliders = [];
        rangeSlider.each(function() {
            var slider = $(this).data('ionRangeSlider');
            sliders.push(slider);
        });
        $('#js-reset').click(function () {
            $(rangeSliderFrom).val(rangeSliderMin);
            $(rangeSliderTo).val(rangeSliderMax);
            for (var i = 0; i < sliders.length; i++) {
                sliders[i].reset();
            }
        });
    }
    
    //tabs
    var url = document.location.toString();
    if (url.match('#car-prices')) {
        $('.nav-tabs a[href="#car-prices"]').tab('show');
        var top = $('.nav-tabs a[href="#car-prices"]').offset().top - 120;
        $('html, body').animate({scrollTop: top}, 300);
    }
    
    //car img
    $('.js-car-color').click(function() {
        var carImg = $(this).data('img');
        $('#js-car-img').attr('src', carImg);
    });
});