import barba from '@barba/core';
import {gsap} from 'gsap';
import {default as Common} from "./common";
import Locomotive from "./locomotive";

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
        let obj_locomotive;

        // functions
        barba.hooks.after(() => {
            if (constants.is_locomotive) {
                obj_locomotive.update();
            }
        });

        barba.init({
            transitions: [
                {
                    name: 'default-transition',
                    debug: true,
                    once: () => {
                        if (constants.is_locomotive) {
                            obj_locomotive = new Locomotive();
                        }
                    },
                    before() {
                        $mask.addClass(leavingClass);
                        setTimeout(function(){
                            $mask.removeClass(leavingClass);
                        }, leavingDuration);
                    },
                    leave(data) {
                        gsap.to(data.current.container, {
                            opacity: 0,
                        });
                    },
                    afterLeave() {
                    },
                    beforeEnter(data) {
                        if (constants.is_locomotive) {
                            obj_locomotive.setScroll(0,0);
                        } else {
                            window.scrollTo(0, 0);
                        }
                    },
                    enter(data) {
                        gsap.from(data.next.container, {
                            opacity: 0,
                        });
                        common.reload();
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
    }
}
