// Render a simple sine wave. Original by Daniel Shiffman.

let xspacing = 12.2; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 155.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

let sentence = "THANK YOU VERA VAN DE SEYP THANK YOU VERA VAN DE SEYP THANK YOU VERA VAN DE SEYP ";
let sentenceArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  sentenceArray = sentence.split("");
}

function draw() {
  background(0,10);
  calcWave();
  renderWave();
}

function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = cos(x) * amplitude;
    x += dx;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function renderWave() {
  noStroke();
  fill(255);
  for (let x = 0; x < sentenceArray.length; x++) {
    text(sentenceArray[x],x * xspacing, height / 2 + yvalues[x], 16, 16);
  }
}
