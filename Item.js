// class Item (target)
var Item = Class({

  initialize: function(x, y, s, context) {
	var ctx;
	var x, y, r, speed;
	this.ctx = context;
	this.speed = s;
	this.r = 10;
	this.x = x;
	this.y = y;
  },

  draw: function() {
	this.ctx.beginPath();
	this.ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
	this.ctx.fillStyle = "#000000";
	this.ctx.fill();
	this.ctx.closePath();
  },
  
  update: function() {
	this.x -= this.speed;
  }
});

