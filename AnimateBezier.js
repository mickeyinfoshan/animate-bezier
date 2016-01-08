function Bezier(start, ctrl, end) {
	this.start = start;
	this.end = end;
	this.ctrl = ctrl;
}

function _B(p0, p1, p2, t) {
	t = t / 1000;
	return (1-t)*(1-t)*p0 + 2 * t * (1 - t) * p1 + t * t * p2;
}

Bezier.prototype.endPoint = function(t) {
	return {
		x : _B(this.start.x, this.ctrl.x, this.end.x, t),
		y : _B(this.start.y, this.ctrl.y, this.end.y, t)
	};
};

Bezier.prototype.draw = function(t, options) {
	var currentCtrl = {
		x : (this.ctrl.x - this.start.x) / 1000 * t + this.start.x,
		y : (this.ctrl.y - this.start.y) / 1000 * t + this.start.y
	};
	var endPoint = this.endPoint(t);
	context.save();
	context.beginPath();
	context.moveTo(this.start.x, this.start.y);
	context.quadraticCurveTo(currentCtrl.x, currentCtrl.y, endPoint.x, endPoint.y);
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