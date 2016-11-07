Particles = {
	addStepParticle: function(pos, isWater) {
		var particle = game.groundLayer.create(4, 4, 'particles');
		var particleAnim;
		if (isWater) {
			particleAnim = particle.animations.add("particle", [8, 9, 10, 11, 12, 13, 14, 15]);
		} else {
			particleAnim = particle.animations.add("particle", [0, 1, 2, 3, 4, 5, 6, 7]);
		}

		particle.x = pos.x;
		particle.y = pos.y;

		particleAnim.onComplete.add(function() {
			particle.kill();
		}, this);

		particle.animations.play("particle", 9, false);
    	particle.anchor.setTo(0.5, 0.5);

    	var tween = game.add.tween(particle);
    	tween.to({ x: particle.x + game.rnd.integerInRange(-4, 4), y: particle.y + game.rnd.integerInRange(-3, 3)}, 500, "Linear", true);
	}
}