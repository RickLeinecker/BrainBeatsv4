// Data Acquisition
import * as datastreams from "./index.esm.js";
const dataDevices = new datastreams.DataDevices();

// Device Driver
import ganglion from "./ganglion.esm.js";
dataDevices.load(ganglion);
const signalMultiplier = 10000;

// Visualizer
import Visualizer from "./visualizer.js";
const numOfLines = 1;
const visualizer = new Visualizer("my_canvas", numOfLines);

// Signal processing
import fili from "./fili.esm.js";
const sampleRate = 250;
const firCalculator = new fili.FirCoeffs();
// calculate filter coefficients
var firFilterCoeffs = firCalculator.lowpass({
  order: 100, // filter order
  Fs: sampleRate, // sampling frequency
  Fc: 3, // cutoff frequency
  // forbandpass and bandstop F1 and F2 must be provided instead of Fc
});
const filter = new fili.FirFilter(firFilterCoeffs);
const SECONDS = 1;
const BUFFER_SIZE = SECONDS * 256;

const allData = [];
let channels = 0;
let trackMap = new Map();
let contentHintToIndex = {};
let channelHolder = [];
let filteredSignalHolder = [];

// ------------- Declare Data Handler -------------
const ondata = (data, timestamps, contentHint) => {
  console.log(
    `Data from Electrode ${contentHintToIndex[contentHint]} (${contentHint})`,
    data,
    timestamps
  );
};

const addSample = (sample, channel) => {
  if (!channelHolder[channel]) {
    channelHolder[channel] = [];
    filteredSignalHolder[channel] = [];
  }

  if (channelHolder[channel].length > BUFFER_SIZE - 1) {
    channelHolder[channel].shift();
  }

  channelHolder[channel].push(sample);

  let signal = filter.simulate(channelHolder[channel]);
  filteredSignalHolder[channel] = signal;
};

// ------------- Declare Track Handler -------------
const handleTrack = (track) => {
  // ------------- Map Track Information (e.g. 10-20 Coordinate) to Index -------------
  if (!trackMap.has(track.contentHint)) {
    const index = trackMap.size;
    contentHintToIndex[track.contentHint] = index;
    trackMap.set(index, track);
  }
  //console.log(trackMap);

  // ------------- Grab Index -------------
  const i = contentHintToIndex[track.contentHint];
  channels = i > channels ? i : channels; // Assign channels as max track number
  //console.log(channels);

  // ------------- Subscribe to New Data -------------
  track.subscribe((data, timestamps) => {
    // Organize New Data
    let arr = [];
    for (let j = 0; j <= channels; j++) i === j ? arr.push(data) : arr.push([]);

    // Applying Math.abs to account for signal rectification
    let n = Math.abs(data * signalMultiplier);
    //addSample(n, i); //Uncomment to use array-based filter
    let filteredSample = filter.singleStep(n);
    //console.log(filteredSample);

    /*
    // Example of applying filter on an array of data. TODO: rectify signal.
    let lastSampleIndex = filteredSignalHolder[i].length - 1;
    let filteredData = filteredSignalHolder[i][lastSampleIndex];
    console.log(filteredData);
    */

    if (i == 0) {
      console.log(filteredSample);
      visualizer.updateTrackData(i, filteredSample);
    }
    // Run ondata Callback
    //ondata(data, timestamps, track.contentHint);
  });
};

// ------------- Declare Acquisition Function -------------

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
const button = document.querySelector("#ganglion");
button.onclick = () => startAcquisition("ganglion");
