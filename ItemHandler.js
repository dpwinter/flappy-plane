var ItemHandler =  Class({

	initialize: function(ctx) {
	  this.radius = 10;
	  this.speed = 0.5;
	  this.items = [];
	  this.ctx = ctx;
	  this.score = 0;
	},

	update: function() {
	  for(i=0;i < this.items.length; i++) {
		  it = this.items[i];
		  this.renderItem(it);
		  if(this.items[i].x < -(2*this.radius)) this.deleteItem(i);
	  }
	  this.drawScore();
	},
	
	renderItem: function(it) {
	  it.update();
	  it.draw();
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
    }
});

