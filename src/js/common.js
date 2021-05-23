import objectFitImages from 'object-fit-images';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Top from "./top";

/*
 * Locomotive
 * https://github.com/locomotivemtl/locomotive-scroll
 *
 */
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
        // this.smoothScroll();
        // this.locomotive();
        this.globalMenu();
        objectFitImages();
    }

    reload() {
        new Top();
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
        let classNameScroll = 'scrolled';
        let marginScrolled = 300;
        let $headerMenu = $('.header-menu');
        let $headerNav = $('.header-nav');
        let $asideNav = $('.aside-nav');

        // functions
        // スクロール判定
        $(window).on('scroll resize orientationchange', function(){
            let margin = marginScrolled;
            if ($(this).scrollTop() > margin) {
                $('body').addClass(classNameScroll);
            } else if ($(this).scrollTop() <= margin) {
                $('body').removeClass(classNameScroll);
            }
        });

        // ハンバーガーメニュー
        $headerMenu.on('click', function() {
            setNavHeight();
            $headerMenu.toggleClass('open');
            if ($headerMenu.hasClass('open')) {
                $headerNav.addClass('open');
                $('body').addClass('no-scroll');
            } else {
                $headerNav.removeClass('open').addClass('closing');
                $('body').removeClass('no-scroll');
                setTimeout(function(){
                    $headerNav.removeClass('closing');
                },2000);
            }
        });
        $headerNav.find('a').on('click', function() {
            $headerMenu.removeClass('open');
            $headerNav.removeClass('open').addClass('closing');
            $('body').removeClass('no-scroll');
            setTimeout(function(){
                $headerNav.removeClass('closing');
            },2000);
        });
        function setNavHeight() {
            $headerNav.css('height', (window.innerHeight - $('header').height()) + 'px');
        }
        function setModalHeight() {
            $asideNav.css('height', (window.innerHeight - $('header').height()) + 'px');
        }
    }

    /*
     * locomotive
     * 慣性スクロール
     */
    locomotive() {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true
        });
        $(document).on('click', '[data-scroll-anchor]', function(e){
            e.preventDefault();
            let href = $(this).attr('href');
            let index = href.indexOf("#");
            let target = href.slice(index);
            scroll.scrollTo(target, {
                duration: 500
            });
        });
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

