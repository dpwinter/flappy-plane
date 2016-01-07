// class Item (target)
var Item = Class({

  initialize: function(x, y, s) {
	this.loc = new Vector2D(x,y);
	this.speed = s;
	this.fill = "#000000";
  },

  update: function() {
	this.loc.x -= this.speed;
  }
});
