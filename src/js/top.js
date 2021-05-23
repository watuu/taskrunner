import {default as Common} from './common';
import sliderSlick from "./slider-slick";
// import sliderSwiper from "./slider-swiper";

export default class Top {
    constructor() {
        let common = new Common();
        console.log('top.init');

        var slide = new sliderSlick();
        slide.top();

        // var swiper = new sliderSwiper();
        // swiper.top();
    }
}
