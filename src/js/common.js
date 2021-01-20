import objectFitImages from 'object-fit-images';
export default class common {

    constructor() {
        this.global = 'global';
        console.log('common.init');
    }

    isSP() {
        return window.matchMedia('screen and (min-width: 375px) and (max-width: 560px)').matches
    }
    isTAB() {
        return window.matchMedia('screen and (min-width: 561px) and (max-width: 960px)').matches
    }
    isPC() {
        return window.matchMedia('screen and (min-width: 961px)').matches
    }

    load() {
        this.loader();
        this.scrollEvent();
        this.setDeviceClassToBody();
        this.smoothScroll();
        this.globalMenu();
        objectFitImages();
    }

    /*
     * loader()
     * ローディング処理
     */
    loader() {
        (function(){
            setTimeout(function(){
                $('body').addClass('loadedLower');
            },500);
        })();
    }

    /*
     * scrollEvent
     * スクロール動作
     */
    scrollEvent() {
        let defPos = 0;
        $(window).scroll(function() {
            debounce(addBodyScrollClass, 10);
        });
        function addBodyScrollClass() {
            let currentPos = $(window).scrollTop();
            if (currentPos > defPos) {
                if($(window).scrollTop() >= 200) {
                    $('body').addClass('scrollDown');
                    $('body').removeClass('scrollUp');
                }
            } else {
                $('body').removeClass('scrollDown');
                $('body').addClass('scrollUp');
            }
            defPos = currentPos;
        }
        function debounce(method, delay) {
            clearTimeout(method._tId);
            method._tId= setTimeout(function() {
                method();
            }, delay);
        }
    }

    /*
     * globalMenu
     * グローバルメニューの動作
     */
    globalMenu() {
        // PCナビ
        $(window).on('scroll resize orientationchange', function(){
            let margin = 300;
            if ($(this).scrollTop() > margin) {
                $('body').addClass('scrolled');
                $('.header-nav').addClass('scroll');
            } else if ($(this).scrollTop() <= margin) {
                $('body').removeClass('scrolled');
                $('.header-nav').removeClass('scroll');
            }
        });

        // スマホメニュー
        $('.header-menu').on('click', function() {
            setNavHeight();
            $('.header-menu').toggleClass('open');
            if ($('.header-menu').hasClass('open')) {
                $('.header-nav').addClass('open');
                $('body').addClass('no-scroll');
            } else {
                $('.header-nav').removeClass('open').addClass('closing');
                $('body').removeClass('no-scroll');
                setTimeout(function(){
                    $('.header-nav').removeClass('closing');
                },2000);
            }
        });
        $('.header-nav a').on('click', function() {
            $('.header-menu').removeClass('open');
            $('.header-nav').removeClass('open').addClass('closing');
            $('body').removeClass('no-scroll');
            setTimeout(function(){
                $('.header-nav').removeClass('closing');
            },2000);
        });
        function setNavHeight() {
            $('.header-nav').css('height', (window.innerHeight - $('header').height()) + 'px');
        }
        function setModalHeight() {
            $('.aside-nav').css('height', (window.innerHeight - $('header').height()) + 'px');
        }
    }

    /*
     * smoothScroll
     * アンカーリンクのスムーススクロール
     */
    smoothScroll() {

        $('a[href^="#"]').not('.noscroll').click(function () {
            let href = $(this).attr('href');
            let target = $(href == '#' || href == '' ? 'html' : href);
            let targetPos = target.offset().top; // 移動する位置
            let scrollTop = $(window).scrollTop(); // 現在のスクロール位置
            let scroll = scrollTop - targetPos; // 移動量
            let duration = 300;

            // 移動量がマイナスの場合
            if (scroll < 0) {
                scroll = scroll * (-1);
            }
            duration = 0.7 * scroll; // 1pxを0.7ミリ秒（0.0007秒）で移動した場合の時間

            // 時間が100ミリ秒以上は300ミリ秒に設定
            if (duration > 300) {
                duration = 300;
            }

            $('html, body').animate({
                scrollTop: targetPos
            }, duration, 'swing');
            return false;
        });

    }

    /*
     * setDeviceClassToBody
     * デバイスサイズによるクラス付
     */
    setDeviceClassToBody() {
        $(window).on('load resize orientationchange', () => {

            if (this.isSP()) {
                $('body').addClass('isSP');
            } else {
                $('body').removeClass('isSP');
            }
            if (this.isTAB()) {
                $('body').addClass('isTAB');
            } else {
                $('body').removeClass('isTAB');
            }
            if (this.isPC()) {
                $('body').addClass('isPC');
            } else {
                $('body').removeClass('isPC');
            }

        });
    }
}

