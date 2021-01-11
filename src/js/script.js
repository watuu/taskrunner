/* ==============================================================
 Init Loading
 ============================================================== */
var offset = 64;
var device = setDevice();
$(function(){
    if (device != 'Mobile') {
        $("meta[name='viewport']").attr('content', 'width=1040');
    }
});
$(window).load(function(){
    /*
     * スクロール アンカーが付いている場合のメニュー分の調整
     */
    if (location.hash) {
        // var scrollPosition = 0;
        // scrollPosition = $(location.hash).offset().top - offset;
        // $("html,body").animate({ scrollTop: scrollPosition});
    }
    onLoad();
});

/* ==============================================================
 onLoad
 ============================================================== */
function onLoad(){
    /*
     * デバイス判定
     */
    $(window).on('resize load orientationchange', function(){
        device = setDevice();
    });

    /*
     * fadeIn
     */
    $('.fadeIn').addClass('show');

    /*
     * smooth scroll
     */
    $( 'a[href^="#"]' ).SmoothScroll( {
        duration: 1000,
        offset: offset,
        hash: false,
        easing: 'easeOutQuint'
    });

    /*
	 * アニメーション
	 */
    $('.anime').css({visibility: 'hidden'});
    $('[data-percent-mobileonly=1]').each(function(){
        if (device == 'Mobile') {
            $(this).removeAttr('data-percent');
        }
    });
    $('.anime').each(function() {
        $(this).waypoint(function() {
            var delay = 0;
            var animationClass = 'fadeInUp';
            if ($(this.element).attr('data-delay')) {
                delay = $(this.element).attr('data-delay');
            }
            if ($(this.element).attr('data-animation')) {
                animationClass = $(this.element).attr('data-animation');
            }
            $(this.element).css({visibility: 'visible'}).addClass(animationClass).addClass('animated');
            // $(this.element).delay(delay).queue(function(){
            //     $(this).css({visibility: 'visible'}).addClass(animationClass).addClass('animated');
            // });
        },{offset : $(this).attr('data-percent') || '90%'});
    });
    $('.waypoint').waypoint(function(direction) {
        if (direction === 'down') {
            $(this.element).addClass('animated');
        }
    },{offset : $(this).attr('data-percent') || '70%'});

    /*
     * スマホメニュー
     */
    $('.header-menu').on('click', function(){
        $('.header-menu').toggleClass('open');
        if ($('.header-menu').hasClass('open')) {
            $('.header-nav').addClass('open');
            $('body').addClass('no-scroll');
        } else {
            $('.header-nav').removeClass('open');
            $('body').removeClass('no-scroll');
        }
    });

}

function setDevice() {
    // if ($(window).width() < 768){
    var ua = navigator.userAgent;
    if ((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
        device = 'Mobile';
    } else {
        device = 'Desktop';
    }
    return device;
}




