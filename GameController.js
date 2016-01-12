var GameController = function GameController() {
	this.itemlist = [];
	this.hero;
	this.score = 0;
	this.BGOffset = 0;
	this.BGSpeed = 1;
}
	
GameController.prototype = {
	
	Hero: function() {},
	Item: function() {},

	defineHero: function() {
		this.Hero.prototype = new GameObject('#FFFFFF', new Vector2D(canvas.width/2, canvas.height/2), 3, 10);

		this.Hero.prototype.wrap = function() {
			// this.velocity.multiplyEquals(-1);
			var drag = 0.7;
			this.location.y = canvas.height - this.radius;
			this.velocity.y = -this.velocity.y * drag;
		}

		this.Hero.prototype.flap = function() {
			var upforce = new Vector2D(0, -70);
			this.setVelocity(new Vector2D(0,0));
			this.applyForce(upforce);
		}
		  
		this.Hero.prototype.update = function(force) {
		  var f = new Vector2D(0, force.y);
		  GameObject.prototype.update.call(this, f);
		  // return wrap() is inconvinient!
		  // return this.outOfBounds()? this.wrap() : this.location;
		  if(this.outOfBounds()) return 0;
		  else return this.location;
		}

		this.hero = new this.Hero();
	},

	defineItem: function() {
		this.Item.prototype = new GameObject('#000000', new Vector2D(0,0), 10, 5);
		this.Item.prototype.update = function() {
		  GameObject.prototype.update.call(this);
		  // 0 is the mark for deletion.
		  return this.outOfBounds()? 0 : this.location;
		 }
	},
	
	initialize: function() {
		this.defineHero();
		this.defineItem();
	},

	spawnItem: function(velo) {
		var rad = this.Item.prototype.radius;
		var location = new Vector2D(canvas.width + rad, getRandom(rad, canvas.height - rad));
		var itm = new this.Item();
		itm.setLocation(location);
		itm.setVelocity(velo);
		this.itemlist.push(itm);
	},

	update: function(force) {
		var h = this.hero;
		var hPos = h.update(force);

		if (hPos == 0) h.wrap();

		for (i=0;i<this.itemlist.length;i++) {
			var iPos = this.itemlist[i].update();
			var it = this.itemlist[i];
			var dist_vec = Vector2D.fromPoints(hPos, iPos);
			var dist = dist_vec.length();

			// hit the wall? shift out of array.
			if(iPos==0) this.itemlist.shift(i);
			// collision detected? remove from array.
			else if(dist < it.radius + h.radius) {
				this.itemlist.remove(i);
				this.score++;
			}
		}

		this.drawAll();
	},

	drawAll: function() {
		this.drawBackground();
		this.drawItems();
		this.hero.draw();
		this.drawScore();
		this.drawInfo();
    },

	drawItems: function() {
		for(i=0;i<this.itemlist.length;i++) this.itemlist[i].draw();
    },

	drawScore: function() {
	   ctx.font = "16px Arial";
	   ctx.fillStyle = "#FFFFFF";
	   ctx.textAlign = "left";
	   ctx.fillText("Score: " + this.score, 8, 20);
    },

	drawPause: function() {
        ctx.font = "30px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.fillText("PAUSE", canvas.width/2, canvas.height/2);
    },

	drawInfo: function() {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#FFFFFF";
		ctx.textAlign = "right";
		ctx.fillText("Press 'P' for Pause, 'R' for Restart & 'Space' for Jump.", canvas.width - 20, canvas.height -20);
    },

	drawBackground: function() {
		this.BGOffset -= this.BGSpeed;
		if(this.BGOffset < -canvas.width) this.BGOffset = 0;
		ctx.drawImage(background, this.BGOffset, 0);
		ctx.drawImage(background, this.BGOffset + canvas.width, 0);
		// ctx.drawImage(sun,  0, 0);
	}
}

