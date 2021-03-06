var myCanvas = null;

// Declare kinectron 
var kinectron = null;

// drawHand variables
var start = 30;
var target = 100;
var diameter = start;
var light = 255;
var dark = 100;
var hueValue = light;
var lerpAmt = 0.3;
var state = 'ascending';

function setup() {
  myCanvas = createCanvas(950, 540);
  background(0);
  noStroke();

  // Define and create an instance of kinectron
  var kinectronIpAddress = "172.22.151.79"; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron = new Kinectron("172.22.151.79");

  // Connect to the microstudio
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  //kinectron.startTrackedBodies(bodyTracked);
  kinectron.startMultiFrame(["raw-depth", "body"], bodyTracked);

}

function draw() {

}

function bodyTracked(data) {
  var body;
  if (data.body) {
    body = data.body;
  } else {
    return;
  }

  

  background(0, 20);

  // Get all the joints off the tracked body and do something with them
  for (var i = 0; i < body.joints.length; i++) {
    drawJoint(body.joints[i]);
  }

  // Get the hands off the tracked body and do somethign with them
  //drawHands(body.joints[7], body.joints[11]);
  drawHand(body.joints[7], 1, 'red');
  drawHand(body.joints[11], 1, 'red');
  //updateHandState('open', body.joints[11]);
}

// Draw skeleton
function drawJoint(joint) {
  fill(100);

  // Kinect location data needs to be normalized to canvas size
  ellipse(joint.colorX * myCanvas.width, joint.colorY * myCanvas.height, 15, 15);

  fill(200);

  // Kinect location data needs to be normalized to canvas size
  ellipse(joint.colorX * myCanvas.width, joint.colorY * myCanvas.height, 3, 3);
}


// Draw the hands based on their state
function drawHand(hand, handState, color) {

  if (handState === 1) {
    state = 'ascending';
  }

  if (handState === 0) {
    state = 'descending';
  }

  if (state == 'ascending') {
    diameter = lerp(diameter, target, lerpAmt);
    hueValue = lerp(hueValue, dark, lerpAmt);
  }

  if (state == 'descending') {
    diameter = lerp(diameter, start, lerpAmt);
    hueValue = lerp(hueValue, light, lerpAmt);
  }

  fill(color);

  // Kinect location needs to be normalized to canvas size
  ellipse(hand.colorX * myCanvas.width, hand.colorY * myCanvas.height, diameter, diameter);
}