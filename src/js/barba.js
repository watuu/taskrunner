import barba from '@barba/core';
import {gsap} from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';
import {default as Common} from "./common";

/*
 * Barba pjax
 * https://barba.js.org/docs/advanced/hooks/
 * demo https://ihatetomatoes.net/demos/barbajs/
 */
export default class Barba {
    constructor() {
        // vars
        let common = new Common();
        let $mask = $('body');
        let leavingClass = 'is-leaving';
        let leavingDuration = 1000;
        // const scroll = new LocomotiveScroll();

        // functions
        barba.hooks.after(() => {
            // scroll.init();
        });

        barba.init({
            transitions: [
                {
                    name: 'default-transition',
                    debug: true,
                    before() {
                        $mask.addClass(leavingClass);
                        setTimeout(function(){
                            $mask.removeClass(leavingClass);
                        }, leavingDuration);
                    },
                    leave(data) {
                        gsap.to(data.current.container, {
                            opacity: 0,
                            y: 100,
                        });
                    },
                    afterLeave() {
                    },
                    enter(data) {
                        gsap.from(data.next.container, {
                            opacity: 0,
                            y: 100,
                        });
                    }
                }
            ],
            schema: {
                prefix: 'id',
                wrapper: 'body',
                container: 'main',
            },
            prevent: ({ el }) => el.hasAttribute("data-scroll-anchor")
        });
        barba.hooks.enter(() => {
            window.scrollTo(0, 0);
            common.reload();
        });
    }
    top() {

    }
}
