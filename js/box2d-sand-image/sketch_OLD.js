var world;

var sandParticles = [];


var splashParticles = [];

var sandBoundaries = [];
var seaShells = [];

var defaultSurface, lowSurface;
var deafultSurfacePoints = [];
var lowSurfacePoints = [];

var slider;

var startX;
var startY;
var imageH;

/*---------- WORLD CONIFG ----------*/
var horizontalWorld = false;
var	hVal = 2;
var	wVal = 3;
var increment = 1.035;
var incrementCounter = 1;
var curHeight;
var config = {};


function initConfig(){
	config = {
		lifeTime : 200,
		bottomBoundary: height,
		gravity: 14,
		density : 1.0,
		friction : 0.1,
		restitution : 0.01,
		defaultVerticalPoints : [
			[0,0],
			[1,0],
			[1, height * 1.5 - 30],
			[width/2 - 18, height],
			[width/2 - (width/2 * 0.9), height * 2],
			[width/2 + (width/2 * 0.9), height * 2],
			[width/2 - 7, height],
			[width - 1, height * 1.5 + 10],
			[width - 1,0],
			[width, 0],
			[width, height * 4],
			[0, height * 4]
		]
	};
}

function getVerticalPoints(val){
	// return	[[0,0],
	// 		[1,0],

	// 		[-200, height * 2 - (increment * val) - 30],

	// 		//MIDDLE POINTS RIGHT
	// 		[width * 1/4, height + height/2 - (increment * val)],
	// 		[width * 1/3, height + height/3 - (increment * val)],

	// 		//TOP POINTS LEFT
	// 		[width/2 - 12, height + 15 - (increment * val)],
	// 		[width/2 - 8, height + 10 - (increment * val)],
	// 		[width/2 - 1, height + 4 - (increment * val)],

	// 		//BOTTOM POINT LEFT
	// 		[width/2 - (width/2 * 0.95), height * 2],

	// 		//MIDDLE MIDDLE LEFTS
	// 		[width/2 - 40, height + 150 - (increment * val)],
	// 		[width/2 - 20, height + 500 - (increment * val)],

	// 		//MIDDLE POINT
	// 		[width/2, height + 50 - (increment * val)],

	// 		//MIDDLE MIDDLE RIGHTS
	// 		[width/2 + 20, height + 500 - (increment * val)],
	// 		[width/2 + 40, height + 150 - (increment * val)],

	// 		//BOTTOM POINT RIGHT
	// 		[width/2 + (width/2 * 0.95), height * 2],

	// 		//TOP POINTS RIGHT
	// 		[width/2 + 1, height + 4 - (increment * val)],
	// 		[width/2 + 8, height + 10 - (increment * val)],
	// 		[width/2 + 12, height + 15 - (increment * val)],
				
	// 		//MIDDLE POINTS RIGHT
	// 		[width * 2/3, height + height/3 - (increment * val)],
	// 		[width * 3/4, height + height/2 - (increment * val)],
					
	// 		[width + 200, height * 2 - (increment * val) + 10],
					
	// 		[width - 1,0],
				
	// 		[width, 0],
			
	// 		[width, height * 4],
	// 		[0, height * 4]];


	return [
			//starters
			[0,0],
			[1,0],

			//Outside Bottom Left
			[-1/2 * width, (height * 3) - (increment * val)],
			//Middle Middle
			[width/2, height + 10 - (increment * val)],
			//Outside Bottom Right
			[width * 3/2, (height * 3) - (increment * val)],

			//closers
			[width - 1, 0],
			[width * 3/2 + 1, (height * 3 + 1)],
			[-1/2 * width - 1, (height * 3 + 1)]];
}


//BG Images
var bg_image_0;

//IMAGES
var curSandPile;
var sand_pile_image;
var sand_pile_image_large;

var sand_pile_depth;
var sand_pile_depth_orange;
var sand_pile_depth_purple;

var sand_pile_wide;

var sand_pile_TEST;
var sand_pile_TEST_particle;

var sand_pile_flat;
var sand_pile_2000;

var sand_pile_option_01;
var sand_pile_option_01_cropped;
var sand_pile_option_01_particle;

var seashell_image_01;


var white_seashell;
var seashell_orange;

var cactus_emoji, heart_emoji;

//SOUNDS
var sand_flow, sand_flow_2, bubbles_A, strike_A, timer_A, woosh_delay, piano_key, bubbles_E, timer_C;

function preload() {

	/*---------- BG IMAGES ----------*/
	//bg_image_0 = loadImage("media/bg_image_01.jpg");

	/*---------- IMAGES ----------*/
	//sand_pile_image_large = loadImage("media/sand_pile_large.png");
	//sand_pile_image = loadImage("media/sandpile.png");
	//sand_screengrab = loadImage("media/sand_screengrab.png");


	//sand_pile_option_01 = loadImage("media/sand_pile/sand_pile_option_01_CC_Light.png");
	//sand_pile_option_01_cropped = loadImage("media/sand_pile/sand_pile_option_01_CC_Light_croppped.png");
	//sand_pile_option_01_particle = loadImage("media/sand_pile/sand_pile_option_01_particle.png");

	//sand_pile_wide = loadImage("media/sand_pile/SandPile_Wide_4400x3300.png");

	//sand_pile_TEST = loadImage("media/sand_pile/Sand_TEST.png");
	//sand_pile_TEST = loadImage("media/sand_pile/Sand_TEST_CUTOUT.png");
	//sand_pile_TEST = loadImage("media/sand_pile/Sand_TEST_LARGE.png");
	//sand_pile_TEST = loadImage("media/sand_pile/Sand_TEST_OPTION_01.png");
	//sand_pile_TEST = loadImage("media/sand_pile/SAND_CUTOUT_SMALL.png");
	

	//sand_pile_TEST = loadImage("media/sand_pile/SandNEW1.png");
	//sand_pile_TEST = loadImage("media/sand_pile/SandNEW2.png");
	//sand_pile_TEST = loadImage("media/sand_pile/SandNEW4.png");
	//sand_pile_TEST_particle = loadImage("media/sand_pile/SandNEW4_particle.png");
	sand_pile_TEST_particle = loadImage("media/sand_pile/TEST/Sand_Triangle4_particle.png");


	//sand_pile_TEST = loadImage("media/sand_pile/SandPile_Triangle1.png");
	//sand_pile_TEST = loadImage("media/sand_pile/Sand_Triangle1NEW.png");
	//sand_pile_TEST = loadImage("media/sand_pile/Sand_Triangle_Corners_01.png");
	//sand_pile_TEST = loadImage("media/sand_pile/Sand_Triangle_Corners_02.png");

	//sand_pile_TEST = loadImage("media/sand_pile/FINAL/Sand_Triangle_Corners_FULL.png");
	sand_pile_TEST = loadImage("media/sand_pile/FINAL/Sand_Triangle_Corners_FULL_1024.png");


	//sand_pile_TEST = loadImage("media/sand_pile/Sand_Triangle2.png");
	//sand_pile_TEST = loadImage("media/sand_pile/Sand_Triangle3.png");
	//sand_pile_TEST = loadImage("media/sand_pile/Sand_Triangle4.png");
	//sand_pile_TEST = loadImage("media/sand_pile/Sand_Triangle5.png");

	//sand_pile_depth_orange = loadImage("media/sand_pile/SAND_Depth_Orange.png");
	//sand_pile_depth_purple = loadImage("media/sand_pile/SAND_Depth_Purple.png");


	//sand_pile_flat = loadImage("media/sand_pile/SAND_Flat.png");
	//sand_pile_2000 = loadImage("media/sand_pile/SAND_Update_2000x2000.png");

	//seashell_image_01 = loadImage("media/seashell_01.png");

	//white_seashell = loadImage("media/white_seashell.png");
	//seashell_orange = loadImage("media/seashell_orange.png");

	

	//cactus_emoji = loadImage("media/cactus_emoji.png");
	//heart_emoji = loadImage("media/heart_emoji.png");

	/*---------- SOUNDS ----------*/
	soundFormats('mp3');

	sand_flow = loadSound('media/audio/sand_edit.mp3');
	sand_flow.playMode('restart');
	sand_flow_2 = loadSound('media/audio/sand_edit.mp3');
	sand_flow_2.playMode('restart');
	bubbles_A = loadSound('media/audio/patatap/bubbles_A.mp3');
	bubbles_A.playMode('restart');
	strike_A = loadSound('media/audio/patatap/strike_A.mp3');
	strike_A.playMode('restart');
	timer_A_short = loadSound('media/audio/patatap/timer_A_short.mp3');
	timer_A_short.playMode('sustain');
	woosh_delay = loadSound('media/audio/woosh_delay.mp3');
	woosh_delay.playMode('restart');
	timer_A_short = loadSound('media/audio/patatap/timer_A_short.mp3');
	timer_A_short.playMode('sustain');
	piano_key = loadSound('media/audio/piano_key_short.mp3');
	piano_key.playMode('sustain');
	bubbles_E = loadSound('media/audio/patatap/bubbles_E.mp3');
	bubbles_E.playMode('restart');
	timer_C= loadSound('media/audio/patatap/timer_C.mp3');
	timer_C.playMode('restart');
}


var startH;


var incrW;

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(255);

	curSandPile = sand_pile_TEST;
	//curSandPile = sand_pile_option_01;

	incrW = width;

	slider = createSlider(0, 100, 1);
	slider.style('width', '200px');

	//Init box2d physics and world
	initConfig();

	world = createWorld(0,config.gravity);
	defaultSurfacePoints = config.defaultVerticalPoints;
	lowSurfacePoints = config.lowVerticalPoints;
	startX = width/2;
	startY = -100;

	slider.position(10, -100);
	
	defaultSurface = new SurfaceShape(defaultSurfacePoints);
//	lowSurface = new SurfaceShape(lowSurfacePoints);


	curHeight = height;
	startH = height * 3/2 + 5;
	imageH = startH;

	sand_flow.loop(2);
	sand_flow.setVolume(0.1);
	sand_flow_2.loop(5);
	sand_flow_2.setVolume(0.1);

	strike_A.setVolume(0.7);

	timer_A_short.setVolume(0.05);

	woosh_delay.setVolume(0.5);
	piano_key.setVolume(0.2);
	bubbles_E.setVolume(0.1);

	smooth();
}
 
var timer = 0;
var showingDefault = true;
var timeStep = 1.0/30;
var vizEffectLength = 2;
var vizEffectCounter = 0;


var widthFactor = 1;

function draw(){
	background(0);

	//BACKGROUND CHANGING EFFECT
	// if(changeBackground){
	// 	image(bg_image_0,0,0,width, width * 3/4);
	// }

	//Set up time
	world.Step(timeStep,10,10);

	// Control freq flow of particles
	var flowRate = getFlowRate();

	if(produceParticles){
		if ((random(1)) < flowRate) {
			var startX = (width/2);
			for (var f = 0; f < 2; f++){
				sandParticles.push(new Sand(startX, startY, horizontalWorld));
			}
		}
	}

	// Display all the sand boundaries
	for (var k = sandBoundaries.length-1; k >= 0; k--) {
		sandBoundaries[k].display();
		if (sandBoundaries[k].done()){
			sandBoundaries.splice(k,1);
		}
	}

	//Logic to manage Surface Bodies
	if (timer > 40){
		defaultSurface.killBody();
		defaultSurfacePoints = getVerticalPoints(incrementCounter);
		defaultSurface = new SurfaceShape(defaultSurfacePoints);
		incrementCounter++;
		timer = 0;
	}
	else{
		timer++;
	}

	imageMode(CENTER);
	var imageShake = 0;
	if (imageIsShaking){
		imageShake = random(-20,20);
	}

	var imageW = width/2 + imageShake;

	if (imageIsResetting){

		/*
		sandParticles.forEach(function(sp,i){
			var curForce = new box2d.b2Vec2(random(-1,1),5);
			sp.applyForce(curForce);
		});
		*/

		imageH += 24;

		if (imageH > startH){
			imageIsResetting = false;
			produceParticles = true;
			console.log("BOTTOM!");
			console.log(imageH);
			imageH = startH;
		}

	}
	else{
		imageH -= 1/40;
	}



	//if (imageIsEffected){
		//tint(0, 153, 204);
		//tint(255, 100,100, 126);
		//filter(INVERT);
	//}


	if (imageIsEffected){
		triggerVisualEffect(curSandPile, vizEffectLength);
		// if(vizEffectCounter > 2){
			vizEffectLength++;
		// 	vizEffectCounter = 0;
		// }
		// vizEffectCounter++;
	}
	else{
		// vizEffectCounter = 0;
		vizEffectLength = 2;
		// curSandPile = sandPile_Wide;
	}



	incrW -= 1/20;
	//image(sand_pile_image_large, imageW, imageH);
	image(curSandPile, width/2, imageH, width, width * 3/4);
	//image(curSandPile, mouseX, mouseY + 250, width * widthFactor, width * 3/4);
	curWVal = 0;

	if(imagePixel){
		triggerPixelEffect(curSandPile);
	}


	//if (imageIsEffected){
		//noTint();
		//filter(INVERT);
	//}

	
	//imageMode(CENTER);
	//image(sand_pile_image, width/2 - 12, (height-80));

	seaShells.forEach(function(shell,i){
		shell.run();
	});

	//SHOW SURFACE SHAPES
	if (mouseIsPressed){
		defaultSurface.display();
	}

	// Display all the sand particles
	for (var j = sandParticles.length-1; j >= 0; j--) {
		sandParticles[j].display();
		//Logic to remove particles
		if (sandParticles[j].done()){
			sandParticles.splice(j,1);
		}
	}



	// Display all the splash particles
	for (var sp = splashParticles.length-1; sp >= 0; sp--) {
		splashParticles[sp].display();
		//Logic to remove particles
		if (splashParticles[sp].done()){
			splashParticles.splice(sp,1);
		}
	}






	//GRAVITY EFFECT
	if (gravityEffect){
		sandParticles.forEach(function(sp,i){
			var curForce = new box2d.b2Vec2(random(-10,10),0);
			sp.applyForce(curForce);
		});
	}




	/*
	//THESE WILL EFFECT THE ENTIRE SKETCH

	//IMAGE INVERT EFFECT
	if (imageToggle){
		filter(INVERT);
	}




	//config.bottomBoundary -= (1/100);
	
	//fill(0);
	//rect(0, config.bottomBoundary, width,2);

	/*
	colorOptions.forEach(function(obj,i){
		stroke(1);
		fill(obj.r, obj.g, obj.b);
		rect(30 + (50 * i), 50, 40, 40);
	});
	*/

}

function getFlowRate(){
	var flowRate;
	if(showingDefault){
		//var val = 10;
		var val = slider.value();
		flowRate = map(val,0,100,1,0);
	}
	else{
		flowRate = 0;
	}
	return flowRate;
}


function mousePressed(){

	//triggerGravityEffect();

	//triggerBGImageEffect();

	//triggerSplashEffect();

}


var produceParticles = true;
var changeBackground = false;
var imagePixel = false;
var imageIsShaking = false;
var imageIsEffected = false;
var gravityEffect = false;
var imageIsResetting = false;



function triggerSplashEffect(){
	for (var i = 0; i < 100; i++){
		splashParticles.push(new Sand(mouseX, mouseY, horizontalWorld));
	}
}


function moveSketch(pos){
	if (pos === 'reset'){

		produceParticles = false;
		defaultSurface.killBody();
		incrementCounter = 1;
		defaultSurfacePoints = getVerticalPoints(incrementCounter);
		defaultSurface = new SurfaceShape(defaultSurfacePoints);
		incrementCounter++;
		timer = 0;

		//	config.bottomBoundary = 0;
		//	setTimeout(function(){
		//	config.bottomBoundary = height;
		//	}, 5);
		setTimeout(function(){
			imageIsResetting = true;
		}, 300);

	}
	else if (pos === 'middle'){
		imageH = height;
		incrementCounter = height/2 + 200;
	}

}


function triggerBGImageEffect(){
	changeBackground = true;
	setTimeout(function(){
		changeBackground = false;
	}, 1000);
	//var moveX = -2 * ( (locX - width/2)/(width/2) );
}


function triggerGravityEffect(){
	gravityEffect = true;
	setTimeout(function(){
		gravityEffect = false;
	}, 200);
	//var moveX = -2 * ( (locX - width/2)/(width/2) );
}

function addShell(shellType){
	var xPos = width/2 + random(-5,5);
	seaShells.push(new Shell(shellType, xPos, -100, defaultSurfacePoints[3][1]));
}

function triggerAudio(audioType){
	audioType.play();
}


function triggerPixelEffect(theImage){
	console.log("Pixel Effect!!!");
	
	//Load all pixels
	loadPixels();
	var rowNumbers = 4 * (width * pixelDensity);
	for (var i = 0; i < pixels.length; i+=4) {
		var r = pixels[i];
		var g = pixels[i+1];
		var b = pixels[i+2];
		//var a = pixels[i+3];

		/*
		var rEfx = r*1.4;
		var gEfx = g*0.8;
		var bEfx = b*0.5;
		*/

		var curR = random(0,2);
		var curG = random(0,2);
		var curB = random(0,2);

		var rEfx = r*curR;
		var gEfx = g*curG;
		var bEfx = b*curB;

		pixels[i] = Math.min(Math.floor(rEfx),255);
		pixels[i+1] = Math.min(Math.floor(gEfx),255);
		pixels[i+2] = Math.min(Math.floor(bEfx),255);
	}
	updatePixels();
	
	/*
	theImage.loadPixels();
	for (var i = 0; i < imgPixels.length; i+=4) {
		var r = imgPixels[i];
		var g = imgPixels[i+1];
		var b = imgPixels[i+2];
		//var a = pixels[i+3];

		var rEfx = r*1.4;
		var gEfx = g*0.8;
		var bEfx = b*0.5;

		imgPixels[i] = Math.min(Math.floor(rEfx),255);
		imgPixels[i+1] = Math.min(Math.floor(gEfx),255);
		imgPixels[i+2] = Math.min(Math.floor(bEfx),255);
	}
	*/

	/*
	theImage.loadPixels();
	for(var x = 0; x < theImage.width; x++) {
		for(var y = 0; y < theImage.height; y++) {
			theImage.set(x, y, [0, 153, 204, 0.5]);
		}
	}
	theImage.updatePixels();
	*/

	/*
	//Just get image pixels
	var y = floor(random(img.height));
	  var pix = img.get(x, y);
	  fill(pix, 128);
	  ellipse(x, y, pointillize, pointillize);
	*/

}




function triggerVisualEffect(curImg, curLength){
	console.log("VEfx!");

	var incrX = 15;
	var incrY = 25;
	var scaleFactor = 1;
	var imageLeft_x = width/2 - incrX;
	var imageRight_x = width/2 + incrX;
	for (var i = 0; i < curLength; i++){
		var curOffsetX = incrX * i;
		var curOffsetY = incrY * i;

		image(curImg, imageLeft_x - (curOffsetX * 17/4), height - (curOffsetY), width/curLength * (1 - (i/curLength)) * scaleFactor, width/curLength * 3/4 * (1 - (i/curLength)) * scaleFactor);
		image(curImg, imageLeft_x - (curOffsetX * 11/4), height - (curOffsetY), width/curLength * (1 - (i/curLength)) * scaleFactor, width/curLength * 3/4 * (1 - (i/curLength)) * scaleFactor);
		image(curImg, imageLeft_x - (curOffsetX * 7/4), height - (curOffsetY), width/curLength * (1 - (i/curLength)) * scaleFactor, width/curLength * 3/4 * (1 - (i/curLength)) * scaleFactor);
		image(curImg, imageLeft_x - (curOffsetX * 5/4), height - (curOffsetY), width/curLength * (1 - (i/curLength)) * scaleFactor, width/curLength * 3/4 * (1 - (i/curLength)) * scaleFactor);
		image(curImg, imageLeft_x - (curOffsetX * 3/4), height - (curOffsetY), width/curLength * (1 - (i/curLength)) * scaleFactor, width/curLength * 3/4 * (1 - (i/curLength)) * scaleFactor);
		image(curImg, imageLeft_x - (curOffsetX/4), height - (curOffsetY), width/curLength * (1 - (i/curLength)) * scaleFactor, width/curLength * 3/4 * (1 - (i/curLength)) * scaleFactor);

		image(curImg, imageRight_x + (curOffsetX/4), height - (curOffsetY), width/curLength * (1 - (i/curLength)) * scaleFactor, width/curLength * 3/4 * (1 - (i/curLength)) * scaleFactor);
		image(curImg, imageRight_x + (curOffsetX * 3/4), height - (curOffsetY), width/curLength * (1 - (i/curLength)) * scaleFactor, width/curLength * 3/4 * (1 - (i/curLength)) * scaleFactor);
		image(curImg, imageRight_x + (curOffsetX * 5/4), height - (curOffsetY), width/curLength * (1 - (i/curLength)) * scaleFactor, width/curLength * 3/4 * (1 - (i/curLength)) * scaleFactor);
		image(curImg, imageRight_x + (curOffsetX * 7/4), height - (curOffsetY), width/curLength * (1 - (i/curLength)) * scaleFactor, width/curLength * 3/4 * (1 - (i/curLength)) * scaleFactor);
		image(curImg, imageRight_x + (curOffsetX * 11/4), height - (curOffsetY), width/curLength * (1 - (i/curLength)) * scaleFactor, width/curLength * 3/4 * (1 - (i/curLength)) * scaleFactor);
		image(curImg, imageRight_x + (curOffsetX * 17/4), height - (curOffsetY), width/curLength * (1 - (i/curLength)) * scaleFactor, width/curLength * 3/4 * (1 - (i/curLength)) * scaleFactor);

	}
}

function keyPressed() {

	console.log(keyCode);

	if (keyCode === LEFT_ARROW) {
		if(!imageIsEffected){
			imageIsEffected = true;
			setTimeout(function(){
				imageIsEffected = false;
			},2000);
		}
		
		//triggerAudio(bubbles_A);
		
		//triggerWindEffect(width * 0.4);
		
		//triggerGravityEffect();
	}
	else if (keyCode === RIGHT_ARROW) {
		if(!imagePixel){
			imagePixel = true;
			setTimeout(function(){
				imagePixel = false;
			},2000);
		}

		//triggerAudio(strike_A);
		
		//triggerWindEffect(width * 0.6);
		
		//triggerGravityEffect();
	}
	else if (keyCode === UP_ARROW) {
		if (!imageIsShaking){
			imageIsShaking = true;
			setTimeout(function(){
				imageIsShaking = false;
			},1200);
		}
		triggerAudio(woosh_delay);
	}
	else if (keyCode === DOWN_ARROW){
			triggerAudio(bubbles_E);
			triggerAudio(timer_C);
			addShell(seashell_orange);
	}
	else if (keyCode === 82){ //r
		moveSketch('reset');
	}
	else if (keyCode === 77){ //m
		moveSketch('middle');
	}
	else if (keyCode === 74){ //r
		widthFactor -= 0.02;
	}
	else if (keyCode === 76){ //m
		widthFactor += 0.02;
	}
}