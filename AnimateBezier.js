function Bezier(start, ctrl1, ctrl2, end) {
	this.start = start;
	this.end = end;
	this.ctrl1 = ctrl1;
	this.ctrl2 = ctrl2;
}

function _B2(p0, p1, p2, t) {
	t = t / 1000;
	return (1-t)*(1-t)*p0 + 2 * t * (1 - t) * p1 + t * t * p2;
}

function _B3(p0, p1, p2, p3, t) {
	t = t / 1000;
	return p0 * Math.pow(1-t, 3) 
	+ 3 * p1 * t * Math.pow(1-t,2) 
	+ 3 * p2 * Math.pow(t,2) * (1-t)
	+ p3 * Math.pow(t, 3);
}

Bezier.prototype.endPoint = function(t) {
	return {
		x : _B3(this.start.x, this.ctrl1.x, this.ctrl2.x, this.end.x, t),
		y : _B3(this.start.y, this.ctrl1.y, this.ctrl2.y, this.end.y, t)
	};
};

Bezier.prototype.draw = function(t, options) {
	var currentCtrl1 = {
		x : (this.ctrl1.x - this.start.x) / 1000 * t + this.start.x,
		y : (this.ctrl1.y - this.start.y) / 1000 * t + this.start.y
	};

	var currentCtrl2 = {
		x : (this.ctrl2.x - this.ctrl1.x) / 1000 * t + this.ctrl1.x,
		y : (this.ctrl2.y - this.ctrl1.y) / 1000 * t + this.ctrl1.y
	};

	var endPoint = this.endPoint(t);
	context.save();
	context.beginPath();
	context.moveTo(this.start.x, this.start.y);
	context.bezierCurveTo(currentCtrl1.x, currentCtrl1.y, 
						  currentCtrl2.x, currentCtrl2.y, 
						  endPoint.x, endPoint.y);
	context.lineWidth = options.lineWidth || 1;
	context.strokeStyle = options.strokeStyle || "#000000";
	context.stroke();
	context.restore();
};

Bezier.prototype.animate = function(options, t) {
	if(!t) {
		t = 0;
	}
	if(t > 1000) {
		return;
	}
	if(!options.deltaT) {
		options.deltaT = 100;
	}
	this.draw(t, options);
	var _this = this;
	setTimeout(function() {
		_this.animate(options, t + options.deltaT);
	}, options.deltaT);
};