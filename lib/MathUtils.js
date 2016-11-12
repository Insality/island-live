Math.clamp = function(a,b,c){
	return Math.max(b,Math.min(c,a));
};

Math.lerp = function (value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}

Math._seedRandom = function(s) {
    return function() {
        s = Math.sin(s) * 10000; return s - Math.floor(s);
    };
};

Math.dist = function(p1, p2) {
	return Math.sqrt((p2.x - p1.x)*(p2.x - p1.x) + (p2.y - p1.y)*(p2.y - p1.y));
};

// Converts from degrees to radians.
Math.toRad = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.toDeg = function(radians) {
  return radians * 180 / Math.PI;
};

Math.seed = function(s) {
	var random1 = Math._seedRandom(s);
	var random2 = Math._seedRandom(random1());
	Math.random = Math._seedRandom(random2());
};

// rect: x:y - left top point, w:h - right bottom point;
Math.pointRectIntersect = function(p, r) {
	return p.x > r.x && p.x < (r.x + r.w) && p.y > r.y && p.y < (r.y + r.h); 
}

Math.radToDeg = Math.PI / 180;
Math.degToRad = 180 / Math.PI; 
Math.eps = 0.00001;

Math.in = function(a, b, c) {
	return (a >= b && a <= c);
}