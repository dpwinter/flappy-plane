// class Item (target)
var Item = Class({

  initialize: function(x, y, s, rad, context) {
	this.ctx = context;
	this.speed = s;
	this.r = rad;
	this.loc = new Vector2D(x,y);
  },

  render: function() {
	this.ctx.beginPath();
	this.ctx.arc(this.loc.x, this.loc.y, this.r, 0, Math.PI*2);
	this.ctx.fillStyle = "#000000";
	this.ctx.fill();
	this.ctx.closePath();
  },
  
  update: function() {
	this.loc.x -= this.speed;
	this.render();
  }

});
