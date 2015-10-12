var sandArray = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
}

function draw() {
	background(255);
	sandArray.push(new Sand(windowWidth/2, 0, random(-0.2,0.2), 3));
	for (var i=0; i< sandArray.length; i++) {
		if (sandArray[i].location.y < windowHeight - 200){
			sandArray[i].update();
		}
		sandArray[i].display();
	}
}

function mousePressed(){
	//Apply a force once when a click happens
	var xForce = -1 * ( (mouseX - windowWidth/2)/(windowWidth/2) );
	var curForce = createVector(xForce,0);
	for(var i=0; i < sandArray.length; i++){
		if (sandArray[i].location.y < windowHeight - 200){
			sandArray[i].applyForce(curForce);
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}


/*---------- SAND CLASS ----------*/
function Sand(xPos, yPos, xSpeed, ySpeed){

	this.location = createVector(xPos,yPos);
	this.velocity = createVector(0, 0);

	var mouseVector = createVector(mouseX,mouseY);
	var dirVector = p5.Vector.sub(mouseVector,this.location);
	dirVector.normalize();
	dirVector.mult(0.5);
	this.acceleration = dirVector;
	this.acceleration.x = this.acceleration.x + random(-0.02,0.02);

	this.topSpeed = 3;

	this.xWidth = 2;
	this.yHeight = 2;

	this.r = 255;
	this.g = 243;
	this.b = 89;
	this.c = color(this.r, this.g, this.b);
}

Sand.prototype.display = function(){
	//Draw particle
	fill(this.c);
	noStroke();
	rect(this.location.x, this.location.y, this.xWidth, this.yHeight);
};

Sand.prototype.update = function(){

	// var mouseVector = createVector(mouseX,mouseY);
	// var dirVector = p5.Vector.sub(mouseVector,this.location);
	// dirVector.normalize();
	// dirVector.mult(0.5);
	// this.acceleration = dirVector;
	// this.acceleration.x = this.acceleration.x + random(-0.02,0.02);
	this.velocity.add(this.acceleration);
	this.velocity.limit(this.topSpeed);
	this.location.add(this.velocity);
};

//Triggering this on mouse click
Sand.prototype.applyForce = function(force){
    this.acceleration.add(force);
};


