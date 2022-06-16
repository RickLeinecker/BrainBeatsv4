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

let keyboardKeyStatus = [];

const keyNames = ["C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B","C"];

let freqs = [];
let indices = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function doMappingApply()
{
	for( let i=0; i<indices.length; i++ )
	{
		indices[i] = _indices[i];
	}
	
	for( let i=0; i<keyboardKeyStatus.length; i++ )
	{
		let thisKey = keyboardKeyStatus[i];
		let note = thisKey.note;
		thisKey.index = indices[note];
	}
}

function init(referenceFrequency,divisions)
{
	setupInstrumentList();
	
	freqs = [];
	
	scale = generateScale( referenceFrequency, divisions );
	
	for( let oct=0; oct<9; oct++ )
	{
		let rf = referenceFrequency;
		if( oct < 4 )
		{
			let p = 4 - oct;
			let div = Math.pow( 2, p );
			rf = referenceFrequency / div;
		}
		else if( oct > 4 )
		{
			let p = oct - 4;
			let mult = Math.pow( 2, p );
			rf = referenceFrequency * mult;
		}
		freqs.push( generateScale( rf, divisions ) );
	}
	
	keyboardKeyStatus = [];

	let oct = 0;
	let note = 9;
	
	for( let k=0; k<88; k++ )
	{
		let _freqs = freqs[oct];
		let index = Math.round( ( divisions / 12 ) * note );//12 * ( note / divisions ) );
		
		let thisFreq = _freqs[index];
		
		if( oct == 4 )
		{
			indices[note] = index;
			indices[12] = divisions;
		}

//		console.log("index:" + index + " freq:" + thisFreq );
		
		let thisKey = {octave:oct,note:note,index:index,keyName:keyNames[note],freq:thisFreq,playing:false,ctx:0,buffer:0,node:0,gain:0,needToClose:false};
		keyboardKeyStatus.push( thisKey );
		
		note++;
		if( note > 11 )
		{
			oct++;
			note = 0;
		}
	}

	setInterval(myTimer, 1000);
	
}

function playNote( index, octave, soundType )
{
	console.log("soundType: " + soundType)
	let internalIndex = ( octave - 1 ) * 12 + indices[index] - 3;
	return playMidiNote( internalIndex + 36, 1, soundType );
}

function killNote( index, octave )
{
	let internalIndex = ( octave - 1 ) * 12 + indices[index] - 3;
	killMidiNote( internalIndex + 36 );
}

function isPlaying( index )
{
	let internalIndex = ( octave - 1 ) * 12 + indices[index] - 3;
	let ks = keyboardKeyStatus[internalIndex];
	return ks.playing;
}



function playMidiNote( midiNote, amplitude, soundType )
{
	let ks = keyboardKeyStatus[midiNote-36];
	if( ks.playing )
	{
		return false;
	}

	ks.playing = true;
	ks.needToClose = false;
	
	ks.ctx = new AudioContext();
	ks.buffer = getNoteData( soundType, ks.freq, amplitude, ks.ctx );
	ks.node = ks.ctx.createBufferSource();
	ks.node.buffer = ks.buffer;

	// We need this gain object so that at the end of the note play
	//	we can taper the sound.
	ks.gain = ks.ctx.createGain();
	ks.node.connect( ks.gain );
	ks.gain.connect( ks.ctx.destination );
	ks.gain.gain.value = amplitude;

	// Set to loop, although there is sill a perceptable break at the end.
	ks.node.loop = true;
	
	// Start the note.
	ks.node.start( 0 );
	
	return true;
}

function myTimer() 
{
	for( let i=0; i<keyboardKeyStatus.length; i++ )
	{
		try
		{
			let ks = keyboardKeyStatus[i];
			if( !ks.needToClose )
			{
				continue;
			}
			ks.needToClose = false;
			ks.ctx.close();
			ks.ctx = null;
		}
		catch(e)
		{
			console.log( e );
		}
	}
}

function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

//let crap = false;

function killMidiNote( midiNote )
{
	let ks = keyboardKeyStatus[midiNote-36];
	if( !ks.playing )
	{
		return;
	}

	ks.gain.gain.setValueAtTime(ks.gain.gain.value, ks.ctx.currentTime);
	ks.gain.gain.exponentialRampToValueAtTime(0.0001, ks.ctx.currentTime + 0.03);	
//	ks.closed = true;

	ks.needToClose = true;
	ks.playing = false;

//	crap = true;
	
//	ks.ctx.close();
}

function getNoteData(soundType,freq,amplitude,ctx)
{
	// Local buffer variable.
	var buffer;

	// For each supported sound type we call the correct function.
	if( soundType == 0 )
	{
		buffer = sineWave(44100,16834*6,freq,amplitude,ctx);
	}
	else if ( soundType == 1 )
	{
		buffer = squareWave(44100,16834*6,freq,amplitude,ctx);
	}
	else if ( soundType == 2 )
	{
		buffer = triangleWave(44100,16834*6,freq,amplitude,ctx);
	}
	// Added 11-16-2021
	else
	{
		buffer = instrumentWave(44100,16834*6,freq,amplitude,ctx, soundType);
	}
	
	return buffer;
}

//////////////////////////////////////////////////
//
// Source: soundFiles.js
// Function: sineWave
//
// Parameters:
//   sampleRate
//   numSamples
//   frequency
//   amplitude
//
// Description: Generate a sine wave for correct number of samples.
//
function sineWave(sampleRate,numSamples,frequency,amplitude,ctx)
{

	// Precalculate 2PI
	let PI_2 = Math.PI * 2;
	
	// Create the buffer for the node.
	let buffer = ctx.createBuffer(1, numSamples, sampleRate);
	
	// Create the buffer into which the audio data will be placed.
	let buf = buffer.getChannelData(0);
	
	// Loop numSamples times -- that's how many samples we will calculate and store.
	for (let i = 0; i < numSamples; i++) 
	{
		// Calculate and store the value for this sample.
		buf[i] = Math.sin(frequency * PI_2 * i / sampleRate) * amplitude;
	}

	// Return the channel buffer.
	return buffer;
}

//////////////////////////////////////////////////
//
// Source: soundFiles.js
// Function: instrumentWave
//
// Parameters:
//   sampleRate
//   numSamples
//   frequency
//   amplitude
//   soundType (will start at 3 and not 0 because of sine, square, and triangle)
//
// Description: Generate an instrument wave for correct number of samples.
//
function instrumentWave(sampleRate,numSamples,frequency,amplitude,ctx,soundType)
{
	setupInstrumentList();

	// Get the instrument specs.
	let inst = getAmplitudes( soundType - 4, frequency );
	
	// Precalculate 2PI
	let PI_2 = Math.PI * 2;
	
	// Create the buffer for the node.
	let buffer = ctx.createBuffer(1, numSamples, sampleRate);
	
	// Create the buffer into which the audio data will be placed.
	var buf = buffer.getChannelData(0);

	// Zero the buffer
	for (var i = 0; i < numSamples; i++) 
	{
		buf[i] = 0;
	}
		
	// Loop through the instrument spec.
	for( var j=0; j<inst.length/2; j++ )
	{
		// Get the frequency multiplier from the data array.
		var f = frequency * inst[j*2];
		// Get the amplitude value from the data array.
		var a = inst[j*2+1];
		// Loop numSamples times -- that's how many samples we will calculate and store.
		for (var i = 0; i < numSamples; i++) 
		{
			// Calculate and store the value for this sample.
			buf[i] += ( Math.sin(f * PI_2 * i / sampleRate) * a );
		}
	}

	// Return the channel buffer.
	return buffer;
}

// Here we add all instruments to the list object.
function setupInstrumentList()
{
	instrList = [];
	instrList.push( flute );
	instrList.push( oboe );
	instrList.push( clarinet );
	instrList.push( bassoon );
	instrList.push( trumpet );
	instrList.push( frenchhorn );
	instrList.push( trombone );
	instrList.push( tuba );
}

//////////////////////////////////////////////////
//
// Source: soundFiles.js
// Function: squareWave
//
// Parameters:
//   sampleRate
//   numSamples
//   frequency
//   amplitude
//
// Description: Generate a square wave for correct number of samples.
//
function squareWave(sampleRate,numSamples,frequency,amplitude,ctx)
{
	
	// Here we calculate the number of samples for each wave oscillation.
	var samplesPerOscillation = sampleRate / frequency;
	// Create the value for the first oscillation change.
	var first = samplesPerOscillation / 2;
	// We will count the samples as we go.
	var counter = 0;

	// Create the buffer for the node.
	var buffer = ctx.createBuffer(1, numSamples, sampleRate);
	
	// Create the buffer into which the audio data will be placed.
	var buf = buffer.getChannelData(0);
	
	// Loop numSamples times -- that's how many samples we will calculate and store.
	for (var i = 0; i < numSamples; i++) 
	{
		// Increment the counter.
		counter++;
		
		// This is the first half of the oscillation. it should be 1.
		if( counter <= first )
		{
			// Store the value.
			buf[i] = 1 * amplitude;
		}
		// This is the second half of the oscillation. It should be -1.
		else
		{
			// Store the value.
			buf[i] = -1 * amplitude;
			
			// See if we are done with this cycle.
			if( counter >= samplesPerOscillation )
			{
				// Set to zero so we are ready for another cycle.
				counter = 0;
			}
		}
	}

	// Return the channel buffer.
	return buffer;
}

//////////////////////////////////////////////////
//
// Source: soundFiles.js
// Function: triangleWave
//
// Parameters:
//   sampleRate
//   numSamples
//   frequency
//   amplitude
//
// Description: Generate a triangle wave for correct number of samples.
//
function triangleWave(sampleRate,numSamples,frequency,amplitude,ctx)
{
	
	// Here we calculate the number of samples for each wave oscillation.
	var samplesPerOscillation = sampleRate / frequency;
	// This is the first quarter of the oscillation. 0 - 1/4
	var first = samplesPerOscillation / 4;
	// This is the second quarter of the oscillation. 1/4 - 1/2
	var second = samplesPerOscillation / 2;
	// This is the third quarter of the oscillation. 1/2 - 3/4
	var third = ( samplesPerOscillation / 2 ) + ( samplesPerOscillation / 4 );
	// We will count the samples as we go.
	var counter = 0;

	// Step value. This is how much the sample value changes per sample.
	var step = 1 / first;

	// Create the buffer for the node.
	var buffer = ctx.createBuffer(1, numSamples, sampleRate);
	
	// Create the buffer into which the audio data will be placed.
	var buf = buffer.getChannelData(0);
	
	// Loop numSamples times -- that's how many samples we will calculate and store.
	for (var i = 0; i < numSamples; i++) 
	{
		// Increment the counter.
		counter++;
		
		// See if this is the first quarter.
		if( counter <= first )
		{
			// Store the value.
			buf[i] = step * counter * amplitude;
		}
		// See if this is the second quarter.
		else if( counter <= second )
		{
			// We want the count relative to this quarter.
			var cnt = counter - first;
			
			// Store the value.
			buf[i] = 1 - step * cnt * amplitude;
		}
		// See if this is the third quarter.
		else if( counter <= third )
		{
			// We want the count relative to this quarter.
			var cnt = counter - second;
			
			// Store the value.
			buf[i] = -( step * cnt ) * amplitude;
		}
		// This is the fourth quarter.
		else
		{
			// We want the count relative to this quarter.
			var cnt = counter - third;
			
			// Store the value.
			buf[i] = -1 + ( step * cnt ) * amplitude;
			
			// See if we are done with this cycle.
			if( counter >= samplesPerOscillation )
			{
				// Set to zero so we are ready for another cycle.
				counter = 0;
			}
		}
	}

	// Return the channel buffer.
	return buffer;
}

