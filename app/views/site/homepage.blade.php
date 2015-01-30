<!DOCTYPE html>
<html>
<head>
    @include('includes.head')
	<title>Our Love Story</title>
    <?= stylesheet_link_tag('application') ?>
</head>

<body>
<div class="cover"></div><!-- cover the whole page until loaded -->
<div class="active section section-background">
    <div class="content-wrapper-center">
        <!-- Love Heart -->
        <div class="love_heart_container">
            <div class="love_heart">
                <canvas></canvas>
            </div>
        </div>
        <!-- End of love heart -->
        <p class="countdown-note">
            Ever Since We First Met:
        </p>

        <div id="countdown"></div>
        <p class="countdown-note2">
            I'm missing YOU every day, every minute, and every second
        </p>

        <div class="multi-button">
            <a data-href="#wheel-menu" class="wheel-button center" alt="center"></a>
            <ul id="wheel-menu" data-angle="all" class="wheel">
                <li class="item"><a class="timeline" href=""></a></li>
                <li class="item"><a class="calendar" href=""></a></li>
                <li class="item"><a class="gallery" href=""></a></li>
                <li class="item"><a class="location" href=""></a></li>
                <li class="item"><a class="chat" href=""></a></li>
                <li class="item"><a class="user" href=""></a></li>
            </ul>
        </div>
        <!-- End of multiple buttons -->
    </div>
</div>
<div class="section section-pic-background has-animation">
    <div class="poem">
        <p class="line1">I love three things in this world.</p>
        <p class="line2">Sun, moon and you.</p>
        <p class="line3">Sun for morning, moon for night , and you forever.</p>
    </div>
</div>

<?= javascript_include_tag('application') ?>

<!-- BEGIN PAGE LEVEL JS -->
<script type="text/javascript">
/******************
 Countdown
 *******************/
$('#countdown').countdown({
    beginDate: new Date(2011, 7 - 1, 31 - 1), // start date is 2011-07-31, as the day we first met
    callback: function (days, hours, minutes, seconds) {
        // add your callback function here
    }
});

/**************************
 Love hearts
 **************************/
$(".love_heart").drawHeart({
    speed: 1,
    jump: 3,
    offset: {
        x: 0,
        y: -55
    }
});

/****************************
 * Wheel menu (minor conflicts with fullPage)
 ***************************/
$(".wheel-button").wheelmenu({
    trigger: "hover", // Can be "click" or "hover". Default: "click". However "click" conflicts with fullPage
    animation: "fly", // Entrance animation. Can be "fade" or "fly". Default: "fade"
    animationSpeed: "fast", // Entrance animation speed. Can be "instant", "fast", "medium", or "slow". Default: "medium"
    angle: "all" // Angle which the menu will appear. Can be "all", "N", "NE", "E", "SE", "S", "SW", "W", "NW", or even array [0, 360]. Default: "all" or [0, 360]
});

/****************************
 * Full page scroll (minor conflicts with wheel-menu)
 * Animate show
 ***************************/
$(document).ready(function () {
    $.fn.fullpage({
        slidesColor: ['WhiteSmoke', 'BlanchedAlmond ', 'LightSkyBlue'],
        navigation: true,
        loopTop: false,
        loopBottom: true
    });

	
    $.fn.animateShow({
        elements: [
            '.countdown-note',
            '#countdown',
            '.countdown-note2',
            '.multi-button',
            'div.poem .line1',
            'div.poem .line2',
            'div.poem .line3'
        ]
    })
    
});

/****************************
 * Backstretch - slideshow background
 ***************************/
$(".section-pic-background").backstretch([
    "/assets/background/1.jpg",
    "/assets/background/2.jpg",
    "/assets/background/3.jpg",
    "/assets/background/4.jpg",
    "/assets/background/5.jpg"
], {duration: 3000, fade: 750});

/****************************
 * Pace - Loading Progress
 ***************************/
Pace.on("done", function(){
    $(".cover").fadeOut(2000);
});

</script>
<!-- END PAGE LEVEL JS   -->

</body>
</html>