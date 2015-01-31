/**
 * Created by hao on 2/1/14.
 * A jQuery plugin to animate showing element
 */
!(function ($) {

    var defaults = {
        delay: 0,
        interval: 1500,
        animateSpeed: 5000,
        beforeStart: function(e) {},
        afterEnd: function(e) {},
    };

    $.fn.animateShow = function (element, options) {
        var settings = $.extend({}, defaults, options);
        var $children = $(element).children();
        $children.each(function(i, child) {
            var $child = $(child);
            $child.css('opacity', 0);

            setTimeout(function(e) {
                // if first element
                if(i == 0) {
                    settings.beforeStart(element);
                }
                e.show().css('opacity', 0).animate({
                        opacity:0.9
                    },
                    settings.animateSpeed,
                    function() {
                        // if the last element
                        if(i == $children.length - 1) {
                            settings.afterEnd(element);
                        }
                    });
            }, settings.interval * i + settings.delay, $child);
        });

        return this;
    }
})(window.jQuery);