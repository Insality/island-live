 window.onload = function() {
	var game = new Phaser.Game(8 * 24, 8 * 15, Phaser.AUTO, '', { preload: preload, create: create, update: update });
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
	    game.input.gamepad.start();
	    pad = game.input.gamepad.pad1;
	    game.world.setBounds(0, 0, Config.TILE_SIZE * Config.MAP_SIZE, Config.TILE_SIZE * Config.MAP_SIZE);

        music = game.add.audio('music_game');
	    music.play('', 0, 1, true);

	    
		game.groundLayer = game.add.group();
	    game.entities = game.add.group();


		for (var i = 0; i < 500; i++) {
			var pos = {x: game.rnd.integerInRange(0, Config.MAP_SIZE * Config.TILE_SIZE), y: game.rnd.integerInRange(0, Config.MAP_SIZE * Config.TILE_SIZE)};
			var tile = Math.floor(game.map.map.getTile(Math.floor(pos.x/Config.TILE_SIZE), Math.floor(pos.y/Config.TILE_SIZE)).index/16);
			var tileN = game.rnd.integerInRange(0, 3) + (tile*8);
			var misc = game.groundLayer.create(pos.x, pos.y, "misc", tileN);
		}

	    game.player = Man.addMan();
	    game.enemy = Man.addMan();
	    game.enemy.x = 40;
	    game.enemy.y = 40;
	    game.camera.follow(game.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
	}

	function update() {
		var delta = {x: 0, y: 0}
		var currentTile = Math.floor(game.map.map.getTile(Math.floor(game.player.x/Config.TILE_SIZE), Math.floor(game.player.y/Config.TILE_SIZE)).index/16);
		game.player.currentTile = currentTile;
		if (!game.player.prevTile) game.player.prevTile = currentTile;
		var speed = 1;

		if (currentTile == Config.TILE_WATER) {
			speed = 0.5;
		}

		if (cursors.left.isDown || pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
	        delta.x -= speed;
	    }
	    else if (cursors.right.isDown || pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
	        delta.x += speed;
	    }

	    if (cursors.up.isDown || pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
	        delta.y -= speed;
	    }
	    else if (cursors.down.isDown || pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
	        delta.y = speed;
	    }

	    var nextTile = Math.floor(game.map.map.getTile(Math.floor((game.player.x+delta.x)/Config.TILE_SIZE), Math.floor((game.player.y+delta.y)/Config.TILE_SIZE)).index/16)
	    if (nextTile == Config.TILE_DEEP) {
	    	delta.x = 0;
	    	delta.y = 0;
	    	game.player.animations.stop();
	    }

	    game.player.x += delta.x;
	    game.player.y += delta.y;
	    if (delta.x > 0) game.player.scale.x = -1;
	    if (delta.x < 0) game.player.scale.x = 1;


	    if (delta.x != 0 || delta.y != 0) {
		    if (game.player.prevTile != currentTile && (game.player.prevTile == Config.TILE_WATER || currentTile == Config.TILE_WATER)) {
		    	game.player.animations.stop();
		    }
	    	game.player.animations.play("walk", 7*speed, true);
	    } else {
	    	game.player.animations.play("stay", 6, true);
	    }


	    game.player.prevTile = currentTile;
	    game.entities.sort('y', Phaser.Group.SORT_ASCENDING);
	}


};