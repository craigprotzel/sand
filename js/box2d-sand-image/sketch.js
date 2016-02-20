//WORLD
var world;

//SURFACE
var defaultSurface;
var deafultSurfacePoints = [];
var startH;

//BOUNDARIES
var sandBoundaries = [];

//PARTICLES
var sandParticles = [];
var startX;
var startY;
var splashParticles = [];

//OTHER
var seaShells = [];
//var slider;

var sliderRed;
var sliderGreen;
var sliderBlue;

/*---------- WORLD CONIFG ----------*/
var increment = 1;
var incrementCounter = 1;

var config = {};
function initConfig(){
	config = {
		lifeTime : 180,
		bottomBoundary: height,
		gravity: 15,
		density : 1.0,
		friction : 0.01,
		restitution : 0.01,
		defaultVerticalPoints : getVerticalPoints()
	};
}

function getVerticalPoints(){

	var picWidth = 512;
	var picHeight = 768;

	return [
		//starters
		[-1,0],
		[0,0],

		//Outside Bottom Left
		//[-1/2 * width + 10, (height * 3) - (height * 3/8) - (increment * val)],
		//[-1/2 * width + 10, (height * 3) - (increment * val)],

		[width/2 - picWidth, (height + picHeight) - totalMoved], //1024

		//Middle Left
		//[width/2-2, height + 8 - (height * 3/8) - (increment * val)],
		[width/2 - 2 , height - totalMoved], //1024

		//[100 , height * 2 - (height * 3/8) - (increment * val)],
		[width/2 - (3/4 * picWidth), height + picHeight - totalMoved], //1024

		//[width/2-2, height + 52 - (height * 3/8) - (increment * val)],
		[width/2 - 2, height + 50 - totalMoved], //1024
		
		//Middle Middle
		//[width/2 - 200, height * 2 - (height * 3/8) - (increment * val)],
		//[width/2 + 200, height * 2 - (height * 3/8) - (increment * val)],
		[width/2 - (1/2 * picWidth), height + picHeight - totalMoved], //1024
		[width/2 + (1/2 * picWidth), height + picHeight - totalMoved], //1024

		//[width/2 + 2, height + 52 - (height * 3/8) - (increment * val)],
		[width/2 + 2, height + 50 - totalMoved],//1024

		//[width - 100, height * 2 - (height * 3/8) - (increment * val)],
		[width/2 + (3/4 * picWidth), height + picHeight- totalMoved],//1024

		//Middle Right
		//[width/2+2, height + 8 - (height * 3/8) - (increment * val)],
		//[width/2+2, height + 8 - (increment * val)],
		[width/2 + 2, height - totalMoved], //1024

		//Outside Bottom Right
		//[width * 3/2 - 10, (height * 3) - (height * 3/8) - (increment * val)],
		[width/2 + picWidth, (height + picHeight) - totalMoved],

		//closers
		[width, 0],
		[width + 1, height + (picHeight * 2)],
		[-picWidth, height + (picHeight * 2)]];
}

//IMAGES
var curPile;
var imageH;

var sand_pile;
var sand_pile_particle;

var sand_pile_pixels_5;
var sand_pile_pixels_10;
var sand_pile_pixels_15;

// var rock_pile_01;
// var rock_pile_02;

// var rock_cutout;

// var pattern_pile_01;
// var pattern_pile_02;

var palm_tree_01;
var palm_tree_02;

var garbage_bottle;
var garbage_cup;
var garbage_pinkbag;
var garbage_yellowbag;

//OLD
var seashell_image_01;
var cactus_emoji, heart_emoji;

//SOUNDS
var sand_flow, sand_flow_2, sand_flow_bonus;
var woosh_delay;

var sftb_vocal;
var sftb_vocal_acapella;
var sftb_drum_clip_01;
var sftb_drum_clip_02;
var sftb_high_hat;

var door_beep;
var door_slide_open_withBeep;
var door_slide_open;
var rolling_cart;
var rocks_falling;

var birds_01;
var digital_pixels_01;

var vacuum;

var drill_01;
var drill_02;

var chimes;


function preload() {

	/*---------- IMAGES ----------*/
	sand_pile = loadImage("media/sand_pile/FINAL/Sand_Triangle_Corners_FULL_1024.png");
	//sand_pile_TEST = loadImage("media/sand_pile/FINAL/Sand_Triangle_Corners_FULL.png");
	sand_pile_particle = loadImage("media/sand_pile/FINAL/Sand_Triangle_Corners_FULL_particle.png");

	// rock_pile_01 = loadImage("media/other_piles/rock_pile_01.png");
	// rock_pile_02 = loadImage("media/other_piles/rock_pile_02.png");

	//rock_cutout = loadImage("media/other_piles/rock_cutout.png");
	// rock_cutout = loadImage("media/other_piles/rock_cutout_02.png");

	// pattern_pile_01 = loadImage("media/other_piles/pattern_pile_01.png");
	// pattern_pile_02 = loadImage("media/other_piles/pattern_pile_02.png");

	palm_tree_01 = loadImage("media/other_images/palm_tree_01.png");
	palm_tree_02 = loadImage("media/other_images/palm_tree_white.png");

	sand_pile_pixels_5 = loadImage("media/sand_pile/FINAL/sand_pile_pixels_5.png");
	sand_pile_pixels_10 = loadImage("media/sand_pile/FINAL/sand_pile_pixels_10.png");
	sand_pile_pixels_15 = loadImage("media/sand_pile/FINAL/sand_pile_pixels_15.png");

	garbage_bottle = loadImage("media/garbage/garbage_bottle.png");
	garbage_cup = loadImage("media/garbage/garbage_cup.png");
	garbage_pinkbag = loadImage("media/garbage/garbage_pinkbag.png");
	garbage_yellowbag = loadImage("media/garbage/garbage_yellowbag.png");


	/*---------- SOUNDS ----------*/
	soundFormats('mp3','wav');

	sand_flow = loadSound('media/audio/sand_edit.mp3');
	sand_flow.playMode('restart');
	sand_flow_2 = loadSound('media/audio/sand_edit.mp3');
	sand_flow_2.playMode('restart');

	sand_flow_bonus = loadSound('media/audio/sand_short.mp3');
	sand_flow_bonus.playMode('restart');

	woosh_delay = loadSound('media/audio/woosh_delay.mp3');
	woosh_delay.playMode('restart');

	sftb_vocal = loadSound('media/audio/SFTB/SFTB_clip.wav');
	sftb_vocal.playMode('restart');
	sftb_vocal_acapella = loadSound('media/audio/SFTB/SFTB_acapella_echo.wav');
	sftb_vocal_acapella.playMode('sustain');
	sftb_drum_clip_01 = loadSound('media/audio/SFTB/SFTB_drum_clip_01_edit.mp3');
	sftb_drum_clip_01.playMode('restart');
	sftb_drum_clip_02 = loadSound('media/audio/SFTB/SFTB_drum_clip_02_edit.mp3');
	sftb_drum_clip_02.playMode('restart');
	sftb_high_hat = loadSound('media/audio/SFTB/SFTB_high_hat.wav');
	sftb_high_hat.playMode('restart');

	door_beep = loadSound('media/audio/Zoom_Edits/door_beep.wav');
	door_beep.playMode('restart');
	door_slide_open_withBeep = loadSound('media/audio/Zoom_Edits/door_slide_open_withBeep.wav');
	door_slide_open_withBeep.playMode('restart');
	door_slide_open = loadSound('media/audio/Zoom_Edits/door_slide_open.wav');
	door_slide_open.playMode('restart');
	rolling_cart = loadSound('media/audio/Zoom_Edits/rolling_cart_short.mp3');
	rolling_cart.playMode('restart');
	rocks_falling = loadSound('media/audio/Zoom_Edits/rocks_falling_short.mp3');
	rocks_falling.playMode('restart');

	birds_01 = loadSound('media/audio/birds_01.wav');
	birds_01.playMode('restart');

	digital_pixels = loadSound('media/audio/digital_pixels.wav');
	digital_pixels.playMode('restart');

	vacuum = loadSound('media/audio/vacuum_edit.wav');
	vacuum.playMode('restart');

	drill_01 = loadSound('media/audio/drill_01_short.mp3');
	drill_01.playMode('restart');

	drill_02 = loadSound('media/audio/drill_02_short.mp3');
	drill_02.playMode('restart');

	chimes = loadSound('media/audio/chimes.wav');
	chimes.playMode('restart');
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(255);

	curPile = sand_pile;

	//noCursor();

	/*
	slider = createSlider(0, 100, 1);
	slider.style('width', '200px');
	*/

	// sliderRed = createSlider(0, 100, 50);
	// sliderRed.style('width', '200px');
	// sliderGreen = createSlider(0, 100, 50);
	// sliderGreen.style('width', '200px');
	// sliderBlue = createSlider(0, 100, 50);
	// sliderBlue.style('width', '200px');

	//Init box2d physics and world
	initConfig();

	world = createWorld(0,config.gravity);
	defaultSurfacePoints = config.defaultVerticalPoints;
	
	startX = width/2;
	startY = -10;

	//slider.position(10, -100);
	
	defaultSurface = new SurfaceShape(defaultSurfacePoints);

	//startH = height * 3/2 + 5;
	//startH = height * 9/8 + 5;

	startH = height + 384;

	imageH = startH;

	sand_flow.loop(2);
	sand_flow.setVolume(0.1);
	sand_flow_2.loop(5);
	sand_flow_2.setVolume(0.1);

	woosh_delay.setVolume(0.7);

	sftb_vocal.setVolume(0.3);
	sftb_vocal_acapella.setVolume(0.5);

	sftb_high_hat.setVolume(0.8);

	sftb_drum_clip_01.setVolume(0.65);
	sftb_drum_clip_02.setVolume(0.65);

	rolling_cart.setVolume(0.7);

	birds_01.setVolume(0.15);

	vacuum.setVolume(0.3);

	chimes.setVolume(1.2);

	smooth();
}
 
var timer = 0;
var showingDefault = true;
var timeStep = 1.0/30;
var vizEffectLength = 2;
var vizEffectCounter = 0;

var widthFactor = 1;
var curColor;

var totalMoved = 0;

function draw(){
	background(0);

	//BACKGROUND CHANGING EFFECT
	if(imagePixel){
		// if(curColor == 'orange'){
		// background(20);
		// }
		// else{
			background(50);
		// }
	}

	//Set up time
	world.Step(timeStep,10,10);

	// Control freq flow of particles
	//var flowRate = getFlowRate();

	if(produceParticles){
		var curParticleType = 'sand';
		var flowValue = 3;
		var flowRate = 1;
		// if(produceRockPile){
		// 	curParticleType = 'rock';
		// 	flowValue = 1;
		// 	flowRate = 0.5;
		// }
		if ((random(1)) < flowRate) {
			for (var f = 0; f < flowValue; f++){
				sandParticles.push(new Sand(startX, startY, curParticleType));
			}
		}
	}

	//Display all the sand boundaries
	for (var k = sandBoundaries.length-1; k >= 0; k--) {
		sandBoundaries[k].display();
		if (sandBoundaries[k].done()){
			sandBoundaries.splice(k,1);
		}
	}

	//Logic to manage Surface Bodies
	if (timer > 60){
		defaultSurface.killBody();
		defaultSurfacePoints = getVerticalPoints();
		defaultSurface = new SurfaceShape(defaultSurfacePoints);
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
		imageH += 20;
		if (imageH > startH){
			imageIsResetting = false;
			produceParticles = true;
			//console.log("BOTTOM!");
			//console.log(imageH);
			imageH = startH;
			totalMoved = 0;
		}
	}
	else{
		imageH -= 1/40;
		totalMoved += 1/40;
	}

	if (imageIsEffected){
		triggerVisualEffect(curPile, vizEffectLength);
		vizEffectCounter++;
		if (vizEffectCounter > 2){
			vizEffectLength++;
			vizEffectCounter = 0;
		}
	}
	else{
		vizEffectLength = 2;
	}

	if (showDigitalPixels){
		curPile = digitalPixels();
	}
	// else if (showRockPile_01){
	// 	curPile = rock_pile_01;
	// }
	// else if (showRockPile_02){
	// 	curPile = rock_pile_02;
	// }
	// else if (showPatternPile_01){
	// 	curPile = pattern_pile_01;
	// }
	// else if (showPatternPile_02){
	// 	curPile = pattern_pile_02;
	// }
	else{
		curPile = sand_pile;
	}

	image(curPile, imageW, imageH);
	//image(curPile, imageW, height/2, width, width * 3/4);

	if(imagePixel){
		triggerPixelEffect(curPile, curColor);
	}

	seaShells.forEach(function(shell,i){
		shell.run();
	});

	//SHOW SURFACE SHAPES
	// if (mouseIsPressed){
	// 	defaultSurface.display();
	// }
	//defaultSurface.display();
	
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
			var curForce = new box2d.b2Vec2(random(-1.5,1.5),1);
			sp.applyForce(curForce);
		});
	}


	if (gravityEffect_02){
		sandParticles.forEach(function(sp,i){
			var curForce = new box2d.b2Vec2(0,-2);
			sp.applyForce(curForce);
		});
	}

	//Palm Trees
	if (showPalmTrees_02){
		displayPalmTrees(palm_tree_02);
	}
	if (showPalmTrees_01){
		displayPalmTrees(palm_tree_01);
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

	if (imageH < 385){
		triggerAudio(door_beep);
		setTimeout(function(){
			moveSketch('reset');
		},300);
		setTimeout(function(){
			triggerAudio(door_slide_open);
			triggerAudio(woosh_delay);
		},600);
		
	}

	if (showFilterInvert){
		//tint(0, 153, 204);
		//tint(255, 100,100, 126);
		//filter(INVERT);
		filter(THRESHOLD);
	}
	
	// sliderRed.position(20, 100);
	// sliderGreen.position(20, 150);
	// sliderBlue.position(20, 200);
}

function getFlowRate(){
	var flowRate;
	if(showingDefault){
		//var val = 10;
		//var val = slider.value();
		//flowRate = map(val,0,100,1,0);
		flowRate = 1;
	}
	else{
		flowRate = 1;
	}
	return flowRate;
}

var produceParticles = true;
var changeBackground = false;
var imagePixel = false;
var imageIsShaking = false;
var imageIsEffected = false;
var gravityEffect = false;
var gravityEffect_02 = false;

var imageIsResetting = false;

var showFilterInvert = false;

// var showRockPile_01 = false;
// var showRockPile_02 = false;
// var produceRockPile = false;

// var showPatternPile_01 = false;
// var showPatternPile_02 = false;

var showPalmTrees_01 = false;
var showPalmTrees_02 = false;

var showDigitalPixels = false;


function triggerSplashEffect(){
	for (var i = 0; i < 100; i++){
		splashParticles.push(new Sand(mouseX, mouseY));
	}
}

function displayPalmTrees(pTree){

	var xFactor;
	if (pTree == palm_tree_01){
		xFactor = width/6;
		pTree.resize(600,450);
		for (var i = 0; i < 6; i++){
			image(pTree, xFactor + (i * xFactor), height * 0.732);
		}
	}
	else{
		xFactor = width/7;
		pTree.resize(300,300);
		for (var j = 0; j < 6; j++){
			image(pTree, xFactor + (j * xFactor), height * 0.82);
		}

	}
}


function moveSketch(pos){
	if (pos === 'reset'){

		produceParticles = false;
		defaultSurface.killBody();
		//incrementCounter = 1;
		defaultSurfacePoints = getVerticalPoints();
		defaultSurface = new SurfaceShape(defaultSurfacePoints);
		//incrementCounter++;
		timer = 0;

		//	config.bottomBoundary = 0;
		//	setTimeout(function(){
		//	config.bottomBoundary = height;
		//	}, 5);
		setTimeout(function(){
			imageIsResetting = true;
		}, 300);

	}
	// else if (pos === 'middle'){
	// 	//imageH = 387;

	// 	imageH = height * 3/4;

	// 	defaultSurface.killBody();
	// 	incrementCounter = 560;
	// 	defaultSurfacePoints = getVerticalPoints(incrementCounter);
	// 	defaultSurface = new SurfaceShape(defaultSurfacePoints);
	// 	incrementCounter++;
	// 	timer = 0;

	// 	//incrementCounter = height/2 + 200;
	// }

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
	}, 2000);
	//var moveX = -2 * ( (locX - width/2)/(width/2) );
}

function triggerGravityEffect_02(){
	gravityEffect_02 = true;
	setTimeout(function(){
		gravityEffect_02 = false;
	}, 800);
	//var moveX = -2 * ( (locX - width/2)/(width/2) );
}

function addShell(shellType){
	var xPos = width/2 + random(-300,300);
	var yPos = height - height*(random(1));
	seaShells.push(new Shell(shellType, xPos, yPos, defaultSurfacePoints[3][1]));
}

function triggerAudio(audioType){
	audioType.play();
}

var colorTestMode = false;
function triggerPixelEffect(theImage, theColor){
	//console.log("Pixel Effect!!!");

	var cfR;
	var cfB;
	var cfG;

	if (colorTestMode){
		var valRed = sliderRed.value();
		cfR = map(valRed,0,100,0,3);

		var valGreen = sliderGreen.value();
		cfG = map(valGreen,0,100,0,3);

		var valBlue = sliderBlue.value();
		cfB = map(valBlue,0,100,0,3);

		//console.log("R: " + cfR + " G: " + cfG + " B: " + cfB);
	}
	else{
		cfR = 1;
		cfG = 1;
		cfB = 1;

		if (theColor == 'aqua'){ //'j' 
			cfR = 0;
			cfG = 0.9;
			cfB = 0.95;
		}
		else if (theColor == 'orange'){ //'k'
			cfR = 1.4;
			cfG = 0.81;
			cfB = 0;
		}
	}

	//Load all pixels
	loadPixels();
	var rowNumbers = 4 * (width * pixelDensity);
	for (var i = 0; i < pixels.length; i+=4) {
		var r = pixels[i];
		var g = pixels[i+1];
		var b = pixels[i+2];
		//var a = pixels[i+3];

		var rEfx = r*cfR;
		var gEfx = g*cfG;
		var bEfx = b*cfB;

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


function digitalPixels(){
	var pixelImages = [sand_pile_pixels_5, sand_pile_pixels_10, sand_pile_pixels_15];
	var curImage = Math.floor(random(0,3));
	return pixelImages[curImage];
}


function triggerVisualEffect(curImg, curLength){
	//console.log("VEfx!");

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

var pixelTimer;
var rockTimer;
var imageShakeTimer;

// var rockPile01_Timer;
// var rockPile02_Timer;
// var produceRockPileTimer;

// var patternPile01_Timer;
// var patternPile02_Timer;
var palmTrees_Timer;
var palmTrees_Timer_02;

var invertFilterTimer;
var digitalPixelTimer;

var nums = 0;

function keyPressed(e) {
	//console.log(e);
	//console.log(keyCode);
	triggerEffectEvent(keyCode);
}

function mousePressed(){
	//var randomValue = Math.floor(random(0,300));
	//triggerEffectEvent(randomValue);
	
}

function triggerEffectEvent(keyCode){
	var curAction;
	keyButtonObjs.forEach(function(el,index){
		if (el.buttonVal == keyCode){
			curAction = el.activity;
		}
	});

	//console.log(curAction);

	if (keyCode === 32){ //r RESET
		triggerAudio(door_beep);
		setTimeout(function(){
			moveSketch('reset');
		},400);
		setTimeout(function(){
			triggerAudio(woosh_delay);
			triggerAudio(door_slide_open);
		},600);
	}
	else if (curAction === 0 || curAction === 7) { //DRAKE
		if(!imageIsEffected){
			imageIsEffected = true;
			setTimeout(function(){
				imageIsEffected = false;
			},2000);
		}
		
		triggerAudio(sftb_vocal);
		//triggerAudio(sftb_vocal_acapella);
	}
	/*
	else if (keyCode === RIGHT_ARROW) { //FILTER-INVERT

		if (showFilterInvert){
			clearTimeout(invertFilterTimer);
		}
		showFilterInvert = true;
		invertFilterTimer = setTimeout(function(){
			showFilterInvert = false;
		},1200);

		//triggerAudio(woosh_delay);
		triggerAudio(timer_C);
	}
	*/
	else if (curAction === 1 || curAction === 8) { //SHAKE DRILL
		if (imageIsShaking){
			clearTimeout(imageShakeTimer);
		}
		imageIsShaking = true;
		imageShakeTimer = setTimeout(function(){
			imageIsShaking = false;
		},1800);

		triggerGravityEffect();
		triggerAudio(sand_flow_bonus);
		triggerAudio(drill_02);
	}
	/*
	else if (keyCode === DOWN_ARROW){ //GARBAGE???
		// triggerAudio(bubbles_E);

		//ADD GARBAGE EFFECT
		var curShell = garbage_cup;
		var curRandom = random(1);
		if (curRandom > 0.75){
			curShell = garbage_cup;
		}
		else if (curRandom > 0.5){
			curShell = garbage_bottle;
		}
		else if (curRandom > 0.25){
			curShell = garbage_pinkbag;
		}
		else{
			curShell = garbage_yellowbag;
		}
		addShell(curShell);

		// if (showRockPile_01){
		// 	clearTimeout(rockTimer);
		// }
		// showRockPile_01 = true;
		// rockTimer = setTimeout(function(){
		// 	showRockPile_01 = false;
		// },200);
	}
	*/
	else if (curAction === 2 || curAction === 9){ //d DIGITAL PIXELS
		if (showDigitalPixels){
			clearTimeout(digitalPixelTimer);
		}
		showDigitalPixels = true;
		digitalPixelTimer = setTimeout(function(){
			showDigitalPixels = false;
		},1100);
		triggerAudio(digital_pixels);
	}
	else if (curAction === 3 || curAction === 10){ //g GRAVITY EFFECT
		triggerGravityEffect_02();
		triggerAudio(vacuum);
		sand_flow.setVolume(0.0);
		sand_flow_2.setVolume(0.0);

		setTimeout(function(){
			sand_flow.setVolume(0.1);
			sand_flow_2.setVolume(0.1);
		}, 2400);
	}
	else if (curAction === 4 || curAction === 11){ //h - COLOR ORANGE
		if (!imageIsEffected){
			if (imagePixel){
				clearTimeout(pixelTimer);
			}
			imagePixel = true;
			curColor = 'orange';
			pixelTimer = setTimeout(function(){
				imagePixel = false;
			},400);
		}
		triggerAudio(sftb_high_hat);
	}
	// else if (keyCode === 74){ //j - COLOR AQUA TEST

	// 	//FOR TESTING
	// 	if (colorTestMode){
	// 		imagePixel = false;
	// 	}
	// 	else{
	// 		if (!imageIsEffected){
	// 			if (imagePixel){
	// 				clearTimeout(pixelTimer);
	// 			}
	// 			imagePixel = true;
	// 			curColor = 'aqua';
	// 			pixelTimer = setTimeout(function(){
	// 				imagePixel = false;
	// 			},1400);
	// 		}
	// 	}
	// 	triggerAudio(chimes);
	// }
	// else if (keyCode === 75){ //k - COLOR ORANGE TEST
	// 	//FOR TESTING
	// 	if (colorTestMode){
	// 		imagePixel = false;
	// 	}
	// 	else{
	// 		if (!imageIsEffected){
	// 			if (imagePixel){
	// 				clearTimeout(pixelTimer);
	// 			}
	// 			imagePixel = true;
	// 			curColor = 'orange';
	// 			pixelTimer = setTimeout(function(){
	// 				imagePixel = false;
	// 			},400);
	// 		}
	// 	}
	// 	triggerAudio(sftb_high_hat);
	// }
	else if (curAction === 5 || curAction === 12){ //l - COLOR AQUA
		if (!imageIsEffected){
			if (imagePixel){
				clearTimeout(pixelTimer);
			}
			imagePixel = true;
			curColor = 'aqua';
			pixelTimer = setTimeout(function(){
				imagePixel = false;
			},1400);
		}
		triggerAudio(chimes);
	}
	// else if (keyCode === 49){ //2
	// 	if (showRockPile_02){
	// 		clearTimeout(rockPile02_Timer);
	// 	}
	// 	if (produceRockPileTimer){
	// 		clearTimeout(produceRockPileTimer);
	// 	}

	// 	showRockPile_02 = true;
	// 	produceRockPile = true;

	// 	rockPile02_Timer = setTimeout(function(){
	// 		showRockPile_02 = false;
	// 	},2500);

	// 	produceRockPileTimer = setTimeout(function(){
	// 		produceRockPile = false;
	// 	}, 1500);

	// 	setTimeout(function(){
	// 		triggerAudio(rocks_falling);
	// 	},800);
	// }
	/*
	else if (keyCode === 50){ //3
		if (showPatternPile_01){
			clearTimeout(patternPile01_Timer);
		}
		showPatternPile_01 = true;
		patternPile01_Timer = setTimeout(function(){
			showPatternPile_01 = false;
		},2000);
		triggerAudio(rolling_cart);
	}
	*/
	/*
	else if (keyCode === 79){ //o
		// if (showPalmTrees_02){
		// 	clearTimeout(palmTrees_Timer_02);
		// }
		// showPalmTrees_02 = true;
		// palmTrees_Timer_02 = setTimeout(function(){
		// 	showPalmTrees_02 = false;
		// },1800);
		// triggerAudio(bubbles_A);
		//triggerAudio(sftb_drum_clip_02);
	}
	*/
	else if (curAction === 6 || curAction === 13){ //p
		if (showPalmTrees_01){
			clearTimeout(palmTrees_Timer);
		}
		showPalmTrees_01 = true;
		palmTrees_Timer = setTimeout(function(){
			showPalmTrees_01 = false;
		},1200);

			if (showPalmTrees_02){
			clearTimeout(palmTrees_Timer_02);
		}
		showPalmTrees_02 = true;
		palmTrees_Timer_02 = setTimeout(function(){
			showPalmTrees_02 = false;
		},1200);

		triggerAudio(birds_01);
	}
	else{
		e.preventDefault();
		if (!imageIsEffected){
			if (imagePixel){
				clearTimeout(pixelTimer);
			}
			imagePixel = true;
			curColor = 'aqua';
			pixelTimer = setTimeout(function(){
				imagePixel = false;
			},1400);
			triggerAudio(chimes);
		}
		//triggerAudio(strike_A);	
	}
}

function windowResized(e){
	//setup();

	resizeCanvas(windowWidth, windowHeight);
	startX = width/2;
	config.bottomBoundary = height;
	startH = (height + 384) - totalMoved;
	imageH = (height + 384) - totalMoved;

	defaultSurface.killBody();
	//incrementCounter = 1;
	defaultSurfacePoints = getVerticalPoints();
	defaultSurface = new SurfaceShape(defaultSurfacePoints);

}
