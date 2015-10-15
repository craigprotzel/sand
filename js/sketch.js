var spSystems = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(0);
	spSystems.push(new SandParticleSystem(createVector(width/2, 0)));
	console.log(spSystems);
}

function draw(){
	background(0);
	for (var i = 0; i < spSystems.length; i++){
		spSystems[i].addSandParticle();
		spSystems[i].run();
	}
}

function mousePressed(){

	//spSystems.push(new SandParticleSystem(createVector(mouseX, mouseY)));

	for (var i = 0; i < spSystems.length; i++){
		spSystems[i].addMouseForce();
	}

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	for (var i = 0; i < spSystems.length; i++){
		spSystems[i].resetLocX();
	}
}