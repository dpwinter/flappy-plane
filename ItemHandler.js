var ItemHandler =  Class({

	initialize: function(hero, ctx) {
	  this.radius = 10;
	  this.speed = 2;
	  this.items = [];
	  this.ctx = ctx;
	  this.hero = hero;
	  this.score = 0;
	},

	update: function() {
	  for(i=this.items.length-1;i >= 0; i--) {
		  this.items[i].update();
		  this.collisionListener(this.items[i], i);
		  if(this.items[i].x < -(2*this.radius)) this.deleteItem(i);
	  }
	  this.drawScore();
	  // delete empty objects from array.
	  this.items.clean(undefined);
	},
	
	spawnItem: function(x, y) {
	  // x,y-Pos, speed, context(canvas)
	  var i = new Item(x, y, this.speed, this.radius, this.ctx);
	  this.items.push(i);
	},

	deleteItem: function(index) {
	  //use shift to shift all other items in array one place up
	  this.items.shift(index);
	},

	drawScore: function() {
      this.ctx.font = "16px Arial";
      this.ctx.fillStyle = "#0095DD";
      this.ctx.fillText("Score: " + this.score, 8, 20);
    },

	collisionListener: function(it, i) {
	  var dist_vec = Vector2D.fromPoints(this.hero.loc, it.loc);
	  var dist = dist_vec.length();
	  if(dist < (it.r + this.hero.r)) {
		this.score++;
		this.items.splice(1, i);
	  }
    }
});

Array.prototype.clean = function(deleteValue) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == deleteValue) {
			this.splice(i, 1);
			i--;
		}
	}
	return this;
};
