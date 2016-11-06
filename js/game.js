 window.onload = function() {
	var game = new Phaser.Game(8 * 20, 8 * 12, Phaser.AUTO, '', { preload: preload, create: create, update: update });
	var cursors;
	window.game = game;

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

	    game.groundLayer = game.add.group();
	    game.entities = game.add.group();

	    game.player = Man.addMan();
	    game.enemy = Man.addMan();
	    game.enemy.x = 40;
	    game.enemy.y = 40;
	    game.camera.follow(game.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
	}

	function update() {
		var delta = {x: 0, y: 0}
		if (cursors.left.isDown) {
	        delta.x -= 1;
	    }
	    else if (cursors.right.isDown) {
	        delta.x += 1;
	    }

	    if (cursors.up.isDown) {
	        delta.y -= 1;
	    }
	    else if (cursors.down.isDown) {
	        delta.y = 1;
	    }
	    game.player.x += delta.x;
	    game.player.y += delta.y;
	    if (delta.x > 0) game.player.scale.x = -1;
	    if (delta.x < 0) game.player.scale.x = 1;

	    if (delta.x != 0 || delta.y != 0) {
	    	game.player.animations.play("walk", 5, true);
	    } else {
	    	game.player.animations.play("stay", 1, true);
	    }

	    game.entities.sort('y', Phaser.Group.SORT_ASCENDING);
	}


};