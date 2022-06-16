import './soundFiles'
import './canvasEvents'
import './code'
import './instrumentData'
import './keyboard'
import './mapping'
import './midi'
import './scales'
import './soundFiles'
import './ui'

"use strict";

let midiIn = [];
let midiOut = [];

function connect() 
{
  navigator.requestMIDIAccess()
  .then(
    (midi) => midiReady(midi),
    (err) => console.log('Something went wrong', err));
}

function midiReady(midi) 
{
  // Also react to device changes.
  midi.addEventListener('statechange', (event) => initDevices(event.target));
  initDevices(midi); // see the next section!
}

function initDevices(midi) 
{
  // Reset.
  midiIn = [];
  midiOut = [];
  
  // MIDI devices that send you data.
  const inputs = midi.inputs.values();
  for (let input = inputs.next(); input && !input.done; input = inputs.next()) 
  {
    midiIn.push(input.value);
  }
  
  // MIDI devices that you send data to.
  const outputs = midi.outputs.values();
  for (let output = outputs.next(); output && !output.done; output = outputs.next()) 
  {
    midiOut.push(output.value);
  }
  
  displayDevices(midiIn);
  startListening(midiIn);
}

function displayDevices( midiIn )
{
	let obj = document.getElementById( "midiDevice" );
	removeOptions( obj );

	for (var i =0; i<midiIn.length; i++)
	{
		var opt = document.createElement('option');
		opt.value = i;
		opt.innerHTML = midiIn[i].name;
		obj.appendChild(opt);
	}

}

// Start listening to MIDI messages.
function startListening(midiIn) 
{
  for (const input of midiIn) 
  {
    input.addEventListener('midimessage', midiMessageReceived);
  }
}

function removeOptions(selectElement) 
{
   var i, L = selectElement.options.length - 1;
   for(i = L; i >= 0; i--) {
      selectElement.remove(i);
   }
}

function midiMessageReceived(event) 
{
	// MIDI commands we care about. See
	// http://webaudio.github.io/web-midi-api/#a-simple-monophonic-sine-wave-midi-synthesizer.
	const NOTE_ON = 9;
	const NOTE_OFF = 8;

	const cmd = event.data[0] >> 4;
	const pitch = event.data[1];
	const velocity = (event.data.length > 2) ? event.data[2] : 1;
  
	// You can use the timestamp to figure out the duration of each note.
	const timestamp = Date.now();
  
	console.log( event.data[0] + " " + cmd + " " + pitch + " " + velocity );
	
	if( generated )
	{
		if( cmd == NOTE_ON )
		{
			playMidiNote( pitch, velocity * 8 <= 1.0 ? velocity * 8 : 1.0, soundType );
//		midiDown( pitch );
		}
		else if( cmd == NOTE_OFF )
		{
			killMidiNote( pitch );
//		midiUp( pitch );
		}
	}
}
