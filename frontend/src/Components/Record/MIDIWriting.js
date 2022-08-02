// This file houses all functions and variables relating to writing and downloading MIDI data. Most functions here are called somewhere in Record.js.

import {
	getNoteLengthStringFromInt,
	getInstrumentNameFromInt,
	getIntFromNoteTypeString,
	getIntFromNoteTypeStringWithMidiWriterJsValues,
	getNoteLengthMultiplier,
	getMilliecondsFromBPM,
	GetFloorOctave,
	findNumSamples,
	getFrequencyFromNoteOctaveString
} from './HelperFunctions.js';

const MidiWriter = require('midi-writer-js');

var trackFP1, trackFP2, trackC3, trackC4;

export function addNoteToMIDITrack(track, noteAndOctave, noteOctaveString, noteType)
{
    let note;
    if (noteAndOctave.note == -1) // Rest
        note = new MidiWriter.NoteEvent({wait: getIntFromNoteTypeStringWithMidiWriterJsValues(noteType).toString(), duration: '0', velocity: 0});
    else
        note = new MidiWriter.NoteEvent({pitch: [noteOctaveString], duration: getIntFromNoteTypeStringWithMidiWriterJsValues(noteType).toString()});

    if (track.contentHint === "FP1")
        trackFP1.addEvent(note);
    else if (track.contentHint === "FP2")
        trackFP2.addEvent(note);
    else if (track.contentHint === "C3")
        trackC3.addEvent(note);
    else if (track.contentHint === "C4")
        trackC4.addEvent(note);
}

export function initMIDIWriter(BPM)
{
    console.log("Setting everything back to default?")
    trackFP1 = new MidiWriter.Track();
    trackFP2 = new MidiWriter.Track();
    trackC3 = new MidiWriter.Track();
    trackC4 = new MidiWriter.Track();
    console.log(trackFP1);
    initMIDIWriterParams(BPM);
}

// export function resetMIDI()
// {
//     trackFP1 = new MidiWriter.Track();
//     trackFP2 = new MidiWriter.Track();
//     trackC3 = new MidiWriter.Track();
//     trackC4 = new MidiWriter.Track();
//     initMIDIWriterParams(BPM);-
// }

function initMIDIWriterParams(BPM)
{
    // Sets the tempo of each track to the song's tempo. There is currently no support for tempo changes nor tracks that have varying tempos
    trackFP1.setTempo(BPM);
    trackFP2.setTempo(BPM);
    trackC3.setTempo(BPM);
    trackC4.setTempo(BPM);

    // We currently only support the 4/4 time signature
    trackFP1.setTimeSignature(4, 4); 
    trackFP2.setTimeSignature(4, 4); 
    trackC3.setTimeSignature(4, 4); 
    trackC4.setTimeSignature(4, 4); 
}

export function printTrack(track)
{
    if (track == 1)
        console.log(trackFP1);
    else if (track == 2)
        console.log(trackFP2);
    else if (track == 3)
        console.log(trackC3);
    else if (track == 4)
        console.log(trackC4);
}

// Borrowed from https://stackoverflow.com/questions/3916191/download-data-url-file. Thanks!!
function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// This function is for downloading the MIDI file during or after RECORDING
export function generateMIDIURIAndDownloadFile()
{
    // Second param is the default name of the file in the pop-up to download, you can make it whatever you want.
    downloadURI(generateMIDIURI(), "BrainBeatsMasterpiece");
}

// This function is for downloading a MIDI file AT ANY TIME, you just need to pass in a midi URI
export function generateMIDIFileFromURI(uri)
{
    downloadURI(uri);
}

// This function takes the notes that have been added to each track (trackFP1, trackFP2, etc) and turns them into a combined URI which is actually useful!
export function generateMIDIURI()
{
    var write = new MidiWriter.Writer([trackFP1, trackFP2, trackC3, trackC4]);
    var writeURI = write.dataUri();
    console.log(writeURI);
    return writeURI;
}

