import 'jquery.easing/jquery.easing.js';
import 'jquery.smoothscroll/dist/jquery.smoothscroll.min.js';
export default function common() {
    let device = setDevice();
    $(function(){
        // if (device != 'Mobile') {
        //     $("meta[name='viewport']").attr('content', 'width=1000');
        // }
        /*
         * SmoothScroll
         */
        if (location.hash) {
            // var scrollPosition = 0;
            // scrollPosition = $(location.hash).offset().top - offset;
            // $("html,body").animate({ scrollTop: scrollPosition});
        }
        $( 'a[href*="#"]' ).SmoothScroll( {
            duration: 1000,
            // offset: offset,
            hash: false,
            easing: 'easeOutQuint'
        });
        /*
         * スクロールイベント
         */
        var defPos = 0;
        $(window).scroll(function() {
            debounce(addBodyScrollClass, 10);
        });
        function addBodyScrollClass() {
            var currentPos = $(window).scrollTop();
            if (currentPos > defPos) {
                if($(window).scrollTop() >= 200) {
                    $("body").addClass("scrollDown");
                    $("body").removeClass("scrollUp");
                }
            } else {
                $("body").removeClass("scrollDown");
                $("body").addClass("scrollUp");
            }
            defPos = currentPos;
        }
        function debounce(method, delay) {
            clearTimeout(method._tId);
            method._tId= setTimeout(function() {
                method();
            }, delay);
        }
        /*
        * BODY LOADER
        */
        (function(){
            setTimeout(function(){
                $('body').addClass('loadedLower');
            },500);
        })();

        /*
         * PCナビ
         */
        $(window).on('scroll resize orientationchange', function(){
            var margin = 300;
            if ($(this).scrollTop() > margin) {
                $('body').addClass('scrolled');
                $('.header-nav').addClass('scroll');
            } else if ($(this).scrollTop() <= margin) {
                $('body').removeClass('scrolled');
                $('.header-nav').removeClass('scroll');
            }
        });

        /*
         * スマホメニュー
         */
        $('.header-menu').on('click', function() {
            setNavHeight();
            $('.header-menu').toggleClass('open');
            if ($('.header-menu').hasClass('open')) {
                $('.header-nav').addClass('open');
                $('body').addClass('no-scroll');
            } else {
                $('.header-nav').removeClass('open');
                $('body').removeClass('no-scroll');
            }
        });
        $('.header-nav a').on('click', function() {
            $('.header-menu').removeClass('open');
            $('.header-nav').removeClass('open');
            $('body').removeClass('no-scroll');
        });
        function setNavHeight() {
            $('.header-nav').css('height', (window.innerHeight - $('header').height()) + 'px');
        }
    });
    $(window).on('load', function() {
        /*
         * リサイズ設定
         */
        // setModalHeight();
        $(window).on('resize orientationchange', function(){
            let device = setDevice();
            // setModalHeight();
        });

        /*
         * fadeIn
         */
        $('.fadeIn').addClass('show');

    });

    function setDevice() {
        // if ($(window).width() < 768){
        let ua = navigator.userAgent;
        if ((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
            device = 'Mobile';
        } else {
            device = 'Desktop';
        }
        return device;
    }

    function setModalHeight() {
        $('.aside-nav').css('height', (window.innerHeight - $('header').height()) + 'px');
    }
}

