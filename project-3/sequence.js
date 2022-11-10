// console.clear();

// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.
document.documentElement.addEventListener('mousedown', () => {
  if (Tone.context.state !== 'running') Tone.context.resume();
});

let scale;

const synths = [
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth()
];

synths[0].oscillator.type = 'sine';
synths[1].oscillator.type = 'square';
synths[2].oscillator.type = 'sine';

const gain = new Tone.Gain(0.6); //sets volume
gain.toMaster();

synths.forEach(synth => synth.connect(gain));

const $rows = document.body.querySelectorAll('div > div');

let noteChange;
scale = Tonal.Scale.get(`C${noteChange} minor pentatonic`).notes;

let index = 0;

Tone.Transport.scheduleRepeat(repeat, '8n');
Tone.Transport.bpm.value = 80; //tempo

Tone.Transport.start();

let offset = 0;
function repeat(time) {
  Tone.Draw.schedule(function(){
		//do drawing or DOM manipulation here
    let marker = document.getElementById('marker');
    marker.style.left = offset + 'px';
    offset += 10;
	}, time)
  
  let currentNote = 0;
  let step = index % 10;
  for (let i = 0; i < $rows.length; i++) {
        // scale = Tonal.Scale.get('C' + (4+i) + ' minor pentatonic').notes;
        scale = Tonal.Scale.get(`C${2+i} minor pentatonic`).notes;
        let synth = synths[i],
        note = scale[i],
        $row = $rows[i],
        $input = $row.querySelector(`input:nth-child(${step + 1})`);
        note = scale[index % scale.length];
    if ($input.checked) synth.triggerAttackRelease(note, '8n', time);
  }
  index++;
}