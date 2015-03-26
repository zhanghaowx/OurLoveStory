$(document).ready(function () {
    $(document).fullpage();
    /******************
     * Countdown
     *******************/
    $('#countdown').countdown({
        beginDate: new Date(2011, 7 - 1, 31 - 1), // start date is 2011-07-31, as the day we first met
        callback: function (days, hours, minutes, seconds) {
            // add your callback function here
        }
    });
    /****************************
     * Backstretch - slideshow background
     ***************************/
    $(".section-background").backstretch([
        "https://farm8.staticflickr.com/7395/16233592910_daf1896a71_o.jpg",
        "https://farm9.staticflickr.com/8674/16235088447_2898dcd187_o.jpg",
        "https://farm8.staticflickr.com/7459/16420991725_a6c77cba4e_o.jpg",
        "https://farm9.staticflickr.com/8627/16235088557_7f93e2fd79_o.jpg",
        "https://farm9.staticflickr.com/8631/16235088597_53b796605e_o.jpg"
    ], {duration: 3000, fade: 750});
    /****************************
     * Background Music Player
     ***************************/
    $(".background-music").jPlayer({
        ready:function() {
            $(this).jPlayer("setMedia", {
                title: "Canon",
                oga: "assets/media/Pachelbel_Canon_in_D_Major_Piano_.ogg",    // Support for firefox & chrome
                m4a: "assets/media/Pachelbel_Canon_in_D_Major_Piano_.m4a",    // Support for safari
            });
            $(this).jPlayer("play");
        },
        cssSelectorAncestor: ".background-music-control",
        swfPath: "https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.9.2/jplayer/jquery.jplayer.swf",
        supplied: "oga, m4a",
    });
    $(".background-music").jPlayer("play");
});
/****************************
 * Pace - Loading Progress
 ***************************/
Pace.on("done", function(){
    $(".cover").fadeOut(2000);
    /**************************
     * Show Element In Order
     **************************/
    $.fn.animateShow('div.poem', {
        afterEnd: function(e) {
            $(e).fadeOut('slow');
        }
    }).animateShow('.countdown-wrapper', {
        delay: 10000,
        beforeStart: function(e) {
            $(e).show();
        }
    });
    /**************************
     * Love hearts
     **************************/
    $(".love_heart").drawHeart();
});