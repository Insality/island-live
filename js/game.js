 window.onload = function() {
	var game = new Phaser.Game(8 * 24, 8 * 15, Phaser.AUTO, '', { preload: preload, create: create, update: update });
	var cursors;
	window.game = game;

	function preload () {
		Preloader.loadImages(game);
		game.time.advancedTiming = true;
	}

	function create () {
		game.stage.backgroundColor = '#456A72';
		game.stage.smoothed = false;
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

	    game.player = Man.addMan(3, 4, 1);
	    game.player.x = 100;
	    game.player.y = 100;
	    game.player.isPlayer = true;
	    game.entities.add(game.player);

	    game.enemies = [];

	    game.enemy = Man.addMan(2, 5);
	    game.enemy.x = 300;
	    game.enemy.y = 300;
	    game.entities.add(game.enemy);
	    game.enemies.push(game.enemy);

	    for (var i = 0; i < Friends.count; i++) {
	    	game.enemy = Man.addMan(undefined, undefined, undefined, Friends.items[i]);
		    game.enemy.x = game.rnd.integerInRange(40, 2000);
		    game.enemy.y = game.rnd.integerInRange(40, 2000);
		    game.entities.add(game.enemy);
		    game.enemies.push(game.enemy);
	    }

	    game.camera.follow(game.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

		for (var i = 0; i < 500; i++) {
			var pos = {x: game.rnd.integerInRange(0, Config.MAP_SIZE * Config.TILE_SIZE), y: game.rnd.integerInRange(0, Config.MAP_SIZE * Config.TILE_SIZE)};
			var tile = Math.floor(game.map.map.getTile(Math.floor(pos.x/Config.TILE_SIZE), Math.floor(pos.y/Config.TILE_SIZE)).index/16);
			var tileN = game.rnd.integerInRange(0, 3) + (tile*8);
			var misc = game.groundLayer.create(pos.x, pos.y, "misc", tileN);
			misc.anchor.set(0.5, 1);
			if (game.rnd.frac() > 0.5) { 
				misc.scale.set(-1, 1);
			}

			if (game.rnd.frac() < 0.8) {
				// console.log(misc);
				misc.smoothed = false;
				var tween = game.add.tween(misc.scale).to( {y: 0.8}, game.rnd.integerInRange(3000, 8000), Phaser.Easing.Sinusoidal.Out, true, game.rnd.integerInRange(0, 3000), true);
				tween.repeat(-1);
			}
		}

		// Post effects
		var vignette = game.add.filter('Vignette');

	    vignette.size = 0.2;
	    vignette.amount = 0.5;
	    vignette.alpha = 1;

	    var crt = game.add.filter("CRT");


	    game.stage.filters = [vignette, crt];
	}

	function update(a) {
		game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");   
		var delta = {x: 0, y: 0}
		var speed = 1;

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
	        delta.y += speed;
	    }

	    game.player.move(delta, speed);

	    // for (var i in game.enemies) {
	    // 	game.enemies[i].move({x: 1, y: 0});
	    // }`
	    
	    game.entities.sort('y', Phaser.Group.SORT_ASCENDING);

	    var nearestMan;
	    game.entities.forEach(function(item) {
	    	if (item.distToPlayer > 0 && item.distToPlayer < 50) {
	    		if (game.target) {
	    			if (item.distToPlayer < game.target.distToPlayer) {
	    				game.target.setTint(0xFFFFFF)
	    				game.target = item;
	    				game.target.setTint(0xFFAAAA)
	    			}
	    		} else {
	    			game.target = item;
	    			game.target.setTint(0xffaaaa)
	    		}
	    	}
	    });

	    if (game.target && game.target.distToPlayer > 50) {
	    	game.target.setTint(0xffffff);
	    	game.target = null;
	    }


	}
};