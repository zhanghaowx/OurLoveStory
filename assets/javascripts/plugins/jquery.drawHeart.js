/*****************************************************
 * jquery-flower-heart.js v2
 *
 * A small JQuery plugin that draws a heart with flowers
 * to your website.
 * Author: Hao
 * Date: 2014.6.21
 *****************************************************/

! function ($) {

    function LoveHeart(canvas, options) {
        /**
         * NOTE: If you choose bigger size, you may want
         * to use smaller jump.
         */
        var defaults = {
            speed: 5, // [1..10], creates a new bloom every 500/speed milliseconds
            jump: 3, // [1..10] in degrees, jump 2 degrees (by default) to draw the next bloom
            size: 20, // [10..30]
            mirror: true, // draw from two directions
            offset: { // adjust the position of the heart relative to the canvas
                x: 0,
                y: 0
            }
        };

        // internal variables
        var settings = $.extend({}, defaults, options);
        // adjustment for small screens
        if ($(window).width() < 500) {
            settings.size /= 2;
            settings.jump *= 2;
            settings.speed = Math.round(settings.speed / 2);
        }

        var garden = new Garden(canvas);
        var angle = 0;
        var blooms = [];

        this.startAnimation = function () {
            // creates new blooms until reaches the density && finishes the heart
            var handler = setInterval(function () {
                if (!addBloom(angle) && angle > 360) {
                    clearInterval(handler);
                }
                if (settings.mirror) {
                    addBloom(-angle);
                }
                angle = angle + settings.jump;
            }, 500 / settings.speed);

            garden.render();
        };

        /**
         * computes the center of each bloom and creates
         * See more about heart curve at wolfram
         * http://mathworld.wolfram.com/HeartCurve.html
         */
        function createBloom(angle) {
            var t = Math.degToRad(angle);

            var positionX = (settings.size) * (16 * Math.pow(Math.sin(t), 3));
            var positionY = -settings.size * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

            var pos = new Vector2(positionX, positionY);
            pos.x += garden.canvas.width / 2 + settings.offset.x;
            pos.y += garden.canvas.height / 2 + settings.offset.y;

            return new Bloom(pos);
        }

        /**
         * creates bloom at angle and adds it to garden for rendering, if
         * there is no other blooms exist in a small area around it.
         * @returns {boolean}
         */
        function addBloom(angle) {
            var bloom = createBloom(angle);
            for (var i = 0; i < blooms.length; i++) {
                if (Vector2.distance(bloom.position, blooms[i].position) < 0.1) { // a proper value after trails
                    return false;
                }
            }

            blooms.push(bloom);
            garden.addBloom(bloom);

            return true;
        }
    }

    /**
     * If current browser supports HTML5
     * @returns {boolean}
     */
    function support_canvas() {
        return !!document.createElement('canvas').getContext;
    }

    $.fn.drawHeart = function (options) {
        if (!support_canvas()) {
            this.innerHTML = "Your browser doesn't support HTML5! Recommend use Chrome 14+/IE 9+/Firefox 7+/Safari 4+";
        } else {
            var canvas = $(this).get(0);
            canvas.width = $(window).width();
            canvas.height = $(window).height();

            // Decide canvas position
            $(canvas).css("top", "0");
            $(canvas).css("left", "0");
            $(canvas).css("right", "0");
            $(canvas).css("down", "0");
            $(canvas).css("position", "fixed");


            var heart = new LoveHeart(canvas, options);
            heart.startAnimation();
        }
    }
}(jQuery);

/**
 * The following code comes from flower power by mhepekka
 * Refactored by Hao Zhang
 */
Math = Math || {};
Math.randomFloat = function (min, max) {
    return Math.random() * (max - min) + min;
};
Math.randomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
Math.degToRad = function (angle) {
    return Math.PI / 180 * angle;
};
Math.radToDeg = function (angle) {
    return angle / Math.PI * 180;
};


/**
 * Provides a simple 2D vector class. Vector2 operations can be done using
 * member functions.
 */
function Vector2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.rotate = function (theta) {
        var x = this.x;
        var y = this.y;
        this.x = Math.cos(theta) * x - Math.sin(theta) * y;
        this.y = Math.sin(theta) * x + Math.cos(theta) * y;
        return this;
    };
    this.multiply = function (f) {
        if (f instanceof Vector2) {
            this.x *= f.x;
            this.y *= f.y;
        } else {
            this.x *= f;
            this.y *= f;
        }
        return this;
    };
    this.clone = function () {
        return new Vector2(this.x, this.y);
    };
    this.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    this.add = function (v) {
        if (v instanceof Vector2) {
            this.x += v.x;
            this.y += v.y;
        } else {
            this.x += v;
            this.y += v;
        }
        return this;
    };
    this.subtract = function (v) {
        if (v instanceof Vector2) {
            this.x -= v.x;
            this.y -= v.y;
        } else {
            this.x -= v;
            this.y -= v;
        }
        return this
    };
    this.set = function (a, b) {
        this.x = a;
        this.y = b;
        return this;
    };

    Vector2.distance = function (v1, v2) {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2))
    }
}


/**
 * Petal of a bloom
 */
function Petal(startAngle, angle, color, radius) {
    var defaults = {
        growFactor: {
            min: 0.1,
            max: 1
        },
        petalStretch: {
            min: 0.1,
            max: 3
        },
        tanAngle: 60
    };

    this.stretchA = Math.randomFloat(defaults.petalStretch.min, defaults.petalStretch.max);
    this.stretchB = Math.randomFloat(defaults.petalStretch.min, defaults.petalStretch.max);
    this.growFactor = Math.randomFloat(defaults.growFactor.min, defaults.growFactor.max);
    this.startAngle = startAngle;
    this.angle = angle;
    this.color = color;
    this.radius = radius;

    var startRadius = 1;

    this.draw = function (ctx) {
        var v1, v2, v3, v4;
        v1 = new Vector2(0, startRadius).rotate(Math.degToRad(this.startAngle));
        v2 = v1.clone().rotate(Math.degToRad(this.angle));
        v3 = v1.clone().multiply(this.stretchA); //.rotate(this.tanAngleA);
        v4 = v2.clone().multiply(this.stretchB); //.rotate(this.tanAngleB);
        ctx.strokeStyle = this.color;

        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.bezierCurveTo(v3.x, v3.y, v4.x, v4.y, v2.x, v2.y);
        ctx.stroke();
    };

    this.render = function (ctx) {
        if (startRadius <= this.radius) {
            startRadius += this.growFactor;
            this.draw(ctx);
        } else {
            this.isFinished = true;
        }
    };
}

/**
 * Blooms in garden
 */
function Bloom(position) {
    var defaults = {
        bloomRadius: {
            min: 8,
            max: 10
        },
        petalCount: {
            min: 8,
            max: 15
        },
        color: {
            rMin: 128,
            rMax: 255,
            gMin: 0,
            gMax: 128,
            bMin: 0,
            bMax: 128,
            opacity: 0.1
        }
    };

    this.position = position;
    this.petals = createPetals();

    this.draw = function (garden) {
        var ctx = garden.ctx;

        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        var isFinished = true;
        for (var i = 0; i < this.petals.length; i++) {
            var petal = this.petals[i];
            petal.render(ctx);
            if (!petal.isFinished) {
                isFinished = false;
            }
        }
        ctx.restore();
        if (isFinished == true) {
            garden.removeBloom(this);
        }
    };

    function rgba(r, g, b, a) {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }

    function randomRgba() {
        var r = Math.randomInteger(defaults.color.rMin, defaults.color.rMax);
        var g = Math.randomInteger(defaults.color.gMin, defaults.color.gMax);
        var b = Math.randomInteger(defaults.color.bMin, defaults.color.bMax);
        var a = defaults.color.opacity;
        return rgba(r, g, b, a);
    }

    function createPetals() {
        var petals = [];

        var petalCount = Math.randomInteger(defaults.petalCount.min, defaults.petalCount.max);
        var bloomRadius = Math.randomInteger(defaults.bloomRadius.min, defaults.bloomRadius.max);
        var color = randomRgba();

        var angle = 540 / petalCount; // looks like the number controls size of petals
        var startAngle = Math.randomFloat(0, 90);

        for (var i = 0; i < petalCount; i++) {
            petals.push(new Petal(startAngle + i * angle, angle, color, bloomRadius));
        }

        return petals;
    }
}

/**
 * collections of blooms
 */
function Garden(canvas) {
    this.blooms = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    /**
     * draws all flowers in garden
     */
    var that = this;
    this.render = function () {
        for (var i = 0; i < that.blooms.length; i++) {
            that.blooms[i].draw(that);
        }
        requestAnimationFrame(that.render);
    };
    /**
     * adds a bloom to garden
     * @param bloom
     */
    this.addBloom = function (bloom) {
        this.blooms.push(bloom);
    };
    /**
     * removes a bloom from garden
     * @param bloom
     */
    this.removeBloom = function (bloom) {
        for (var i = 0; i < this.blooms.length; i++) {
            if (this.blooms[i] === bloom) {
                var bloom = this.blooms.splice(i, 1);
                break;
            }
        }
    };
    /**
     * clears all flowers and drawings
     */
    this.clear = function () {
        this.blooms = [];
        // Store the current transformation matrix
        this.ctx.save();

        // Use the identity matrix while clearing the canvas
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Restore the transform
        this.ctx.restore();

    };
}