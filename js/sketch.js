var sandArray = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
}

function draw() {
	background(255);
	sandArray.push(new Sand(mouseX, mouseY, random(-1,1), 3));
	for (var i=0; i< sandArray.length; i++) {
		if (sandArray[i].y < windowHeight - 5){
			sandArray[i].update();
		}
		sandArray[i].display();
	}
}

function mousePressed(){

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



/*---------- SAND CLASS ----------*/
function Sand(xPos, yPos, xSpeed, ySpeed){
	this.x = xPos;
	this.y = yPos;

	this.xWidth = 4;
	this.yHeight = 4;

	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;

	this.r = 255;
	this.g = 243;
	this.b = 89;
	this.c = color(this.r, this.g, this.b);

}

Sand.prototype.display = function(){
	//Draw particle
	fill(this.c);
	noStroke();
	ellipse(this.x, this.y, this.xWidth, this.yHeight);
};

Sand.prototype.update = function(){
	this.x += this.xSpeed;
	this.y += this.ySpeed;
};
