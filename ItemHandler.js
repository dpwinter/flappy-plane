// Handles Game Events
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
		  this.collisionListener(this.items[i], i);
		  this.items[i].update();
		  // delete if out of screen
		  if(this.items[i].loc.x < -(2*this.radius)) this.deleteItem(i);
	  }
	  // this.hero.display();
	  this.drawScore();
	},
	
	spawnItem: function(x, y) {
	  // x,y-Pos, speed, context(canvas)
	  var i = new Item(x, y, this.speed, this.radius, this.ctx);
	  this.items.push(i);
	},

	deleteItem: function(index) {
	  // delete first item from array
	  this.items.shift(index);
	},

	drawScore: function() {
      this.ctx.font = "16px Arial";
      this.ctx.fillStyle = "#0095DD";
      this.ctx.fillText("Score: " + this.score, 8, 20);
    },

	//FUCKING UNDEFINED??
	collisionListener: function(it, i) {
	  var dist_vec = Vector2D.fromPoints(this.hero.loc, it.loc);
	  var dist = dist_vec.length();
	  // if collision detected
	  if(dist < (it.r + this.hero.r)) {
		this.score++;
		this.items.remove(i);
		// apply Force in other direction
		// this.hero.applyForce(new Vector2D(0,-dist_vec.y));
		// this.speed -= dist_vec.x;
		this.hero.applyForce(new Vector2D(dist_vec.x, -dist_vec.y));
	  }
    }
});

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
	  var rest = this.slice((to || from) + 1 || this.length);
	  this.length = from < 0 ? this.length + from : from;
	  return this.push.apply(this, rest);
};

