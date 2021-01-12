import {default as Common} from './common';
import {gsap,TweenMax,TimelineMax,Power2,Linear} from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/*
 * GSAP
 * https://greensock.com/cheatsheet/
 */
export default class Gsap {
    constructor() {
        let common = new Common();
        console.log('gsap.init');

        gsap.registerPlugin(ScrollTrigger);
        gsap.from('.widget-item', {
            scrollTrigger: {
                trigger: '.widget-items',
                // start: 'top -100px',
                // end: 'top -100px',
                markers: true,
            },
            y: 300,
            duration: 1.0,
            ease: 'power2',
        });
        // let tl = gsap.timeline({repeat: 2, repeatDelay: 1});
        // tl.to('#id', {x: 100, duration: 1});
        // tl.to('#id', {y: 50, duration: 1});
        // tl.to('#id', {opacity: 0, duration: 1});
    }
}

