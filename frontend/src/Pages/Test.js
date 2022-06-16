import React, {useEffect} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Cards from '../Components/Cards/Cards'
import '../Microtonality/soundFiles'
import '../Microtonality/canvasEvents'
import '../Microtonality/code'
import '../Microtonality/instrumentData'
import '../Microtonality/keyboard'
import '../Microtonality/mapping'
import '../Microtonality/midi'
import '../Microtonality/scales'
import '../Microtonality/soundFiles'
import '../Microtonality/ui'

// User Interface
import * as components from "https://cdn.jsdelivr.net/npm/brainsatplay-ui@0.0.7/dist/index.esm.js";
// Data Acquisition
// import * as datastreams from "./src/frontend/dist/index.esm.js"
import * as datastreams from "https://cdn.jsdelivr.net/npm/datastreams-api@latest/dist/index.esm.js";
// Device Drivers
// import ganglion from "./dist/index.esm.js"
import ganglion from "https://cdn.jsdelivr.net/npm/@brainsatplay/ganglion@0.0.2/dist/index.esm.js";

// I'd suggest collapsing these two objects. I'm not currently using them but I might in
// the future and I don't feel like making them again (:
const KEY_SIGNATURES_MAJOR_OBJ = {
  C_Major:  ["C", "D", "E", "F", "G", "A", "B"], 
  CS_Major: ["C#", "D#", "E#", "F#", "G#", "A#", "B#"], 
  D_Major:  ["D", "E", "F#", "G", "A", "B", "C#"], 
  DS_Major: ["D#", "E#", "F", "G#", "A#", "B#", "C"], 
  E_Major:  ["E", "F#", "G", "A", "B", "C#", "D#"], 
  ES_Major: ["E#", "F", "G", "A#", "B#", "C", "D"], 
  F_Major:  ["F", "G", "A", "A#", "C", "D", "E"], 
  FS_Major: ["F#", "G#", "A#", "B", "C#", "D#", "E#"], 
  G_Major:  ["G", "A", "B", "C", "D", "E", "F#"], 
  GS_Major: ["G#", "A#", "B#", "C#", "D#", "E#", "F"], 
  A_Major:  ["A", "B", "C#", "D", "E", "F#", "G#"],
  AS_Major: ["A#", "C", "D", "D#", "F", "G", "A"],
  B_Major:  ["B", "C#", "D#", "E", "F#", "G#", "A#"]
};

const KEY_SIGNATURES_MINOR_OBJ = {
  C_Minor:  ["C", "D", "D#", "F", "G", "G#", "A#"],
  CS_Minor: ["C#", "D#", "E", "F#", "G#", "A", "B"],
  D_Minor:  ["D", "E", "F", "G", "A", "A#", "C"],
  DS_Minor: ["D#", "E#", "F#", "G#", "A#", "B", "C#"],
  E_Minor:  ["E", "F#", "G", "A", "B", "C", "D"],
  ES_Minor: ["E#", "F", "G#", "A#", "B#", "C#", "D#"],
  F_Minor:  ["F", "G", "G#", "A#", "C", "C#", "D#"],
  FS_Minor: ["F#", "G#", "A", "B", "C#", "D", "E"],
  G_Minor:  ["G", "A", "A#", "C", "D", "D#", "F"],
  GS_Minor: ["G#", "A#", "B", "C#", "D#", "E", "F#"],
  A_Minor:  ["A", "B", "C", "D", "E", "F", "G"],
  AS_Minor: ["A#", "C", "C#", "D#", "F", "F#", "G#"],
  B_Minor:  ["B", "C#", "D", "E", "F#", "G", "A"]
};

// 2D arrays that hold every note in each key signature, starting from C
const KEY_SIGNATURES_MAJOR = [
  ["C", "D", "E", "F", "G", "A", "B"], // 0
  ["C#", "D#", "E#", "F#", "G#", "A#", "B#"], // 1
  ["D", "E", "F#", "G", "A", "B", "C#"], // 2
  ["D#", "E#", "F", "G#", "A#", "B#", "C"], // 3
  ["E", "F#", "G", "A", "B", "C#", "D#"], // 4
  ["E#", "F", "G", "A#", "B#", "C", "D"], // 5
  ["F", "G", "A", "A#", "C", "D", "E"], // 6
  ["F#", "G#", "A#", "B", "C#", "D#", "E#"], // 7
  ["G", "A", "B", "C", "D", "E", "F#"], // 8
  ["G#", "A#", "B#", "C#", "D#", "E#", "F"], // 9
  ["A", "B", "C#", "D", "E", "F#", "G#"], // 10
  ["A#", "C", "D", "D#", "F", "G", "A"], // 11
  ["B", "C#", "D#", "E", "F#", "G#", "A#"] // 12
];

const KEY_SIGNATURES_MINOR = [
  ["C", "D", "D#", "F", "G", "G#", "A#"], // 0
  ["C#", "D#", "E", "F#", "G#", "A", "B"], // 1
  ["D", "E", "F", "G", "A", "A#", "C"], // 2
  ["D#", "E#", "F#", "G#", "A#", "B", "C#"], // 3
  ["E", "F#", "G", "A", "B", "C", "D"], // 4
  ["E#", "F", "G#", "A#", "B#", "C#", "D#"], // 5
  ["F", "G", "G#", "A#", "C", "C#", "D#"], // 6
  ["F#", "G#", "A", "B", "C#", "D", "E"], // 7
  ["G", "A", "A#", "C", "D", "D#", "F"], // 8
  ["G#", "A#", "B", "C#", "D#", "E", "F#"], // 9 
  ["A", "B", "C", "D", "E", "F", "G"], // 10
  ["A#", "C", "C#", "D#", "F", "F#", "G#"], // 11
  ["B", "C#", "D", "E", "F#", "G", "A"] // 12
];

var BPM = 120; // BPM of the track
var quickNoteType = "quarter";
var channelCounter = 0; // I forgor 💀
var firstTickSkipped = 0; // Kinda useless will prob remove
var keySignature = KEY_SIGNATURES_MAJOR[2];

const SAMPLE_RATE = 44100

const timeForEachNote = {
  sixteenth: getMilliecondsFromBPM(BPM) / 4,
  eighth: getMilliecondsFromBPM(BPM) / 2,
  quarter: getMilliecondsFromBPM(BPM),
  half: getMilliecondsFromBPM(BPM) * 2,
  whole: getMilliecondsFromBPM(BPM) * 4
}

const timeForEachNoteARRAY = [getMilliecondsFromBPM(BPM) / 4, getMilliecondsFromBPM(BPM) / 2, getMilliecondsFromBPM(BPM), getMilliecondsFromBPM(BPM) * 2, getMilliecondsFromBPM(BPM) *4];

// The highest and lowest possible values of the headset's data that we will actually use and parse into musical data.
// Anything under the maximum and above the minimum will be sorted into respective notes, but anything above the maximum
// or below the minimum will be treated as rests. 
const MAX_AMPLITUDE = 0.001;
const MIN_AMPLITUDE = -0.001;

// The distance between the ceiling amplitude and the floor amplitude.
const MIN_MAX_AMPLITUDE_DIFFERENCE = MAX_AMPLITUDE - MIN_AMPLITUDE;

// An offset that is equal to the absolute value of MIN_AMPLITUDE. This offset is used to turn the negative MIN value 
// into effectively zero, and the MAX value into itself plus this offset. This just removes negative numbers from all
// of the calculation, making it simpler for humans to both read and write the code.
const AMPLITUDE_OFFSET = 0.001;

// Number of total notes that are able to be assigned. 7 is one octave, 14 is two octaves, 21 is three octaves.
// Going above 21 is NOT recommended and has NOT been tested, but should theoretically work. DO NOT use values 
// that aren't multiples of 7. Works best with 7, 14, and 21. Do not ever exceed 63.
// NOTE: This software works using 7-note octaves, meaning that the root note's octave jump is not included in
//       the scale. For example, C major is C, D, E, F, G, A, B. It does NOT include the C of the next octave.
const NUM_NOTES = 21;

// The array of size NUM_NOTES that is used to house the cutoffs for each of the NUM_NOTES incremements. 
// The value of MIN_MAX_AMPLITUDE_DIFFERENCE is divided by NUM_NOTES, and the result (let's call this X) is then used to 
// create evenly-spaced "sections" in the array. 
// incrementArr[0] will always be 0, and incrementArr[NUM_NOTES - 1] will always be MAX_AMPLITUDE + AMPLITUDE_OFFSET.
// incrementArr[1] will be X. incrementArr[2] will be X * 2. incrementArr[3] will be X * 3.
// In runtime, the data that the headset relays will be compared to entries in incrementArr simultaneously to find
// which values it falls between, and from there a note will be declared. For example, let's say incrementArr[0] is 0,
// incrementArr[1] is 0.5, and incrementArr[2] is 1.0. The headset relays data equal to 0.75. Because 0.75 falls
// between incrementArr[1] and [2], it will be assigned to note 1, the floor of the indexes it fell between.
var incrementArr = new Array(NUM_NOTES);

var instrList;

// We should probably rename this file lol
const Test = () => {

  // I have absolutely no idea what this useEffect() function is, but Quan added it
  // and it made everything work, so don't touch. Things WILL break if removed.
  useEffect(()=> {
    const dataDevices = new datastreams.DataDevices();
    dataDevices.load(ganglion);
    
    // ------------- Setup Visualization (very rough) -------------
    const graphDiv = document.getElementById("graph");
    graphDiv.style.padding = "25px";
    const timeseries = new components.streams.data.TimeSeries();
    graphDiv.insertAdjacentElement("beforeend", timeseries);
    
    // ------------- Global Variables -------------
    const allData = [];
    let channels = 0;
    let trackMap = new Map();
    let contentHintToIndex = {};

    // ------------- Track Handler -------------
    const handleTrack = (track) => {
        // ------------- Map Track Information (e.g. 10-20 Coordinate) to Index -------------
        if (!trackMap.has(track.contentHint)) 
        {
          const index = trackMap.size;
          contentHintToIndex[track.contentHint] = index;
          trackMap.set(index, track);
        }
    
        // ------------- Grab Index -------------
        const i = contentHintToIndex[track.contentHint];
        channels = i > channels ? i : channels; // Assign channels as max track number
    
        // ------------- Subscribe to New Data -------------
        track.subscribe((data, timestamps) => {
          // Organize New Data
          let arr = [];
          for (let j = 0; j <= channels; j++)
              i === j ? arr.push(data) : arr.push([]);
      
          // Add Data to Timeseries Graph
          timeseries.data = arr;
          timeseries.draw(); // FORCE DRAW: Update happens too fast for UI

          thisIsATest(track, data);
        });
    };
    
    // ------------- Acquisition Function -------------
    const startAcquisition = async (label) => {

        // ------------- Get Device Stream -------------
        const dataDevice = await dataDevices.getUserDevice({ label });
    
        // ------------- Grab DataStream from Device -------------
        const stream = dataDevice.stream;
    
        // ------------- Handle All Tracks -------------
        stream.tracks.forEach(handleTrack);
        stream.onaddtrack = (e) => handleTrack(e.track);
    };

    const thisIsATest = async (tracky, datay) => {

      // Initialize the array [this comment needs work, ik]
      InitIncrementArr();

      // This entire handleTrack section needs to run 4 times total, once for each channel, every tick.
      if (channelCounter < 3)
        channelCounter++;
      else if (channelCounter >= 3)
      {
        if (firstTickSkipped == 0)
          firstTickSkipped = 1;
        else
          waitForNextTick(quickNoteType);
        channelCounter = 0;
      }

      var declaredNote = NoteDeclarationRaw(datay, tracky.contentHint); // Get note increment
      var noteAndOctave = GetNoteWRTKey(declaredNote); // Get the actual note and its octave
      var floorOctave = GetFloorOctave(); // Get the lowest octave that will be used in the song

      var thisisanumber = 36;
      var hexString = thisisanumber.toString(16);
      //console.log("This should be 24: " + hexString);
      //console.log("declaredNote: " + declaredNote + ", noteAndOctave: " + noteAndOctave + ", floorOctave: " + floorOctave);

      if (noteAndOctave.note == -1) // If no note was declared, it's a rest.
        console.log(tracky.contentHint + ": Rest [" + (datay - -AMPLITUDE_OFFSET) + "]");
      else 
        console.log(tracky.contentHint + ": " + noteAndOctave.note + "" + (noteAndOctave.octave + floorOctave) + " [" + (datay - -AMPLITUDE_OFFSET)+ "]");

      playMidiNote(72, .5, 0, "quarter");
    };
    
    // ------------- Set Button Functionality -------------
    const buttons = document.querySelector("#buttons");
    
    for (let button of buttons.querySelectorAll("button"))
        button.onclick = () => startAcquisition(button.id);})

    function disconnectDevice() {
      if (this.device.gatt.connected) {
        this.device.gatt.disconnect();
        console.log('"' + this.device.name + '" bluetooth device disconnected');
      }
    }
    
  return (
    <>
    <Navbar />
    <br />
    <h1>Bluetooth Testing</h1>
    <hr />

    <script src="../Microtonality/mapping.js"></script>
    <script src="../Microtonality/keyboard.js"></script>
    <script src="../Microtonality/midi.js"></script>
    <script src="../Microtonality/ui.js"></script>
    <script src="../Microtonality/soundFiles.js"></script>
    <script src="../Microtonality/instrumentData.js"></script>
    <script src="../Microtonality/scales.js"></script>
    <script src="../Microtonality/canvasEvents.js"></script>
    <script src="../Microtonality/code.js"></script>
    
    <div id="buttons">
      <p>Click connect and choose your Ganglion headset in the popup.</p>
      <button id="ganglion">Connect</button>
      <button onClick={disconnectDevice}>Disconnect</button>
    </div>

    <div id="graph">
      <p>Graph of live EEG data:</p>
    </div>

    <div>
      {//<MidiPlayer data={_data} loop={false} autoplay={true}/>
      }
    </div>
    </>
  )
}

// Takes in a BPM and returns the length of one quarter note in milliseconds.
function getMilliecondsFromBPM(bpm)
{
  return 60000 / bpm;
}

// This function uses the type of note (quarter, whole, etc) to wait a certain amount of milliseconds
// before allowing the rest of the program to continue. This is used to only read data from the
// headset (which is constantly streaming data) when a note is needed. This makes it "realtime."
function waitForNextTick(noteType)
{
  // Get the time that this function started running at
  var startTime = new Date();
  var ms = startTime.getTime(); // Retrieve the milliseconds component from startTime

  // This if/else stack assigns a multiplier so that the function can correctly scale wait time based 
  // off of what note length is being played (quarter, whole, etc). 
  // Quarter notes are used as the baseline (x1.0 multiplier).
  var noteLengthMultiplier = 1;
  if (noteType.localeCompare("sixteenth") == 0) // A sixteenth note is 1/4 the length of a quarter note.
    noteLengthMultiplier = 0.25;
  else if (noteType.localeCompare("eighth") == 0)
    noteLengthMultiplier = 0.5;
  else if (noteType.localeCompare("quarter") == 0)
    noteLengthMultiplier = 1;
  else if (noteType.localeCompare("half") == 0)
    noteLengthMultiplier = 2;
  else if (noteType.localeCompare("whole") == 0) // A whole note is 4x the length of a quarter note
    noteLengthMultiplier = 4;

  // Total amount of time that this function will wait for before completing.
  var targetTime = getMilliecondsFromBPM(BPM) * noteLengthMultiplier;
  
  // Infinite loop; hoping to make this an async function so this will not be necessary.
  while (1 == 1)
  {
    var currentTime = new Date(); // Get the time right now
    var timeDifference = (currentTime.getTime() - ms); // Subtract start time from current time
    
    if (timeDifference >= targetTime) // If the elapsed time is >= the amount of time to wait, stop the function.
    {
      console.log("----- It's been " + targetTime + "ms (one " + noteType + " note at " + BPM + "bpm) -----");
      return;
    }
  }
}

// This creates the array in which different "steps" for notes are housed. I already sort-of explained this
// near the top of this file in the comment for "var incrementArr".
function InitIncrementArr()
{
  var incrementAmount = MIN_MAX_AMPLITUDE_DIFFERENCE / NUM_NOTES; // Dividing the total range by the number of notes

  incrementArr[0] = 0; // First index will always be 0
  incrementArr[NUM_NOTES - 1] = MAX_AMPLITUDE + AMPLITUDE_OFFSET; // Last index will always be the max value + the offset that was used to remove negative numbers.

  // Fill out the array so that each index is populated with incrementAmount * index
  for (var i = 1; i < NUM_NOTES - 1; i++) 
    incrementArr[i] = incrementAmount * i + AMPLITUDE_OFFSET;
}

// Takes in the raw value from the headset and the sensor it came from and assigns a note.
function NoteDeclarationRaw(ampValue, sensor)
{
  let ampValue2 = 0;
  ampValue2 = (ampValue - -AMPLITUDE_OFFSET); // Applies the offset to the headset's raw data

  // For every possible note, check to see if ampValue falls between two array positions. If so, return that position.
  // If not, it will be treated as a rest (returning -1).
  for (var i = 0; i <= NUM_NOTES - 1; i++) 
  {
    if (ampValue2 >= incrementArr[i] && ampValue2 <= incrementArr[i + 1])
      return i;
  }
  return -1;
}

// Gets the actual note from the previously-obtained note increment (see NoteDeclarationRaw())
function GetNoteWRTKey(note)
{
  // If the note increment is between 1 and 7, simply return that index in the key array with octave being zero.
  if (note <= 7 && note >= 1) 
    return {note: keySignature[note - 1], octave: 0};
  // If the note increment is less than zero, return *something* so it doesn't break [WIP]
  else if (note <= 0)
    return {note: -1, octave: 0};
  // If the note is valid and greater than 7
  else
  {
    var noteMod = note % 7; // Mod by 7 to find note increment
    var noteDiv = Math.floor(note / 7); // Divide by 7 to find octave WRT NUM_NOTES/3.
    return {note: keySignature[noteMod], octave: noteDiv};
  }
}

// Returns the lowest necessary octave necessary for this song, using NUM_NOTES to determine.
// Octave 5 is used as the center/default octave.
function GetFloorOctave()
{
  if (NUM_NOTES == 7 || NUM_NOTES == 14)
    return 5;
  if (NUM_NOTES == 21)
    return 4;
}

function getNoteType(noteType)
{
  if (noteType.localeCompare("sixteenth") == 0)
    return 0;
  else if (noteType.localeCompare("eighth") == 0)
    return 1;
  else if (noteType.localeCompare("quarter") == 0)
    return 2;
  else if (noteType.localeCompare("half") == 0)
    return 3;
  else if (noteType.localeCompare("whole") == 0)
    return 4;
}

// ------------------------------------------------------------------------------ STOLEN FROM MICROTONALITY.NET ------------------------------------------------------------------------------

function playMidiNote( frequency, amplitude, soundType, noteLength)
{
	//console.log("Playing " + findNumSamples(timeForEachNoteARRAY[getNoteType(noteLength)]) + " samples.");
	let ks = {freq:131, playing:false, ctx:0, buffer:0, node:0, gain:0, needToClose:false};

	if( ks.playing )
	{
		return false;
	}

	ks.playing = true;
	ks.needToClose = false;
	
	ks.ctx = new AudioContext();
	ks.buffer = getNoteData( soundType, ks.freq, amplitude, ks.ctx, noteLength);
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
  console.log("ks: ", ks);
	ks.node.start( 0 );
	
	return true;
}

function findNumSamples(ms)
{
  // Sample rate is number of samples every second
  // numSamples is the number of total samples played
  // ms is how many milliseconds we want something to play for
  let relationToSecond = 1000 / ms;
  let numSamples = SAMPLE_RATE / relationToSecond;
  return numSamples;
}

function getNoteData(soundType,freq,amplitude,ctx, noteLength)
{
	// Local buffer variable.
	var buffer;

	// For each supported sound type we call the correct function.
	if( soundType == -1 )
		buffer = sineWave(findNumSamples(timeForEachNoteARRAY[getNoteType(noteLength)]),freq,amplitude,ctx);
  else if (soundType == 0) 
    //buffer = instrumentWave(44100,16834*6,freq,amplitude,ctx, soundType);
		buffer = instrumentWave(findNumSamples(timeForEachNoteARRAY[getNoteType(noteLength)]),freq,ctx, soundType);
	
	return buffer;
}

function sineWave(numSamples,frequency,amplitude,ctx)
{
	// Precalculate 2PI
	let PI_2 = Math.PI * 2;
	
	// Create the buffer for the node.
	let buffer = ctx.createBuffer(1, numSamples, SAMPLE_RATE);
	
	// Create the buffer into which the audio data will be placed.
	let buf = buffer.getChannelData(0);
	
	// Loop numSamples times -- that's how many samples we will calculate and store.
	for (let i = 0; i < numSamples; i++) 
	{
		// Calculate and store the value for this sample.
		buf[i] = Math.sin(frequency * PI_2 * i / SAMPLE_RATE) * amplitude;
	}

	// Return the channel buffer.
	return buffer;
}

function setupInstrumentList()
{
  instrList = [];
	instrList.push( flute );
	// instrList.push( oboe );
	// instrList.push( clarinet );
	// instrList.push( bassoon );
	// instrList.push( trumpet );
	// instrList.push( frenchhorn );
	// instrList.push( trombone );
	// instrList.push( tuba );
}

function instrumentWave(numSamples,frequency,ctx,soundType)
{
	setupInstrumentList();
  let sampleRate = 44100;

	// Get the instrument specs.
	let inst = getAmplitudes( soundType, frequency );
	
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
    console.log("f: ", f, ", which is ", frequency, " times ", inst[j*2])
		// Get the amplitude value from the data array.
		var a = inst[j*2+1];
    console.log("a: ", a)
		// Loop numSamples times -- that's how many samples we will calculate and store.
		for (var i = 0; i < numSamples; i++) 
		{
			// Calculate and store the value for this sample.
			//buf[i] += ( Math.sin(f * PI_2 * i / sampleRate) * a );
      buf[i] = frequency;
		}
	}

  //console.log("What the shit is this: " + buf);

	// Return the channel buffer.
	return buffer;
}

// Flute note amplitudes.
var flute_note0 = [261.626,0.09836,0.2957,0.141921,0.079014,0.112871,0.042798,0.029077];
var flute_note1 = [277.183,0.123199,0.3478,0.124674,0.084353,0.124837,0.017114,0.024019];
var flute_note2 = [293.665,0.297172,0.527,0.100852,0.094155,0.165888,0.003781,0.026072];
var flute_note3 = [311.127,0.336687,0.4666,0.093167,0.100954,0.071699,0.020557,0.000982];
var flute_note4 = [329.628,0.328012,0.4388,0.120404,0.097806,0.034633,0.016802,0.042169];
var flute_note5 = [349.228,0.4816,0.390284,0.058158,0.07121,0.112124,0.019824,0.009095];
var flute_note6 = [369.994,0.4336,0.422374,0.057852,0.09351,0.031003,0.013091,0.012687];
var flute_note7 = [391.995,0.493,0.371905,0.077719,0.096972,0.056363,0.037599,0.006175];
var flute_note8 = [415.305,0.4028,0.19137,0.025905,0.073643,0.037007,0.008101,0.005864];
var flute_note9 = [440.0,0.4561,0.329516,0.063736,0.076284,0.048285,0.011366,0.00419];
var flute_note10 = [466.164,0.6413,0.409845,0.067333,0.150845,0.015125,0.013758,0.004766];
var flute_note11 = [493.883,0.5168,0.438569,0.112091,0.073142,0.033681,0.009907,0.009438];
var flute_note12 = [523.251,0.6412,0.298417,0.071738,0.085273,0.01514,0.005641,0.001228];
var flute_note13 = [554.365,0.3925,0.124536,0.023912,0.028485,0.003317,0.003669,0.001313];
var flute_note14 = [587.33,0.5363,0.088258,0.06421,0.022653,0.0074,0.000768,0.002045];
var flute_note15 = [622.254,0.4994,0.061422,0.054182,0.013458,0.001886,0.00443,0.001306];
var flute_note16 = [659.255,0.3797,0.027199,0.020356,0.001928,0.00498,0.000903,0.000985];
var flute_note17 = [698.456,0.4476,0.142438,0.041871,0.005943,0.005049,0.001598,0.001339];
var flute_note18 = [739.989,0.4475,0.030498,0.030923,0.004463,0.005552,0.001201,0.001953];
var flute_note19 = [783.991,0.4304,0.032998,0.041964,0.003068,0.003373,0.00028,0.001584];
var flute_note20 = [830.609,0.3628,0.089364,0.055979,0.01,0.006294,0.002049,0.000503];
var flute_note21 = [880.0,0.528,0.079354,0.075279,0.012683,0.00677,0.00254,0.001825];
var flute_note22 = [932.328,0.4055,0.064476,0.023129,0.004745,0.001844,0.000534,0.00108];
var flute_note23 = [987.767,0.4758,0.059464,0.029749,0.002494,0.002976,0.001045,0.000844];
var flute_note24 = [1046.5,0.4291,0.010303,0.014455,0.000404,0.001976,0.000166,0.001859];
var flute_note25 = [1108.73,0.361,0.040442,0.021483,0.003831,0.001047,0.001331,0.001802];
var flute_note26 = [1174.66,0.2784,0.049778,0.007211,0.004811,0.001368,0.002148,0.001742];
var flute_note27 = [1244.51,0.2853,0.036994,0.012853,0.004586,0.00182,0.002402,0.001267];
var flute_note28 = [1318.51,0.4725,0.032759,0.010499,0.004112,0.000885,0.001912,0.0014];
var flute_note29 = [1396.91,0.4792,0.010716,0.009122,0.003258,0.000621,0.002476,0.00107];
var flute_note30 = [1479.98,0.5119,0.021649,0.012138,0.000752,0.002789,0.002708];
var flute_note31 = [1661.22,0.335,0.025003,0.029256,0.001098,0.001562];
var flute_note32 = [1864.66,0.5847,0.058631,0.013492,0.01061,0.002866];
var flute_note33 = [2093.0,0.5076,0.01555,0.021508,0.003327];
// Aggregate flute notes
var flute = [flute_note0,flute_note1,flute_note2,flute_note3,flute_note4,flute_note5,flute_note6,flute_note7,flute_note8,flute_note9,flute_note10,flute_note11,flute_note12,flute_note13,flute_note14,flute_note15,flute_note16,flute_note17,flute_note18,flute_note19,flute_note20,flute_note21,flute_note22,flute_note23,flute_note24,flute_note25,flute_note26,flute_note27,flute_note28,flute_note29,flute_note30,flute_note31,flute_note32,flute_note33];

function getAmplitudes( instrumentIndex, frequency )
{
	// Get the list of note amplitude values for this instrument.
	let list = instrList[0]; // instrumentIndex
  //console.log("This is instrList[" + (instrumentIndex) + "]: " + instrList[instrumentIndex]);
	
	// We will start with a default value.
	let index = 0;
	let diff = Math.abs( frequency - list[0][0] );
  //console.log("diff = Math.abs(", frequency, " - ", list[0][0], "): " + diff)

	// Loop through the list of frequencies/amplitudes and find the closest match.
	// for( let i=0; i<list.length; i++ )
	// {
	// 	// Get the difference between incoming frequency value and the
	// 	//	the frequeny of this list element.
	// 	let td = Math.abs( frequency - list[i][0] );
  //   //console.log("td = Math.abs(", frequency, " - ", list[i][0], "): " + td)
		
	// 	// If this is less (we are closer to the specified frequency)
	// 	//	then we record the index and remember the new difference.
	// 	if( td < diff )
	// 	{
	// 		diff = td;
	// 		index = i;
	// 	}
  //   //console.log(diff, ", ya momma: ", td);
	// }

	// Here we take the current array and make a new array to
	//	return. This reflects code that we previously developed.
	//	This could be eliminated if the "using" code was rewritten.
	let retList = [];
	// for( let i=0; i<list[index].length; i++ )
	// {
	// 	// Push the harmonic number.
	// 	retList.push( i );
	// 	// Push the amplitude.
	// 	retList.push( list[index][i] );
  //   console.log("Hey fucker: " + list);
	// }
	
  retList.push(frequency);
  //console.log("Hey fucker: " + retList);

	return retList;
}

export default Test