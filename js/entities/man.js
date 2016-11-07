var Man = {
	addMan: function() {
		var man = game.entities.create(64, 64, 'images');
		var walkAnim = man.animations.add("walk", [4, 5, 6]);
		man.animations.add("stay", [0, 1, 2, 3]);

		man.step1 = game.add.audio('step1');
		man.step2 = game.add.audio('step2');
		man.step3 = game.add.audio('step3');

		man.step_water1 = game.add.audio('step_water1');
		man.step_water2 = game.add.audio('step_water2');

		walkAnim.enableUpdate = true;
		walkAnim.onUpdate.add(function() {

			if (man.currentTile != Config.TILE_WATER) {
				Particles.addStepParticle({x: man.x, y: man.y+8})
				man["step"+game.rnd.integerInRange(1, 3)].play();
			} else {
				Particles.addStepParticle({x: man.x, y: man.y+8}, true)
				man["step_water"+game.rnd.integerInRange(1, 2)].play();
			}
		}, this);

		man.animations.play("stay", 6, true);
    	man.anchor.setTo(0.5, 0.5);

    	return man;
	},

}