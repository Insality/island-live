var Man = {
	addMan: function(body, head, leg) {
		var bodyRow = body;
		var headRow = head;
		var legRow = leg;

		var bodyWidth = 3;
		var headWidth = 2;
		var legWidth = 7;
		var bodyFrame = 0;
		var headFrame = 0;
		var legFrame = 0;

		var man = game.add.group();
		var head = game.entities.create(64, 64, 'heads');
		var leg = game.entities.create(64, 64, 'legs');
		var body = game.entities.create(64, 64, 'bodies');
		man.add(head);
		man.add(leg);
		man.add(body);
		head.position = new PIXI.Point(0, 0);
		leg.position = new PIXI.Point(0, 0);
		body.position = new PIXI.Point(0, 0);

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
		walkAnimBody.onStart.add(function() {bodyFrame = 0;});
		walkAnimBody.onUpdate.add(function(e, a, b) {
			bodyFrame = (bodyFrame + 1) % bodyWidth;
			if (man.currentTile != Config.TILE_WATER) {
				Particles.addStepParticle({x: man.x, y: man.y+8})
				man["step"+game.rnd.integerInRange(1, 3)].play();
			} else {
				Particles.addStepParticle({x: man.x, y: man.y+8}, true)
				man["step_water"+game.rnd.integerInRange(1, 2)].play();
			}
		}, this);


		walkAnimHead.enableUpdate = true;
		walkAnimHead.onStart.add(function() {
			headFrame = 0;
			head.position.y = -1;
		});
		walkAnimHead.onUpdate.add(function(a, b) {
			headFrame = (headFrame + 1) % 3;
			var isHeadTop = false;
			if (headFrame == 0 || headFrame == 1){
				isHeadTop = true;
			};

			head.position.y = isHeadTop ? -1 : 0;

		});

		stayAnimHead.enableUpdate = true;
		stayAnimHead.onStart.add(function() {
			headFrame = 0;
			head.position.y = -1;
		});
		stayAnimHead.onUpdate.add(function(a, b) {
			headFrame = (headFrame + 1) % 4;

			var isHeadTop = false;
			if (headFrame == 0){
				isHeadTop = true;
			};
			head.position.y = isHeadTop ? -1 : 0;

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
    	},

		man.playAnim("stay", 6);
    	return man;
	},

}