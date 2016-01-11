var GameObject = function GameObject(c, loc, m, rad) {
	this.color = c;
	this.location = loc;
	this.velocity = new Vector2D(0,0);
	this.acceleration = new Vector2D(0,0);
	this.mass = m;
	this.radius = rad;
}

GameObject.prototype = {
	setLocation: function(loc) {
				this.location = loc;
			},

	setVelocity: function(velo) {
				this.velocity = velo;
			},

	update: function(force) {
				if(force!=undefined) this.applyForce(force);
				this.move();
			},

	outOfBounds: function() {
				var x = this.location.x;
				var y = this.location.y;
				var rad = this.radius;
				var offsetWidth = canvas.width + rad + 2;
				var offsetHeight = canvas.height + rad;
				if(x > rad && x < offsetWidth && y > rad && y < offsetHeight)
					 return false;
				else return true;
			 },
	
	applyForce: function(force) {
				var f = force.divide(this.mass);
				this.acceleration.addEquals(f);
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

