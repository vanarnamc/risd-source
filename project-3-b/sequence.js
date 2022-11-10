console.clear();

let baseURL = "https://s3-us-west-1.amazonaws.com/leesamples/samples/";

let player1 = new Tone.Player(
    baseURL + "Morphed/All+Hands+On+Deck.mp3"
  ).toDestination();

let  player2 = new Tone.Player(baseURL + "Morphed/Waves+On+Mars.mp3").toDestination();

let squareSynth;
let seq;
let reverb;
let myMelody =["C3", ["E3", "G3","D3","C3"], "A3","B2","C2","E3",["A2", "G2"],"C4"];

squareSynth = new Tone.Synth({
    oscillator:{
     type: "square" 
    },
    resonance: 0.9
  }).toDestination();
   
   seq = new Tone.Sequence(function(time, note){
     squareSynth.triggerAttackRelease(note, 0.5);
 
     console.log(note);
   }, myMelody, 0.5);
 
   
  Tone.Transport.start();
 

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(200);
    textFont("Helvetica");
    textSize(17);
    fill("purple");
    textAlign(CENTER);
    text(
      "Press the 'P' Key or Click the Mouse to Play a Sound!!",
      width / 2,
      height / 2
    );
    text('Press space bar to stop', width /2 , height/2 + 50)
  }

  multiplayer = new Tone.Players({
    chains: baseURL + "Rhythmics/120+bpm/Rhythmic+Chains.mp3",
    bells: baseURL + "Natural+Sounds/Truro+Cathedral+Bell+with+seagulls.mp3",
    arpeggio: baseURL + "SID+Arps+119bpm.mp3"
  }).toDestination();
  
  window.addEventListener("click", function(event) {
    Tone.start(); //You need to interact with your canvas and tell Tone to start before audio begins playing.
    seq.start();
  
});

  function keyPressed() {
    if (key == "P" || "p") {
      player2.start();
    } 
    
    if(key == ' ') {
      console.log("space bar")
      player1.stop()
      player2.stop()
    }
    console.log(key);
  }
