/*
// Built from
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
//https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/tree/master/chp05_libraries/box2d-html5/NOC_5_03_ChainShape_Simple
*/


/*---------- SAND PARTICLE CLASS ----------*/
function Sand(xPos, yPos, imgType){

	if (imgType == 'sand'){
		this.img = sand_pile_particle;
		this.d = 2;
	}
	else if (imgType == 'rock'){
		this.img = rock_cutout;
		this.d = 10;
	}


	this.elapsedTime = 0;

	var curColorVal = 0;
	var randomVal = random(1);
	if (randomVal < 0.05){
		curColorVal = 7;
	}
	else if (randomVal < 0.1){
		curColorVal = 6;
	}
	else if (randomVal < 0.25){
		curColorVal = 5;
	}
	else if (randomVal < 0.4){
		curColorVal = 4;
	}
	else if (randomVal < 0.55){
		curColorVal = 3;
	}
	else if (randomVal < 0.7){
		curColorVal = 2;
	}
	else if (randomVal < 0.85){
		curColorVal = 1;
	}
	else{
		curColorVal = 0;
	}

	this.r = colorOptions[curColorVal].r;
	this.g = colorOptions[curColorVal].g;
	this.b = colorOptions[curColorVal].b;

	//Define a body
	var bd = new box2d.b2BodyDef();
	bd.type = box2d.b2BodyType.b2_dynamicBody;
	bd.position = scaleToWorld(xPos,yPos);

	//Define a fixture
	var fd = new box2d.b2FixtureDef();
	fd.shape = new box2d.b2CircleShape();
	fd.shape.m_radius = scaleToWorld(this.d/4);

	fd.density = config.density;
	fd.friction = config.friction;
	fd.restitution = config.restitution;

	//Create the body
	this.body = world.CreateBody(bd);
	//Attach the fixture
	this.body.CreateFixture(fd);

	this.body.SetLinearVelocity(new box2d.b2Vec2(random(-0.1,0.1),0));

	this.body.SetAngularVelocity((random(-0.01,0.01))/10);

	//Remove particle from the box2d world
	this.killBody = function() {
		world.DestroyBody(this.body);
	};

	this.done = function() {

		if(showDigitalPixels){
			if (random(1) < 0.05){
				this.killBody();
				return true;
			}
		}


		this.elapsedTime++;
		if (this.elapsedTime > config.lifeTime){
			this.killBody();
			return true;
		}

		var pos = scaleToPixels(this.body.GetPosition());
		if (pos.y > (config.bottomBoundary)){
			this.killBody();
			return true;
		}
		return false;
	};

	this.applyForce = function(force) {
		var curBodyCtr = this.body.GetWorldCenter();
		this.body.ApplyForce(force, curBodyCtr);
	};

	// Drawing the Particle
	this.display = function() {


		if(showDigitalPixels){
			var curForce = new box2d.b2Vec2(random(-0.3,0.3,0.5));
			this.applyForce(curForce);
		}

		// Get the body's position
		var pos = scaleToPixels(this.body.GetPosition());

		// Get its angle of rotation
		var a = this.body.GetAngleRadians();

		// Draw the body
		// rectMode(CENTER);
		push();
		translate(pos.x,pos.y);

		rotate(a/10);

		//fill(this.r, this.g, this.b);
		//noStroke();
		//rect(0,0,this.d,this.d);
		if(showDigitalPixels){
			image(this.img, 0, 0, this.d * 4, this.d * 4);
		}
		else{
			image(this.img, 0, 0, this.d, this.d);
		}
		pop();
	};
}