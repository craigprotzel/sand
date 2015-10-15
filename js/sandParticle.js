/*---------- SAND CLASS ----------*/
// var gravity = createVector(0,0.5);
// console.log(gravity);

function Sand(xPos, yPos){

	this.lifespan = 255;
	this.gravity = createVector(0,0.5);

	this.location = createVector(xPos,yPos);
	this.velocity = createVector(2, 0);
	this.topSpeed = 3;
	this.acceleration = createVector(0,0);
	this.dirVector = createVector((random(-0.04,0.04)),0);
	/*
	var mouseVector = createVector(mouseX,mouseY);
	var dirVector = p5.Vector.sub(mouseVector,this.location);
	*/

	// var dirVector = createVector(0, windowHeight);
	// dirVector.normalize();
	// dirVector.mult(0.5);
	// this.acceleration = dirVector;
	// this.acceleration.x = this.acceleration.x + random(-0.02,0.02);

	// this.gravity = createVector(0,0.5);

	this.xWidth = 1;
	this.yHeight = 1;

	this.r = 255;
	this.g = 243;
	this.b = 89;
	this.c = color(this.r, this.g, this.b);

	this.display = function(){
		//Draw particle
		fill(this.c);
		fill(this.rect, this.g, this.b);
		noStroke();
		rect(this.location.x, this.location.y, this.xWidth, this.yHeight);
	};

	this.update = function(){

	// var mouseVector = createVector(mouseX,mouseY);
	// var dirVector = p5.Vector.sub(mouseVector,this.location);
	// dirVector.normalize();
	// dirVector.mult(0.5);
	// this.acceleration = dirVector;
	// this.acceleration.x = this.acceleration.x + random(-0.02,0.02);

		this.acceleration.add(this.dirVector);
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.topSpeed);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
	};

	//Triggering this on mouse click
	this.applyForce = function(force){
    this.acceleration.add(force);
	};

	this.setX = function(){
		this.location.x = this.dirVector.x + windowWidth/2;
		console.log("Setting X");
	};

	this.isDead = function(){
		if(this.location.y > windowHeight - 200){
			return true;
		}
		else{
			return false;
		}
	};

	this.run = function(){
		this.applyForce(this.gravity);
		this.update();
		this.display();
	};
}