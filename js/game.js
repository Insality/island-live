 window.onload = function() {
	var game = new Phaser.Game(8 * 22, 8 * 14, Phaser.AUTO, '', { preload: preload, create: create, update: update });
	var cursors;

	function preload () {
		Preloader.loadImages(game);
	}

	function create () {
		game.stage.backgroundColor = '#456A72';
		Utils.make_pixelart(game, 4);

	    var mapData = MapGenerator.generateData(Config.MAP_SIZE);
	    var map = MapGenerator.addMap(game, mapData);

	    game.map = map;
	    cursors = game.input.keyboard.createCursorKeys();
	    game.world.setBounds(0, 0, Config.TILE_SIZE * Config.MAP_SIZE, Config.TILE_SIZE * Config.MAP_SIZE);
	}

	function update() {
		if (cursors.left.isDown) {
	        game.camera.x -= 4;
	    }
	    else if (cursors.right.isDown) {
	        game.camera.x += 4;
	    }

	    if (cursors.up.isDown) {
	        game.camera.y -= 4;
	    }
	    else if (cursors.down.isDown) {
	        game.camera.y += 4;
	    }
	}


};