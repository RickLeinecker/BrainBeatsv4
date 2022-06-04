import React, {useEffect} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Cards from '../Components/Cards/Cards'

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
      //console.log("declaredNote: " + declaredNote + ", noteAndOctave: " + noteAndOctave + ", floorOctave: " + floorOctave);

      if (noteAndOctave.note == -1) // If no note was declared, it's a rest.
        console.log(tracky.contentHint + ": Rest [" + (datay - -AMPLITUDE_OFFSET) + "]");
      else 
        console.log(tracky.contentHint + ": " + noteAndOctave.note + "" + (noteAndOctave.octave + floorOctave) + " [" + (datay - -AMPLITUDE_OFFSET)+ "]");
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
    
    <div id="buttons">
      <p>Click connect and choose your Ganglion headset in the popup.</p>
      <button id="ganglion">Connect</button>
      <button onClick={disconnectDevice}>Disconnect</button>
    </div>

    <div id="graph">
      <p>Graph of live EEG data:</p>
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

export default Test