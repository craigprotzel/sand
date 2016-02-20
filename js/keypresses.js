console.log("Welcome to Now We're Here!");

function KeyButton(curButtonVal, curActivity){
	this.buttonVal = curButtonVal;
	this.activity = curActivity;
}

// var keyButtons =[
// 192,48,49,50,51,52,53,54,55,56,57,189,187,8,
// 9,81,87,69, 82,84,89,85,73,79,80,219,221,220,
// 20, 65, 83,68,70,71,72,74,75,76,186,222,13,
// 16,90,88,67,86,66,78,77,188,190,191,16
// ];

var keyButtons = [];
var totalButtons = 300;
for (var b = 0; b < totalButtons; b++){
	keyButtons.push(b);
}
//console.log(keyButtons);

keyButtons.sort(function() {
  return (0.5 - Math.random());
});
keyButtons.sort(function() {
  return (0.5 - Math.random());
});
keyButtons.sort(function() {
  return (0.5 - Math.random());
});
//console.log(keyButtons);

var keyButtonObjs = [];

var kbNum = 0;
var totalKB = 13;
for (var kb = 0; kb < keyButtons.length; kb++){
	if (kbNum > totalKB){
		kbNum = 0;
	}
	var curKBObj = new KeyButton(keyButtons[kb], kbNum);
	keyButtonObjs.push(curKBObj);
	kbNum++;
}
//console.log(keyButtonObjs);


/*
 48,49,50,51,52,53,54,55,56,57,189,187,8],
[9,81,87,69, 82,84,89,85,73,79,80,219,221,220	],
[20, 65, 83,68,70,71,72,74,75,76,186,222,13],
[16,90,88,67,86,66,78,77,188,190,191,16],

[bottom-row]
[fn, 17]
*/