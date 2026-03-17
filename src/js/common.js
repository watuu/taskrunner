// import barba from '@barba/core';
import $ from "jQuery";
import Utility from './utility';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import 'overlayscrollbars/overlayscrollbars.css';
import {
    OverlayScrollbars,
    // ScrollbarsHidingPlugin,
    // SizeObserverPlugin,
    // ClickScrollPlugin
} from 'overlayscrollbars';

import Swiper, { Navigation, Pagination, Autoplay, Scrollbar, EffectFade } from 'swiper';
import 'swiper/css/bundle'
Swiper.use([Navigation, Pagination, Autoplay, Scrollbar, EffectFade]);

/*
 * common
 * 共通変数と関数
 */
export default class common {

    constructor() {
        gsap.registerPlugin(ScrollTrigger);
        // barba.hooks.beforeOnce((data) => {
        //     console.log('once')
        //     this.load();
        // })
        // barba.hooks.after((data) => {
        //     console.log('after')
        //     this.load();
        // });
    }

    load() {
        console.log('load')
        const osInstance = OverlayScrollbars(document.querySelector('body'), {
            showNativeOverlaidScrollbars: true,
        });

        this.loader();
        this.scrollEvent();
        this.setDeviceClassToBody();
        this.globalMenu();
        this.megaMenu();
        this.smoothScroll();
        // this.cMouseStalker();
        this.jsSplitText();
        this.jsClone();
        // this.jsStickySection();
        this.jsAccordion();
        this.jsTab();
        this.jsSwiper();
        // this.isSectionDark();
        this.isVisible();
        this.isVisibleType();
    }

    reload() {
    }

    /*
     * loader()
     * ローディング処理
     */
    loader() {
        const loadedClass = 'windowLoaded';
        const classNameScroll = 'is-scrolled';
        const marginScrolled = 300;

        window.addEventListener('load', ()=>{
            document.body.classList.add(loadedClass);
        })

        const handleScroll = () => {
            if (window.scrollY > marginScrolled) {
                document.body.classList.add(classNameScroll);
            } else {
                document.body.classList.remove(classNameScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        window.addEventListener('orientationchange', handleScroll);

    }

    /*
     * scrollEvent
     * スクロール動作
     */
    scrollEvent() {
        let defPos = 0;
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    addBodyScrollClass();
                    ticking = false;
                });
            }
        });

        function addBodyScrollClass() {
            let currentPos = window.scrollY;
            if (currentPos > defPos) {
                if (currentPos >= 200) {
                    document.body.classList.add('scrollDown');
                    document.body.classList.remove('scrollUp');
                }
            } else {
                document.body.classList.remove('scrollDown');
                document.body.classList.add('scrollUp');
            }
            defPos = currentPos;
        }

        // footerクラスの存在チェックとScrollTrigger
        const footer = document.querySelector('.l-footer');
        if (footer) {
            ScrollTrigger.create({
                trigger: footer,
                start: 'top bottom',
                onEnter: () => document.body.classList.add('is-footer-show'),
                onLeaveBack: () => document.body.classList.remove('is-footer-show'),
            });
        }
    }

    /*
     * globalMenu
     * グローバルメニューの動作
     */
    globalMenu() {

        const classNameNavOpen = 'is-nav-open';
        const classNameNavClose = 'is-nav-closing';
        const header = document.querySelector('.l-header');
        const headerMenu = document.querySelector('.l-header-menu');

        if (!header || !headerMenu) return;

        headerMenu.addEventListener('click', () => {
            setNavHeight();
            headerMenu.classList.toggle(classNameNavOpen);
            if (headerMenu.classList.contains(classNameNavOpen)) {
                document.body.classList.add(classNameNavOpen);
            } else {
                navClose();
            }
        });

        const headerLinks = header.querySelectorAll('a');
        headerLinks.forEach(link => {
            link.addEventListener('click', () => {
                headerMenu.classList.remove(classNameNavOpen);
                navClose();
            });
        });

        function setNavHeight() {
            // 任意で実装
            // headerNav.style.height = `${window.innerHeight - header.offsetHeight}px`;
        }

        // ナビゲーションを閉じる処理
        function navClose() {
            document.body.classList.remove(classNameNavOpen);
            document.body.classList.add(classNameNavClose);
            setTimeout(() => {
                document.body.classList.remove(classNameNavClose);
            }, 600);
        }

        // Escキーでメニューを閉じる
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' || event.keyCode === 27) {
                headerMenu.classList.remove(classNameNavOpen);
                navClose();
            }
        });
    }

    /*
     * smoothScroll
     * アンカーリンクのスムーススクロール
     */
    smoothScroll() {

        const anchors = document.querySelectorAll('a[data-scroll-anchor]:not(.noscroll)');

        anchors.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();

                const href = anchor.getAttribute('href');
                const index = href.indexOf('#');
                if (index === -1) return;

                const targetSelector = href.slice(index);
                const target = document.querySelector(targetSelector);
                if (!target) return;

                const targetPos = target.getBoundingClientRect().top + window.pageYOffset;
                const currentScroll = window.pageYOffset;
                let scroll = Math.abs(currentScroll - targetPos);
                let duration = 0.7 * scroll;

                if (duration > 300) {
                    duration = 300;
                }

                // スクロール
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });

                // スクロール後にURL更新（元の動作と完全一致はしないが、ほぼ同様）
                setTimeout(() => {
                    history.pushState(null, '', href);
                }, duration);
            });
        });
    }

    cMouseStalker() {
        const btn = document.querySelector('.c-btn-stalker');
        const circle = document.querySelector('.c-btn-stalker__circle');
        const ico = document.querySelector('.c-btn-stalker__ico');
        const stalkerTriggers = document.querySelectorAll('.js-stalker-show');

        if (btn && ScrollTrigger.isTouch !== 1) {
            document.addEventListener('mousemove', (e) => {
                const shift = btn.offsetWidth / 2;

                gsap.to(circle, {
                    x: e.clientX - shift,
                    y: e.clientY - shift,
                    ease: 'power1.out',
                });

                gsap.to(ico, {
                    x: e.clientX - shift,
                    y: e.clientY - shift,
                    ease: 'power1.out',
                    delay: 0.005,
                });
            });

            stalkerTriggers.forEach(trigger => {
                trigger.addEventListener('mouseover', () => {
                    btn.classList.add('on-stalker-show');
                });
                trigger.addEventListener('mouseout', () => {
                    btn.classList.remove('on-stalker-show');
                });
            });
        }
    }


    jsClone() {
        const elements = document.querySelectorAll('.js-clone');

        elements.forEach(el => {
            // data-clone-num の数だけ複製
            const cloneNum = parseInt(el.dataset.cloneNum, 10) || 1;

            for (let i = 0; i < cloneNum; i++) {
                const clone = el.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                el.parentNode.insertBefore(clone, el.nextSibling);
            }
        });
    }

    jsSplitText() {
        const domList = document.querySelectorAll('.js-split-text');

        if (domList.length) {
            domList.forEach(el => {
                Utility.convertSpiltSpan(el);
            });
        }
    }
    
    jsStickySection() {
        const container = document.querySelector('.js-sticky-section__content');
        const pin = document.querySelector('.js-sticky-section__aside');
        const asideLis = document.querySelectorAll('.js-sticky-section__aside li');
        const sections = document.querySelectorAll('.js-sticky-section__content section');

        if (container && pin && Utility.isPC()) {
            window.addEventListener('load', () => {
                // sticky
                const pinUl = pin.querySelector('ul');
                const pinHeight = pinUl ? pinUl.offsetHeight : 0;
                const headerHeightValue = getComputedStyle(document.documentElement)
                    .getPropertyValue('--header-height')
                    .trim();

                const headerHeight = headerHeightValue.endsWith('rem')
                    ? parseFloat(headerHeightValue) * parseFloat(getComputedStyle(document.documentElement).fontSize)
                    : parseFloat(headerHeightValue);

                ScrollTrigger.create({
                    trigger: container,
                    start: `top top+=${headerHeight}`,
                    end: `bottom-=${pinHeight} top+=${headerHeight}`,
                    pin: pin,
                    pinSpacing: false,
                    markers: false,
                });

                // 現在地表示
                sections.forEach((section, index) => {
                    ScrollTrigger.create({
                        trigger: section,
                        start: 'top top+=160px',
                        end: 'bottom top+=160px',
                        markers: false,
                        onEnter: () => {
                            asideLis.forEach(li => li.classList.remove('is-current'));
                            if (asideLis[index]) {
                                asideLis[index].classList.add('is-current');
                            }
                        },
                        onEnterBack: () => {
                            asideLis.forEach(li => li.classList.remove('is-current'));
                            if (asideLis[index]) {
                                asideLis[index].classList.add('is-current');
                            }
                        },
                    });
                });
            });
        }
    }


    jsAccordion() {
        // vars
        const btn = '.js-accordion';

        // functions
        if ($(btn).length) {
            $(btn).on('click', function(e){
                e.preventDefault()
                let isFlex = $(this).attr('data-accordion-flex')? true: false;
                $(this).toggleClass('is-open')
                if ($(this).hasClass('is-open')) {
                    if (isFlex) {
                        $(this).next().stop(0, 0).slideDown({
                            start: function () {
                                $(this).css({
                                    display: "flex"
                                })
                            }
                        }, 300)
                    } else {
                        $(this).next().stop(0, 0).slideDown(300)
                    }
                } else {
                    $(this).next().stop(0, 0).slideUp(300)
                }
            })
        }
    }

    jsTab() {
        document.querySelectorAll('.js-tab').forEach(container => {
            const tabs = container.querySelectorAll('.js-tabBtn');
            const contents = container.querySelectorAll('.js-tabContent');

            tabs.forEach((tab, index) => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('is-active'));
                    contents.forEach(c => c.classList.remove('is-active'));

                    tab.classList.add('is-active');
                    contents[index].classList.add('is-active');
                });
            });

            if (tabs.length > 0 && contents.length > 0) {
                tabs[0].classList.add('is-active');
                contents[0].classList.add('is-active');
            }
        });
    }

    jsSwiper() {
        const swiperAll = document.querySelectorAll('.js-swiper');

        swiperAll.forEach(wrapper => {
            const elm = wrapper.querySelector('.swiper');
            if (!elm) return;

            const paginationEl = wrapper.querySelector('.swiper-pagination');
            const prevEl = wrapper.querySelector('.swiper-prev');
            const nextEl = wrapper.querySelector('.swiper-next');

            // functions
            const mySwiper = new Swiper (elm, {
                loop: true,
                loopAdditionalSlides: wrapper.querySelectorAll('.swiper-slide').length,
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 800,
                // effect: 'fade',
                // fadeEffect: {
                //     crossFade: true,
                // },
                autoplay: wrapper.dataset.autoplay
                    ? {
                        delay: 4000,
                        disableOnInteraction: false,
                    }
                    : false,
                pagination: paginationEl
                    ? {
                        el: paginationEl,
                        clickable: true,
                    }
                    : false,
                navigation: prevEl && nextEl
                    ? {
                        prevEl,
                        nextEl,
                    }
                    : false,
            });
        })
    }

    isSectionDark() {
        const shift = Utility.isPC()?
            100/1440*window.innerWidth/2:
            75/390*window.innerWidth/2

        document.querySelectorAll('.is-section-dark').forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: `top-=${shift} top`,
                end: `bottom-=${shift} top`,
                markers: false,

                onEnter: () => document.body.classList.add('is-header-dark'),
                onLeave: () => document.body.classList.remove('is-header-dark'),
                onEnterBack: () => document.body.classList.add('is-header-dark'),
                onLeaveBack: () => document.body.classList.remove('is-header-dark'),
            });
        });
    }

    isVisible() {
        const elements = document.querySelectorAll('.js-visible');

        elements.forEach(el => {
            ScrollTrigger.create({
                trigger: el,
                toggleClass: 'is-visible',
                start: 'top bottom-=20%',
                once: true,
            });
        });
    }

    isVisibleType() {
        const domList = document.querySelectorAll('.js-visible-type');

        if (domList.length) {
            domList.forEach(el => {
                Utility.convertSpiltSpan(el);
            });

            domList.forEach(el => {
                const spans = el.querySelectorAll('span');

                gsap.set(spans, { opacity: 0, y: '20%' });

                gsap.to(spans, {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom-=20%',
                    },
                    delay: 0.5,
                    opacity: 1,
                    y: '0%',
                    stagger: 0.03,
                    ease: 'power3.out', // 修正：typoだった 'poser3.out' → 'power3.out'
                });
            });
        }
    }


    /*globalMenu
     * setDeviceClassToBody
     * デバイスサイズによるクラス付
     */
    setDeviceClassToBody() {
        const updateBodyClass = () => {
            const body = document.body;

            body.classList.toggle('isSP', Utility.isSP());
            body.classList.toggle('isTAB', Utility.isTAB());
            body.classList.toggle('isPC', Utility.isPC());
        };

        // 初回とリサイズ等に対応
        window.addEventListener('load', updateBodyClass);
        window.addEventListener('resize', updateBodyClass);
        window.addEventListener('orientationchange', updateBodyClass);
    }

}

