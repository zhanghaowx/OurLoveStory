/**
 * Created by hao on 2/1/14.
 * A jQuery plugin to animate showing element
 */
!(function ($) {

    var defaults = {
        elements: [],
        delay: 1500,
        animateSpeed: 5000
    };

    $.fn.animateShow = function (options) {
        var settings = $.extend({}, defaults, options);
        for(var i = 0; i < settings.elements.length; i++) {
            var el = $(settings.elements[i]);
            el.css('opacity', 0);
            setTimeout(function(e){
                e.animate({opacity:0.9}, settings.animateSpeed);
            }, settings.delay * i, el);
        }
        return this;
    }
})(window.jQuery);