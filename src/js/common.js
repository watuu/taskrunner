import objectFitImages from 'object-fit-images';
import Top from "./top";
// import $ from "jquery";

/*
 * common
 * 共通変数と関数
 */
export default class common {

    constructor() {
        this.global = 'global';
    }

    isSP() {
        return window.matchMedia('screen and (min-width: 320px) and (max-width: 640px)').matches
    }
    isTAB() {
        return window.matchMedia('screen and (min-width: 641px) and (max-width: 960px)').matches
    }
    isPC() {
        return window.matchMedia('screen and (min-width: 961px)').matches
    }

    load() {
        this.loader();
        this.scrollEvent();
        this.setDeviceClassToBody();
        this.globalMenu();
        this.smoothScroll();
        new Top();
        if (constants.enabled_legacy_browser) {
            objectFitImages();
        }
    }

    reload() {
        new Top();
    }

    /*
     * loader()
     * ローディング処理
     */
    loader() {
        // vars
        var loadedClass = 'loadedLower';
        var classNameScroll = 'is-scrolled';
        var marginScrolled = 300;

        // functions
        // ロードクラス付与
        setTimeout(function(){
            $('body').addClass(loadedClass);
        },500);

        // スクロール判定
        $(window).on('scroll resize orientationchange', function(){
            let margin = marginScrolled;
            if ($(this).scrollTop() > margin) {
                $('body').addClass(classNameScroll);
            } else if ($(this).scrollTop() <= margin) {
                $('body').removeClass(classNameScroll);
            }
        });
    }

    /*
     * scrollEvent
     * スクロール動作
     */
    scrollEvent() {
        // vars
        let defPos = 0;

        // functions
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

        // vars
        let classNameNavOpen = 'is-nav-open';
        let classNameNavClose = 'is-nav-closing';
        let $header = $('.l-header');
        let $headerMenu = $('.l-header-menu');
        let $headerNav = $('.l-header-nav');

        // functions
        // ハンバーガーメニュー
        $headerMenu.on('click', function() {
            setNavHeight();
            $headerMenu.toggleClass(classNameNavOpen);
            if ($headerMenu.hasClass(classNameNavOpen)) {
                $('body').addClass('no-scroll').addClass(classNameNavOpen);
            } else {
                $('body').removeClass('no-scroll').removeClass(classNameNavOpen).addClass(classNameNavClose);
                setTimeout(function(){
                    $('body').removeClass(classNameNavClose);
                },1000);
            }
        });
        $header.find('a').on('click', function() {
            $headerMenu.removeClass(classNameNavOpen);
            $('body').removeClass('no-scroll').removeClass(classNameNavOpen).addClass(classNameNavClose);
            setTimeout(function(){
                $('body').removeClass(classNameNavClose);
            },1000);
        });
        function setNavHeight() {
            $headerNav.css('height', (window.innerHeight) + 'px');
        }
    }

    /*
     * smoothScroll
     * アンカーリンクのスムーススクロール
     */
    smoothScroll() {

        // vars
        let elm = $('a[data-scroll-anchor]');

        // functions
        elm.not('.noscroll').click(function () {
            let href = $(this).attr('href');
            let index = href.indexOf("#");
            let target = $(href.slice(index));
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
            }, duration, 'swing', function(){
                location.href = href;
            });
            return false;
        });
    }

    /*
     * setDeviceClassToBody
     * デバイスサイズによるクラス付
     */
    setDeviceClassToBody() {
        $(window).on('load resize orientationchange', () => {
            const body = document.querySelector('body');
            if (this.isSP()) {
                body.classList.add('isSP');
            } else {
                body.classList.remove('isSP');
            }
            if (this.isTAB()) {
                body.classList.add('isTAB');
            } else {
                body.classList.remove('isTAB');
            }
            if (this.isPC()) {
                body.classList.add('isPC');
            } else {
                body.classList.remove('isPC');
            }

        });
    }
}

