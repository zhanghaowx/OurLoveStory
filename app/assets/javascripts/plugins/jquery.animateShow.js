/**
 * Created by hao on 2/1/14.
 * A jQuery plugin to animate showing element
 */
!(function ($) {

    var defaults = {
        delay: 0,
        interval: 1500,
        animateSpeed: 5000,
        onComplete: function(e) {},
    };

    $.fn.animateShow = function (element, options) {
        var settings = $.extend({}, defaults, options);
        var $children = $(element).children();
        $children.each(function(i, child) {
            var $child = $(child);
            $child.css('opacity', 0);

            setTimeout(function(e) {
                e.show().css('opacity', 0).animate({
                        opacity:0.9
                    },
                    settings.animateSpeed,
                    function() {
                        // if the last element
                        if(i == $children.length - 1) {
                            settings.onComplete(element);
                        }
                    });
            }, settings.interval * i + settings.delay, $child);
        });

        /*
        for(var i = 0; i < settings.elements.length; i++) {
            var $el = $(settings.elements[i]);
            $el.hide();
            setTimeout(function(e) {
                e.show().css('opacity', 0).animate({
                        opacity:0.9
                    },
                    settings.animateSpeed,
                    function() {
                        settings.onComplete(e);
                        // if the last element
                        if(i == settings.elements.length) {
                            settings.onAllComplete(settings.elements);
                        }
                    });
            }, settings.delay * (i + 1), $el);
        }*/

        return this;
    }
})(window.jQuery);