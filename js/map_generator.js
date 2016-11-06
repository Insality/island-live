MapGenerator = {
	generateData: function(size) {
		var map = [];
	    noise.seed(Math.random());
	    // noise.seed(3)

	    for (var i = 0; i < size; i++) {
    		var row = [];
	    	for (var j = 0; j < size; j++){
	    		var n = (noise.perlin2(i/30, j/30) + 1)/2;

    		    var data;
    		    if (n < 0.3) {
    		    	data = 0; // deep water
    		    } else if (n < 0.35) {
    		    	data = 1; // water
    		    } else if (n < 0.49) {
    		    	data = 2; // sand
    		    } else if (n < 0.55) {
    		    	data = 3; //ground
    		    } else if (n < 0.65) {
    		    	data = 4; // grass
    		    } else if (n < 0.75) {
    		    	data = 5; // forest
    		    } else {
    		    	data = 6; // rock
    		    }

    		    row.push(data);
	    	}
	    	map.push(row);
	    }
	    return map;
	},

	_getTileFromData: function(type, data, y, x) {
		var rowLength = 16;
		var tile = rowLength * type;

		var isTopSame = true;
		var isBotSame = true;
		var isLeftSame = true;
		var isRightSame = true;

		if (y > 0) isTopSame = (data[y-1][x] <= type);
		if (y < data.length-1) isBotSame = (data[y+1][x] <= type);
		if (x < data[y].length-1) isLeftSame = (data[y][x-1] <= type);
		if (x > 0) isRightSame = (data[y][x+1] <= type);

		if (isTopSame && isBotSame && isLeftSame && isRightSame) {
			tile += Math.floor(Math.random() * 3);
		}

		if (!isTopSame && !isBotSame && !isLeftSame && !isRightSame) {
			tile += 15;
		}

		if (isTopSame && !isBotSame && isLeftSame && !isRightSame) {
			tile += 3;
		}

		if (isTopSame && !isBotSame && !isLeftSame && isRightSame) {
			tile += 4;
		}

		if (!isTopSame && isBotSame && isLeftSame && !isRightSame) {
			tile += 5;
		}

		if (!isTopSame && isBotSame && !isLeftSame && isRightSame) {
			tile += 6;
		}

		// return tile;

		// one side
		if (!isTopSame && isBotSame && isLeftSame && isRightSame) {
			tile += 10;
		}

		if (isTopSame && !isBotSame && isLeftSame && isRightSame) {
			tile += 8;
		}

		if (isTopSame && isBotSame && !isLeftSame && isRightSame) {
			tile += 9;
		}

		if (isTopSame && isBotSame && isLeftSame && !isRightSame) {
			tile += 7;
		}

		if (isTopSame && !isBotSame && !isLeftSame && !isRightSame) {
			tile += 14;
		}

		if (!isTopSame && isBotSame && !isLeftSame && !isRightSame) {
			tile += 12;
		}

		if (!isTopSame && !isBotSame && isLeftSame && !isRightSame) {
			tile += 13;
		}

		if (!isTopSame && !isBotSame && !isLeftSame && isRightSame) {
			tile += 11;
		}

		return tile;
	},

	_getColorFromType: function(type) {
		switch (type) {
			case 0:
				return 0x105477;
			case 1:
				return 0x0098B2;
			case 2:
				return 0xC2AD57; //3
			case 3:
				return 0x926C42; //10
			case 4:
				return 0x3DA546;
			case 5:
				return 0x1F5423;
			case 6:
				return 0xB1C9D8;
			default:
				console.log("[Error]: unknown tile type");
				return 0x105477;
		}
	},

	addMap: function(game, mapData) {
		var size = mapData.length;
		
		var data = "";
		for (var y = 0; y < size; y++){
			for (var x = 0; x < size; x++){
				data += this._getTileFromData(mapData[y][x], mapData, y, x).toString();
				if (x < size) data += ',';
			}
			if (y < size) data += "\n";
		}

		game.cache.addTilemap("worldMap", null, data, Phaser.Tilemap.CSV);
		map = game.add.tilemap("worldMap", Config.TILE_SIZE, Config.TILE_SIZE);
		map.addTilesetImage("tiles", "tiles", Config.TILE_SIZE, Config.TILE_SIZE);

		layer = map.createLayer(0);
		layer.resizeWorld();
		
		return layer;
	},


}