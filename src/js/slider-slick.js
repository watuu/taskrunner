import 'slick-carousel/slick/slick.css';
import slick from 'slick-carousel';

/*
 * slick slider
 * https://kenwheeler.github.io/slick/
 */
export default class sliderSlick {
    constructor() {
        console.log('slider.init');
    }
    top() {
        // vars
        let $slide = $('#slide01');

        // functions
        $slide.slick({
            infinite        : true,
            autoplaySpeed   : 5000,
            arrows          : false,
            dots            : true,
            pauseOnHover    : false,
            autoplay        : true,
            variableWidth   : true,
            pauseOnFocus    : false,
            centerMode      : true,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        variableWidth   : false,
                        centerMode      : false,
                    }
                }
            ],
        });
    }
}
