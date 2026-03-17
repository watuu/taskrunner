import {default as Common} from './common';
// ver6
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
// ver7
// import Swiper, { Navigation, Pagination, Autoplay, EffectCreative, FreeMode, Thumbs } from 'swiper';
// import 'swiper/css/bundle'
// Swiper.use([Navigation, Pagination, Autoplay, EffectCreative, FreeMode, Thumbs]);

/*
 * Swiper slider
 * https://swiperjs.com/swiper-api#parameters
 * https://www.webdesignleaves.com/pr/plugins/swiper_js.html
 */
export default class sliderSwiper {
    constructor() {
        // p-example
        if ($('.p-example').length) {
            this.example();
        }
    }
    example() {


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
                effect: 'fade',
                fadeEffect: {
                    crossFade: true,
                },
                autoplay: wrapper.dataset.autoplay === 'false'
                    ? false
                    : {
                        delay: 5000,
                        disableOnInteraction: false,
                    },
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

        // vars
        const elm = document.querySelectorAll('.js-swiper .swiper');

        // サイズ固定
        const mySwiper2 = new Swiper (elm, {
            loop: true,
            loopAdditionalSlides: 1,
            slidesPerView: 1.5,
            centeredSlides : true,
            spaceBetween: 20,
            navigation: {
                prevEl: '.swiper-prev',
                nextEl: '.swiper-next',
            },
            breakpoints: {
                768: {
                    centeredSlides : false,
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                }
            },
        })

        // サムネイル付き
        const mySwiperThumb = new Swiper (elmThumb, {
            loop: false,
            slidesPerView: 6,
            spaceBetween: 10,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            breakpoints: {
                768: {
                    slidesPerView: 8,
                }
            },
        });

        const mySwiper3 = new Swiper (elm, {
            loop: true,
            loopAdditionalSlides: 1,
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
                prevEl: '.swiper-prev',
                nextEl: '.swiper-next',
            },
            thumbs: {
                swiper: mySwiperThumb,
            },
        });
        $(window).on('resize orientationchange', function(){
            mySwiper.update();
        });

        // ループスライダー
        const mySwiper4 = new Swiper (elm, {
            loop: true,
            loopAdditionalSlides: 1,
            spaceBetween: 0,
            speed: 8000,
            slidesPerView: 'auto',
            allowTouchMove: false,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            breakpoints: {
                1024: {
                    slidesPerView: 2.6,
                    spaceBetween: 30,
                }
            }
        });
        // .swiper-wrapper {
        //     transition-timing-function: linear !important;
        // }
    }
}
