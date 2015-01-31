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
        "/assets/background/1.jpg",
        "/assets/background/2.jpg",
        "/assets/background/3.jpg",
        "/assets/background/4.jpg",
        "/assets/background/5.jpg"
    ], {duration: 3000, fade: 750});
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