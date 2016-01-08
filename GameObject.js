var GameObject = function GameObject(c, loc, m, rad) {
	this.color = c;
	this.location = loc;
	this.velocity = new Vector2D(0,0);
	this.acceleration = new Vector2D(0,0);
	this.mass = m;
	this.radius = rad;
}

GameObject.prototype = {
	update: function(force) {
				// mult by (0,0) equals NaN in JS.
				// this.applyForce(force);
				this.move();
			},

	outOfBounds: function() {
				if(this.location.x < 0 || this.location.y > canvas.height || this.location.y < 0) return true;
				else return false;
			 },
	
	applyForce: function(force) {
				var f = force.divide(this.mass);
				this.acceleration.multiplyEquals(f);
			},

	move: function() {
				this.velocity.addEquals(this.acceleration);
				this.location.addEquals(this.velocity);
				this.acceleration.multiplyEquals(0);
			 },

	draw: function() {
				ctx.beginPath();
				ctx.arc(this.location.x, this.location.y, this.radius, 0, Math.PI*2);
				ctx.fillStyle = this.color;
				ctx.fill();
				ctx.closePath();
			  }
}

