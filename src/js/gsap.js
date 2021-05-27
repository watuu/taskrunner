import {default as Common} from './common';
import {gsap,TweenMax,TimelineMax,Power2,Linear} from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/*
 * GSAP
 * https://greensock.com/cheatsheet/
 * https://gist.github.com/lunelson/7d83ca0c8bdfab170dd3
 * https://greensock.com/docs/v2/Easing
 */
export default class Gsap {
    constructor() {
        let common = new Common();
        console.log('gsap.init');
        gsap.registerPlugin(ScrollTrigger);

        // this.init();
    }

    update() {
        ScrollTrigger.update;
    }

    init() {
        // パララックス
        let elm1 = '.top-store__bg';
        gsap.set(elm1, {y: -100,});
        gsap.from(elm1, {
            scrollTrigger: {
                trigger: elm1,
                scrub: true
            },
            y: -100,
            ease: 'none',
        });

        // 汎用
        $('[data-animation="fadeIn"]').each(function(){
            gsap.set($(this), {y: 100,});
            gsap.to($(this), {
                scrollTrigger: {
                    trigger: $(this),
                },
                y: 0,
                duration: 3,
                ease: Power2.easeOut,
            });
        });

    }

    top() {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".top-mv",
                start: "top top",
                end: () => innerHeight * 3,
                markers: true,
                scrub: true,
                pin: true,
                anticipatePin: 1
            }
        })
        .to('._txt', {
            scale: 3.3333,
        });
    }
}

