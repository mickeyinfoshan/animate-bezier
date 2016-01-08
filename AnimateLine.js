function Line(start, end) {
	this.start = start;
	this.end = end;
}

Line.prototype.endPoint = function(t) {
	return {
		x : (this.end.x - this.start.x) / 1000 * t + this.start.x,
		y : (this.end.y - this.end.y) / 1000 * t + this.start.y
	};
};

Line.prototype.draw = function(t, options) {
	var endPoint = this.endPoint(t);
	context.save();
	context.beginPath();
	context.moveTo(this.start.x, this.start.y);
	context.lineTo(endPoint.x, endPoint.y);
	if(options.strokeStyle) {
		context.strokeStyle = options.strokeStyle;
	}
	if(options.lineWidth) {
		context.lineWidth = options.lineWidth;
	}
	context.stroke();
	context.restore();
};

Line.prototype.animate = function(options, t) {
	if(!t) {
		t = 0;
	}
	if(t >= 1000) {
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
}