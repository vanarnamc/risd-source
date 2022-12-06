let masterVolume= -15;
let ready= false;

let lfo;
let meter;
let prevPos;
let synth;
let myFont;

let arrowSize= 30;
let overArrow = false;
let bx;
let by;

let arrow;

let pendulums = [];
let scale;
let numPendulums=20; //how many balls
let penSpeed= .0085;
let reverb1;
let mixer;

let input, button, greeting;

function preload() {
  arrow = loadImage('assets/arrow.png');
  myFont = loadFont('assets/c.ttf');

}

function setup() {
  createCanvas(windowWidth, windowHeight);


  input = createInput();

  textFont(myFont);

 
input.position(width*.3, height*.7);
  button = createButton('submit');
  button.position(input.x , input.y+input.height);
  button.mousePressed(getReady);


  bx =width*.08;
  by = height*.8;
  imageMode(CENTER);

  Tone.Master.volume.value= masterVolume;

  mixer = new Tone.Gain();
  mixer.toDestination();
  let reverb1= map(mouseX, 0, width, 1, 100);
  let reverb = new Tone.Reverb(10);

  mixer.connect(reverb);

  reverb.toDestination();

  scale = Tonal.Scale.get("C3 minor pentatonic").notes;
  scale = scale.concat(Tonal.Scale.get("C4 minor pentatonic").notes);
  scale = scale.concat(Tonal.Scale.get("C5 minor pentatonic").notes);
  scale = scale.concat(Tonal.Scale.get("C6 minor pentatonic").notes);
  Tonal.Collection.shuffle(scale);

  for (let i=0; i<scale.length; i++){
    pendulums[i]= new Pendulum(.55 + i *penSpeed, scale[i]);

  }
  

  radius = min(width,height) / 3;
  
  // font size is also dynamic!
  textSize(width*.05);
  //textFont(font);
  fill(255);
  

  textAlign(CENTER, BASELINE);
}

  function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
  }


function draw() {
  background(0);
  
  if (ready){ 
    push();
    for (let p of pendulums){
      input.hide();
      button.hide();
      p.run();
      Tone.start();
      
      translate(0,height/pendulums.length);
      
    }
    pop();
    image(arrow, bx, by, arrowSize, arrowSize);
    if (
      mouseX > bx - arrowSize/2 &&
      mouseX < bx + arrowSize/2 &&
      mouseY > by - arrowSize/2 &&
      mouseY < by + arrowSize/2
    ){
      overArrow = true;
      cursor(HAND);
    }
    else{
      cursor(ARROW);
    }
  }
    else {
      textAlign(LEFT);
      text("WELCOME!\n TYPE IN A PHRASE \n AND PRESS 'SUBMIT' \n TO BEGIN", width/4, height/4);
   

  }

}
function mousePressed() {
  if (overArrow) {
    location.reload();    
  }
}

function getReady() {
  if (!ready) {
    // initializeAudio();
    ready = true;

  }
}


class Pendulum {
  // runs when we call "= new Pendulum()


  constructor(freq, note) {
    this.freq = freq ;
    this.note = note;

    this.lfo = new Tone.LFO(this.freq);
    this.lfo.start(1); // creating a delayed start time by 1
    this.meter = new Tone.Meter();
    this.meter.normalRange = true; // 0-1
    this.lfo.connect(this.meter);

    this.synth = new Tone.Synth();
    this.synth.oscillator.type = 'sine';
    this.synth.connect(mixer);
   
    this.prevPos = 0;   
  }

  // Arbitrary name here.
  run() {
    let pos = 0.5 - this.meter.getValue(0); // -> -0.5 ~ 0.5
    
    let border = width-200;
    let x = map(pos, -0.5, 0.5, border, width - border);

    let left = pos > 0 && this.prevPos < 0; // && --> AND
    let right = pos < 0 && this.prevPos > 0;
    if (left || right) { 
  
      this.synth.triggerAttackRelease(this.note, "32n"); 
    }
    this.prevPos = pos;

    // drawing code --> 
  
    const name = input.value();
     
    fill(255);
    stroke(255); 
    line(x, 20, width / 2, 0);
    textAlign(CENTER, CENTER);
    textSize(25);
    text(name.toUpperCase(), x, 10, 25, 25);
    //ellipse(x, 50, 25, 25);
  }
}


