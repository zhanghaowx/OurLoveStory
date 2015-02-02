<!DOCTYPE html>
<html>
<head>
    @include('includes.head')
	<title>Our Love Story</title>
    <?= stylesheet_link_tag('application') ?>
</head>

<body>
<div class="cover"></div><!-- cover the whole page until loaded -->
<div class="active section section-background has-animation">
    <div class="content-wrapper-center">
        <!-- Love Heart -->
        <canvas class="love_heart"></canvas>
        <!-- End of love heart -->
        <div class="poem">
            <p class="line1">I love three things in this world.</p>
            <p class="line2">Sun, moon and you.</p>
            <p class="line3">Sun for morning, moon for night , and you forever.</p>
        </div>
        <div class="countdown-wrapper" style="display: none;">
            <p class="countdown-note">Ever Since We First Met:</p>
            <div id="countdown" class="countdown"></div>
            <p class="countdown-note2">I'm missing YOU every day, every minute, and every second</p>
        </div>
    </div>
</div>
<div class="background-music"></div>
<div class="background-music-control"></div>
<?= javascript_include_tag('application') ?>

<!-- BEGIN PAGE LEVEL JS -->
<script type="text/javascript">
$(document).ready(function () {
    $.fn.fullpage();
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
                oga: "{{ URL::asset('assets/Pachelbel_Canon_in_D_Major_Piano_.ogg') }}",    // Support for firefox & chrome
                m4a: "{{ URL::asset('assets/Pachelbel_Canon_in_D_Major_Piano_.m4a') }}",    // Support for safari
            });
            $(this).jPlayer("play");
        },
        cssSelectorAncestor: ".background-music-control",
        swfPath: "{{ URL::asset('assets/plugins/jplayer') }}",
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
    $(".love_heart").drawHeart({
        speed: 1,
        jump: 3
    });
});

</script>
<!-- END PAGE LEVEL JS   -->

</body>
</html>