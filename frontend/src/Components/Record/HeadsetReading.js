import React, { useEffect, useCallback, useRef } from "react";

import * as components from "https://cdn.jsdelivr.net/npm/brainsatplay-ui@0.0.7/dist/index.esm.js"; // UI
// Data acquisition
import * as datastreams from "https://cdn.jsdelivr.net/npm/datastreams-api@latest/dist/index.esm.js";
import ganglion from "https://cdn.jsdelivr.net/npm/@brainsatplay/ganglion@0.0.2/dist/index.esm.js"; // This is the device aquisition for BrainBeats AKA the ganglion device.
import * as XLSX from "xlsx";
import MidiPlayer from "midi-player-js";

import {playMidiFile} from './Playback.js';
import {musicGenerationDriverFunction} from './GenerationAlgorithm.js';
import * as module from './GeneralHelperFunctions.js';

import {getMilliecondsFromBPM, getIntFromNoteTypeString, getNoteLengthStringFromInt, instrumentEnums} from './GeneralHelperFunctions.js';

var BPM = 120;

// The amount of time (in milliseconds) that each of the supported notes would take at the specified BPM.
const timeForEachNoteARRAY =
[
    getMilliecondsFromBPM(BPM) / 4,
    getMilliecondsFromBPM(BPM) / 2,
    getMilliecondsFromBPM(BPM),
    getMilliecondsFromBPM(BPM) * 2,
    getMilliecondsFromBPM(BPM) * 4
];

//this rec is to stop the infinite loop from track.subscribe
let rec;

let letMeRecord = true;

// Global variables
const allData = [];
let channels = 0;
let trackMap = new Map();
let contentHintToIndex = {};

const MidiWriter = require('midi-writer-js');

const FP1Note = 2, FP2Note = 2, C3Note = 1, C4Note = 1;
const noteDuration = [parseInt(FP1Note), parseInt(FP2Note), parseInt(C3Note), parseInt(C4Note)];

// The instrument that each channel will be "playing" SineWave as a default unless changed from GUI
var FP1Instrument = instrumentEnums.Flute,
    FP2Instrument = instrumentEnums.Oboe,
    C3Instrument = instrumentEnums.Tuba,
    C4Instrument = instrumentEnums.SineWave;

var FP1Ready = 1,
    FP2Ready = 1,
    C3Ready = 1,
    C4Ready = 1,
    TempoCounterReady = 1;

var FP1NoteType = getNoteLengthStringFromInt(noteDuration[0]),
    FP2NoteType = getNoteLengthStringFromInt(noteDuration[1]),
    C3NoteType = getNoteLengthStringFromInt(noteDuration[2]),
    C4NoteType = getNoteLengthStringFromInt(noteDuration[3]);

var FP1NoteLengthMS = timeForEachNoteARRAY[getIntFromNoteTypeString(FP1NoteType)],
    FP2NoteLengthMS = timeForEachNoteARRAY[getIntFromNoteTypeString(FP2NoteType)],
    C3NoteLengthMS = timeForEachNoteARRAY[getIntFromNoteTypeString(C3NoteType)],
    C4NoteLengthMS = timeForEachNoteARRAY[getIntFromNoteTypeString(C4NoteType)];

const DEFAULT_VOLUME = 0.1;
var FP1Volume = DEFAULT_VOLUME,
    FP2Volume = DEFAULT_VOLUME,
    C3Volume = DEFAULT_VOLUME,
    C4Volume = DEFAULT_VOLUME;

var noteFP1, noteFP2, noteC3, noteC4;

// This function is called when clicking on the record button.
export async function startAcquisition (label) {
    console.log("startAcquisition, " + label);

    var dataDevices = new datastreams.DataDevices();
    dataDevices.load(ganglion);
    // dataDevices.load(muse);
    // dataDevices.load(device);
    // dataDevices.load(hegduino);

    // Get device stream
    const dataDevice = await dataDevices.getUserDevice({ label });

    // Grab datastream from device
    const stream = dataDevice.stream;

    // Handle all tracks
    stream.tracks.forEach(handleTrack);
    stream.onaddtrack = (e) => handleTrack(e.track);
};

// Track handler
const handleTrack = (track) => {

    console.log("handleTrack: " + track);

    // Map track information (e.g. 10-20 Coordinate) to index
    if (!trackMap.has(track.contentHint)) {
        const index = trackMap.size;
        contentHintToIndex[track.contentHint] = index;
        trackMap.set(index, track);
    }

    // Grab index
    const i = contentHintToIndex[track.contentHint];
    channels = i > channels ? i : channels; // Assign channels as max track number

    // Subscribe to new data
    // This track.subscribe thing is basically one big infinite loop that iterates every time a new "tick" or "frame" of data
    track.subscribe((data) => {
        //console.log("track.subscribe")
        if(rec){
            console.log("This fired")
            //console.log(track.unsubscribe(track)
        }
        else
        {
            // Organize New Data
            let arr = [];
            for (let j = 0; j <= channels; j++)
                i === j ? arr.push(data) : arr.push([]);

            if (TempoCounterReady == 1) 
            {
                TempoCounterReady = 0;
                setTimeout(() => 
                {
                    console.log("----- It's been " + getMilliecondsFromBPM(BPM) + "ms (one quarter note at " + BPM + "bpm) -----");
                    TempoCounterReady = 1;
                }, getMilliecondsFromBPM(BPM));
            }

            // TODO: Comment what this does :)
            if (track.contentHint.localeCompare("FP1") == 0 && FP1Ready == 1 ) 
            {
                console.log("1");
                FP1Ready = 0;
                setTimeout(() => { musicGenerationDriverFunction(track, data, FP1Instrument, FP1NoteType, FP1Volume) }, FP1NoteLengthMS)
            }
            else if (track.contentHint.localeCompare("FP2") == 0 && FP2Ready == 1 ) 
            {
                console.log("2");
                FP2Ready = 0;
                setTimeout(() => { musicGenerationDriverFunction(track, data, FP2Instrument, FP2NoteType, FP2Volume) }, FP2NoteLengthMS)
            }
            else if (track.contentHint.localeCompare("C3") == 0 && C3Ready == 1 ) 
            {
                console.log("3");
                C3Ready = 0;
                setTimeout(() => { musicGenerationDriverFunction(track, data, C3Instrument, C3NoteType, C3Volume) }, C3NoteLengthMS)
            }
            else if (track.contentHint.localeCompare("C4") == 0 && C4Ready == 1) 
            {
                console.log("4");
                C4Ready = 0;
                setTimeout(() => { musicGenerationDriverFunction(track, data, C4Instrument, C4NoteType, C4Volume) }, C4NoteLengthMS)
            }
            // If you want to support more than 4 channels, here is where you'd add more. As you can see above, there's an if/else block
            // for each channel that is currently supported. All you need to do to make more is copy what you see above, but set the
            // variables respectively to each channel name. For example, if the channel you're trying to add is called "T4", you'd do this:
            // else if (track.contentHint.localeCompare("T4") == 0 && T4Ready == 1) 
            // {
            //     T4Ready = 0;
            //     setTimeout(() => { musicGenerationDriverFunction(track, data, T4Instrument, T4NoteType, T4Volume) }, T4NoteLengthMS)
            // }
            // Obviously you'd need to create all those variables first, but after that you should be good-to-go.
        }
    });
};





