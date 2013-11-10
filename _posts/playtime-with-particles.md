{{{
  "title": "Playtime with Particles",
  "tags": ["js","canvas","animation"],
  "date": "11-10-2013",
  "description": "Simple animations with canvas - occasional series"
}}}

<p data-height="403" data-theme-id="0" data-show-tab-bar="false" data-animations="run" data-slug-hash="sGgrK" data-user="dazld" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/dazld/pen/sGgrK'>Lots of particles!</a> by Dan Peddle (<a href='http://codepen.io/dazld'>@dazld</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

I'm revisiting a bunch of old code which I made while learning a bit about canvas, and publishing bits and pieces on [codepen](http://codepen.io/dazld). 

Nothing groundbreaking, but kinda fun :) enjoy!

<!--more-->

```js
var start = Date.now();
var PI = Math.PI;
var TWOPI = Math.PI * 2;

var cnv = c = document.createElement('canvas');
var ctx = cnv.getContext('2d');

var w = window.innerWidth;
var h = window.innerHeight;

cnv.setAttribute('width', w);
cnv.setAttribute('height', h);
cnv.id = "stage";
cnv.style.width = w + "px";
cnv.style.width = w + "px";
cnv.addEventListener('mousemove', function(e) {
	var i = 0,
		toadd = 10,
		x = e.x,
		y = e.y;

	while (i < toadd) {
		var jitterX = (Math.random() * 30 << 0) - 15;
		var jitterY = (Math.random() * 30 << 0) - 15;

		points.push(spawnPoint(x + jitterX, y + jitterY));
		i++;
	}

});

if (devicePixelRatio && devicePixelRatio == 2) {

	cnv.width *= 2;
	cnv.height *= 2;
	ctx.scale(2, 2);
};


var colors = ["#aa0066", "#ce007c", "#ed0091", "#f43fa5", "#931638", "#a80c35", "#c10538", "#e00747", "#f4547c", "#ce1126", "#c41e3a", "#f993c4", "#e0ccba", "#ada07a", "#ddcca5", "#60605b", "#fce016", "#2d008e", "#3044b5", "#5b77cc", "#5b77cc", "#afbcdb"];


var points = [];

var Point = function(x, y, level) {
	this.coords = [x, y];
	this.motion = [0, 0];
	this.scaler = 0.99;
	this.scatter = 2.15;
	this.color = colors[Math.floor(Math.random() * colors.length)];
	this.radius = Math.random() * 25;
	this.theta = Math.random() * TWOPI;
	this.dead = false;
}

Point.prototype.draw = function() {

	this.update();
	ctx.globalAlpha = 0.3;
	ctx.beginPath();
	ctx.arc(this.coords[0], this.coords[1], this.radius, 0, TWOPI);
	ctx.fillStyle = this.color;
	ctx.fill();

}

Point.prototype.update = function() {

	this.coords[0] += this.motion[0];
	this.coords[1] += this.motion[1];

	this.motion[0] *= this.scaler;
	this.motion[1] *= this.scaler;

	this.theta += (Math.random() * 0.25 - 0.125) * this.scatter;

	this.motion[0] += Math.sin(this.theta) * 0.01;
	this.motion[1] += Math.cos(this.theta) * 0.01;

	this.radius *= this.scaler;
	this.dead = this.radius < 1;

	return this;

}



var lineY = Math.floor(h / 2);
var lineX = 0;

function doAnim() {

	ctx.clearRect(0, 0, w, h);

	lineX = lineX > w ? 0 : lineX + 3;
	lineY = (Math.sin(w - lineX / 0.01) * h / 6) + h / 2;

	for (var i = 0; i < 2; i++) {
		points.push(spawnPoint(lineX, lineY));
	}

	for (var i = points.length - 1; i >= 0; i--) {
		var cp = points[i];
		cp.update();

		if (cp.dead) {
			points.splice(i, 1);

		} else {
			cp.draw();
		}
	};

	requestAnimationFrame(doAnim);

}

function spawnPoint(x, y) {
	x = x || Math.random() * w << 0;
	y = y || Math.random() * h << 0;
	return new Point(x, y, 0);
}

window.onload = function() {
	document.body.appendChild(cnv);
	requestAnimationFrame(doAnim);
}

```