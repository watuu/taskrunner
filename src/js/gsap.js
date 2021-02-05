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

        $('[data-trigger]').each(function(){
            ScrollTrigger.create({
                trigger: this,
                toggleClass: 'visible',
                once: true,
            })
        });

        if ($('body').hasClass('home')) {
            $(window).on('load', () => {
                this.top();
            })
        }

    }

    top() {
        // トップ MV イントロ
        let tl = gsap.timeline();
        tl.to('.top-mv__bg',{
            scrollTrigger: {
                trigger: '.top-mv__bg',
                scrub: true,
                // markers: true,
            },
            delay: 0,
            duration: 0,
            className:"+=top-mv__bg animated",
        })
        .set('.top-mv__body ._ico', {
            delay: 1.5,
            duration: 0,
            className:"+=_ico animated",
        });

        // トップ MV パララックス
        gsap.from('.top-mv__body', {
            scrollTrigger: {
                trigger: '.top-mv__body',
                scrub: true
            },
            y: -100,
            ease: "none",
        });
    }
}

