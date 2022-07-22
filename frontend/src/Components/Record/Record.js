import React, { useContext, useState, useEffect, useCallback } from 'react';
import RecordButton from './RecordButton';
import { Carousel } from "react-responsive-carousel";
import { SliderPicker } from 'react-color'
import './record.css'
import { FaAngleRight, FaAngleLeft, FaRegPlayCircle, FaRegPauseCircle } from "react-icons/fa";
import * as components from "https://cdn.jsdelivr.net/npm/brainsatplay-ui@0.0.7/dist/index.esm.js"; // UI
import * as datastreams from "https://cdn.jsdelivr.net/npm/datastreams-api@latest/dist/index.esm.js"; // Data acquisition
import ganglion from "https://cdn.jsdelivr.net/npm/@brainsatplay/ganglion@0.0.2/dist/index.esm.js"; // Device drivers
import * as XLSX from 'xlsx';
import MidiPlayer from 'midi-player-js';
import {cloneDeep} from 'lodash'

import { useRecoilValue } from "recoil";
import {userJWT, userModeState} from '../context/GlobalState'
import sendAPI from '../sendAPI';

function Record() {
    //needed states
    const user = useRecoilValue(userModeState);
	const jwt = useRecoilValue(userJWT);
    const [checked, setChecked] = useState(false);
	const [stage, setStage] = useState(0);
	const [numNotes, setNumNotes] = useState(7);
	const [FP1, setFP1Inst] = useState(-3);
	const [FP2, setFP2Inst] = useState(-3);
	const [C3, setC3Inst] = useState(-3);
	const [C4, setC4Inst] = useState(-3);
	const [FP1Note, setFP1Note] = useState(0);
	const [FP2Note, setFP2Note] = useState(0);
	const [C3Note, setC3Note] = useState(0);
	const [C4Note, setC4Note] = useState(0);
	const [keyNum, setKey] = useState(0);
	const [scale, setScale] = useState(0);
	const [BPMArray, setBPMArray] = useState([]);
	const [BPM, setBPM] = useState(120);
	const [vis, setVis] = useState(true);
	const [title, setTitle] = useState('');
	const [msg, setMsg] = useState('');

	const [finishRec, setFinishRec] = useState();
	
	//passing these to Music Generation
	const instrumentList = [parseInt(FP1), parseInt(FP2), parseInt(C3), parseInt(C4)];
	const noteDuration = [parseInt(FP1Note), parseInt(FP2Note), parseInt(C3Note), parseInt(C4Note)];

	const path = require('../Path')
	const KEY=
	[
		"C", "C#", "D","D#", "E", "F","F#", "G", "G#", "A","A#","B"
	];
	const SCALE =
	[
		'Major', 'Minor'
	]

	//get BPM from database
	useEffect(()=>{

		
		sendAPI('get', '/music/getBPMValues')
			.then((res) =>{
				setBPMArray(res.data);
			})
			.catch((err) =>{
				console.log(err);
			})
	},[])

    const handleChange = () => {
        setChecked(!checked);
      };
	const goNext = () => {
		if(stage < 2)
		{
			setStage(stage + 1)
			console.log(stage)
		}	
		if(stage == 1)
		{
			console.log(finishRec)
		}
	}
	const goBack = () => {
		setStage(stage - 1)
	}
	const handle = () => {
		console.log(numNotes)
		console.log(instrumentList);
		console.log(noteDuration);
		console.log(keyNum);
		console.log(scale);
		console.log(BPM);
		console.log(BPMArray)
	}
	const postFile = () => {
		const bodyData ={
			"userID": 'de0463ea-1745-4f47-a789-82a9d7eae746',
  			"title": title,
  			"bpm": BPM,
  			"key": KEY[scale],
  			"visibility": vis,
			'token': jwt,
		}
		console.log(bodyData)

		sendAPI('post', '/posts/createPost', bodyData)
			.then((res) =>{
				setMsg('Song posted')
			})
	}
    return <>
		{stage == 0 && (
			<>
			<div className='container scriptBox'>
				<div>
				<div className='row'>
					<p className='textColor'>Music Setting</p>
				</div>
				<div className='row'>
				<div className='col'>
					<div style={{ color: "white" }}>FP1 Instrument</div>
			  			<select onChange={(e) => setFP1Inst(e.target.value)}>
                  			<option value={-3}>SineWave</option>
                  			<option value={-2}>TriangleWave</option>
				  			<option value={-1}>SquareWave</option>
							<option value={0}>Flute</option>
							<option value={1}>Oboe</option>
							<option value={2}>Clarinet</option>
							<option value={3}>Bassoon</option>
							<option value={4}>Trumpet</option>
							<option value={5}>FrenchHorn</option>
							<option value={6}>Trombone</option>
							<option value={7}>Tuba</option>
            			</select>
					<div style={{ color: "white" }}>FP2 Instrument</div>
						<select onChange={(e) => setFP2Inst(e.target.value)}>
							<option value={-3}>SineWave</option>
							<option value={-2}>TriangleWave</option>
							<option value={-1}>SquareWave</option>
							<option value={0}>Flute</option>
							<option value={1}>Oboe</option>
							<option value={2}>Clarinet</option>
							<option value={3}>Bassoon</option>
							<option value={4}>Trumpet</option>
							<option value={5}>FrenchHorn</option>
							<option value={6}>Trombone</option>
							<option value={7}>Tuba</option>
            			</select>
					<div style={{ color: "white" }}>C3 Instrument</div>
						<select onChange={(e) => setC3Inst(e.target.value)}>
							<option value={-3}>SineWave</option>
							<option value={-2}>TriangleWave</option>
							<option value={-1}>SquareWave</option>
							<option value={0}>Flute</option>
							<option value={1}>Oboe</option>
							<option value={2}>Clarinet</option>
							<option value={3}>Bassoon</option>
							<option value={4}>Trumpet</option>
							<option value={5}>FrenchHorn</option>
							<option value={6}>Trombone</option>
							<option value={7}>Tuba</option>
            			</select>
					<div style={{ color: "white" }}>C4 Instrument</div>
						<select onChange={(e) => setC4Inst(e.target.value)}>
							<option value={-3}>SineWave</option>
							<option value={-2}>TriangleWave</option>
							<option value={-1}>SquareWave</option>
							<option value={0}>Flute</option>
							<option value={1}>Oboe</option>
							<option value={2}>Clarinet</option>
							<option value={3}>Bassoon</option>
							<option value={4}>Trumpet</option>
							<option value={5}>FrenchHorn</option>
							<option value={6}>Trombone</option>
							<option value={7}>Tuba</option>
            			</select>

				</div>
				<div className='col'>
					<div style={{ color: "white" }}>FP1 Note Type</div>
							<select onChange={(e) => setFP1Note(e.target.value)}>
								<option value={0}>Whole</option>
								<option value={1}>Half</option>
								<option value={2}>Quarter</option>
								<option value={3}>Eighth</option>
								<option value={4}>Sixteenth</option>
							</select>
						<div style={{ color: "white" }}>FP2 Note Type</div>
							<select onChange={(e) => setFP2Note(e.target.value)}>
								<option value={0}>Whole</option>
								<option value={1}>Half</option>
								<option value={2}>Quarter</option>
								<option value={3}>Eighth</option>
								<option value={4}>Sixteenth</option>
							</select>
						<div style={{ color: "white" }}>C3 Note Type</div>
							<select onChange={(e) => setC3Note(e.target.value)}>
								<option value={0}>Whole</option>
								<option value={1}>Half</option>
								<option value={2}>Quarter</option>
								<option value={3}>Eighth</option>
								<option value={4}>Sixteenth</option>
							</select>
						<div style={{ color: "white" }}>C4 Note Type</div>
							<select onChange={(e) => setC4Note(e.target.value)}>
								<option value={0}>Whole</option>
								<option value={1}>Half</option>
								<option value={2}>Quarter</option>
								<option value={3}>Eighth</option>
								<option value={4}>Sixteenth</option>
							</select>
				</div>
				<div className='col'>
						<div style={{ color: "white" }}>Number of Octaves</div>
							<select onChange={(e) =>  setNumNotes(e.target.value * 7)} >
                  				<option value={1}>1</option>
                  				<option value={2}>2</option>
				  				<option value={3}>3</option>
            				</select>
					<div style={{ color: "white" }}>Tempo</div>
					<select onChange={(e) => setBPM(BPMArray[e.target.value])}>
						{BPMArray.map((item, index) => {
							return (	
								<option value={index}>{item}</option>
							)
						})}
					</select>
					<div style={{ color: "white" }}>Key Signature</div>

						<select onChange={(e) => setKey(e.target.value)} value={keyNum}>
							<option value={0}>C</option>
							<option value={1}>C#/Db</option>
							<option value={2}>D</option>
							<option value={3}>D#/Eb</option>
							<option value={4}>E</option>
							<option value={5}>F</option>
							<option value={6}>F#/Gb</option>
							<option value={7}>G</option>
							<option value={8}>G#/Ab</option>
							<option value={9}>A</option>
							<option value={10}>A#/Bb</option>
							<option value={11}>B</option>
						</select>
                	<div style={{ color: "white" }}>Scale</div>
						<select onChange={(e) => setScale(e.target.value)} value={scale}>
							<option value={0}>Major</option>
							<option value={1}>Minor</option>
						</select>
				</div>
				</div>
				</div>
        </div>
						<button className='arrowButtonMain' onClick={goNext}>Next {<FaAngleRight />}</button>
			</>
		)}
        {stage == 1 && (
			<div>
            <div className="">
                <label className="switch">
                    <input type="checkbox" className="switch-input" checked={checked} onChange={handleChange}/>
                    <span className="switch-label" data-on="Script" data-off="Link"></span>
                    <span className="switch-handle"></span>
                </label>
            </div>
            <ScriptThing show={checked === true} finish={finishRec} setFinish={setFinishRec}/>
            <LinkThing show={checked === false} finish={finishRec} setFinish={setFinishRec}/>
            <Setting numNotes={numNotes} instrumentArr={instrumentList} noteDuration={noteDuration} keyNum={keyNum} scale={scale} BPM={BPM}/>
			
			<button className='arrowButtonMain' onClick={goBack}>{<FaAngleLeft />} Music Setting </button>
			<button className='arrowButtonMain' onClick={goNext}>Post {<FaAngleRight />}</button>

		</div>
		)}
		{stage == 2 && (
			<>
			<div className='container scriptBox'>
				<div className='row'>
					<p className='textColor'>Posting</p>
					<p style={{ color: "white" }}>{msg}</p>	
				</div>
				<div className='row'>
					<div className='col'>
						<label style={{ color: "white" }}>Title</label>
						<br />
						<input type='text' onChange={(e) => setTitle(e.target.value)}/>
					</div>
					
				</div>	
				<br />
				<div className='row'>
					<div className='col'>
						<label style={{ color: "white" }}>Visibility</label>
						<br />
						<label className='switch'>
							<input type='checkbox' className='switch-input' checked={vis} onChange={() => setVis(!vis)}/>
							<span className="switch-label" data-on="Public" data-off="Private"></span>
							<span className="switch-handle"></span>
						</label>
					</div>
					<div className='col'>
						<label style={{ color: "white" }}>Key</label>
						<input value={KEY[keyNum]} disabled />
					</div>
					<div className='col'>
						<label style={{ color: "white" }}>Scale</label>
						<input value={SCALE[scale]} disabled />
					</div>
					<div className='col'>
						<label style={{ color: "white" }}>BPM</label>
						<input value={BPM} disabled />
					</div>
				</div>			
			</div>
			<button className='arrowButtonMain' onClick={goBack}>{<FaAngleLeft />} Record </button>
			<button className='arrowButtonMain' onClick={postFile}>Finish {<FaAngleRight />}</button>
			</>
		)}
	</>
		
}

function LinkThing({show, finish, setFinishRec}) {
    //Link test
    //https://www.youtube.com/watch?v=l0jJGlalLh8

    const [id, setId] = useState('');
    const [stage, setStage] = useState(0)

    let correctLink = id.split('='); //return the string with youtube id

    let url = correctLink[1];
    const goNext = (e) => {
        e.preventDefault()
        setStage(stage + 1)
		setFinishRec(stage)
    }
    const goBack = (e) => {
        e.preventDefault()
        setStage(stage - 1)
		setFinishRec(stage)

    }
    if (show) {
        return <>
            {stage == 0 && (
                <>
                    <div className='container scriptBox'>

                        <p className='textColor'>Link Script</p>
                        <br />
                        <input placeholder='Youtube Link' onChange={(e) => setId(e.target.value)} />
                        <br />
                        <button className='nextButton' onClick={goNext}>RECORD {<FaAngleRight />}</button>

                    </div>

                    <br />

                </>
            )}
            {stage == 1 && url == undefined && (
                <>
                    <br />
                    <div className='container scriptBox'>

                        <p className='textColor'>Invalid Link Please go back</p>

                        <button className='nextButton' onClick={goBack}>{<FaAngleLeft />}SCRIPT</button>
                    </div>
                </>
            )}
            {stage == 1 && url != undefined && (
                <>
                    <br />
                    <div className='container scriptBox'>
                        <VidLink link={url} />
                        <br />
                        <button className='nextButton' onClick={goBack}>{<FaAngleLeft />}SCRIPT</button>

                        <button className='nextButton'>FINISH</button>

                    </div>
                </>
            )}

        </>
    }
    return <></>;
}

function VidLink(link) {
    //two type of YT URLS
    //https://www.youtube.com/watch?v=DSBBEDAGOTc
    //https://www.youtube.com/watch?v=ScMzIvxBSi4&ab_channel=BenMarquezTX


    let tempID = link.link;
    //this discards discards everything after the & sign giving the correct URL if the URL
    //in the second form
    tempID = tempID.split('&')
    let id = tempID[0];
    return (
        <>

            <iframe
                src={`https://www.youtube.com/embed/${id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Embedded youtube"
                className='YtVideo'
            />

        </>
    )
}

function ScriptThing({show, finish, setFinishRec}) {
    const [words, setWords] = useState('');
    const [stage, setStage] = useState(0)
	const [currentSlide, setCurrentSlide] = useState(0)
	const [autoplay, setAutoPlay] = useState(false);

	//let words = script.split(', ');

	const [slides, setSlides] = useState([{word:'',speed:1000,background:'',textColor:''}])

    const createSlides = useCallback(() =>{
		
		let tempSlides = [];
		for(const word of words.split(', ')){
			console.log(word)
			tempSlides.push({word: word,speed:1000,background:'#fff',textColor:'#000'})
		}
		setSlides(tempSlides);
	},[words])

    //Go to next step in recording
    const goNext = (e) => {
        e.preventDefault()
		if(stage == 0)
			createSlides()
        setStage(stage + 1)
		setFinishRec(stage)
		
    }
    //Go back a step in recording
    const goBack = (e) => {
        e.preventDefault()
        setStage(stage - 1)
		setFinishRec(stage)

    }
	const editSlide = useCallback((slideIdx, updatedSlide) =>{
		console.log('UPDATED: ',updatedSlide)
		setSlides((slides) => {const tempSlides = cloneDeep(slides); tempSlides.splice(slideIdx, 1, updatedSlide); return tempSlides})
	},[])

	
    if (show) {
        return <>
            {stage == 0 && (
                <>
                    <div className='container scriptBox'>

                        <p className='textColor'>Build Script</p>
                        <br />
                        <textarea value={words} className='scriptTextBox' rows='5' cols='50' placeholder='Wordbox (seperate inputs by commas and spaces)' onChange={(e) => setWords(e.target.value)} />
                        <br />
                        <button className='nextButton' onClick={goNext}>RECORD {<FaAngleRight />}</button>

                    </div>

                    <br />

                </>
            )}
            {stage == 1 && words == '' && (
                <div className='container scriptBox'>

                    <p className='textColor'>Invalid Script Please go back</p>

                    <button className='nextButton' onClick={goBack}>{<FaAngleLeft />}SCRIPT</button>

                </div>
            )}
			
            {stage == 1 && words != '' && (
                <>
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <ValidScript setCurrentSlide={setCurrentSlide} slides={slides} autoplay={autoplay} currentSlide={currentSlide} />
                            </div>
                            <div className='col scriptBox'>
                                <label className='textColor'>Slideshow Background</label>
                                <SliderPicker color={slides[currentSlide].background} onChangeComplete={(e) => {
									const tempSlide = slides[currentSlide];
									tempSlide.background = e.hex;
									editSlide(currentSlide,tempSlide)}} />

                                <label className='textColor'>Text color</label>
                                <SliderPicker color={slides[currentSlide].textColor} onChangeComplete={(e) => {
									const tempSlide = slides[currentSlide];
									tempSlide.textColor = e.hex;
									editSlide(currentSlide,tempSlide)}} />

								<label className='textColor'>Slideshow Speed</label> <br />
                        		<input value={slides[currentSlide].speed / 1000} type='number' placeholder='(seconds)' onChange={(e) => {
									const tempSlide = slides[currentSlide];
									tempSlide.speed = e.target.value * 1000;
									editSlide(currentSlide, tempSlide);
								}} />
                        
								<button onClick={(e) => setAutoPlay(!autoplay)}>{autoplay ? 'true' : 'false'}</button>
                                <button className='nextButton' onClick={goBack}>{<FaAngleLeft />}SCRIPT</button>
                                <div className='nextButton' >FINISH</div>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    }
    return <></>;
}

function ValidScript({slides, setCurrentSlide, currentSlide, autoplay}) {

	const changeCarosel = useCallback((slide) => {
		setCurrentSlide(slide)
	},[])

    return (
        <>
            <div>
                To start click left or right side of slideshow
            </div>
            <Carousel autoPlay={autoplay} width={700} showThumbs={false} showIndicators={false}
                infiniteLoop={true} dynamicHeight={true} interval={slides[currentSlide].speed} onChange={changeCarosel}>
                {slides.map(
                    (slide,index) =>
                        {console.log(autoplay)
							
						return <div key={index} style={{ background: `${slide.background}`, color: `${slide.textColor}`, padding: '250px' }}>
                            {slide.word}
                        </div>})}
            </Carousel>

        </>
    )


}

function Setting({numNotes, instrumentArr, noteDuration, scale, keyNum, BPM}) {
    let st = {
        height: '100px',
        position: 'fixed',
        bottom: '0%',
        width: '100%',
        backgroundColor: '#393838',
        opacity: '1',
    }

	console.log("numNotes: " + numNotes)
	console.log("instrumentArr: " + instrumentArr)
	console.log("noteDuration: " + noteDuration)
	console.log("Scale: " + scale)
	console.log("keyNum: " + keyNum)
	console.log("BPM: " + BPM)
    const [record, setRecord] = useState(false);


	//this rec is to stop the infinite loop from track.subscribe
	let rec;

	let dataDevices;

	let letMeRecord = true;
	
	// Global variables
	const allData = [];
	let channels = 0;
	let trackMap = new Map();
	let contentHintToIndex = {};

	const MidiWriter = require('midi-writer-js');

	var trackFP1 = new MidiWriter.Track();
	var trackFP2 = new MidiWriter.Track();
	var trackC3 = new MidiWriter.Track();
	var trackC4 = new MidiWriter.Track();

	var noteFP1, noteFP2, noteC3, noteC4;

    useEffect(() => {

		initMIDIWriterParams();

		dataDevices = new datastreams.DataDevices();
		dataDevices.load(ganglion);

		// Set up graph (rough)
		// const graphDiv = document.getElementById("graph");
		// graphDiv.style.padding = "25px";
		// const timeseries = new components.streams.data.TimeSeries();
		// graphDiv.insertAdjacentElement("beforeend", timeseries);

		// Track handler
		const handleTrack = (track) => {
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
			// is sent from the headset... so it basically runs super quickly. 


			// UUIDArray.push(track.callbacks)
			// console.log(UUIDArray)

			
			track.subscribe((data) => {
				//Stops the recording
				//TODO: find solution to unsubscribe the tracks
				if(!rec){
					//console.log(track.unsubscribe(track))

				}else
				{
						// Organize New Data
					let arr = [];
					for (let j = 0; j <= channels; j++)
						i === j ? arr.push(data) : arr.push([]);

					// Add Data to Timeseries Graph
					// timeseries.data = arr;
					// timeseries.draw(); // FORCE DRAW: Update happens too fast for UI

					if (TempoCounterReady == 1) {
						TempoCounterReady = 0;
						setTimeout(() => {
							console.log("----- It's been " + getMilliecondsFromBPM(BPM) + "ms (one quarter note at " + BPM + "bpm) -----");
							TempoCounterReady = 1;
						}, getMilliecondsFromBPM(BPM));
					}

					// TODO: Comment what this does :)
					if (track.contentHint.localeCompare("FP1") == 0 && FP1Ready == 1 ) {
						FP1Ready = 0;
						setTimeout(() => { mainDriverFunction(track, data, FP1Instrument, FP1NoteType, FP1Volume) }, FP1NoteLengthMS)
						if (data[0] != null) {
							allData.push(
								[
									track.contentHint,
									Math.round(`${data[0]}` * 10000000) / 10000000,
								]
							);
						}
					}
					else if (track.contentHint.localeCompare("FP2") == 0 && FP2Ready == 1 ) {
						FP2Ready = 0;
						setTimeout(() => { mainDriverFunction(track, data, FP2Instrument, FP2NoteType, FP2Volume) }, FP2NoteLengthMS)
						if (data[0] != null) {
							allData.push(
								[
									track.contentHint,
									Math.round(`${data[0]}` * 10000000) / 10000000,
								]
							);
						}
					}
					else if (track.contentHint.localeCompare("C3") == 0 && C3Ready == 1 ) {
						C3Ready = 0;
						setTimeout(() => { mainDriverFunction(track, data, C3Instrument, C3NoteType, C3Volume) }, C3NoteLengthMS)
						if (data[0] != null) {
							allData.push(
								[
									track.contentHint,
									Math.round(`${data[0]}` * 10000000) / 10000000,
								]
							);
						}
					}
					else if (track.contentHint.localeCompare("C4") == 0 && C4Ready == 1) {
						C4Ready = 0;
						setTimeout(() => { mainDriverFunction(track, data, C4Instrument, C4NoteType, C4Volume) }, C4NoteLengthMS)
						if (data[0] != null) {
							allData.push(
								[
									track.contentHint,
									Math.round(`${data[0]}` * 10000000) / 10000000,
								]
							);
						}
					}
				}
				
			});
			
		};

		// Acquisition function
		const startAcquisition = async (label) => {
			// Get device stream
			const dataDevice = await dataDevices.getUserDevice({ label });

			// Grab datastream from device
			const stream = dataDevice.stream;

			// Handle all tracks
			stream.tracks.forEach(handleTrack);
			stream.onaddtrack = (e) => handleTrack(e.track);
			
			
		};

		// This is the function that calls all of the other functions for note generation.
		const mainDriverFunction = async (tracky, datay, instrument, noteType, noteVolume) => {
			InitIncrementArr();

			// This entire handleTrack section needs to run 4 times total, once for each channel, every tick.
			if (channelCounter < 3)
				channelCounter++;
			else if (channelCounter >= 3) {
				if (firstTickSkipped == 0)
					firstTickSkipped = 1;
				else
					//waitForNextTick(quickNoteType);
					channelCounter = 0;
			}

			var declaredNote = NoteDeclarationRaw(datay, tracky.contentHint); // Get note increment
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
				if (tracky.contentHint.localeCompare("FP1") == 0)
					console.log(tracky.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(FP1Instrument) + " playing " + FP1NoteType + " notes] " + datay);
				else if (tracky.contentHint.localeCompare("FP2") == 0)
					console.log(tracky.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(FP2Instrument) + " playing " + FP2NoteType + " notes] " + datay);
				else if (tracky.contentHint.localeCompare("C3") == 0)
					console.log(tracky.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(C3Instrument) + " playing " + C3NoteType + " notes] " + datay);
				else if (tracky.contentHint.localeCompare("C4") == 0)
					console.log(tracky.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(C4Instrument) + " playing " + C4NoteType + " notes] " + datay);
				
				playMidiNote(noteFrequency, noteVolume, instrument, noteType);
			}				

			if (tracky.contentHint.localeCompare("FP1") == 0)
			{
				if (noteAndOctave.note == -1) // Rest
					noteFP1 = new MidiWriter.NoteEvent({wait: getIntFromNoteTypeStringWithMidiWriterJsValues(FP1NoteType).toString(), duration: '0', velocity: 0});
					//noteFP1 = new MidiWriter.NoteEvent({pitch: 0, duration: getIntFromNoteTypeStringWithMidiWriterJsValues(FP1NoteType).toString(), velocity: 0});
				else
					noteFP1 = new MidiWriter.NoteEvent({pitch: [noteOctaveString], duration: getIntFromNoteTypeStringWithMidiWriterJsValues(FP1NoteType).toString()});
				trackFP1.addEvent(noteFP1);
				//console.log("FP1 over");
			}
			else if (tracky.contentHint.localeCompare("FP2") == 0)
			{
				if (noteAndOctave.note == -1) // Rest
					noteFP2 = new MidiWriter.NoteEvent({wait: getIntFromNoteTypeStringWithMidiWriterJsValues(FP2NoteType).toString(), duration: '0', velocity: 0});
				else
					noteFP2 = new MidiWriter.NoteEvent({pitch: [noteOctaveString], duration: getIntFromNoteTypeStringWithMidiWriterJsValues(FP2NoteType).toString()});
				trackFP2.addEvent(noteFP2);
				//console.log("FP2 over");
			}
			else if (tracky.contentHint.localeCompare("C3") == 0)
			{
				if (noteAndOctave.note == -1) // Rest
					noteC3 = new MidiWriter.NoteEvent({wait: getIntFromNoteTypeStringWithMidiWriterJsValues(C3NoteType).toString(), duration: '0', velocity: 0});
				else
					noteC3 = new MidiWriter.NoteEvent({pitch: [noteOctaveString], duration: getIntFromNoteTypeStringWithMidiWriterJsValues(C3NoteType).toString()});
				trackC3.addEvent(noteC3);
				//console.log("C3 over");
			}
			else if (tracky.contentHint.localeCompare("C4") == 0)
			{
				if (noteAndOctave.note == -1) // Rest
					noteC4 = new MidiWriter.NoteEvent({wait: getIntFromNoteTypeStringWithMidiWriterJsValues(C4NoteType).toString(), duration: '0', velocity: 0});
				else
					noteC4 = new MidiWriter.NoteEvent({pitch: [noteOctaveString], duration: getIntFromNoteTypeStringWithMidiWriterJsValues(C4NoteType).toString()});
				trackC4.addEvent(noteC4);
				//console.log("C4 over");
			}

			// Generate a data URI
			//generateAndDownloadMIDIFile(MidiWriter, trackFP1, trackFP2, trackC3, trackC4);

			if (tracky.contentHint.localeCompare("FP1") == 0)
				FP1Ready = 1;
			else if (tracky.contentHint.localeCompare("FP2") == 0)
				FP2Ready = 1;
			else if (tracky.contentHint.localeCompare("C3") == 0)
				C3Ready = 1;
			else if (tracky.contentHint.localeCompare("C4") == 0)
				C4Ready = 1;
		};

		// Set button functionality
		const buttons = document.querySelector("#buttons");

		for (let button of buttons.querySelectorAll("button"))
			if (button.id === "ganglion") {
				button.onclick = () => {rec=true;console.log(rec);startAcquisition(button.id)};
			}
			// else if (button.id === "downloadBtn") {
			// 	button.onclick = () => downloadData();
			// }
			else if (button.id === 'Disconnect'){
				button.onclick = () => {rec=false;console.log("I GOT CLICKED" + rec)};
			}
	},[])

	const handleStuff = () => {
		console.log("----------------- DEBUG INFO -----------------");
		console.log("Tempo (BPM): " + BPM);
		console.log("Number of notes: " + numNotes);
		console.log("Notes in key signature: " + keySignature);
		console.log("FP1, FP2, C3, C4 Instruments: " + getInstrumentNameFromInt(FP1Instrument), ", " + getInstrumentNameFromInt(FP2Instrument) + ", "
			+ getInstrumentNameFromInt(C3Instrument) + ", " + getInstrumentNameFromInt(C4Instrument));
		console.log("FP1, FP2, C3, C4 Note Types: " + FP1NoteType, ", " + FP2NoteType + ", " + C3NoteType + ", " + C4NoteType);
	}
	// ------------------------------------------------------------------------------ CONSTANTS AND GLOBAL VARIABLES ------------------------------------------------------------------------------


	// This isnt a constant its a user variable but it needs to be at the top I'm sorry I can move it later probably hopefully
	var BPM = 120; // Beats Per Minute of the track [aka tempo]

	// This isnt a constant its a user variable but it needs to be at the top I'm sorry I can move it later probably hopefully
	// The type of note for each channel. sixteenth, eighth, quarter, half, or whole. Don't forget the ""!
	var FP1NoteType = getNoteLengthStringFromInt(noteDuration[0]),
		FP2NoteType = getNoteLengthStringFromInt(noteDuration[1]),
		C3NoteType = getNoteLengthStringFromInt(noteDuration[2]),
		C4NoteType = getNoteLengthStringFromInt(noteDuration[3]);

	// 2D arrays that hold every note in each key signature, starting from C. 


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

	// Constant to hold the sample rate in hz. May remove. Not sure if we need it. We'll see...
	const SAMPLE_RATE = 44100

	// The amount of time (in milliseconds) that each of the supported notes would take at the specified BPM.
	const timeForEachNoteARRAY =
		[
			getMilliecondsFromBPM(BPM) / 4,
			getMilliecondsFromBPM(BPM) / 2,
			getMilliecondsFromBPM(BPM),
			getMilliecondsFromBPM(BPM) * 2,
			getMilliecondsFromBPM(BPM) * 4
		];

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
	//var numNotes = 7;

	const instrumentEnums =
	{
		SineWave: -3,
		TriangleWave: -2,
		SquareWave: -1,
		Flute: 0,
		Oboe: 1,
		Clarinet: 2,
		Bassoon: 3,
		Trumpet: 4,
		FrenchHorn: 5,
		Trombone: 6,
		Tuba: 7
	}

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

	// Array used to house all of the overtone information for each instrument, used by getOvertoneFrequencies()
	var instrList;

	// Variables that will likely be removed
	var channelCounter = 0; // I forgor 💀
	var firstTickSkipped = 0; // Kinda useless will prob remove

	var FP1Ready = 1,
		FP2Ready = 1,
		C3Ready = 1,
		C4Ready = 1,
		TempoCounterReady = 1;

	var FP1NoteLengthMS = timeForEachNoteARRAY[getIntFromNoteTypeString(FP1NoteType)],
		FP2NoteLengthMS = timeForEachNoteARRAY[getIntFromNoteTypeString(FP2NoteType)],
		C3NoteLengthMS = timeForEachNoteARRAY[getIntFromNoteTypeString(C3NoteType)],
		C4NoteLengthMS = timeForEachNoteARRAY[getIntFromNoteTypeString(C4NoteType)];

	// ------------------------------------------------------------------------------ USER-DEFINED VARIABLES ------------------------------------------------------------------------------


	// Feel free to change all of these! That's their purpose!

	var quickNoteType = "quarter"; // sixteenth, eighth, quarter, half, or whole. Don't forget the ""! Currently not used but available if-need be.

	// The instrument that each channel will be "playing" SineWave as a default unless changed from GUI
	var FP1Instrument = instrumentArr[0],
		FP2Instrument = instrumentArr[1],
		C3Instrument = instrumentArr[2],
		C4Instrument = instrumentArr[3];

	//Default volume value
	const DEFAULT_VOLUME = 0.1;

	//These values will determine all instrument volume which is changed in GUI
	var FP1VolChange = 0, FP2VolChange = 0, C3VolChange = 0, C4VolChange = 0

	var FP1Volume = DEFAULT_VOLUME - FP1VolChange,
		FP2Volume = DEFAULT_VOLUME -  FP2VolChange,
		C3Volume = DEFAULT_VOLUME - C3VolChange,
		C4Volume = DEFAULT_VOLUME - C4VolChange;

	var keySignature = KEY_SIGNATURES[scale][keyNum];

	var UUIDArray = new Array();
		
	// ------------------------------------------------------------------------------ CUSTOM HELPER FUNCTIONS ------------------------------------------------------------------------------


	function playMidiFile(uri)
	{
		// Initialize player and register event handler
		var Player = new MidiPlayer.Player(function(event) {});

		// Load a MIDI file and start combing through it
		//Player.loadDataUri(uri); this is the good one that you should use (:
		//Player.loadDataUri(btoa("file://C:\Users\Noah\Documents\GitHub\BrainBeatsWeb\frontend\src\Components\Record/UseThisToTestMIDI.mid"));
		console.log("URI passed in: " + uri);
		Player.loadDataUri("data:audio/midi;base64,TVRoZAAAAAYAAQAEAIBNVHJrAAAAfwD/UQMHoSAA/1gEBAIYCIIAkAAAAIAAAIIAkAAAAIAAAACQQECCAIBAQIIAkAAAAIAAAIIAkAAAAIAAAACQRECCAIBEQIIAkAAAAIAAAIIAkAAAAIAAAIIAkAAAAIAAAACQRUCCAIBFQACQQkCCAIBCQIIAkAAAAIAAAAD/LwBNVHJrAAAA4gD/UQMHoSAA/1gEBAIYCACQQECBAIBAQACQRUCBAIBFQACQQkCBAIBCQIEAkAAAAIAAAIEAkAAAAIAAAACQSUCBAIBJQACQR0CBAIBHQACQQkCBAIBCQACQRUCBAIBFQIEAkAAAAIAAAIEAkAAAAIAAAACQP0CBAIA/QACQRECBAIBEQACQRECBAIBEQACQR0CBAIBHQIEAkAAAAIAAAACQR0CBAIBHQIEAkAAAAIAAAIEAkAAAAIAAAACQR0CBAIBHQIEAkAAAAIAAAIEAkAAAAIAAAACQRUCBAIBFQAD/LwBNVHJrAAABawD/UQMHoSAA/1gEBAIYCECQAAAAgAAAAJBRQECAUUAAkE5AQIBOQACQR0BAgEdAQJAAAACAAABAkAAAAIAAAACQQkBAgEJAAJBFQECARUAAkFFAQIBRQACQP0BAgD9AAJBFQECARUAAkERAQIBEQACQREBAgERAQJAAAACAAABAkAAAAIAAAACQRUBAgEVAQJAAAACAAABAkAAAAIAAAACQRUBAgEVAQJAAAACAAAAAkERAQIBEQACQTkBAgE5AAJBOQECATkAAkEVAQIBFQACQQEBAgEBAQJAAAACAAABAkAAAAIAAAACQREBAgERAQJAAAACAAABAkAAAAIAAAECQAAAAgAAAQJAAAACAAABAkAAAAIAAAECQAAAAgAAAQJAAAACAAABAkAAAAIAAAECQAAAAgAAAQJAAAACAAABAkAAAAIAAAACQQEBAgEBAAJBFQECARUBAkAAAAIAAAECQAAAAgAAAAP8vAE1UcmsAAAJ7AP9RAwehIAD/WAQEAhgIAJBAQCCAQEAAkE5AIIBOQACQTkAggE5AAJBOQCCATkAAkFhAIIBYQACQRUAggEVAAJA9QCCAPUAgkAAAAIAAAACQR0AggEdAAJBHQCCAR0AAkEdAIIBHQACQR0AggEdAAJBHQCCAR0AAkEdAIIBHQCCQAAAAgAAAAJBHQCCAR0AAkD1AIIA9QACQR0AggEdAAJA9QCCAPUAAkEdAIIBHQACQQEAggEBAIJAAAACAAAAAkEJAIIBCQACQQkAggEJAAJBCQCCAQkAAkEJAIIBCQACQREAggERAAJBEQCCAREAAkERAIIBEQCCQAAAAgAAAAJBEQCCAREAgkAAAAIAAAACQREAggERAAJBEQCCAREAAkERAIIBEQACQUEAggFBAAJBQQCCAUEAAkFBAIIBQQACQUEAggFBAAJBQQCCAUEAAkFBAIIBQQCCQAAAAgAAAAJBHQCCAR0AgkAAAAIAAAACQR0AggEdAIJAAAACAAAAAkEdAIIBHQCCQAAAAgAAAIJAAAACAAAAgkAAAAIAAACCQAAAAgAAAIJAAAACAAAAAkEdAIIBHQACQR0AggEdAIJAAAACAAAAAkEdAIIBHQACQR0AggEdAIJAAAACAAAAAkEdAIIBHQCCQAAAAgAAAIJAAAACAAAAgkAAAAIAAACCQAAAAgAAAIJAAAACAAAAgkAAAAIAAACCQAAAAgAAAIJAAAACAAAAAkEBAIIBAQACQQEAggEBAAJBCQCCAQkAgkAAAAIAAAACQQkAggEJAAJBAQCCAQEAAkEJAIIBCQCCQAAAAgAAAIJAAAACAAAAgkAAAAIAAAAD/LwA=");
		Player.play();

		var eventCount = 0;

		// We will be getting all of these from the database on a per-post basis, but for now setting them here.
		var track1Inst = FP1Instrument, 
			track2Inst = FP2Instrument, 
			track3Inst = C3Instrument, 
			track4Inst = C4Instrument;
		var track1NoteType = FP1NoteType,
			track2NoteType = FP2NoteType,
			track3NoteType = C3NoteType,
			track4NoteType = C4NoteType;

		// Event listener for midiEvents
		Player.on('midiEvent', function(event) {
			if (event.noteNumber != 0 && event.noteNumber != undefined)// && eventCount % 2 == 0) // As long as the midiEvent is a valid NOTE (other events not supported) and not undefined
			{
				//console.log(event);
				console.log("" + eventCount + ": " + event.noteNumber + ", AKA " + event.noteName);

				var midiNoteFrequency = getFrequencyFromNoteOctaveString(event.noteName);

				if (event.track == 1) //FP1
					playMidiNote(midiNoteFrequency, DEFAULT_VOLUME, track1Inst, track1NoteType);
				else if (event.track == 2) // FP2
					playMidiNote(midiNoteFrequency, DEFAULT_VOLUME, track2Inst, track2NoteType);
				else if (event.track == 3) // FP3
					playMidiNote(midiNoteFrequency, DEFAULT_VOLUME, track3Inst, track3NoteType);
				else if (event.track == 4) // FP4
					playMidiNote(midiNoteFrequency, DEFAULT_VOLUME, track4Inst, track4NoteType);
			}
			eventCount++;
		});
	}


	function getNoteLengthStringFromInt(input)
	{
		if (input == 0) return "whole";
		else if (input == 1) return "half";
		else if (input == 2) return "quarter";
		else if (input == 3) return "eighth";
		else if (input == 4) return "sixteenth";
	}

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
		//downloadURI(writeURI, "BrainBeatsMasterpiece");
		playMidiFile(writeURI);
		//console.log(write.dataUri());
	}

	function downloadData() 
	{
		// //   console.log(JSON.stringify(allData));
		var workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils.json_to_sheet(allData);
		XLSX.utils.sheet_add_aoa(worksheet, [["channel", "signal"]]);
		XLSX.utils.book_append_sheet(workbook, worksheet, "SheetJS");
		XLSX.writeFile(workbook, "sheetjs.csv", { compression: true });

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
	}

	function getInstrumentNameFromInt(input) {
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

	function getIntFromNoteTypeString(input) {
		if (input.localeCompare("sixteenth") == 0) return 0;
		else if (input.localeCompare("eighth") == 0) return 1;
		else if (input.localeCompare("quarter") == 0) return 2;
		else if (input.localeCompare("half") == 0) return 3;
		else if (input.localeCompare("whole") == 0) return 4;
	}

	function getIntFromNoteTypeStringWithMidiWriterJsValues(input)
	{
		if (input.localeCompare("sixteenth") == 0) return 16;
		else if (input.localeCompare("eighth") == 0) return 8;
		else if (input.localeCompare("quarter") == 0) return 4;
		else if (input.localeCompare("half") == 0) return 2;
		else if (input.localeCompare("whole") == 0) return 1;
	}

	// This if/else stack returns a note length multiplier based off input. Quarter notes are used as the baseline (x1.0 multiplier).
	// Input should just be a lowercase string of the note type. Ex: "quarter", "half"
	function getNoteLengthMultiplier(noteType) {
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
	function getMilliecondsFromBPM(bpm) {
		return 60000 / bpm;
	}

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

	function getNoteType(noteType) {
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

	function findNumSamples(ms) {
		// Sample rate is number of samples every second
		// numSamples is the number of total samples played
		// ms is how many milliseconds we want something to play for
		let relationToSecond = 1000 / ms;
		let numSamples = SAMPLE_RATE / relationToSecond;
		return numSamples;
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


	// ------------------------------------------------------------------------------ FUNCTIONS STOLEN FROM MICROTONALITY.NET ------------------------------------------------------------------------------


	// Places all instrument frequency/overtone data into one massive array.
	function setupInstrumentList() {
		instrList = [];
		instrList.push(flute);
		instrList.push(oboe);
		instrList.push(clarinet);
		instrList.push(bassoon);
		instrList.push(trumpet);
		instrList.push(frenchhorn);
		instrList.push(trombone);
		instrList.push(tuba);
	}

	/*  Essentially, all of the AudioContexts (which actually allow for audio playback in the browser) get placed into this queue.
		Whenever any single note is played, a new AudioContext is generated to avoid any collisions with other sounds, since we will
		be having multiple instruments playing simultaneously and having them in one or few AudioContexts could cause issues.
		Chrome has a limit of 50 AudioContexts that can exist at once, so this program is set so when the queue reaches a size of 45, 
		the oldest AudioContext gets closed and disconnected (essentially stopping all of its operations to avoid memory leaks) and 
		then is removed from the queue, moving the next oldest AudioContext to the front of the line to be killed off next.
		This theoretically should mean that we are never going over Chrome's limit, so our audio should never cut off even if the
		program is running for a large amount of time, while also ensuring that AudioContexts will exist for as long as possible so
		that we can minimize the chance of cutting off notes that are still playing.
		queueOfAudio and killOldestAudioContextIfNecessary() were NOT taken from Microtonality.net and is a custom way of handling the 
		removal of old AudioContexts. It is in the Microtonality.net section of this file for ease-of-reading and because the 
		Microtonality.net functions had to be tweaked to work with this new queue system. 								              */
	var queueOfAudio = new Array();

	function killOldestAudioContextIfNecessary() {
		// If the number of existing AudioContexts in the queue is >= 45, kill off the oldest AudioContext completely and shift the queue accordingly.
		if (numContexts >= 45) {
			queueOfAudio[0].ctx.close();
			queueOfAudio[0].node.disconnect();
			queueOfAudio.shift();
			numContexts--; // Decrement the numContexts variable because we removed one from the queue
		}
	}

	// Total number of AudioContexts that have been generated by the program. Each AudioContext is used for one note and only one note.
	var numContexts = 0;

	// The function that plays audio!
	function playMidiNote(frequency, amplitude, soundType, noteLength) {
		//var ks = { freq: frequency, playing: false, ctx: 0, buffer: 0, node: 0, gain: 0, needToClose: false, number: numContexts };
		killOldestAudioContextIfNecessary();

		queueOfAudio.push({ freq: frequency, playing: false, ctx: 0, buffer: 0, node: 0, gain: 0, needToClose: false, number: numContexts });

		//console.log("Number of current contexts: " + numContexts + ", array: " + queueOfAudio);

		if (queueOfAudio[numContexts].playing)
			return false;

		queueOfAudio[numContexts].playing = true;
		queueOfAudio[numContexts].needToClose = false;

		queueOfAudio[numContexts].ctx = new AudioContext();
		queueOfAudio[numContexts].buffer = getNoteData(soundType, queueOfAudio[numContexts].freq, amplitude, queueOfAudio[numContexts].ctx, noteLength);
		queueOfAudio[numContexts].node = queueOfAudio[numContexts].ctx.createBufferSource();
		queueOfAudio[numContexts].node.buffer = queueOfAudio[numContexts].buffer;

		// We need this gain object so that at the end of the note play we can taper the sound.
		queueOfAudio[numContexts].gain = queueOfAudio[numContexts].ctx.createGain();
		queueOfAudio[numContexts].node.connect(queueOfAudio[numContexts].gain);
		queueOfAudio[numContexts].gain.connect(queueOfAudio[numContexts].ctx.destination);
		queueOfAudio[numContexts].gain.gain.value = amplitude;

		// Set to loop, although there is sill a perceptable break at the end.
		queueOfAudio[numContexts].node.loop = false;

		// Start the note.
		// This needs to be edited; the third argument of the function will only ever make quarter notes.
		queueOfAudio[numContexts].node.start(0, 0, getMilliecondsFromBPM(BPM) / 1000);

		// Increment the numContexts variable to reflect the new AudioContext added to the queue.
		numContexts++;

		return true;
	}

	function getNoteData(soundType, freq, amplitude, ctx, noteLength) {
		var buffer; // Local buffer variable.

		// For each supported sound type we call the correct function.
		if (soundType == instrumentEnums.SineWave)
			buffer = sineWave(findNumSamples(timeForEachNoteARRAY[getNoteType(noteLength)]), freq, amplitude, ctx);
		else if (soundType == instrumentEnums.TriangleWave)
			buffer = triangleWave(findNumSamples(timeForEachNoteARRAY[getNoteType(noteLength)]), freq, amplitude, ctx);
		else if (soundType == instrumentEnums.SquareWave)
			buffer = squareWave(findNumSamples(timeForEachNoteARRAY[getNoteType(noteLength)]), freq, amplitude, ctx);
		else
			buffer = instrumentWave(findNumSamples(timeForEachNoteARRAY[getNoteType(noteLength)]), freq, ctx, soundType);

		return buffer;
	}

	// This function used to be called "getAmplitude", which I believe to be incorrect; it does math to determine overtone FREQUENCIES, not amplitudes.
	function getOvertoneFrequencies(instrumentIndex, frequency) {
		// Get the list of note amplitude values for this instrument.
		let list = instrList[instrumentIndex];

		// We will start with a default value.
		let index = 0;
		let diff = Math.abs(frequency - list[0][0]);

		// Loop through the list of frequencies/amplitudes and find the closest match.
		for (let i = 1; i < list.length; i++) {
			// Get the difference between incoming frequency value and the frequeny of this list element.
			let td = Math.abs(frequency - list[i][0]);

			// If this is less (we are closer to the specified frequency) then we record the index and remember the new difference.
			if (td < diff) {
				diff = td;
				index = i;
			}
		}

		// Here we take the current array and make a new array to return.
		let retList = [];
		for (let i = 1; i < list[index].length; i++) {
			retList.push(i); // Push the harmonic number.
			retList.push(list[index][i]); // Push the amplitude.
		}

		return retList;
	}


	// ------------------------------------------------------------------------------ INSTRUMENT DATA STOLEN FROM MICROTONALITY.NET ------------------------------------------------------------------------------


	// We are using a standard sample rate of 44100hz. Would not recommend changing this. I don't know what would happen, but you still probably shouldn't.
	var sampleRate = 44100;

	// Sine wave
	function sineWave(numSamples, frequency, amplitude, ctx) {
		// Precalculate 2PI
		let PI_2 = Math.PI * 2;

		// Create the buffer for the node.
		let buffer = ctx.createBuffer(1, numSamples, SAMPLE_RATE);

		// Create the buffer into which the audio data will be placed.
		let buf = buffer.getChannelData(0);

		// Loop numSamples times -- that's how many samples we will calculate and store.
		for (let i = 0; i < numSamples; i++) {
			// Calculate and store the value for this sample.
			buf[i] = Math.sin(frequency * PI_2 * i / SAMPLE_RATE) * amplitude;
		}

		// Return the channel buffer.
		return buffer;
	}

	// Triangle wave
	function triangleWave(numSamples, frequency, amplitude, ctx) {

		// Here we calculate the number of samples for each wave oscillation.
		var samplesPerOscillation = sampleRate / frequency;
		// This is the first quarter of the oscillation. 0 - 1/4
		var first = samplesPerOscillation / 4;
		// This is the second quarter of the oscillation. 1/4 - 1/2
		var second = samplesPerOscillation / 2;
		// This is the third quarter of the oscillation. 1/2 - 3/4
		var third = (samplesPerOscillation / 2) + (samplesPerOscillation / 4);
		// We will count the samples as we go.
		var counter = 0;

		// Step value. This is how much the sample value changes per sample.
		var step = 1 / first;

		// Create the buffer for the node.
		var buffer = ctx.createBuffer(1, numSamples, sampleRate);

		// Create the buffer into which the audio data will be placed.
		var buf = buffer.getChannelData(0);

		// Loop numSamples times -- that's how many samples we will calculate and store.
		for (var i = 0; i < numSamples; i++) {
			// Increment the counter.
			counter++;

			// See if this is the first quarter.
			if (counter <= first) {
				// Store the value.
				buf[i] = step * counter * amplitude;
			}
			// See if this is the second quarter.
			else if (counter <= second) {
				// We want the count relative to this quarter.
				var cnt = counter - first;

				// Store the value.
				buf[i] = 1 - step * cnt * amplitude;
			}
			// See if this is the third quarter.
			else if (counter <= third) {
				// We want the count relative to this quarter.
				var cnt = counter - second;

				// Store the value.
				buf[i] = -(step * cnt) * amplitude;
			}
			// This is the fourth quarter.
			else {
				// We want the count relative to this quarter.
				var cnt = counter - third;

				// Store the value.
				buf[i] = -1 + (step * cnt) * amplitude;

				// See if we are done with this cycle.
				if (counter >= samplesPerOscillation) {
					// Set to zero so we are ready for another cycle.
					counter = 0;
				}
			}
		}
		return buffer;
	}

	// Square wave
	function squareWave(numSamples, frequency, amplitude, ctx) {

		// Here we calculate the number of samples for each wave oscillation.
		var samplesPerOscillation = sampleRate / frequency;
		// Create the value for the first oscillation change.
		var first = samplesPerOscillation / 2;
		// We will count the samples as we go.
		var counter = 0;

		// Create the buffer for the node.
		var buffer = ctx.createBuffer(1, numSamples, sampleRate);

		// Create the buffer into which the audio data will be placed.
		var buf = buffer.getChannelData(0);

		// Loop numSamples times -- that's how many samples we will calculate and store.
		for (var i = 0; i < numSamples; i++) {
			// Increment the counter.
			counter++;

			// This is the first half of the oscillation. it should be 1.
			if (counter <= first) {
				// Store the value.
				buf[i] = 1 * amplitude;
			}
			// This is the second half of the oscillation. It should be -1.
			else {
				// Store the value.
				buf[i] = -1 * amplitude;

				// See if we are done with this cycle.
				if (counter >= samplesPerOscillation) {
					// Set to zero so we are ready for another cycle.
					counter = 0;
				}
			}
		}

		// Return the channel buffer.
		return buffer;
	}

	// "Real" instrument additive synthesis
	function instrumentWave(numSamples, frequency, ctx, soundType) {
		setupInstrumentList();

		// Get the instrument specs.
		let inst = getOvertoneFrequencies(soundType, frequency);

		// Precalculate 2PI
		let PI_2 = Math.PI * 2;

		// Create the buffer for the node.
		let buffer = ctx.createBuffer(1, numSamples, sampleRate);

		// Create the buffer into which the audio data will be placed.
		var buf = buffer.getChannelData(0);

		// Zero the buffer
		for (var i = 0; i < numSamples; i++) {
			buf[i] = 0;
		}

		// Loop through the instrument spec.
		for (var j = 0; j < inst.length / 2; j++) {
			// Get the frequency multiplier from the data array.
			var f = frequency * inst[j * 2];
			//console.log("f: ", f, ", which is ", frequency, " times ", inst[j*2])
			// Get the amplitude value from the data array.
			var a = inst[j * 2 + 1];
			//console.log("a: ", a)
			// Loop numSamples times -- that's how many samples we will calculate and store.
			for (var i = 0; i < numSamples; i++) {
				// Calculate and store the value for this sample.
				buf[i] += (Math.sin(f * PI_2 * i / sampleRate) * a);
				//buf[i] = frequency;
			}
		}

		// Return the channel buffer.
		return buffer;
	}

	// Flute note fundamentals and overtones.
	{
		var flute_note0 = [261.626, 0.09836, 0.2957, 0.141921, 0.079014, 0.112871, 0.042798, 0.029077]; // C4
		var flute_note1 = [277.183, 0.123199, 0.3478, 0.124674, 0.084353, 0.124837, 0.017114, 0.024019];
		var flute_note2 = [293.665, 0.297172, 0.527, 0.100852, 0.094155, 0.165888, 0.003781, 0.026072]; // D4
		var flute_note3 = [311.127, 0.336687, 0.4666, 0.093167, 0.100954, 0.071699, 0.020557, 0.000982];
		var flute_note4 = [329.628, 0.328012, 0.4388, 0.120404, 0.097806, 0.034633, 0.016802, 0.042169]; // E4
		var flute_note5 = [349.228, 0.4816, 0.390284, 0.058158, 0.07121, 0.112124, 0.019824, 0.009095]; // F4
		var flute_note6 = [369.994, 0.4336, 0.422374, 0.057852, 0.09351, 0.031003, 0.013091, 0.012687];
		var flute_note7 = [391.995, 0.493, 0.371905, 0.077719, 0.096972, 0.056363, 0.037599, 0.006175]; // G4
		var flute_note8 = [415.305, 0.4028, 0.19137, 0.025905, 0.073643, 0.037007, 0.008101, 0.005864];
		var flute_note9 = [440.0, 0.4561, 0.329516, 0.063736, 0.076284, 0.048285, 0.011366, 0.00419]; // A4
		var flute_note10 = [466.164, 0.6413, 0.409845, 0.067333, 0.150845, 0.015125, 0.013758, 0.004766];
		var flute_note11 = [493.883, 0.5168, 0.438569, 0.112091, 0.073142, 0.033681, 0.009907, 0.009438]; // B4
		var flute_note12 = [523.251, 0.6412, 0.298417, 0.071738, 0.085273, 0.01514, 0.005641, 0.001228]; // C5
		var flute_note13 = [554.365, 0.3925, 0.124536, 0.023912, 0.028485, 0.003317, 0.003669, 0.001313];
		var flute_note14 = [587.33, 0.5363, 0.088258, 0.06421, 0.022653, 0.0074, 0.000768, 0.002045]; // D5
		var flute_note15 = [622.254, 0.4994, 0.061422, 0.054182, 0.013458, 0.001886, 0.00443, 0.001306];
		var flute_note16 = [659.255, 0.3797, 0.027199, 0.020356, 0.001928, 0.00498, 0.000903, 0.000985]; // E5
		var flute_note17 = [698.456, 0.4476, 0.142438, 0.041871, 0.005943, 0.005049, 0.001598, 0.001339]; // F5
		var flute_note18 = [739.989, 0.4475, 0.030498, 0.030923, 0.004463, 0.005552, 0.001201, 0.001953];
		var flute_note19 = [783.991, 0.4304, 0.032998, 0.041964, 0.003068, 0.003373, 0.00028, 0.001584]; // G5
		var flute_note20 = [830.609, 0.3628, 0.089364, 0.055979, 0.01, 0.006294, 0.002049, 0.000503];
		var flute_note21 = [880.0, 0.528, 0.079354, 0.075279, 0.012683, 0.00677, 0.00254, 0.001825]; // A5
		var flute_note22 = [932.328, 0.4055, 0.064476, 0.023129, 0.004745, 0.001844, 0.000534, 0.00108];
		var flute_note23 = [987.767, 0.4758, 0.059464, 0.029749, 0.002494, 0.002976, 0.001045, 0.000844]; // B5
		var flute_note24 = [1046.5, 0.4291, 0.010303, 0.014455, 0.000404, 0.001976, 0.000166, 0.001859]; // C6
		var flute_note25 = [1108.73, 0.361, 0.040442, 0.021483, 0.003831, 0.001047, 0.001331, 0.001802];
		var flute_note26 = [1174.66, 0.2784, 0.049778, 0.007211, 0.004811, 0.001368, 0.002148, 0.001742]; // D6
		var flute_note27 = [1244.51, 0.2853, 0.036994, 0.012853, 0.004586, 0.00182, 0.002402, 0.001267];
		var flute_note28 = [1318.51, 0.4725, 0.032759, 0.010499, 0.004112, 0.000885, 0.001912, 0.0014]; // E6
		var flute_note29 = [1396.91, 0.4792, 0.010716, 0.009122, 0.003258, 0.000621, 0.002476, 0.00107]; // F6
		var flute_note30 = [1479.98, 0.5119, 0.021649, 0.012138, 0.000752, 0.002789, 0.002708]; // F#6
		var flute_note31 = [1661.22, 0.335, 0.025003, 0.029256, 0.001098, 0.001562]; // G#6
		var flute_note32 = [1864.66, 0.5847, 0.058631, 0.013492, 0.01061, 0.002866]; // A#6
		var flute_note33 = [2093.0, 0.5076, 0.01555, 0.021508, 0.003327]; // C7
		// Aggregate flute notes
		var flute = [flute_note0, flute_note1, flute_note2, flute_note3, flute_note4, flute_note5, flute_note6, flute_note7, flute_note8, flute_note9, flute_note10, flute_note11, flute_note12, flute_note13, flute_note14, flute_note15, flute_note16, flute_note17, flute_note18, flute_note19, flute_note20, flute_note21, flute_note22, flute_note23, flute_note24, flute_note25, flute_note26, flute_note27, flute_note28, flute_note29, flute_note30, flute_note31, flute_note32, flute_note33];
	}

	// Oboe note fundamentals and overtones.
	{
		var oboe_note0 = [233.082, 0.121894, 0.157061, 0.322307, 0.230436, 0.6367, 0.253799, 0.102276];
		var oboe_note1 = [246.942, 0.250743, 0.093645, 0.424012, 0.34939, 0.5719, 0.33155, 0.064913];
		var oboe_note2 = [261.626, 0.293155, 0.07497, 0.267948, 0.493602, 0.5374, 0.251078, 0.030769];
		var oboe_note3 = [277.183, 0.398036, 0.4385, 0.296787, 0.313584, 0.230818, 0.394359, 0.130869];
		var oboe_note4 = [293.665, 0.337884, 0.430786, 0.295456, 0.576, 0.161145, 0.074555, 0.009817];
		var oboe_note5 = [311.127, 0.392836, 0.473738, 0.42896, 0.6238, 0.084721, 0.013205, 0.023132];
		var oboe_note6 = [329.628, 0.227817, 0.387509, 0.271873, 0.5119, 0.139912, 0.010617, 0.01078];
		var oboe_note7 = [349.228, 0.357429, 0.370481, 0.3962, 0.222564, 0.194471, 0.028079, 0.046776];
		var oboe_note8 = [369.994, 0.394972, 0.529332, 0.5453, 0.458079, 0.118812, 0.061648, 0.055884];
		var oboe_note9 = [391.995, 0.219151, 0.355905, 0.5398, 0.251054, 0.094243, 0.026608, 0.126331];
		var oboe_note10 = [415.305, 0.232972, 0.412497, 0.7402, 0.624438, 0.102237, 0.155949, 0.03399];
		var oboe_note11 = [440.0, 0.168313, 0.6185, 0.309537, 0.312472, 0.057201, 0.120559, 0.041097];
		var oboe_note12 = [466.164, 0.259248, 0.5014, 0.140531, 0.094993, 0.04323, 0.029684, 0.117037];
		var oboe_note13 = [493.883, 0.219901, 0.4877, 0.04343, 0.042246, 0.026748, 0.118737, 0.041079];
		var oboe_note14 = [523.251, 0.131694, 0.338, 0.057876, 0.153972, 0.026451, 0.157959, 0.008845];
		var oboe_note15 = [554.365, 0.713705, 0.8782, 0.149538, 0.07942, 0.204528, 0.107351, 0.026814];
		var oboe_note16 = [587.33, 0.486688, 0.7155, 0.055663, 0.037373, 0.15803, 0.059575, 0.008161];
		var oboe_note17 = [622.254, 0.317256, 0.7475, 0.031771, 0.031709, 0.06517, 0.015119, 0.005219];
		var oboe_note18 = [659.255, 0.538546, 1.0359, 0.049039, 0.074309, 0.030557, 0.015279, 0.015507];
		var oboe_note19 = [698.456, 0.228538, 0.4927, 0.019925, 0.031511, 0.028347, 0.003564, 0.003832];
		var oboe_note20 = [739.989, 0.3471, 0.255547, 0.053434, 0.074465, 0.027641, 0.002627, 0.004785];
		var oboe_note21 = [783.991, 0.3662, 0.209717, 0.053021, 0.091073, 0.068262, 0.000158, 0.005737];
		var oboe_note22 = [830.609, 0.548645, 0.5776, 0.116252, 0.014278, 0.073954, 0.016927, 0.004163];
		var oboe_note23 = [880.0, 0.6111, 0.542372, 0.059402, 0.056281, 0.03235, 0.006479, 0.006157];
		var oboe_note24 = [932.328, 0.5332, 0.04601, 0.120229, 0.029785, 0.027661, 0.013292, 0.001712];
		var oboe_note25 = [987.767, 0.5621, 0.14118, 0.087722, 0.026982, 0.02586, 0.003819, 0.001111];
		var oboe_note26 = [1046.5, 0.366, 0.108706, 0.178836, 0.092607, 0.024902, 0.004485, 0.005015];
		var oboe_note27 = [1108.73, 0.6046, 0.105848, 0.076903, 0.041664, 0.012282, 0.007243, 0.000977];
		var oboe_note28 = [1174.66, 0.4385, 0.225613, 0.244633, 0.072504, 0.011557, 0.005236, 0.000385];
		var oboe_note29 = [1244.51, 0.6906, 0.086851, 0.130902, 0.025671, 0.011667, 0.002987, 0.000906];
		var oboe_note30 = [1318.51, 0.5099, 0.024779, 0.058943, 0.009327, 0.001396, 0.000789, 0.000271];
		var oboe_note31 = [1396.91, 0.104315, 0.155804, 0.2411, 0.019508, 0.007335, 0.002093, 0.007343];
		// Aggregate oboe notes
		var oboe = [oboe_note0, oboe_note1, oboe_note2, oboe_note3, oboe_note4, oboe_note5, oboe_note6, oboe_note7, oboe_note8, oboe_note9, oboe_note10, oboe_note11, oboe_note12, oboe_note13, oboe_note14, oboe_note15, oboe_note16, oboe_note17, oboe_note18, oboe_note19, oboe_note20, oboe_note21, oboe_note22, oboe_note23, oboe_note24, oboe_note25, oboe_note26, oboe_note27, oboe_note28, oboe_note29, oboe_note30, oboe_note31];
	}

	// Clarinet note fundamentals and overtones.
	{
		var clarinet_note0 = [146.832, 0.2129, 0.014125, 0.150138, 0.049777, 0.157843, 0.082485, 0.05724];
		var clarinet_note1 = [155.563, 0.1755, 0.002133, 0.068598, 0.005293, 0.03699, 0.00482, 0.071386];
		var clarinet_note2 = [164.814, 0.1552, 0.002517, 0.055205, 0.005538, 0.04341, 0.006187, 0.08317];
		var clarinet_note3 = [174.614, 0.2116, 0.001335, 0.0776, 0.004567, 0.046767, 0.000728, 0.114076];
		var clarinet_note4 = [184.997, 0.2561, 0.003341, 0.070607, 0.00579, 0.058818, 0.008173, 0.064902];
		var clarinet_note5 = [195.998, 0.2083, 0.00202, 0.070977, 0.005112, 0.028009, 0.038244, 0.045459];
		var clarinet_note6 = [207.652, 0.2315, 0.00237, 0.131796, 0.008788, 0.068452, 0.025173, 0.081833];
		var clarinet_note7 = [220.0, 0.2732, 0.002118, 0.141678, 0.010378, 0.098658, 0.024077, 0.092756];
		var clarinet_note8 = [233.082, 0.2972, 0.003844, 0.137116, 0.006973, 0.088797, 0.01888, 0.068911];
		var clarinet_note9 = [246.942, 0.2392, 0.004502, 0.086254, 0.010485, 0.068711, 0.027039, 0.068575];
		var clarinet_note10 = [261.626, 0.3388, 0.006888, 0.181885, 0.015377, 0.132275, 0.046889, 0.168094];
		var clarinet_note11 = [277.183, 0.2168, 0.005967, 0.125421, 0.010359, 0.112346, 0.066389, 0.042848];
		var clarinet_note12 = [293.665, 0.203, 0.010206, 0.166317, 0.025299, 0.2468, 0.121414, 0.062763];
		var clarinet_note13 = [311.127, 0.126006, 0.00725, 0.076225, 0.027277, 0.1477, 0.023859, 0.044313];
		var clarinet_note14 = [329.628, 0.125359, 0.006012, 0.115411, 0.040322, 0.1791, 0.006414, 0.052662];
		var clarinet_note15 = [349.228, 0.062415, 0.006421, 0.126248, 0.05254, 0.1906, 0.030427, 0.048937];
		var clarinet_note16 = [369.994, 0.018232, 0.006374, 0.1544, 0.029443, 0.098179, 0.029882, 0.03332];
		var clarinet_note17 = [391.995, 0.03929, 0.011438, 0.141606, 0.1691, 0.054087, 0.035287, 0.035712];
		var clarinet_note18 = [415.305, 0.103486, 0.005688, 0.1437, 0.11018, 0.063757, 0.015935, 0.02179];
		var clarinet_note19 = [440.0, 0.2717, 0.110933, 0.209048, 0.038102, 0.011748, 0.012249, 0.018426];
		var clarinet_note20 = [466.164, 0.177591, 0.023855, 0.3072, 0.067204, 0.050869, 0.077256, 0.06646];
		var clarinet_note21 = [493.883, 0.2486, 0.03224, 0.2584, 0.198137, 0.096872, 0.14062, 0.032484];
		var clarinet_note22 = [523.251, 0.1866, 0.013374, 0.027965, 0.005094, 0.014745, 0.025081, 0.008434];
		var clarinet_note23 = [554.365, 0.2954, 0.022776, 0.20401, 0.091651, 0.05569, 0.061624, 0.041887];
		var clarinet_note24 = [587.33, 0.3383, 0.113905, 0.126005, 0.017858, 0.042429, 0.02686, 0.01185];
		var clarinet_note25 = [622.254, 0.4733, 0.10986, 0.214229, 0.03361, 0.03363, 0.041188, 0.025945];
		var clarinet_note26 = [659.255, 0.4366, 0.07611, 0.229293, 0.112681, 0.1621, 0.052678, 0.007726];
		var clarinet_note27 = [698.456, 0.319, 0.108516, 0.042025, 0.016412, 0.043841, 0.007255, 0.011568];
		var clarinet_note28 = [739.989, 0.3435, 0.057235, 0.078584, 0.091217, 0.077085, 0.009656, 0.002281];
		var clarinet_note29 = [783.991, 0.3783, 0.127088, 0.099523, 0.185581, 0.044433, 0.003271, 0.005849];
		var clarinet_note30 = [830.609, 0.373, 0.199971, 0.057352, 0.069785, 0.0307, 0.001629, 0.003255];
		var clarinet_note31 = [880.0, 0.5497, 0.155623, 0.157681, 0.078936, 0.004521, 0.005606, 0.004521];
		var clarinet_note32 = [932.328, 0.27, 0.145033, 0.071001, 0.050847, 0.028854, 0.006627, 0.001661];
		var clarinet_note33 = [987.767, 0.109648, 0.4202, 0.025715, 0.029331, 0.023216, 0.007031, 0.002629];
		var clarinet_note34 = [1046.5, 0.237, 0.212428, 0.038083, 0.010385, 0.001649, 0.003055, 0.001518];
		var clarinet_note35 = [1108.73, 0.421, 0.230966, 0.079929, 0.041358, 0.010674, 0.009473, 0.002582];
		var clarinet_note36 = [1174.66, 0.2303, 0.152207, 0.089777, 0.033699, 0.004484, 0.005034, 0.002177];
		// Aggregate clarinet notes
		var clarinet = [clarinet_note0, clarinet_note1, clarinet_note2, clarinet_note3, clarinet_note4, clarinet_note5, clarinet_note6, clarinet_note7, clarinet_note8, clarinet_note9, clarinet_note10, clarinet_note11, clarinet_note12, clarinet_note13, clarinet_note14, clarinet_note15, clarinet_note16, clarinet_note17, clarinet_note18, clarinet_note19, clarinet_note20, clarinet_note21, clarinet_note22, clarinet_note23, clarinet_note24, clarinet_note25, clarinet_note26, clarinet_note27, clarinet_note28, clarinet_note29, clarinet_note30, clarinet_note31, clarinet_note32, clarinet_note33, clarinet_note34, clarinet_note35, clarinet_note36];
	}

	// Bassoon note fundamentals and overtones.
	{
		var bassoon_note0 = [58.27, 0.149602, 0.176013, 0.14631, 0.149406, 0.055489, 0.182866, 0.32672];
		var bassoon_note1 = [61.735, 0.128204, 0.117423, 0.171093, 0.290739, 0.236122, 0.129562, 0.224539];
		var bassoon_note2 = [65.406, 0.292631, 0.352563, 0.384011, 0.6585, 0.612866, 0.515535, 0.256983];
		var bassoon_note3 = [69.296, 0.229073, 0.229144, 0.291794, 0.362354, 0.547203, 0.188705, 0.436408];
		var bassoon_note4 = [73.416, 0.283164, 0.352145, 0.295856, 0.706446, 0.7702, 0.312896, 0.419418];
		var bassoon_note5 = [77.782, 0.361416, 0.336186, 0.48969, 0.880269, 0.9462, 0.50761, 0.47147];
		var bassoon_note6 = [82.407, 0.152877, 0.160521, 0.258092, 0.318951, 0.452897, 0.364397, 0.125818];
		var bassoon_note7 = [87.307, 0.236503, 0.247998, 0.430822, 0.6067, 0.554422, 0.449535, 0.272813];
		var bassoon_note8 = [92.499, 0.18536, 0.250537, 0.386224, 0.617287, 0.683806, 0.7592, 0.266038];
		var bassoon_note9 = [97.999, 0.144443, 0.161248, 0.292024, 0.163912, 0.7158, 0.300743, 0.021661];
		var bassoon_note10 = [103.826, 0.113875, 0.12353, 0.210005, 0.357222, 0.6398, 0.131684, 0.096994];
		var bassoon_note11 = [110.0, 0.079804, 0.062458, 0.207272, 0.6255, 0.179319, 0.126314, 0.004743];
		var bassoon_note12 = [116.541, 0.066808, 0.087966, 0.246383, 0.5407, 0.162995, 0.040969, 0.035138];
		var bassoon_note13 = [123.471, 0.121985, 0.150654, 0.333301, 0.409, 0.059818, 0.072303, 0.071593];
		var bassoon_note14 = [130.813, 0.115061, 0.198907, 0.3855, 0.30401, 0.127382, 0.021327, 0.087856];
		var bassoon_note15 = [138.591, 0.104819, 0.174565, 0.5558, 0.36978, 0.136805, 0.087694, 0.036314];
		var bassoon_note16 = [146.832, 0.093429, 0.206521, 0.4684, 0.194347, 0.113542, 0.057279, 0.023792];
		var bassoon_note17 = [155.563, 0.07331, 0.290503, 0.623, 0.209258, 0.065863, 0.021197, 0.009848];
		var bassoon_note18 = [164.814, 0.107802, 0.343424, 0.6903, 0.214019, 0.044839, 0.057106, 0.012034];
		var bassoon_note19 = [174.614, 0.148794, 0.609309, 0.6198, 0.189097, 0.107274, 0.129604, 0.089763];
		var bassoon_note20 = [184.997, 0.180422, 0.340945, 0.5965, 0.145967, 0.162399, 0.104162, 0.021434];
		var bassoon_note21 = [195.998, 0.163955, 0.4946, 0.265514, 0.071615, 0.007077, 0.005784, 0.039344];
		var bassoon_note22 = [207.652, 0.124268, 0.4006, 0.205602, 0.056188, 0.00829, 0.068055, 0.040478];
		var bassoon_note23 = [220.0, 0.054949, 0.5075, 0.099576, 0.024103, 0.063286, 0.01133, 0.006131];
		var bassoon_note24 = [233.082, 0.090377, 0.4503, 0.03034, 0.011199, 0.011075, 0.027168, 0.005215];
		var bassoon_note25 = [246.942, 0.211387, 0.5146, 0.069419, 0.113429, 0.055002, 0.00581, 0.009931];
		var bassoon_note26 = [261.626, 0.298781, 0.4409, 0.038163, 0.097836, 0.022452, 0.012899, 0.008452];
		var bassoon_note27 = [277.183, 0.225791, 0.4305, 0.072351, 0.014203, 0.026578, 0.004238, 0.000681];
		var bassoon_note28 = [293.665, 0.3941, 0.358666, 0.089843, 0.013077, 0.008634, 0.004302, 0.00084];
		var bassoon_note29 = [311.127, 0.2574, 0.115448, 0.030421, 0.131213, 0.012884, 0.011574, 0.002725];
		var bassoon_note30 = [329.628, 0.171474, 0.3762, 0.10398, 0.023293, 0.012482, 0.008744, 0.002153];
		var bassoon_note31 = [349.228, 0.174362, 0.4828, 0.057014, 0.038686, 0.021533, 0.009028, 0.001799];
		// Aggregate bassoon notes
		var bassoon = [bassoon_note0, bassoon_note1, bassoon_note2, bassoon_note3, bassoon_note4, bassoon_note5, bassoon_note6, bassoon_note7, bassoon_note8, bassoon_note9, bassoon_note10, bassoon_note11, bassoon_note12, bassoon_note13, bassoon_note14, bassoon_note15, bassoon_note16, bassoon_note17, bassoon_note18, bassoon_note19, bassoon_note20, bassoon_note21, bassoon_note22, bassoon_note23, bassoon_note24, bassoon_note25, bassoon_note26, bassoon_note27, bassoon_note28, bassoon_note29, bassoon_note30, bassoon_note31];
	}

	// Trumpet note fundamentals and overtones.
	{
		var trumpet_note0 = [184.997, 0.068589, 0.118634, 0.077804, 0.154649, 0.168596, 0.2918, 0.129903];
		var trumpet_note1 = [195.998, 0.123039, 0.232463, 0.096252, 0.243815, 0.257233, 0.3692, 0.197878];
		var trumpet_note2 = [207.652, 0.052935, 0.126329, 0.088833, 0.099116, 0.2028, 0.139773, 0.182974];
		var trumpet_note3 = [220.0, 0.053463, 0.188794, 0.199413, 0.097068, 0.2235, 0.098341, 0.190275];
		var trumpet_note4 = [233.082, 0.065607, 0.108196, 0.1871, 0.131494, 0.149717, 0.163613, 0.100959];
		var trumpet_note5 = [246.942, 0.029193, 0.11994, 0.204135, 0.206624, 0.193021, 0.2308, 0.108773];
		var trumpet_note6 = [261.626, 0.048751, 0.1062, 0.182174, 0.2553, 0.133599, 0.238039, 0.148282];
		var trumpet_note7 = [277.183, 0.080607, 0.10868, 0.131291, 0.2724, 0.266436, 0.096351, 0.132167];
		var trumpet_note8 = [293.665, 0.10987, 0.082186, 0.116106, 0.2892, 0.240718, 0.148908, 0.043222];
		var trumpet_note9 = [311.127, 0.08467, 0.115267, 0.193737, 0.243054, 0.3069, 0.181947, 0.165306];
		var trumpet_note10 = [329.628, 0.131817, 0.2726, 0.191804, 0.112441, 0.15067, 0.119049, 0.087226];
		var trumpet_note11 = [349.228, 0.1883, 0.2411, 0.226372, 0.190399, 0.104322, 0.06011, 0.043982];
		var trumpet_note12 = [369.994, 0.179734, 0.213567, 0.3538, 0.225806, 0.125295, 0.134608, 0.092135];
		var trumpet_note13 = [391.995, 0.209117, 0.232535, 0.3268, 0.222875, 0.112395, 0.0534, 0.034057];
		var trumpet_note14 = [415.305, 0.236862, 0.173782, 0.3127, 0.131475, 0.066489, 0.147709, 0.15247];
		var trumpet_note15 = [440.0, 0.2749, 0.163801, 0.155046, 0.272229, 0.176262, 0.13881, 0.089768];
		var trumpet_note16 = [466.164, 0.087797, 0.144417, 0.1959, 0.080025, 0.028259, 0.03072, 0.027441];
		var trumpet_note17 = [493.883, 0.105516, 0.184487, 0.2915, 0.14919, 0.095854, 0.08711, 0.025847];
		var trumpet_note18 = [523.251, 0.108656, 0.293706, 0.3071, 0.089967, 0.1211, 0.046926, 0.033097];
		var trumpet_note19 = [554.365, 0.134942, 0.4164, 0.149351, 0.231447, 0.095584, 0.101032, 0.041955];
		var trumpet_note20 = [587.33, 0.105629, 0.2735, 0.174742, 0.052096, 0.082251, 0.027062, 0.016848];
		var trumpet_note21 = [622.254, 0.16565, 0.3477, 0.26318, 0.179326, 0.096145, 0.067588, 0.029847];
		var trumpet_note22 = [659.255, 0.2875, 0.165455, 0.186357, 0.130955, 0.095682, 0.036924, 0.014059];
		var trumpet_note23 = [698.456, 0.253586, 0.3088, 0.081825, 0.037393, 0.021335, 0.011219, 0.007625];
		var trumpet_note24 = [739.989, 0.255705, 0.4007, 0.224642, 0.122481, 0.052879, 0.029193, 0.014791];
		var trumpet_note25 = [783.991, 0.248614, 0.3573, 0.130691, 0.065043, 0.034771, 0.024339, 0.013068];
		var trumpet_note26 = [830.609, 0.286792, 0.3269, 0.226631, 0.152723, 0.083307, 0.027845, 0.025291];
		var trumpet_note27 = [880.0, 0.2986, 0.210689, 0.131358, 0.064279, 0.035375, 0.01417, 0.010034];
		var trumpet_note28 = [932.328, 0.2873, 0.23371, 0.090601, 0.046358, 0.012765, 0.005539, 0.002877];
		var trumpet_note29 = [987.767, 0.2647, 0.170998, 0.127623, 0.048433, 0.012172, 0.009417, 0.006175];
		var trumpet_note30 = [1046.5, 0.2136, 0.036929, 0.026648, 0.006228, 0.002525, 0.00083, 0.000198];
		var trumpet_note31 = [1108.73, 0.436, 0.179937, 0.119931, 0.031338, 0.015881, 0.011157, 0.003402];
		var trumpet_note32 = [1174.66, 0.2386, 0.047372, 0.017666, 0.007222, 0.004002, 0.002169, 9.5E-05];
		var trumpet_note33 = [1244.51, 0.218, 0.050919, 0.012188, 0.002628, 0.001752, 0.000228, 0.000106];
		// Aggregate trumpet notes
		var trumpet = [trumpet_note0, trumpet_note1, trumpet_note2, trumpet_note3, trumpet_note4, trumpet_note5, trumpet_note6, trumpet_note7, trumpet_note8, trumpet_note9, trumpet_note10, trumpet_note11, trumpet_note12, trumpet_note13, trumpet_note14, trumpet_note15, trumpet_note16, trumpet_note17, trumpet_note18, trumpet_note19, trumpet_note20, trumpet_note21, trumpet_note22, trumpet_note23, trumpet_note24, trumpet_note25, trumpet_note26, trumpet_note27, trumpet_note28, trumpet_note29, trumpet_note30, trumpet_note31, trumpet_note32, trumpet_note33];
	}

	// French Horn note fundamentals and overtones.
	{
		var frenchhorn_note0 = [73.416, 0.070697, 0.147718, 0.264715, 0.428841, 0.674782, 0.715, 0.696342];
		var frenchhorn_note1 = [77.782, 0.069412, 0.149262, 0.25808, 0.451057, 0.585672, 0.8725, 0.743207];
		var frenchhorn_note2 = [82.407, 0.046964, 0.146021, 0.32925, 0.465799, 0.688433, 0.7002, 0.641073];
		var frenchhorn_note3 = [87.307, 0.042488, 0.101203, 0.229229, 0.278287, 0.363189, 0.3656, 0.338753];
		var frenchhorn_note4 = [92.499, 0.049267, 0.131884, 0.217373, 0.274427, 0.3882, 0.337218, 0.272529];
		var frenchhorn_note5 = [97.999, 0.048967, 0.129668, 0.258868, 0.347457, 0.4306, 0.386584, 0.346104];
		var frenchhorn_note6 = [103.826, 0.065454, 0.184149, 0.322088, 0.440248, 0.4515, 0.406082, 0.398258];
		var frenchhorn_note7 = [110.0, 0.073662, 0.210467, 0.345858, 0.419466, 0.4272, 0.351627, 0.316835];
		var frenchhorn_note8 = [116.541, 0.059575, 0.14087, 0.22797, 0.3673, 0.256667, 0.202993, 0.174751];
		var frenchhorn_note9 = [123.471, 0.095822, 0.281312, 0.349251, 0.4516, 0.375863, 0.334089, 0.249819];
		var frenchhorn_note10 = [130.813, 0.093713, 0.286296, 0.4116, 0.402869, 0.342706, 0.296469, 0.209316];
		var frenchhorn_note11 = [138.591, 0.104756, 0.28378, 0.4546, 0.388904, 0.29077, 0.232589, 0.19296];
		var frenchhorn_note12 = [146.832, 0.148434, 0.36734, 0.4374, 0.383287, 0.339229, 0.240438, 0.19001];
		var frenchhorn_note13 = [155.563, 0.06947, 0.144536, 0.2271, 0.131988, 0.081132, 0.057147, 0.037358];
		var frenchhorn_note14 = [164.814, 0.137058, 0.327352, 0.4205, 0.267881, 0.196262, 0.14366, 0.098898];
		var frenchhorn_note15 = [174.614, 0.154122, 0.370839, 0.4125, 0.277375, 0.171411, 0.116812, 0.067089];
		var frenchhorn_note16 = [184.997, 0.176175, 0.3614, 0.290363, 0.171227, 0.096005, 0.061268, 0.032365];
		var frenchhorn_note17 = [195.998, 0.186227, 0.5233, 0.415321, 0.252243, 0.165927, 0.103681, 0.059288];
		var frenchhorn_note18 = [207.652, 0.142315, 0.3917, 0.260872, 0.142327, 0.09151, 0.053321, 0.03091];
		var frenchhorn_note19 = [220.0, 0.23182, 0.6043, 0.473752, 0.282674, 0.177788, 0.087525, 0.068426];
		var frenchhorn_note20 = [233.082, 0.186939, 0.5835, 0.341177, 0.206609, 0.13531, 0.074758, 0.049215];
		var frenchhorn_note21 = [246.942, 0.262476, 0.4719, 0.31061, 0.134513, 0.071512, 0.041866, 0.016968];
		var frenchhorn_note22 = [261.626, 0.349185, 0.5182, 0.344819, 0.177017, 0.082092, 0.048272, 0.017172];
		var frenchhorn_note23 = [277.183, 0.347442, 0.5778, 0.340529, 0.188012, 0.095386, 0.055013, 0.019484];
		var frenchhorn_note24 = [293.665, 0.324386, 0.4463, 0.26217, 0.119881, 0.052248, 0.023404, 0.004041];
		var frenchhorn_note25 = [311.127, 0.372178, 0.5048, 0.305695, 0.13681, 0.072398, 0.019331, 0.0075];
		var frenchhorn_note26 = [329.628, 0.3902, 0.377176, 0.171431, 0.053795, 0.025108, 0.004544, 0.001334];
		var frenchhorn_note27 = [349.228, 0.445797, 0.4713, 0.21039, 0.095276, 0.045379, 0.010116, 0.003081];
		var frenchhorn_note28 = [369.994, 0.5145, 0.450804, 0.211048, 0.088095, 0.027116, 0.009087, 0.008132];
		var frenchhorn_note29 = [391.995, 0.3932, 0.222675, 0.073292, 0.021658, 0.002924, 0.000794, 0.000816];
		var frenchhorn_note30 = [415.305, 0.3252, 0.154043, 0.033957, 0.005957, 0.000266, 0.000359, 1.4E-05];
		var frenchhorn_note31 = [440.0, 0.3514, 0.130132, 0.021384, 0.003992, 0.000787, 0.000983, 0.00063];
		var frenchhorn_note32 = [466.164, 0.6314, 0.24441, 0.054147, 0.011424, 0.001992, 0.001439, 0.000423];
		var frenchhorn_note33 = [493.883, 0.4351, 0.111519, 0.026972, 0.004931, 0.000773, 0.000404, 0.000391];
		var frenchhorn_note34 = [523.251, 0.3839, 0.084731, 0.009273, 0.001766, 0.000324, 0.000115, 0.000543];
		var frenchhorn_note35 = [554.365, 0.4549, 0.114671, 0.027593, 0.005565, 0.001521, 0.000607, 0.000389];
		var frenchhorn_note36 = [587.33, 0.3233, 0.043938, 0.006418, 0.001564, 0.000271, 0.000324, 0.000109];
		// Aggregate french horn notes
		var frenchhorn = [frenchhorn_note0, frenchhorn_note1, frenchhorn_note2, frenchhorn_note3, frenchhorn_note4, frenchhorn_note5, frenchhorn_note6, frenchhorn_note7, frenchhorn_note8, frenchhorn_note9, frenchhorn_note10, frenchhorn_note11, frenchhorn_note12, frenchhorn_note13, frenchhorn_note14, frenchhorn_note15, frenchhorn_note16, frenchhorn_note17, frenchhorn_note18, frenchhorn_note19, frenchhorn_note20, frenchhorn_note21, frenchhorn_note22, frenchhorn_note23, frenchhorn_note24, frenchhorn_note25, frenchhorn_note26, frenchhorn_note27, frenchhorn_note28, frenchhorn_note29, frenchhorn_note30, frenchhorn_note31, frenchhorn_note32, frenchhorn_note33, frenchhorn_note34, frenchhorn_note35, frenchhorn_note36];
	}

	// Trombone note fundamentals and overtones.
	{
		var trombone_note0 = [82.407, 0.111951, 0.282449, 0.422485, 0.288118, 0.561584, 0.723852, 0.9186];
		var trombone_note1 = [87.307, 0.202033, 0.631264, 0.58742, 0.441702, 0.938033, 1.002078, 1.1371];
		var trombone_note2 = [92.499, 0.148124, 0.422575, 0.406721, 0.421223, 0.856001, 0.835469, 0.818423];
		var trombone_note3 = [97.999, 0.153887, 0.439378, 0.341548, 0.70618, 0.750595, 0.8418, 0.656399];
		var trombone_note4 = [103.826, 0.17275, 0.477928, 0.382655, 0.752484, 0.759792, 0.728481, 0.9612];
		var trombone_note5 = [110.0, 0.181268, 0.384672, 0.315437, 0.667847, 0.769024, 0.718374, 0.795];
		var trombone_note6 = [116.541, 0.17131, 0.381252, 0.289433, 0.73245, 0.7767, 0.682116, 0.682757];
		var trombone_note7 = [123.471, 0.128596, 0.292579, 0.275924, 0.411328, 0.376706, 0.4898, 0.321985];
		var trombone_note8 = [130.813, 0.189173, 0.289084, 0.469376, 0.524676, 0.608394, 0.634, 0.400073];
		var trombone_note9 = [138.591, 0.178945, 0.240255, 0.404127, 0.5394, 0.401045, 0.46101, 0.34687];
		var trombone_note10 = [146.832, 0.142228, 0.181318, 0.337189, 0.4562, 0.453275, 0.298937, 0.265009];
		var trombone_note11 = [155.563, 0.220959, 0.262742, 0.606304, 0.45217, 0.6316, 0.382898, 0.309057];
		var trombone_note12 = [164.814, 0.243495, 0.229651, 0.5075, 0.446196, 0.435528, 0.348973, 0.255645];
		var trombone_note13 = [174.614, 0.321648, 0.263834, 0.465938, 0.5761, 0.392244, 0.400956, 0.286221];
		var trombone_note14 = [184.997, 0.295699, 0.293134, 0.436731, 0.5117, 0.316325, 0.235357, 0.200616];
		var trombone_note15 = [195.998, 0.367858, 0.543842, 0.565, 0.53176, 0.390016, 0.24347, 0.207251];
		var trombone_note16 = [207.652, 0.340629, 0.5005, 0.38069, 0.409129, 0.287212, 0.194109, 0.119875];
		var trombone_note17 = [220.0, 0.303239, 0.4566, 0.419297, 0.297682, 0.230952, 0.164793, 0.096454];
		var trombone_note18 = [233.082, 0.372655, 0.6356, 0.581164, 0.370704, 0.302517, 0.211869, 0.119148];
		var trombone_note19 = [246.942, 0.289757, 0.5286, 0.502493, 0.271742, 0.243571, 0.122201, 0.080478];
		var trombone_note20 = [261.626, 0.311297, 0.503613, 0.5142, 0.325013, 0.245823, 0.121201, 0.05222];
		var trombone_note21 = [277.183, 0.231636, 0.475262, 0.4864, 0.260016, 0.113276, 0.050838, 0.027187];
		var trombone_note22 = [293.665, 0.19439, 0.4519, 0.309737, 0.216141, 0.0959, 0.037982, 0.024645];
		var trombone_note23 = [311.127, 0.197735, 0.3551, 0.248703, 0.139148, 0.056981, 0.024792, 0.012344];
		var trombone_note24 = [329.628, 0.151423, 0.2626, 0.138572, 0.064233, 0.019769, 0.008429, 0.002294];
		var trombone_note25 = [349.228, 0.194273, 0.4465, 0.252087, 0.127028, 0.050061, 0.025772, 0.012751];
		var trombone_note26 = [369.994, 0.156883, 0.3097, 0.158353, 0.062619, 0.027665, 0.015171, 0.008197];
		var trombone_note27 = [391.995, 0.270004, 0.315, 0.114582, 0.045491, 0.02116, 0.01063, 0.004498];
		var trombone_note28 = [415.305, 0.337966, 0.3602, 0.142336, 0.047834, 0.021235, 0.009647, 0.00287];
		var trombone_note29 = [440.0, 0.4026, 0.391305, 0.159631, 0.050605, 0.019488, 0.009276, 0.003528];
		var trombone_note30 = [466.164, 0.6169, 0.465824, 0.191502, 0.087516, 0.0373, 0.012829, 0.006669];
		var trombone_note31 = [493.883, 0.5081, 0.291681, 0.130344, 0.05276, 0.01917, 0.006405, 0.001935];
		var trombone_note32 = [523.251, 0.5963, 0.377424, 0.210384, 0.088578, 0.029851, 0.009232, 0.006981];
		var trombone_note33 = [554.365, 0.5967, 0.329749, 0.156149, 0.066842, 0.01884, 0.00569, 0.002349];
		var trombone_note34 = [587.33, 0.4414, 0.122705, 0.051959, 0.022203, 0.005319, 0.001731, 0.000704];
		var trombone_note35 = [622.254, 0.4604, 0.151062, 0.067886, 0.028261, 0.008055, 0.003142, 0.000745];
		// Aggregate trombone notes
		var trombone = [trombone_note0, trombone_note1, trombone_note2, trombone_note3, trombone_note4, trombone_note5, trombone_note6, trombone_note7, trombone_note8, trombone_note9, trombone_note10, trombone_note11, trombone_note12, trombone_note13, trombone_note14, trombone_note15, trombone_note16, trombone_note17, trombone_note18, trombone_note19, trombone_note20, trombone_note21, trombone_note22, trombone_note23, trombone_note24, trombone_note25, trombone_note26, trombone_note27, trombone_note28, trombone_note29, trombone_note30, trombone_note31, trombone_note32, trombone_note33, trombone_note34, trombone_note35];
	}

	// Tuba note fundamentals and overtones.
	{
		var tuba_note0 = [65.406, 0.084388, 0.2099, 0.087893, 0.18847, 0.194373, 0.07389, 0.07504];
		var tuba_note1 = [69.296, 0.065594, 0.12792, 0.1848, 0.068682, 0.086533, 0.068158, 0.046939];
		var tuba_note2 = [73.416, 0.080886, 0.234167, 0.257, 0.167446, 0.090283, 0.078831, 0.059194];
		var tuba_note3 = [77.782, 0.101975, 0.211532, 0.2815, 0.141383, 0.102913, 0.107384, 0.030777];
		var tuba_note4 = [87.307, 0.11677, 0.112188, 0.2105, 0.110569, 0.053325, 0.026507, 0.008772];
		var tuba_note5 = [92.499, 0.202841, 0.2627, 0.137191, 0.180479, 0.132707, 0.046788, 0.013263];
		var tuba_note6 = [97.999, 0.2457, 0.146506, 0.238573, 0.176842, 0.098017, 0.021444, 0.02142];
		var tuba_note7 = [103.826, 0.209387, 0.3794, 0.215336, 0.16374, 0.091408, 0.004161, 0.047975];
		var tuba_note8 = [110.0, 0.102421, 0.2845, 0.254639, 0.097823, 0.046713, 0.021628, 0.033993];
		var tuba_note9 = [116.541, 0.082995, 0.3409, 0.17502, 0.180159, 0.036947, 0.037606, 0.028788];
		var tuba_note10 = [123.471, 0.140564, 0.254, 0.143498, 0.098875, 0.009779, 0.035846, 0.013871];
		var tuba_note11 = [130.813, 0.292542, 0.3488, 0.202417, 0.081678, 0.016146, 0.050468, 0.03634];
		var tuba_note12 = [138.591, 0.2341, 0.151732, 0.205784, 0.086144, 0.071951, 0.01853, 0.027528];
		var tuba_note13 = [146.832, 0.2656, 0.238769, 0.121277, 0.032856, 0.045437, 0.023721, 0.007126];
		var tuba_note14 = [155.563, 0.2625, 0.216777, 0.198004, 0.01078, 0.041647, 0.027544, 0.001018];
		var tuba_note15 = [164.814, 0.173769, 0.3395, 0.141728, 0.033944, 0.001987, 0.013485, 0.011413];
		var tuba_note16 = [174.614, 0.203715, 0.2572, 0.093025, 0.050822, 0.018759, 0.006782, 0.012589];
		var tuba_note17 = [184.997, 0.3552, 0.328923, 0.136957, 0.068264, 0.032802, 0.022285, 0.0055];
		var tuba_note18 = [195.998, 0.151545, 0.2722, 0.045328, 0.05466, 0.020457, 0.009702, 0.00309];
		var tuba_note19 = [207.652, 0.3281, 0.158241, 0.007213, 0.008633, 0.005851, 0.000978, 0.002344];
		var tuba_note20 = [220.0, 0.5981, 0.259987, 0.060795, 0.054971, 0.00999, 0.005854, 0.005198];
		var tuba_note21 = [233.082, 0.5258, 0.216603, 0.048702, 0.025211, 0.007647, 0.0034, 0.000522];
		var tuba_note22 = [246.942, 0.2112, 0.063166, 0.017226, 0.007568, 0.000109, 0.000312, 0.000127];
		var tuba_note23 = [261.626, 0.2043, 0.025434, 0.012807, 0.001484, 0.000411, 0.000391, 0.000145];
		var tuba_note24 = [277.183, 0.1689, 0.065873, 0.025885, 0.004391, 0.003695, 0.000658, 9.1E-05];
		var tuba_note25 = [293.665, 0.2303, 0.026569, 0.010211, 0.007414, 0.002011, 8.9E-05, 1.1E-05];
		var tuba_note26 = [311.127, 0.1843, 0.003276, 0.013953, 0.001257, 0.001604, 0.000225, 9.8E-05];
		var tuba_note27 = [329.628, 0.3111, 0.020143, 0.01085, 0.000596, 0.000486, 0.000133, 0.000239];
		var tuba_note28 = [349.228, 0.2689, 0.02778, 0.002947, 0.00097, 0.00022, 5.3E-05, 9.9E-05];
		var tuba_note29 = [369.994, 0.1843, 0.017982, 0.004516, 0.000659, 0.000195, 0.000261, 4.8E-05];
		var tuba_note30 = [391.995, 0.2552, 0.014882, 0.002343, 0.000552, 0.00016, 0.000145, 0.000221];
		// Aggregate tuba notes
		var tuba = [tuba_note0, tuba_note1, tuba_note2, tuba_note3, tuba_note4, tuba_note5, tuba_note6, tuba_note7, tuba_note8, tuba_note9, tuba_note10, tuba_note11, tuba_note12, tuba_note13, tuba_note14, tuba_note15, tuba_note16, tuba_note17, tuba_note18, tuba_note19, tuba_note20, tuba_note21, tuba_note22, tuba_note23, tuba_note24, tuba_note25, tuba_note26, tuba_note27, tuba_note28, tuba_note29, tuba_note30];
	}


	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
	
	return (
      <>
        <div style={st}>
          <table style={{ width: "100%" }}>
            <tr>
              <td style={{ width: "25%", textAlign: "center" }}>
                
              </td>
              <td style={{ width: "22%", textAlign: "left" }}>
			  	
			  </td>
			
			  <td style={{ width: "22%", textAlign: "left" }}>
			  	
              </td>
              <td style={{ textAlign: "left" }}>
				 <div id="buttons">
                      <button
                        id="ganglion"
                        className="recordButton"
                      >
                        Connect
                      </button>
					  <button
                        id="Disconnect"
                        className="recordButton"
                      >
                        Disconnect
                      </button>
                    </div>

              </td>
              <td style={{ width: "25%", textAlign: "center" }}>
				<div style={{ color: "white" }}>Helpful Buttons</div>
					<button onClick={handleStuff}>Print Debug Stuff</button> <br></br>
					<button onClick={generateAndDownloadMIDIFile}>Download MIDI and play WIP</button>
					<button onClick={downloadData}>Print Raw Data</button> <br></br>
              </td>
			  
            </tr>
          </table>
        </div>
      </>
    );

}

export default Record;
