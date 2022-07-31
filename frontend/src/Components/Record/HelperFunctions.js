import * as Constants from './Constants.js'

export function getNoteLengthStringFromInt(input)
{
    if (input == 0) return "whole";
    else if (input == 1) return "half";
    else if (input == 2) return "quarter";
    else if (input == 3) return "eighth";
    else if (input == 4) return "sixteenth";
}

export function getInstrumentNameFromInt(input) {
    if (input == -3) return "Sine Wave";
    else if (input == -2) return "Triangle Wave";
    else if (input == -1) return "Square Wave";
    else if (input == 0) return "Flute";
    else if (input == 1) return "Oboe";
    else if (input == 2) return "Clarinet";
    else if (input == 3) return "Bassoon";
    else if (input == 4) return "Trumpet";
    else if (input == 5) return "French Horn";
    else if (input == 6) return "Trombone";
    else if (input == 7) return "Tuba";
}

export function getIntFromNoteTypeString(input) {
    if (input.localeCompare("sixteenth") == 0) return 0;
    else if (input.localeCompare("eighth") == 0) return 1;
    else if (input.localeCompare("quarter") == 0) return 2;
    else if (input.localeCompare("half") == 0) return 3;
    else if (input.localeCompare("whole") == 0) return 4;
}

export function getIntFromNoteTypeStringWithMidiWriterJsValues(input)
{
    if (input.localeCompare("sixteenth") == 0) return 16;
    else if (input.localeCompare("eighth") == 0) return 8;
    else if (input.localeCompare("quarter") == 0) return 4;
    else if (input.localeCompare("half") == 0) return 2;
    else if (input.localeCompare("whole") == 0) return 1;
}

// This if/else stack returns a note length multiplier based off input. Quarter notes are used as the baseline (x1.0 multiplier).
// Input should just be a lowercase string of the note type. Ex: "quarter", "half"
export function getNoteLengthMultiplier(noteType) {
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

    return noteLengthMultiplier;
}

// Takes in a BPM and returns the length of one QUARTER NOTE in milliseconds.
export function getMilliecondsFromBPM(bpm) {
    return 60000 / bpm;
}

export function GetFloorOctave(numberNotes) {
    if (numberNotes == 7 || numberNotes == 14)
        return 5;
    if (numberNotes == 21)
        return 4;
}

export function findNumSamples(ms) {
    // Sample rate is number of samples every second
    // numSamples is the number of total samples played
    // ms is how many milliseconds we want something to play for
    let relationToSecond = 1000 / ms;
    let numSamples = Constants.sampleRate / relationToSecond;
    return numSamples;
}