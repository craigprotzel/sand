function Shell(shellImg, xPos, yPos, yPosTop){
	
	console.log(yPosTop);

	this.shellImage = shellImg;

	this.hasLanded = false;
	this.landing_sound = timer_A_short;
	
	this.gravity = createVector(0,config.gravity);

	this.location = createVector(xPos - 15, yPos);
	this.velocity = createVector(0, 0);
	this.topSpeed = 14;
	this.acceleration = createVector(0,0);
	this.dirVector = createVector((random(-3,3)),0);

	/*
	var mouseVector = createVector(mouseX,mouseY);
	var dirVector = p5.Vector.sub(mouseVector,this.location);
	*/

	// var dirVector = createVector(0, windowHeight);
	// dirVector.normalize();
	// dirVector.mult(0.5);
	// this.acceleration = dirVector;
	// this.acceleration.x = this.acceleration.x + random(-0.02,0.02);

	this.xWidth = 240;
	this.yHeight = 160;

	this.stopPosY = yPosTop + random(0,300);

	this.display = function(){
		//Draw particle
		image(this.shellImage, this.location.x, this.location.y,this.xWidth, this.yHeight);
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

	this.moving = function(){
		if (this.location.y > (this.stopPosY-50) && !this.landed_sound){
			triggerAudio(this.landing_sound);
			this.landed_sound = true;
		}

		if (this.location.y > this.stopPosY){
			if (!this.hasLanded){
				//triggerAudio(this.landing_sound);
				this.hasLanded = true;
			}
			return false;
		}
		else{
			return true;
		}
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

		// if (this.moving()){
		// 	this.applyForce(this.gravity);
		// 	this.update();
		// }
		this.display();
	};
}