var canvas = document.getElementById('roseCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext("2d");


canvas.clear = function() {
	context.clearRect(0,0,canvas.width, canvas.height);
};

var MIDDLE = {
	x : canvas.width / 2,
	y : canvas.height / 2
};

var heart = {
	top : 200,
	bottom : 500,
	middle : MIDDLE.x,
	fixX : 20,
	ctrlOffsetX : MIDDLE.x,
	ctrlY : 150,
	getLeftCtrl : function() {
		return {
			x : this.middle - this.ctrlOffsetX,
			y : this.ctrlY
		};
	},
	getRightCtrl : function() {
		return {
			x : this.middle + this.ctrlOffsetX,
			y : this.ctrlY
		};
	},
	getBottomPoint : function() {
		return {
			x : this.middle,
			y : this.bottom
		};
	},
	getTopPoint : function() {
		return {
			x : this.middle,
			y : this.top
		};
	},
	getCorrectTopPoint : function(positive) {
		var topPoint = this.getTopPoint();
		var timer = positive ? 1 : -1;
		var fixX = this.fixX * timer;
		topPoint.x += fixX;
		return topPoint;
	},
	
	getCorrectBottomPoint : function(positive) {
		var bottomPoint = this.getBottomPoint();
		var timer = positive ? 1 : -1;
		var fixX = this.fixX * timer;
		bottomPoint.x += fixX;
		return bottomPoint;
	}
};

var style = {lineWidth : 10, strokeStyle : "#EE799F", deltaT : 20};

var heartLeft = new Bezier(
		heart.getBottomPoint(), 
		heart.getLeftCtrl(), 
		heart.getTopPoint());

var heartRight = new Bezier(
	heart.getTopPoint(), 
	heart.getRightCtrl(), 
	heart.getBottomPoint());

var bottomLineLeft = new Line({x : 0, y : heart.bottom}, {x : heart.middle, y : heart.bottom});
var bottomLineRight = new Line({x : heart.middle, y : heart.bottom}, {x : canvas.width, y : heart.bottom});

bottomLineLeft.animate(style);
setTimeout(heartLeft.animate.bind(heartLeft, style), 1100);
setTimeout(heartRight.animate.bind(heartRight, style), 2200);
setTimeout(bottomLineRight.animate.bind(bottomLineRight, style), 3300);

