import {default as Common} from './common';
import 'slick-carousel/slick/slick.css';
import slick from 'slick-carousel';
export default class slider {
    constructor() {
        let common = new Common();
        console.log('slider.init');
        $(document).ready(function(){
            if ($('#slide01').length) {
                $('#slide01').slick({
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
        //     $('#slider').slick({
        //         slidesToShow: 3,
        //         centerMode: true,
        //         arrows: false,
        //         autoplay: true,
        //         autoplaySpeed: 0,
        //         speed: 7000,
        //         swipe: false,
        //         cssEase: 'linear',
        //         pauseOnFocus: false,
        //         pauseOnHover: false,
        //         pauseOnDotsHover: false,
        //         centerPadding: 0,
        //     });
        });
    }
}
