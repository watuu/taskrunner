
// console.log($('header'));
// console.log(11111);
// import Slider from "./slider";
//
// var slide = new Slider();
// slide.top();

// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// let container = document.querySelector("#scroll-container");

// let height;
// function setHeight() {
//     height = container.clientHeight;
//     document.body.style.height = height + "px";
// }
// ScrollTrigger.addEventListener("refreshInit", setHeight);
//
// gsap.to(container, {
//     y: () => -(height - document.documentElement.clientHeight),
//     ease: "none",
//     scrollTrigger: {
//         trigger: document.body,
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 1,
//         invalidateOnRefresh: true
//     }
// });
//
// function setupLinks(scroller) {
//     let linkElements = gsap.utils.toArray('.nav a'),
//         linkTargets = linkElements.map(e => document.querySelector(e.getAttribute("href"))),
//         linkPositions = [],
//         calculatePositions = () => {
//             let offset = gsap.getProperty(scroller, "y");
//             linkTargets.forEach((e, i) => linkPositions[i] = e.getBoundingClientRect().top - offset);
//         };
//
//     linkElements.forEach((element, i) => {
//         element.addEventListener("click", e => {
//             e.preventDefault();
//             gsap.to(window, {scrollTo: linkPositions[i], ease: "power4", overwrite: true});
//         });
//     });
//
//     ScrollTrigger.addEventListener("refresh", calculatePositions);
// }
//
// setupLinks(container);