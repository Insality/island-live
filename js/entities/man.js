var Man = {
	addMan: function() {
		var man = game.entities.create(64, 64, 'images');
		var walkAnim = man.animations.add("walk", [0, 1]);
		man.animations.add("stay", [1]);

		walkAnim.enableUpdate = true;
		walkAnim.onUpdate.add(function() {
			Particles.addStepParticle({x: man.x, y: man.y+8})
		}, this);

		man.animations.play("stay", 1, true);
    	man.anchor.setTo(0.5, 0.5);

    	return man;
	},

}