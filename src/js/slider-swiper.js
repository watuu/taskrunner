import {default as Common} from './common';
// ver6
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
// ver7
// import Swiper, { Navigation, Paginatio, Autoplay, EffectCreative, FreeMode } from 'swiper';
// import 'swiper/css/bundle'
// Swiper.use([Navigation, Paginatio, Autoplay, EffectCreative, FreeMode]);

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
        // FV
        // vars
        let elem_container = '.p-top-mv__slide .swiper-container';

        // functions
        let mySwiper = new Swiper (elem_container, {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 0,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
            }
        });

        // サイズ固定
        let mySwiper2 = new Swiper (elem_container, {
            loop: true,
            slidesPerView: 1.5,
            centeredSlides : true,
            spaceBetween: 20,
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
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
        let mySwiperThumb = new Swiper (elem_containerThumb, {
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

        let mySwiper3 = new Swiper (elem_container, {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
            },
            thumbs: {
                swiper: mySwiperThumb,
            },
        });
        $(window).on('resize orientationchange', function(){
            mySwiper.update();
        });
    }
}
