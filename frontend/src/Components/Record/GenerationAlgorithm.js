import * as module from './GeneralHelperFunctions.js';
import {getMilliecondsFromBPM, getIntFromNoteTypeString, getNoteLengthStringFromInt, instrumentEnums, getInstrumentNameFromInt} from './GeneralHelperFunctions.js';

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

var numNotes = 21;

// The array of size numNotes that is used to house the cutoffs for each of the numNotes incremements. 
// The value of MIN_MAX_AMPLITUDE_DIFFERENCE is divided by numNotes, and the result (let's call this X) is then used to 
// create evenly-spaced "sections" in the array. 
// incrementArr[0] will always be 0, and incrementArr[numNotes - 1] will always be MAX_AMPLITUDE + AMPLITUDE_OFFSET.
// incrementArr[1] will be X. incrementArr[2] will be X * 2. incrementArr[3] will be X * 3.
// In runtime, the data that the headset relays will be compared to entries in incrementArr simultaneously to find
// which values it falls between, and from there a note will be declared. For example, let's say incrementArr[0] is 0,
// incrementArr[1] is 0.5, and incrementArr[2] is 1.0. The headset relays data equal to 0.75. Because 0.75 falls
// between incrementArr[1] and [2], it will be assigned to note 1, the floor of the indexes it fell between.
var incrementArr = new Array(numNotes);

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

const KEY_SIGNATURES_MAJOR =
[
    ["C", "D", "E", "F", "G", "A", "B"], // 0 done
    ["C#", "D#", "F", "F#", "G#", "A#", "C"], // 1 done
    ["D", "E", "F#", "G", "A", "B", "C#"], // 2 done
    ["D#", "F", "G", "G#", "A#", "C", "D"], // 3 done
    ["E", "F#", "G#", "A", "B", "C#", "D#"], // 4 done
    ["F", "G", "A", "A#", "C", "D", "E"], // 6 done
    ["F#", "G#", "A#", "B", "C#", "D#", "E#"], // 7 done
    ["G", "A", "B", "C", "D", "E", "F#"], // 8 done
    ["G#", "A#", "C", "C#", "D#", "F", "G"], // 9 done
    ["A", "B", "C#", "D", "E", "F#", "G#"], // 10 done
    ["A#", "C", "D", "D#", "F", "G", "A"], // 11 done 
    ["B", "C#", "D#", "E", "F#", "G#", "A#"] // 12 done
];
const KEY_SIGNATURES_MINOR =
[
    ["C", "D", "D#", "F", "G", "G#", "A#"], // 0 done
    ["C#", "D#", "E", "F#", "G#", "A", "B"], // 1 done
    ["D", "E", "F", "G", "A", "A#", "C"], // 2 done 
    ["D#", "F", "F#", "G#", "A#", "B", "C#"], // 3 done 
    ["E", "F#", "G", "A", "B", "C", "D"], // 4 done 
    ["F", "G", "G#", "A#", "C", "C#", "D#"], // 6 done
    ["F#", "G#", "A", "B", "C#", "D", "E"], // 7 done
    ["G", "A", "A#", "C", "D", "D#", "F"], // 8 done
    ["G#", "A#", "B", "C#", "D#", "E", "F#"], // 9 done
    ["A", "B", "C", "D", "E", "F", "G"], // 10 done
    ["A#", "C", "C#", "D#", "F", "F#", "G#"], // 11 done
    ["B", "C#", "D", "E", "F#", "G", "A"] // 12 done
];
const KEY_SIGNATURES = [KEY_SIGNATURES_MAJOR, KEY_SIGNATURES_MINOR]

var keySignature = KEY_SIGNATURES[1][2];

export async function musicGenerationDriverFunction(track, data, instrument, noteType, noteVolume)
{
    InitIncrementArr();

    // This entire handleTrack section needs to run 4 times total, once for each channel, every tick.
    // if (channelCounter < 3)
    //     channelCounter++;
    // else if (channelCounter >= 3) {
    //     if (firstTickSkipped == 0)
    //         firstTickSkipped = 1;
    //     else
    //         //waitForNextTick(quickNoteType);
    //         channelCounter = 0;
    // }

    var declaredNote = NoteDeclarationRaw(data, track.contentHint); // Get note increment
    var noteAndOctave = GetNoteWRTKey(declaredNote); // Get the actual note and its octave
    var floorOctave = GetFloorOctave(); // Get the lowest octave that will be used in the song

    let noteOctaveString;
    let noteFrequency;

    if (noteAndOctave.note != -1)
    {
        noteOctaveString = noteAndOctave.note + (noteAndOctave.octave + floorOctave);
        noteFrequency = getFrequencyFromNoteOctaveString(noteOctaveString);
    }

    if (noteAndOctave.note != -1)
    {
        if (track.contentHint.localeCompare("FP1") == 0)
            console.log(track.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(FP1Instrument) + " playing " + FP1NoteType + " notes] " + data);
        else if (track.contentHint.localeCompare("FP2") == 0)
            console.log(track.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(FP2Instrument) + " playing " + FP2NoteType + " notes] " + data);
        else if (track.contentHint.localeCompare("C3") == 0)
            console.log(track.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(C3Instrument) + " playing " + C3NoteType + " notes] " + data);
        else if (track.contentHint.localeCompare("C4") == 0)
            console.log(track.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(C4Instrument) + " playing " + C4NoteType + " notes] " + data);

        return {noteFrequency, noteVolume, instrument, noteType};
        //playMidiNote(noteFrequency, noteVolume, instrument, noteType);
    }				

    if (track.contentHint.localeCompare("FP1") == 0)
        FP1Ready = 1;
    else if (track.contentHint.localeCompare("FP2") == 0)
        FP2Ready = 1;
    else if (track.contentHint.localeCompare("C3") == 0)
        C3Ready = 1;
    else if (track.contentHint.localeCompare("C4") == 0)
        C4Ready = 1;
};

// This creates the array in which different "increments" for notes are housed. I already sort-of explained this
// near the top of this file in the comment for "var incrementArr".
function InitIncrementArr() {
	var incrementAmount = MIN_MAX_AMPLITUDE_DIFFERENCE / numNotes; // Dividing the total range by the number of notes

	incrementArr[0] = 0; // First index will always be 0
	incrementArr[numNotes - 1] = MAX_AMPLITUDE + AMPLITUDE_OFFSET; // Last index will always be the max value + the offset that was used to remove negative numbers.

	// Fill out the array so that each index is populated with incrementAmount * index
	for (var i = 1; i < numNotes - 1; i++)
		incrementArr[i] = incrementAmount * i + AMPLITUDE_OFFSET;
}

// Takes in the raw value from the headset and the sensor it came from and assigns a note.
function NoteDeclarationRaw(ampValue, sensor) {
	let ampValue2 = 0;
	ampValue2 = (ampValue - -AMPLITUDE_OFFSET); // Applies the offset to the headset's raw data

	// For every possible note, check to see if ampValue falls between two array positions. If so, return that position.
	// If not, it will be treated as a rest (returning -1).
	for (var i = 0; i <= numNotes - 1; i++) {
		if (ampValue2 >= incrementArr[i] && ampValue2 <= incrementArr[i + 1])
			return i;
	}
	return -1;
}

// Gets the actual note from the previously-obtained note increment (see NoteDeclarationRaw())
function GetNoteWRTKey(note) {
	// If the note increment is between 1 and 7, simply return that index in the key array with octave being zero.
	if (note <= 7 && note >= 1)
		return { note: keySignature[note - 1], octave: 0 };
	// If the note increment is less than zero, return -1 which will be treated as a rest.
	else if (note <= 0)
		return { note: -1, octave: 0 };
	// If the note is valid and greater than 7
	else {
		var noteMod = note % 7; // Mod by 7 to find note increment
		var noteDiv = Math.floor(note / 7); // Divide by 7 to find octave WRT numNotes/3.
		return { note: keySignature[noteMod], octave: noteDiv };
	}
}

	// Returns the lowest octave necessary for this song, using numNotes to determine.
	// Octave 5 is used as the center/default octave.
function GetFloorOctave() {
    if (numNotes == 7 || numNotes == 14)
        return 5;
    if (numNotes == 21)
        return 4;
}

// Stolen from https://gist.github.com/stuartmemo/3766449. Thanks!!
// Takes in a note and octave in string form (ex: 'C#6') and returns the raw frequency for that note.
var getFrequencyFromNoteOctaveString = function (note) {
		var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'], octave, keyNumber;

		if (note.length === 3)
			octave = note.charAt(2);
		else
			octave = note.charAt(1);

		keyNumber = notes.indexOf(note.slice(0, -1));

		if (keyNumber < 3)
			keyNumber = keyNumber + 12 + ((octave - 1) * 12) + 1;
		else
			keyNumber = keyNumber + ((octave - 1) * 12) + 1;

		// Return frequency of note
		return 440 * Math.pow(2, (keyNumber - 49) / 12);
};