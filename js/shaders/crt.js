/**
 *
 * @filter         CRT
 * @description    Adds a simulated lens edge darkening effect.
 *
 */
Phaser.Filter.CRT = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.alpha = { type: '1f', value: 1.0 };

    this.fragmentSrc = [

        "precision mediump float;",
        "uniform sampler2D uSampler;",
        "uniform float time;",
        "uniform float alpha;",
        "varying vec2 vTextureCoord;",

        "void main(void) {",
        "vec4 color = texture2D(uSampler, vTextureCoord);",
        "float m = mod(gl_FragCoord.y, 4.0);",
        "float x = mod(gl_FragCoord.x, 3.0);",
        "x = x/300.0;",
		"if (m < 1.0) {",
		"color *= vec4(1, 0.97, 1, 1.0);",
		"} else if (m < 2.0) {",
		"color *= vec4(0.95+x, 0.95+x, 0.93+x, 1.0);",
		"} else if (m < 3.0) {",
		"color *= vec4(0.965+x*5.0, 0.985+x, 0.985+x, 1.0);",
		"} else {",
		"color *= vec4(0.96+x, 0.96+x, 0.96+x, 1.0);",
		"}",
		"gl_FragColor = color;",
        "}"
    ];

};

Phaser.Filter.CRT.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.CRT.prototype.constructor = Phaser.Filter.CRT;

Object.defineProperty(Phaser.Filter.CRT.prototype, 'alpha', {

    get: function() {
        return this.uniforms.alpha.value;
    },

    set: function(value) {
        this.uniforms.alpha.value = value;
    }

});

Object.defineProperty(Phaser.Filter.CRT.prototype, 'size', {

    get: function() {
        return this.uniforms.size.value;
    },

    set: function(value) {
        this.uniforms.size.value = Math.max(0, Math.min(value, 1));
    }

});

Object.defineProperty(Phaser.Filter.CRT.prototype, 'amount', {

    get: function() {
        return this.uniforms.amount.value;
    },

    set: function(value) {
        this.uniforms.amount.value = Math.max(0, Math.min(value, 1));
    }

});