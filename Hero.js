var Hero = Class({

	initialize: function(x, y, r, ctx) {
	  this.loc = new Vector2D(x, y);
	  this.velo = new Vector2D(0,0);
	  this.acc = new Vector2D(0,0);
	  this.mass = 40;
	  this.r = r;
	  this.ctx = ctx;
	},

	applyForce: function(force) {
	  var f = force.divide(this.mass);
	  this.acc.addEquals(f);
	},

	render: function() {
  	  this.ctx.beginPath();
	  this.ctx.arc(this.loc.x, this.loc.y, this.r, 0, Math.PI*2);
	  this.ctx.fillStyle = "#FF0000";
	  this.ctx.fill();
	  this.ctx.closePath();
	},

	update: function() {
	  this.velo.addEquals(this.acc);
	  this.loc.addEquals(this.velo);
	  this.acc.multiplyEquals(0);
	},

	checkEdges: function() {
	// wrap on Y-Axis
	  if(this.loc.y > canvas.height + this.r) this.loc.y = 0;
	  else if(this.loc.y < 0 - this.r) this.loc.y = canvas.height;
	},

	display: function() {
	  this.update();
	  this.checkEdges();
	  this.render();
	 }
});
