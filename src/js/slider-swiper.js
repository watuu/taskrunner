import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

/*
 * Swiper slider
 * https://swiperjs.com/swiper-api#parameters
 */
export default class sliderSwiper {
    constructor() {
    }
    top() {
        // vars
        let elem_container = '#slide01';
        // let elem_container = '';
        // let elem_container = '';
        // let elem_container = '';

        // functions
        let mySwiper = new Swiper (elem_container, {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides : true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                type: 'bullets',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })
    }
}
