import {musicGenerationDriverFunction} from './GenerationAlgorithm.js';

// Stolen from https://stackoverflow.com/questions/3916191/download-data-url-file, thanks!
function downloadURI(uri, name) {
	var link = document.createElement("a");
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	// I don't know what this line is supposed to do, but it causes an error. Don't uncomment pls <3
	// delete link; 
  }

function generateAndDownloadMIDIFile()
{
	var write = new MidiWriter.Writer([trackFP1, trackFP2, trackC3, trackC4]);
	var writeURI = write.dataUri();
	//COOOL TRICK
	//you can pass setState as a parameter and have it change in a different function
	setMIDIFile(writeURI)
	// pass writeURI to the database

	// downloadURI(writeURI, "BrainBeatsMasterpiece"); // <------------ this is where the MIDI file is actually generated
	// playMidiFile(writeURI);
	console.log("From the function:" + writeURI);
}

function initMIDIWriterParams()
{
	// Sets the tempo of each track to the song's tempo. There is currently no support for tempo changes nor tracks that have varying tempos
	trackFP1.setTempo(BPM);
	trackFP2.setTempo(BPM);
	trackC3.setTempo(BPM);
	trackC4.setTempo(BPM);

	// There is currently no support for any time signature other than 4/4, though it likely isn't hard to get others working ¯\_(ツ)_/¯
	trackFP1.setTimeSignature(4, 4); 
	trackFP2.setTimeSignature(4, 4); 
	trackC3.setTimeSignature(4, 4); 
	trackC4.setTimeSignature(4, 4); 
// }

function downloadData() 
{
	// //   console.log(JSON.stringify(allData));
	var workbook = XLSX.utils.book_new();
	const worksheet = XLSX.utils.json_to_sheet(allData);
	XLSX.utils.sheet_add_aoa(worksheet, [["channel", "signal"]]);
	XLSX.utils.book_append_sheet(workbook, worksheet, "SheetJS");
	XLSX.writeFile(workbook, "sheetjs.csv", { compression: true });

}

// Returns the lowest octave necessary for this song, using numNotes to determine.
// Octave 5 is used as the center/default octave.
function GetFloorOctave() {
		if (numNotes == 7 || numNotes == 14)
			return 5;
		if (numNotes == 21)
			return 4;
}