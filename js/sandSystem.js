// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var SandParticleSystem = function(position) {
	this.origin = createVector(position.x, position.y);
	this.particles = [];

	this.addSandParticle = function() {
		this.particles.push(new Sand(this.origin.x, this.origin.y));
	};

	this.run = function() {
		if (this.particles.length > 2){
			for (var i = this.particles.length-1; i >= 0; i--) {
				this.particles[i].run();
				if (this.particles[i].isDead()) {
					this.particles.splice(i, 1);
				}
			}
		}
	};

	this.addMouseForce = function(){
		//Apply a force once when a click happens
		var xForce = -2 * ( (mouseX - windowWidth/2)/(windowWidth/2) );
		var curForce = createVector(xForce, 0);
		for (var i = this.particles.length-1; i >= 0; i--) {
			var p = this.particles[i];
			p.applyForce(curForce);
		}
	};

	this.resetLocX = function(){
		for (var i = this.particles.length-1; i >= 0; i--) {
			var p = this.particles[i];
			p.setX();
		}
		this.origin.x = windowWidth/2;
	};
};