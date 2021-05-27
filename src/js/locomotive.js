import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

/*
 * LocomotiveScroll
 * https://github.com/locomotivemtl/locomotive-scroll
 * https://github.com/locomotivemtl/locomotive-boilerplate
 */
export default class Locomotive {
    constructor() {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true
        });
        $(document).on('click', '[data-scroll-anchor]', function(e){
            e.preventDefault();
            let href = $(this).attr('href');
            let index = href.indexOf("#");
            let target = href.slice(index);
            scroll.scrollTo(target, {
                duration: 500
            });
        });
        return scroll;
    }
}
