var Hero = Class({

	initialize: function(x, y) {
	  this.loc = new Vector2D(x, y);
	  this.velo = new Vector2D(0,0);
	  this.acc = new Vector2D(0,0);
	  this.r = 20;
	  this.mass = 40;
	  this.fill = "#FF0000";
	},

	applyForce: function(force) {
	  var f = force.divide(this.mass);
	  this.acc.addEquals(f);
	},

	updatePhysics: function() {
	  this.velo.addEquals(this.acc);
	  this.loc.addEquals(this.velo);
	  this.acc.multiplyEquals(0);
	},

	checkEdges: function() {
	// wrap on Y-Axis
	  if(this.loc.y > canvas.height + this.r) this.loc.y = 0;
	  else if(this.loc.y < 0 - this.r) this.loc.y = canvas.height;
	},

	update: function() {
	  this.checkEdges();
	  this.updatePhysics();
	 }
});
