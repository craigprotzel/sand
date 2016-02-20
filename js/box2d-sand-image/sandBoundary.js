var sandBoundaries= [];

function SandBoundary(yPos){

	this.x = width/2;
	this.y = yPos;
	this.w = 50;
	this.h = 10;

	this.r = 255;
	this.g = 150;
	this.b = 100;

	var fd = new box2d.b2FixtureDef();
	fd.density = config.density;
	fd.friction = config.friction;
	fd.restitution = config.restitution;

	var bd = new box2d.b2BodyDef();

	bd.type = box2d.b2BodyType.b2_staticBody;
	bd.position.x = scaleToWorld(this.x);
	bd.position.y = scaleToWorld(this.y);
	fd.shape = new box2d.b2PolygonShape();
	fd.shape.SetAsBox(this.w/(scaleFactor*2), this.h/(scaleFactor*2));
	this.body = world.CreateBody(bd).CreateFixture(fd);

	this.killBody = function() {
		world.DestroyBody(this.body);
	};

	this.done = function() {
		// if (timer > 500){
		// 	console.log("About to kill");
		// 	this.killBody();
		// 	console.log("Killed");
		// 	return true;
		// }

		// var pos = scaleToPixels(this.body.GetPosition());
		// // Is it off the bottom of the screen?
		if (horizontalWorld){
			if (this.x > (width + 100)){
				this.killBody();
				return true;
			}
		}
		else if (this.y > (height + 100)){
			this.killBody();
			return true;
		}
		return false;
	};

	// this.update = function(){
	// 	this.y += 5;
	// };

	this.display = function(){
		fill(this.r, this.g, this.b);
		noStroke();
		rectMode(CENTER);
		rect(this.x,this.y,this.w,this.h);
	};
}