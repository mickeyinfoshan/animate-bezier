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
	ctrlOffsetX : MIDDLE.x / 4 * 3,
	ctrlTopY : 80,
	ctrlBottomY : 300,
	getTopLeftCtrl : function() {
		return {
			x : this.middle - this.ctrlOffsetX,
			y : this.ctrlTopY
		};
	},
	getBottomLeftCtrl : function() {
		return {
			x : this.middle - this.ctrlOffsetX,
			y : this.ctrlBottomY
		};
	},
	getTopRightCtrl : function() {
		return {
			x : this.middle + this.ctrlOffsetX,
			y : this.ctrlTopY
		};
	},
	getBottomRightCtrl : function() {
		return {
			x : this.middle + this.ctrlOffsetX,
			y : this.ctrlBottomY
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
	}
};

var style = {lineWidth : 5, strokeStyle : "#EE799F", deltaT : 20};

var heartLeft = new Bezier(
		heart.getBottomPoint(), 
		heart.getBottomLeftCtrl(),
		heart.getTopLeftCtrl(),  
		heart.getTopPoint());

var heartRight = new Bezier(
	heart.getTopPoint(), 
	heart.getTopRightCtrl(), 
	heart.getBottomRightCtrl(),
	heart.getBottomPoint());

var bottomLineLeft = new Line({x : 0, y : heart.bottom}, {x : heart.middle, y : heart.bottom});
var bottomLineRight = new Line({x : heart.middle, y : heart.bottom}, {x : canvas.width, y : heart.bottom});

//bottomLineLeft.animate(style);
setTimeout(heartLeft.animate.bind(heartLeft, style), 1100);
setTimeout(heartRight.animate.bind(heartRight, style), 2200);
//setTimeout(bottomLineRight.animate.bind(bottomLineRight, style), 3300);

