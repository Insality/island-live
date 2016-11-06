Particles = {
	addStepParticle: function(pos) {
		var particle = game.groundLayer.create(4, 4, 'particles');
		var particleAnim = particle.animations.add("particle", [0, 1, 2, 3, 4, 5, 6, 7]);
		particle.x = pos.x;
		particle.y = pos.y;

		particleAnim.onComplete.add(function() {
			particle.kill();
		}, this);

		particle.animations.play("particle", 9, false);
    	particle.anchor.setTo(0.5, 0.5);
	}
}