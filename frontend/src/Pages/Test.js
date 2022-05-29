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

var BPM = 120;
var channelCounter = 0;
var firstTickSkipped = 0;

const MAX_AMPLITUDE = 0.000001;
const MIN_AMPLITUDE = -0.000001;
const MIN_MAX_AMPLITUDE_DIFFERENCE = 0.000002;

var maxFP1 = 0, minFP1 = 0;
var maxFP2 = 0, minFP2 = 0;
var maxC3 = 0, minC3 = 0;
var maxC4 = 0, minC4 = 0;

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
    
    // ------------- Declare Data Handler -------------
    // const ondata = (data, timestamps, contentHint) => {
    //     console.log(
    //     `Data from Electrode ${contentHintToIndex[contentHint]} (${contentHint})`,
    //     data,
    //     // timestamps
    //     );
    // };
    
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
        //debugger;
        //console.log(i, arr);
        timeseries.draw(); // FORCE DRAW: Update happens too fast for UI

        // This entire function needs to run 4 times total, once for each channel, every tick.
        if (channelCounter < 3)
          channelCounter++;
        else if (channelCounter >= 3)
        {
          if (firstTickSkipped == 0)
          {
            firstTickSkipped = 1;
          }
          else
          {
            waitForNextTick("whole");
          }
          channelCounter = 0;
        }

        console.log(track.contentHint + ": " + data);

        if (track.contentHint.localeCompare("C3") == 0)
        {
          if (data > maxC3) 
            maxC3 = data;
          if (data < minC3)
            minC3 = data;
        }
        else if (track.contentHint.localeCompare("C4") == 0)
        {
          if (data > maxC4) 
            maxC4 = data;
          if (data < minC4)
            minC4 = data;
        }
        else if (track.contentHint.localeCompare("FP1") == 0)
        {
          if (data > maxFP1) 
            maxFP1 = data;
          if (data < minFP1)
            minFP1 = data;
        }
        else if (track.contentHint.localeCompare("FP2") == 0)
        {
          if (data > maxFP2) 
            maxFP2 = data;
          if (data < minFP2)
            minFP2 = data;
        }

        //console.log("MAXES: C3=" + maxC3 * 1000000 + ", C4=" + maxC4 * 1000000 + ", FP1=" + maxFP1 * 1000000 + ", FP2=" + maxFP2 * 1000000);
        //console.log("MINS:  C3=" + minC3 * 1000000 + ", C4=" + minC4 * 1000000 + ", FP1=" + minFP1 * 1000000 + ", FP2=" + minFP2 * 1000000);

        //If the data reading is negative
        // if (data < 0)
        // {
        //   if (data >= MIN_MAX_AMPLITUDE_DIFFERENCE / 21)
        // }
        // // If the data reading is positive
        // if (data >= 0)
        // {

        // }
        
        // Run ondata Callback
        // ondata(data, timestamps, track.contentHint);
        });
    };
    
    // // ------------- Declare Acquisition Function -------------
    
    const startAcquisition = async (label) => {
        // ------------- Get Device Stream -------------
    
        // Method #1: By Label
        const dataDevice = await dataDevices.getUserDevice({ label });
    
        // Method #2: By Class
        // const dataDevice = await dataDevices.getUserDevice(ganglion)
    
        // ------------- Grab DataStream from Device -------------
        const stream = dataDevice.stream;
    
        // ------------- Handle All Tracks -------------
        stream.tracks.forEach(handleTrack);
        stream.onaddtrack = (e) => handleTrack(e.track);
    };
    
    // ------------- Set Button Functionality -------------
    
    const buttons = document.querySelector("#buttons");
    
    // console.log(buttons);
    
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

function getMilliecondsFromBPM(bpm)
{
  return 60000 / bpm;
}

function waitForNextTick(noteType)
{
  var noteLengthMultiplier = 1;
  if (noteType.localeCompare("sixteenth") == 0)
  {
    noteLengthMultiplier = 0.25;
  }
  else if (noteType.localeCompare("eighth") == 0)
  {
    noteLengthMultiplier = 0.5;
  }
  else if (noteType.localeCompare("quarter") == 0)
  {
    noteLengthMultiplier = 1;
  }
  else if (noteType.localeCompare("half") == 0)
  {
    noteLengthMultiplier = 2;
  }
  else if (noteType.localeCompare("whole") == 0)
  {
    noteLengthMultiplier = 4;
  }

  var startTime = new Date();
  var ms = startTime.getTime();
  
  while (1 == 1)
  {
    var currentTime = new Date();
    var math = (currentTime.getTime() - ms);
    var targetTime = getMilliecondsFromBPM(BPM) * noteLengthMultiplier;

    if (math >= targetTime)
    {
      console.log("----- It's been " + targetTime + "ms (" + BPM + "bpm), done. -----");
      break;
    }
  }
}

export default Test