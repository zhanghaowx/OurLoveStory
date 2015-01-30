/**
 * @name		jQuery Countdown Plugin
 * @author      Martin Angelov
 * @version    	1.0
 * @url			http://tutorialzine.com/2011/12/countdown-jquery/
 * @license		MIT License
 */

(function ($) {

    // Number of seconds in every time division
    var days = 24 * 60 * 60,
        hours = 60 * 60,
        minutes = 60;

    // Creating the plugin
    $.prototype.countdown = function (prop) {

        var options = $.extend({
            beginDate: new Date(),
            debug: false,
            callback: function () {
            }
        }, prop);

        // Initialize the plugin
        initPlugin(this, options);

        var positions = this.find('.position');
        (function tick() {
            var endDate = new Date();
            var beginDate = options.beginDate;

            var left = (endDate - beginDate) / 1000
            left = left > 0 ? left : 0

            // Number of days count
            var d = Math.floor(left / days);;
            left -= d*days;
            redrawDigits(0, 3, d > 0 ? d : 0, positions);

            // Number of hours count
            var h = Math.floor(left / hours);
            left -= h*hours;
            redrawDigits(4, 5, h > 0 ? h : 0, positions);

            // Number of minutes count
            var m = Math.floor(left / minutes);
            left -= m*minutes;
            redrawDigits(6, 7, m > 0 ? m : 0, positions);

            // Number of seconds count
            var s = Math.floor(left);
            redrawDigits(8, 9, s > 0 ? s : 0, positions);

            if (options.debug) {
                console.log(d + " days " + h + " hours " + m + " minutes " + s + " seconds from " + beginDate + " until now.")
            }

            // Calling an optional user supplied callback
            options.callback(d, h, m, s);

            // Scheduling another call of this function in 1s
            setTimeout(tick, 1000);
        })();

        // This function updates two digit positions at once
        function redrawDigits(minor, major, value, positions) {
            for (var i = minor; i <= major; i++) {
                switchDigit(positions.eq(i), Math.floor(value / Math.pow(10, major - i)) % 10);
            }
        }

        // Creates an animated transition between the two numbers
        function switchDigit(position, number) {

            var digit = position.find('.digit')

            if (digit.is(':animated')) {
                return false;
            }

            if (position.data('digit') == number) {
                // We are already showing this number
                return false;
            }

            position.data('digit', number);

            var replacement = $('<span>', {
                'class': 'digit',
                css: {
                    top: '0em',
                    opacity: 1
                },
                html: number
            });

            // The .static class is added when the animation
            // completes. This makes it run smoother.
            /*
             digit
             .before(replacement)
             .removeClass('static')
             .animate({top:'1.5em',opacity:1},'slow',function(){
             digit.remove();
             })

             replacement
             .delay(100)
             .animate({top:0,opacity:1},'slow',function(){
             replacement.addClass('static');
             });
             */
            digit.replaceWith(replacement);
        }

        return this;
    };


    function initPlugin(elem, options) {
        elem.addClass('countdownHolder');
        // Creating the markup inside the container
        $.each(['Days', ':', 'Hours', ':', 'Minutes', ':', 'Seconds'], function (i) {
            if(this == "Days") {
                $('<span class="count' + this + '">').html(
                    '<span class="position">\
                        <span class="digit static">0</span>\
                    </span>\
                    <span class="position">\
                        <span class="digit static">0</span>\
                    </span>\
                    <span class="position">\
                        <span class="digit static">0</span>\
                    </span>\
                    <span class="position">\
                        <span class="digit static">0</span>\
                    </span>'
                ).appendTo(elem);

            } else if(this == "Hours" || this == "Minutes" || this == "Seconds") {
                $('<span class="count' + this + '">').html(
                    '<span class="position">\
                        <span class="digit static">0</span>\
                    </span>\
                    <span class="position">\
                        <span class="digit static">0</span>\
                    </span>'
                ).appendTo(elem);
            } else if(this == ":"){
                elem.append('<span class="countDiv countDiv' + i + '"></span>');
            }
        });
    }
})(jQuery);