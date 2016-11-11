Utils = {
	make_pixelart: function(game, scale) {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
		game.scale.setUserScale(scale, scale);

		game.renderer.renderSession.roundPixels = true;  
		Phaser.Canvas.setImageRenderingCrisp(game.canvas);

		game.scale.pageAlignVertically = true;
	    game.scale.pageAlignHorizontally = true;
	    game.scale.setShowAll();
	    // game.scale.refresh();
	},

	RGBToHex: function(r,g,b){
	    var bin = r << 16 | g << 8 | b;
	    return (function(h){
	        return new Array(7-h.length).join("0")+h
	    })(bin.toString(16).toUpperCase())
	}
}