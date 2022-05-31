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

var BPM = 120; // BPM of the track
var channelCounter = 0; // I forgor 💀
var firstTickSkipped = 0; // Kinda useless will prob remove

// The highest and lowest possible values of the headset's data that we will actually use and parse into musical data.
// Anything under the maximum and above the minimum will be sorted into respective notes, but anything above the maximum
// or below the minimum will be treated as rests. 
const MAX_AMPLITUDE = 0.0001;
const MIN_AMPLITUDE = -0.0001;

// The distance between the ceiling amplitude and the floor amplitude.
const MIN_MAX_AMPLITUDE_DIFFERENCE = MAX_AMPLITUDE - MIN_AMPLITUDE;

// An offset that is equal to the absolute value of MIN_AMPLITUDE. This offset is used to turn the negative MIN value 
// into effectively zero, and the MAX value into itself plus this offset. This just removes negative numbers from all
// of the calculation, making it simpler for humans to both read and write the code.
const AMPLITUDE_OFFSET = 0.0001;

// Number of total notes that are able to be assigned. 7 is one octave, 14 is two octaves, 21 is three octaves.
// Going above 21 is NOT recommended and has NOT been tested, but should theoretically work. DO NOT use values 
// that aren't multiples of 7. Works best with 7, 14, and 21. If you must go above 21, use 28, 35, 42, etc.
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

// These will likely be deleted so I'm not gonna comment them LOLLLLLLLLLLLLLLLL
var maxFP1 = 0, minFP1 = 0;
var maxFP2 = 0, minFP2 = 0;
var maxC3 = 0, minC3 = 0;
var maxC4 = 0, minC4 = 0;

// This is temporary. Will be replaced with the 2D arrays below.
var CMajor = ["C", "D", "E", "F", "G", "A", "B"];

/* TODO: 2D array for ALL major and minor keys
Basically this. This is the first few entries in major.
| C | C# | D | 
| D | D# | E | 
| E | E# | F#|
| F | F# | G | 
| G | G# | A | 
| A | A# | B | 
| B | B# | C |
*/

// A counter that is incremented every time a new piece of data is recieved from the headset.
var numTicksFromHeadset = 0;

const Test = () => {

  useEffect(()=>{
    const dataDevices = new datastreams.DataDevices();
    dataDevices.load(ganglion);
    
    // ------------- Setup Visualization (very rough) -------------
    const graphDiv = document.getElementById("graph");
    graphDiv.style.padding = "25px";
    const timeseries = new components.streams.data.TimeSeries();
    graphDiv.insertAdjacentElement("beforeend", timeseries);
    
    // ------------- Declare Global Variables -------------
    const allData = [];
    let channels = 0;
    let trackMap = new Map();
    let contentHintToIndex = {};
    
    {/* // ------------- Declare Track Handler ------------- */}
    const handleTrack = (track) => {
        // ------------- Map Track Information (e.g. 10-20 Coordinate) to Index -------------
        if (!trackMap.has(track.contentHint)) {
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

        InitIncrementArr();

        // This entire function needs to run 4 times total, once for each channel, every tick.
        if (channelCounter < 3)
          channelCounter++;
        else if (channelCounter >= 3)
        {
          if (firstTickSkipped == 0)
            firstTickSkipped = 1;
          else
            waitForNextTick("whole");
          channelCounter = 0;
        }

        numTicksFromHeadset++;

        var declaredNote = NoteDeclaration(data[0], track.contentHint);

        if (declaredNote == 0 || declaredNote % 7 == 0)
          console.log("Note is \"" + CMajor[0] + "\" [1st] from sensor " + track.contentHint); 
        else if (declaredNote == 1 || declaredNote % 7 == 1)
          console.log("Note is \"" + CMajor[1] + "\" [2nd] from sensor " + track.contentHint); 
        else if (declaredNote == 2 || declaredNote % 7 == 2)
          console.log("Note is \"" + CMajor[2] + "\" [3rd] from sensor " + track.contentHint); 
        else if (declaredNote == 3 || declaredNote % 7 == 3)
          console.log("Note is \"" + CMajor[3] + "\" [4th] from sensor " + track.contentHint); 
        else if (declaredNote == 4 || declaredNote % 7 == 4)
          console.log("Note is \"" + CMajor[4] + "\" [5th] from sensor " + track.contentHint); 
        else if (declaredNote == 5 || declaredNote % 7 == 5)
          console.log("Note is \"" + CMajor[5] + "\" [6th] from sensor " + track.contentHint); 
        else if (declaredNote == 6 || declaredNote % 7 == 6)
          console.log("Note is \"" + CMajor[6] + "\" [7th] from sensor " + track.contentHint); 

        // Useful for debugging, but will likely be deleted before the final product.
        // if (track.contentHint.localeCompare("C3") == 0)
        // {
        //   if (data[0] > maxC3) 
        //     maxC3 = data[0];
        //   if (data[0] < minC3)
        //     minC3 = data[0];
        // }
        // else if (track.contentHint.localeCompare("C4") == 0)
        // {
        //   if (data[0] > maxC4) 
        //     maxC4 = data[0];
        //   if (data[0] < minC4)
        //     minC4 = data[0];
        // }
        // else if (track.contentHint.localeCompare("FP1") == 0)
        // { 
        //   if (data[0] > maxFP1) 
        //     maxFP1 = data[0];
        //   if (data[0] < minFP1)
        //     minFP1 = data[0];
        // }
        // else if (track.contentHint.localeCompare("FP2") == 0)
        // {
        //   if (data[0] > maxFP2) 
        //     maxFP2 = data[0];
        //   if (data[0] < minFP2)
        //     minFP2 = data[0];
        // }
        //console.log("MAXES AS OF TICK " + numTicksFromHeadset + ": C3=" + maxC3 + ", C4=" + maxC4 + ", FP1=" + maxFP1 + ", FP2=" + maxFP2);
        //console.log("MINS AS OF TICK  " + numTicksFromHeadset + ": C3=" + minC3 + ", C4=" + minC4 + ", FP1=" + minFP1 + ", FP2=" + minFP2);
        });
    };
    
    // // ------------- Declare Acquisition Function -------------
    
    const startAcquisition = async (label) => {

        // ------------- Get Device Stream -------------
        const dataDevice = await dataDevices.getUserDevice({ label });
    
        // ------------- Grab DataStream from Device -------------
        const stream = dataDevice.stream;
    
        // ------------- Handle All Tracks -------------
        stream.tracks.forEach(handleTrack);
        stream.onaddtrack = (e) => handleTrack(e.track);
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
  
  // Infinite loop; hoping to make this an async function in the future so this will not be necessary.
  while (1 == 1)
  {
    var currentTime = new Date(); // Get the time right now
    var timeDifference = (currentTime.getTime() - ms); // Subtract start time from current time
    
    if (timeDifference >= targetTime) // If the elapsed time is >= the amount of time to wait, stop the function.
    {
      console.log("----- It's been " + targetTime + "ms (one " + noteType + " note at " + BPM + "bpm), done. -----");
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
function NoteDeclaration(ampValue, sensor)
{
  ampValue += AMPLITUDE_OFFSET; // Applies the offset to the headset's raw data

  // For every possible note, check to see if ampValue falls between two array positions. If so, return that position.
  // If not, it will be treated as a rest.
  for (var i = 0; i <= NUM_NOTES - 1; i++) 
  {
    if (ampValue >= incrementArr[i] && ampValue <= incrementArr[i + 1])
      return i;
  }
  console.log("Sensor " + sensor + " did not provide a note");
}

export default Test