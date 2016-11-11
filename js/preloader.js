Preloader = {
	loadImages: function(game) {
		game.load.image("tiles", 'img/tiles.png');

		game.load.spritesheet('images', 'img/images.png', 16, 16);
		game.load.spritesheet('heads', 'img/heads.png', 16, 16);
		game.load.spritesheet('bodies', 'img/bodies.png', 16, 16);
		game.load.spritesheet('legs', 'img/legs.png', 16, 16);

		game.load.spritesheet('particles', 'img/particles.png', 4, 4);
		game.load.spritesheet('misc', 'img/misc.png', 8, 8);

		game.load.audio('step1', 'sounds/step1.wav');
		game.load.audio('step2', 'sounds/step2.wav');
		game.load.audio('step3', 'sounds/step3.wav');
		game.load.audio('step_water1', 'sounds/step_water1.wav');
		game.load.audio('step_water2', 'sounds/step_water2.wav');

		game.load.audio('music_game', 'musics/music_game.mp3');
	},
}