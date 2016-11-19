var Man = {
	addMan: function(body, head, leg, data) {
		var bodyRow = body || game.rnd.integerInRange(0, 9);
		var headRow = head || game.rnd.integerInRange(0, 13);
		var legRow = leg || game.rnd.integerInRange(0, 3);

		var bodyWidth = 3;
		var headWidth = 2;
		var legWidth = 7;
		var bodyFrame = 0;
		var headFrame = 0;
		var legFrame = 0;

		var man = game.add.group();
		// console.log(man);
		var head = game.entities.create(64, 64, 'heads');
		head.smoothed = false;
		var leg = game.entities.create(64, 64, 'legs');
		leg.smoothed = false;
		var body = game.entities.create(64, 64, 'bodies');
		body.smoothed = false;
		man.add(head);
		man.add(leg);
		man.add(body);
		head.position = new PIXI.Point(0, 0);
		leg.position = new PIXI.Point(0, 0);
		body.position = new PIXI.Point(0, 0);

		if (data) { 
	 		// text = game.add.bitmapText(0, -10, 'pixelFont', data.first_name + " " + data.last_name, 8);
	 		// text.anchor.set(0.5, 1);
			// man.add(text);
			// man.nameText = text;
		}


		var walkAnimHead = head.animations.add("walk", [0 + headRow*headWidth, 0 + headRow*headWidth, 0 + headRow*headWidth]);
		var walkAnimLegs = leg.animations.add("walk", [4 + legRow*legWidth, 5 + legRow*legWidth, 6 + legRow*legWidth]);
		var walkAnimBody = body.animations.add("walk", [0 + bodyRow*bodyWidth, 0 + bodyRow*bodyWidth, 1 + bodyRow*bodyWidth]);
		
		var stayAnimHead = head.animations.add("stay", [0 + headRow*headWidth, 0 + headRow*headWidth, 0 + headRow*headWidth, 1 + headRow*headWidth]);
		var stayAnimLegs = leg.animations.add("stay", [0 + legRow*legWidth, 1 + legRow*legWidth, 2 + legRow*legWidth,  3 + legRow*legWidth]);
		var stayAnimBody = body.animations.add("stay", [0 + bodyRow*bodyWidth, 1 + bodyRow*bodyWidth, 1 + bodyRow*bodyWidth, 2 + bodyRow*bodyWidth]);

		man.step1 = game.add.audio('step1');
		man.step2 = game.add.audio('step2');
		man.step3 = game.add.audio('step3');

		man.step_water1 = game.add.audio('step_water1');
		man.step_water2 = game.add.audio('step_water2');

		walkAnimBody.enableUpdate = true;
		walkAnimBody.onStart.add(function(e, a, b) {
			head.position.y = (a.currentFrame.index % 3 == 0 ? -1 : 0);
		});
		walkAnimBody.onUpdate.add(function(e, a, b) {
			head.position.y = (a.index % 3 == 0 ? -1 : 0);
			
			if (man.visible) {
				if (man.currentTile != Config.TILE_WATER) {
					Particles.addStepParticle({x: man.x, y: man.y+8})
					if (man.isPlayer) man["step"+game.rnd.integerInRange(1, 3)].play();
				} else {
					Particles.addStepParticle({x: man.x, y: man.y+8}, true)
					if (man.isPlayer) man["step_water"+game.rnd.integerInRange(1, 2)].play();
				}
			}
		}, this);

		stayAnimBody.enableUpdate = true;
		stayAnimBody.onStart.add(_.bind(function(e, a) {
			// if (this.isPlayer) 

				// console.log(a.index);
			head.position.y = (a.currentFrame.index % 3 == 0 ? -1 : 0);
		}, this));
		stayAnimBody.onUpdate.add(function(e, a, b) {
			head.position.y = (a.index % 3 == 0 ? -1 : 0);			
		});


    	head.anchor.setTo(0.5, 0.5);
    	leg.anchor.setTo(0.5, 0.5);
    	body.anchor.setTo(0.5, 0.5);

    	man.playAnim = function(animName, speed) {
    		switch (animName){
    			case "stay":
	    			head.animations.play(animName, speed, true);
	    			leg.animations.play(animName, speed, true);
	    			body.animations.play(animName, speed, true);
	    			break;
	    		case "walk":
	    			head.animations.play(animName, speed, true);
	    			leg.animations.play(animName, speed, true);
	    			body.animations.play(animName, speed, true);
	    			break;
	    		case "stop":
	    			head.animations.stop();
	    			leg.animations.stop();
	    			body.animations.stop();
	    			break;
    		}
    	};

    	man.move = function(delta, speed) {
    		man.currentTile = Math.floor(game.map.map.getTile(Math.floor(man.x/Config.TILE_SIZE), Math.floor(man.y/Config.TILE_SIZE)).index/16);
    		if (!man.prevTile) man.prevTile = man.currentTile;

			if (man.currentTile == Config.TILE_WATER) {
				delta.x = Math.max(delta.x/2, 0.5 * Math.sign(delta.x));
				delta.y = Math.max(delta.y/2, 0.5 * Math.sign(delta.y));
				speed /= 2;
			}
			var next = {x: Math.floor((man.x+delta.x)/Config.TILE_SIZE), y: Math.floor((man.y+delta.y)/Config.TILE_SIZE)};
			var nextTile;
			if (next.x < 0 || next.y < 0 || next.x >= Config.MAP_SIZE || next.y >= Config.MAP_SIZE) {
				nextTile = Config.TILE_DEEP;
			} else {
				nextTile = Math.floor(game.map.map.getTile(next.x, next.y).index/16);
			}

		    if (nextTile == Config.TILE_DEEP) {
		    	delta.x = 0;
		    	delta.y = 0;
		    	man.playAnim("stop");
		    }

		    man.x += delta.x;
		    man.y += delta.y;
		    if (delta.x > 0) man.scale.x = -1;
		    if (delta.x < 0) man.scale.x = 1;
		    if (man.nameText) man.nameText.scale.x = man.scale.x;

		    if (delta.x != 0 || delta.y != 0) {
		    if (man.prevTile != man.currentTile && (man.prevTile == Config.TILE_WATER || man.currentTile == Config.TILE_WATER)) {
		    	man.playAnim("stop");
		    }
		    	man.playAnim("walk", 7*speed);
		    } else {
		    	man.playAnim("stay", 6);
		    }
		    man.prevTile = man.currentTile;
    	};

    	man.update = function() {
    		var distToPlayer = Math.dist({x: man.x, y: man.y}, {x: game.player.x, y: game.player.y});
			man.distToPlayer = distToPlayer;
			
    		if (!man.isPlayer) {
    			man.recalcDir = man.recalcDir || game.rnd.integerInRange(120, 500);

    			man.recalcDir--;
    			if (man.recalcDir <= 0)  {
    				man.recalcDir = false;
	    			man.curDelta = {x: game.rnd.integerInRange(-1, 1), y: game.rnd.integerInRange(-1, 1)};
	    			man.curDelta.x /= 4;
	    			man.curDelta.y /= 4;

	    			if (game.rnd.frac() > 0.5) {
	    				man.curDelta = {x: 0, y: 0};
	    			}
    			}

    			man.move(man.curDelta || {x: 0, y: 0}, 0.5);
    			man.visible = (distToPlayer < 150);
    			if (man.nameText) {
	    			man.nameText.visible = (distToPlayer < 30);
	    			if (distToPlayer > 10 && distToPlayer < 30) {
		    			man.nameText.alpha = (30-distToPlayer)/20;
		    		} else {
		    			man.nameText.alpha = 1;
		    		}
    			}
    		}
    	};

    	man.setTint = function(color) {
    		leg.tint = color;
    		head.tint = color;
    		body.tint = color;
    	}

		man.playAnim("stay", 6);
    	return man;
	},

}