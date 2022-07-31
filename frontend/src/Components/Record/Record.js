import React, { useContext, useState, useEffect, useCallback} from 'react';
import { Carousel } from "react-responsive-carousel";
import { SketchPicker } from 'react-color'
import './record.css'
import { FaAngleRight, FaAngleLeft, FaQuestion } from "react-icons/fa";
import {Accordion, Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import Img from '../Navbar/Logo.jpg'
//import * as fs from 'fs/promises';
// import {readFileSync, promises as fsPromises} from 'fs';
// import * as fs from 'fs';

// **** If more devices are needed, here are the node modules to begin their acquisition. **** \\
// import muse from "https://cdn.jsdelivr.net/npm/@brainsatplay/muse@0.0.1/dist/index.esm.js"; // Muse board retrieval
// import hegduino from "https://cdn.jsdelivr.net/npm/@brainsatplay/hegduino@0.0.3/dist/index.esm.js"; // Hegduino 8 channel board retrieval


import * as components from "https://cdn.jsdelivr.net/npm/brainsatplay-ui@0.0.7/dist/index.esm.js"; // UI
// Data acquisition
import * as datastreams from "https://cdn.jsdelivr.net/npm/datastreams-api@latest/dist/index.esm.js"; 
import ganglion from "https://cdn.jsdelivr.net/npm/@brainsatplay/ganglion@0.0.2/dist/index.esm.js"; // This is the device aquisition for BrainBeats AKA the ganglion device.
import * as XLSX from 'xlsx';
import MidiPlayer from 'midi-player-js';
import _, {cloneDeep, first} from 'lodash'

import { useRecoilValue } from "recoil";
import {userJWT, userModeState} from '../context/GlobalState'
import sendAPI from '../sendAPI';

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

import * as Constants from './Constants.js';

import {playMidiNote} from './Playback.js';

function Record() {
    //needed states
    const user = useRecoilValue(userModeState);
	const jwt = useRecoilValue(userJWT);

	const [stage, setStage] = useState(0);

	//Music Generation States
	const [numNotes, setNumNotes] = useState(21);
	const [FP1, setFP1Inst] = useState(4);
	const [FP2, setFP2Inst] = useState(2);
	const [C3, setC3Inst] = useState(3);
	const [C4, setC4Inst] = useState(0);
	const [FP1Note, setFP1Note] = useState(2);
	const [FP2Note, setFP2Note] = useState(2);
	const [C3Note, setC3Note] = useState(1);
	const [C4Note, setC4Note] = useState(1);
	const [keyNum, setKey] = useState(0);
	const [scale, setScale] = useState(0);
	const [BPMArray, setBPMArray] = useState([]);
	const [BPM, setBPM] = useState(120);
	const [MIDIFile, setMIDIFile] = useState("");


	const [currentSlide, setCurrentSlide] = useState(0);
	const [autoplay, setAutoplay] = useState(true);

	//Setting Up Script
	//Text Cards
	const initialBackground = {
		displayColorPicker: false,
		color: {
		  r: '242',
		  g: '242',
		  b: '242',
		  a: '1',
		},
	}
	const initialTextColor = {
		displayColorPicker: false,
		color: {
		  r: '0',
		  g: '0',
		  b: '0',
		  a: '1',
		},
	}
	const [cards, setCards] = useState([])
	const [cardText, setCardTextState] = useState('');
	const [speed, setSpeed] = useState(1)
	const [backgroundColor, setBackgroundColor] =useState(initialBackground);
	const [textColor, setTextColor] =useState(initialTextColor);
	const [thumbnail, setThumbnail] = useState(user.thumbnail);

	//Youtube Link
	const [youtubeLink, setYoutubeLink] = useState('')
	//Posting States
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

	const updateProfilePic = (file) => {
        var file = document.querySelector('input[type=file]')['files'][0];
        var reader = new FileReader();
        var baseString;
        reader.onloadend = function () {
            baseString = reader.result;
            setThumbnail(baseString); 
        };
        reader.readAsDataURL(file);
    }

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

	const goNext = () => {
		setStage(stage + 1)
	}
	const goBack = () => {
		setStage(stage - 1)
	}
	const addCard = () => {
		if(cardText === ''){
			alert("Invalid Card format")
			return
		}
		let newCard ={
			textColor: textColor.color,
			backGroundColor: backgroundColor.color,
			speed: speed * 1000,
			text: cardText,
		}
		//set input back to default
		setBackgroundColor(initialBackground);
		setTextColor(initialTextColor);
		setCardTextState('');
		setSpeed(1);
		setCards([...cards, newCard])
	}
	const noScript = () => {
		setStage(4);
	}

	const postFile = () => {
		const bodyData ={
			"userID": user.id,
  			"title": title,
  			"bpm": BPM,
			"instruments" : instrumentList,
			"noteTypes" : noteDuration,
			"midi": MIDIFile,
  			"key": KEY[scale],
			'token': jwt,
		}
		console.log(bodyData);

		sendAPI('post', '/posts/createPost', bodyData)
			.then((res) =>{
				setMsg('Song posted')
			})
	}
	
	  //Background Color Picker Function
	  const openBackgroundColor = () => {
		setBackgroundColor({ displayColorPicker: !backgroundColor.displayColorPicker, color: backgroundColor.color });
	  };
	  const closeBackgroundColor = () => {
		setBackgroundColor({ displayColorPicker: false, color: backgroundColor.color });
	  };
	  const setColorBackground = (color) => {
		setBackgroundColor({ displayColorPicker: backgroundColor.displayColorPicker, color: color.rgb });
	  };

	  //Text Color Picker Function
	  const openTextColor = () => {
		setTextColor({ displayColorPicker: !textColor.displayColorPicker, color: textColor.color });
	  };
	  const closeTextColor = () => {
		setTextColor({ displayColorPicker: false, color: textColor.color });
	  };
	  const setColorText = (color) => {
		console.log(color)
		setTextColor({ displayColorPicker: textColor.displayColorPicker, color: color.rgb });
	  };

	  //Default Selections for music generation
	  function setToSlow(){
		setFP1Inst(-3);
		setFP2Inst(0);
		setC3Inst(4);
		setC4Inst(7);
		setFP1Note(2);
		setFP2Note(1);
		setC3Note(1);
		setC4Note(0);
		setBPM(100);
	  }
	  function setToMed(){
		setFP1Inst(-3);
		setFP2Inst(2);
		setC3Inst(5);
		setC4Inst(6);
		setFP1Note(2);
		setFP2Note(2);
		setC3Note(1);
		setC4Note(1);
		setBPM(120);
	  }
	  function setToQuick(){
		setFP1Inst(4);
		setFP2Inst(2);
		setC3Inst(3);
		setC4Inst(0);
		setFP1Note(3);
		setFP2Note(3);
		setC3Note(2);
		setC4Note(2);
		setBPM(140);
	  }
	  function setToFast(){
		setFP1Inst(-3);
		setFP2Inst(0);
		setC3Inst(4);
		setC4Inst(3);
		setFP1Note(4);
		setFP2Note(4);
		setC3Note(3);
		setC4Note(3);
		setBPM(160);
	  }
	  const handel = () => {
		  console.log('_____________________________________________')
		  console.log(FP1)
		  console.log(FP2)
		  console.log(C3)
		  console.log(C4)
		  console.log(FP1Note)
		  console.log(FP2Note)
		  console.log(C3Note)
		  console.log(C4Note)
	  }
	  const renderBasicTips = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Choose your desired tempo
		</Tooltip>
	  );
	  const renderAdvanceTip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Customize your own experience
		</Tooltip>
	  );
	  const renderScriptTip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Influence your brainwave via youtube link, creating your own cards or just skip this step
		</Tooltip>
	  );
	  const renderRecordTip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Click start to start recording, and stop to stop
		</Tooltip>
	  );
	  const renderPublishTip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			You can now publish your song to the world
		</Tooltip>
	  );

	return <>
	<div className="scriptBox">
		{stage == 0 && (
			<>
			<button onClick={handel}>button</button>
			  <div>
				<div className="row">
				  <p className="textHeader">Music Setting</p>
				</div>
				<Accordion defaultActiveKey="0">
				  <Accordion.Item eventKey="0">
					<Accordion.Header>Basic Setting
							
					</Accordion.Header>
					<Accordion.Body>
						<div>
						<OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderBasicTips}>
							<button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
						</OverlayTrigger>
						</div>
						<div>
        					<input type="radio"  onChange={setToSlow} className='defaultRadio' name='tempo' value='slow' /> <label>Slow and Melodic</label>
        					<input type="radio" onChange={setToMed} className='defaultRadio' name='tempo' value='normal' /><label>Moderate and Timely</label> 
        					<input type="radio" onChange={setToQuick} className='defaultRadio' name='tempo' value='normal' checked/><label>Quick and Lively</label> 
							<input type="radio" onChange={setToFast} className='defaultRadio' name='tempo' value='fast'/> <label>Fast and Frenzy</label>
      					</div>
					</Accordion.Body>
				  </Accordion.Item>
				  <Accordion.Item eventKey="1">
					<Accordion.Header>Advance Setting</Accordion.Header>
					<Accordion.Body>
						<div>
						<OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderAdvanceTip}>
							<button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
						</OverlayTrigger>
						</div>
					  <div className="row">
						<div className="col">
						  <div>FP1 Instrument</div>
						  <select className='advanceInputBoxes' onChange={(e) => setFP1Inst(e.target.value)} value={FP1}>
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
						  <div>FP2 Instrument</div>
						  <select className='advanceInputBoxes' onChange={(e) => setFP2Inst(e.target.value)} value={FP2}>
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
						  <div>C3 Instrument</div>
						  <select className='advanceInputBoxes' onChange={(e) => setC3Inst(e.target.value)} value={C3}>
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
						  <div>C4 Instrument</div>
						  <select className='advanceInputBoxes' onChange={(e) => setC4Inst(e.target.value)} value={C4}>
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
						<div className="col">
						  <div>FP1 Note Type</div>
						  <select className='advanceInputBoxes' onChange={(e) => setFP1Note(e.target.value)} value={FP1Note}>
							<option value={0}>Whole</option>
							<option value={1}>Half</option>
							<option value={2}>Quarter</option>
							<option value={3}>Eighth</option>
							<option value={4}>Sixteenth</option>
						  </select>
						  <div>FP2 Note Type</div>
						  <select className='advanceInputBoxes' onChange={(e) => setFP2Note(e.target.value)} value={FP2Note}>
							<option value={0}>Whole</option>
							<option value={1}>Half</option>
							<option value={2}>Quarter</option>
							<option value={3}>Eighth</option>
							<option value={4}>Sixteenth</option>
						  </select>
						  <div>C3 Note Type</div>
						  <select className='advanceInputBoxes' onChange={(e) => setC3Note(e.target.value)} value={C3Note}>
							<option value={0}>Whole</option>
							<option value={1}>Half</option>
							<option value={2}>Quarter</option>
							<option value={3}>Eighth</option>
							<option value={4}>Sixteenth</option>
						  </select>
						  <div>C4 Note Type</div>
						  <select className='advanceInputBoxes' onChange={(e) => setC4Note(e.target.value)} value={C4Note}>
							<option value={0}>Whole</option>
							<option value={1}>Half</option>
							<option value={2}>Quarter</option>
							<option value={3}>Eighth</option>
							<option value={4}>Sixteenth</option>
						  </select>
						</div>
						<div className="col">
						  <div>Number of Octaves</div>
						  <select className='advanceInputBoxes' onChange={(e) => setNumNotes(e.target.value * 7)}>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						  </select>
						  <div>Tempo</div>
						  <select className='advanceInputBoxes' onChange={(e) => setBPM(BPMArray[e.target.value])} value={BPM}>
							{BPMArray.map((item, index) => {
							  return <option value={index}>{item}</option>;
							})}
						  </select>
						  <div>Key Signature</div>
	  
						  <select
							onChange={(e) => setKey(e.target.value)}
							value={keyNum}
							className='advanceInputBoxes'
						  >
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
						  <div>Scale</div>
						  <select
							onChange={(e) => setScale(e.target.value)}
							value={scale}
							className='advanceInputBoxes' 
						  >
							<option value={0}>Major</option>
							<option value={1}>Minor</option>
						  </select>
						</div>
					  </div>
					</Accordion.Body>
				  </Accordion.Item>
				</Accordion>
			  </div>
			  	<button className="arrowButtonMain" onClick={goNext}>
			  		Next {<FaAngleRight />}
				</button>
			
		  </>
		)}
        {stage == 1 && (
        <div>
			<div>
			<div>
				<OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderScriptTip}>
					<button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
				</OverlayTrigger>
			</div>
			<br />
			<div>
			<p className="textHeader">Script</p>
			</div>
			</div>
          
          <div>
            <input
              className="InputForYoutube"
              placeholder="YouTube Link"
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
            <p className="line">
              <span className="wordInLine">OR</span>
            </p>
            <br />
            <input
              className="inputForCard"
              placeholder="YOUR TEXT HERE"
              onChange={(e) => setCardTextState(e.target.value)}
              style={{
                color: `rgba(${textColor.color.r}, ${textColor.color.g}, ${textColor.color.b}, ${textColor.color.a})`,
                background: `rgba(${backgroundColor.color.r}, ${backgroundColor.color.g}, ${backgroundColor.color.b}, ${backgroundColor.color.a})`,
              }}
              value={cardText}
            />
          </div>
          <div className="row">
            <div className="col-sm-2">
			<p style={{position: 'relative', left: '45px'}}>Text Color</p>
              <div>
                <div
                  style={{
                    padding: "2px",
                    background: "#fff",
                    borderRadius: "1px",
                    boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                    display: "inline-block",
                    cursor: "pointer",
					float: 'right'
                  }}
                  onClick={openTextColor}
                >
					
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "2px",
                      background: `rgba(${textColor.color.r}, ${textColor.color.g}, ${textColor.color.b}, ${textColor.color.a})`,
                    }}
                  />
                </div>
                {textColor.displayColorPicker ? (
                  <div
                    style={{
                      position: "absolute",
                      zIndex: "2",
                      bottom: "50px",
                    }}
                  >
                    <div
                      style={{
                        position: "fixed",
                        top: "0px",
                        right: "0px",
                        bottom: "0px",
                        left: "0px",
                      }}
                      onClick={closeTextColor}
                    />
                    <SketchPicker
                      color={textColor.color}
                      onChange={setColorText}
                    />
                  </div>
                ) : null}
				<br />
				
              </div>
            </div>
            <div className="col-sm-2">
              <div>
			  <p style={{position: 'relative', left: '0px'}}>Background Color</p>
              
                <div
                  style={{
                    padding: "2px",
                    background: "#fff",
                    borderRadius: "1px",
                    boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                  onClick={openBackgroundColor}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "2px",
                      background: `rgba(${backgroundColor.color.r}, ${backgroundColor.color.g}, ${backgroundColor.color.b}, ${backgroundColor.color.a})`,
                    }}
                  />
                </div>
                {backgroundColor.displayColorPicker ? (
                  <div
                    style={{
                      position: "absolute",
                      zIndex: "2",
                      bottom: "50px",
                    }}
                  >
                    <div
                      style={{
                        position: "fixed",
                        top: "0px",
                        right: "0px",
                        bottom: "0px",
                        left: "0px",
                      }}
                      onClick={closeBackgroundColor}
                    />
                    <SketchPicker
                      color={backgroundColor.color}
                      onChange={setColorBackground}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="col">
              <input
                type="number"
                placeholder="Seconds"
                className="timeInput"
                onChange={(e) => setSpeed(e.target.value)}
                value={speed}
              />
            </div>

            <div className="col">
              <Button
                style={{ width: "100px", float: "center", marginTop: '10px'}}
                onClick={addCard}
              >
                Add
              </Button>
            </div>
          </div>
          <button className="arrowButtonMain" onClick={goBack}>
            {<FaAngleLeft />} Script{" "}
          </button>
          <button className="arrowButtonMain" onClick={goNext} disabled={(cards.length === 0) ^ (youtubeLink !== '')}>
            Record {<FaAngleRight />}
          </button>
          <p className="line">
            <span className="wordInLine">OR</span>
          </p>
          <Button
            style={{ width: "100px", marginTop: "10px" }}
            onClick={noScript}
          >
            SKIP
          </Button>
        </div>
      )}
		{//User does not want to script
		stage == 4 && (
			<>
			<div>
				<OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderRecordTip}>
					<button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
				</OverlayTrigger>
			</div>
			<h2>Record</h2>
			<button onClick={() => console.log(MIDIFile)}>MIDI FILE</button>
			<img src={Img} className="scriptless"/>
			<Setting numNotes={numNotes} instrumentArr={instrumentList} noteDuration={noteDuration} scale={scale} keyNum={keyNum} BPM={BPM} setMIDIFile={setMIDIFile}/>
			<button className='arrowButtonMain' onClick={() => {setStage(1)}}>{<FaAngleLeft />} Script </button>
			<button className='arrowButtonMain' onClick={() => {setStage(3)}}>Publish {<FaAngleRight />}</button>
			</>
		)}
		{//This displays cards
		stage == 2 && youtubeLink === '' && (
			<>
			<div>
				<OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderRecordTip}>
					<button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
				</OverlayTrigger>
			</div>
			<ValidScript slides={cards} setCurrentSlide={setCurrentSlide} autoplay={autoplay} currentSlide={currentSlide}/>
			<Setting numNotes={numNotes} instrumentArr={instrumentList} noteDuration={noteDuration} scale={scale} keyNum={keyNum} BPM={BPM} />
			<button className='arrowButtonMain' onClick={goBack}>{<FaAngleLeft />} Script </button>
			<button className='arrowButtonMain' onClick={goNext}>Publish {<FaAngleRight />}</button>
			
			</>
		)}
		{//This shows youtube
		stage == 2 && cards.length === 0 && (
			<>
			<div>
				<OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderRecordTip}>
				<button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
				</OverlayTrigger>
			</div>
			<VidLink link={youtubeLink} />
			<Setting numNotes={numNotes} instrumentArr={instrumentList} noteDuration={noteDuration} scale={scale} keyNum={keyNum} BPM={BPM} />
			<button className='arrowButtonMain' onClick={goBack}>{<FaAngleLeft />} Script </button>
			<button className='arrowButtonMain' onClick={goNext}>Publish {<FaAngleRight />}</button>
			
			</>
		)}
		{stage == 3 && (
			<>
			<div>
			<div>
				<OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderPublishTip}>
				<button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
				</OverlayTrigger>
			</div>
			<div>
				<h2>Publish</h2>
			</div>
			<div>
				<img src={Img} />
				
			</div>
			<div> 
				<label for="file-upload" className="custom-file-upload">
    				Upload Image (optional)
				</label>
				<input id="file-upload" onChange={(event) => updateProfilePic(event.target.files[0])} type="file"/>
			</div>
			<div> <input type="text" className='titleInput' onChange={(e) => setTitle(e.target.value)}/></div>
			</div>
			<p>Post Title</p>
			<button className='publishButton' onClick={postFile}>Publish</button>
			<br />
			<p>{msg}</p>
			<button className='arrowButtonMain' onClick={goBack}>{<FaAngleLeft />} Record </button>
			
			</>
		)}
		</div>
	</>
		
}

function VidLink({link}) {
    //two type of YT URLS
    //https://www.youtube.com/watch?v=DSBBEDAGOTc
    //https://www.youtube.com/watch?v=ScMzIvxBSi4&ab_channel=BenMarquezTX

	//get everything after the =
    let tempID = link.split('=');
	tempID = tempID[1];
    //this discards discards everything after the & sign giving the correct URL if the URL
    //in the second form
    tempID = tempID.split('&');
	//offical youtube ID
    let id = tempID[0];
    return (
        <>
			<h2>Record</h2>
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

function ValidScript({slides, setCurrentSlide, currentSlide, autoplay}) {
	const changeCarosel = useCallback((slide) => {
		setCurrentSlide(slide)
	},[])
	console.log(autoplay)
    return (
        <>
            <h2>Record</h2>
            <Carousel className='scriptDisplayCard' autoPlay width={700} showThumbs={false} showIndicators={false}
                infiniteLoop={true} dynamicHeight={true} interval={slides[currentSlide].speed} onChange={changeCarosel}>
                {slides.map(
                    (slide,index) =>
                        {console.log(currentSlide)
							
						return <div key={index} style={{ 
							background: `rgba(${slide.backGroundColor.r}, ${slide.backGroundColor.g}, ${slide.backGroundColor.b}, ${slide.backGroundColor.a})`,
							color: `rgba(${slide.textColor.r}, ${slide.textColor.g}, ${slide.textColor.b}, ${slide.textColor.a})`, 
							padding: '250px'}}>
                            {slide.text}
                        </div>})}
            </Carousel>

        </>
    )


}

function Setting({numNotes, instrumentArr, noteDuration, scale, keyNum, BPM, setMIDIFile}) {
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
		// dataDevices.load(muse);
		// dataDevices.load(device);
		// dataDevices.load(hegduino);

		// Track handler - Should support as many tracks as the connected headset has
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
			track.subscribe((data) => {
				//Stops the recording
				//TODO: find solution to unsubscribe the tracks
				if(!rec)
				{
					//console.log(track.unsubscribe(track))
				}
				else
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

			var declaredNote = NoteDeclarationRaw(datay); // Get note increment
			var noteAndOctave = GetNoteWRTKey(declaredNote); // Get the actual note and its octave
			var floorOctave = GetFloorOctave(numNotes); // Get the lowest octave that will be used in the song

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
				else
					noteFP1 = new MidiWriter.NoteEvent({pitch: [noteOctaveString], duration: getIntFromNoteTypeStringWithMidiWriterJsValues(FP1NoteType).toString()});
				trackFP1.addEvent(noteFP1);
			}
			else if (tracky.contentHint.localeCompare("FP2") == 0)
			{
				if (noteAndOctave.note == -1) // Rest
					noteFP2 = new MidiWriter.NoteEvent({wait: getIntFromNoteTypeStringWithMidiWriterJsValues(FP2NoteType).toString(), duration: '0', velocity: 0});
				else
					noteFP2 = new MidiWriter.NoteEvent({pitch: [noteOctaveString], duration: getIntFromNoteTypeStringWithMidiWriterJsValues(FP2NoteType).toString()});
				trackFP2.addEvent(noteFP2);
			}
			else if (tracky.contentHint.localeCompare("C3") == 0)
			{
				if (noteAndOctave.note == -1) // Rest
					noteC3 = new MidiWriter.NoteEvent({wait: getIntFromNoteTypeStringWithMidiWriterJsValues(C3NoteType).toString(), duration: '0', velocity: 0});
				else
					noteC3 = new MidiWriter.NoteEvent({pitch: [noteOctaveString], duration: getIntFromNoteTypeStringWithMidiWriterJsValues(C3NoteType).toString()});
				trackC3.addEvent(noteC3);
			}
			else if (tracky.contentHint.localeCompare("C4") == 0)
			{
				if (noteAndOctave.note == -1) // Rest
					noteC4 = new MidiWriter.NoteEvent({wait: getIntFromNoteTypeStringWithMidiWriterJsValues(C4NoteType).toString(), duration: '0', velocity: 0});
				else
					noteC4 = new MidiWriter.NoteEvent({pitch: [noteOctaveString], duration: getIntFromNoteTypeStringWithMidiWriterJsValues(C4NoteType).toString()});
				trackC4.addEvent(noteC4);
			}

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
				button.onclick = () => {rec=false;console.log("I GOT CLICKED " + rec)};
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
		console.log("----------------------------------------------");
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

	// The amount of time (in milliseconds) that each of the supported notes would take at the specified BPM.
	const timeForEachNoteARRAY =
	[
		getMilliecondsFromBPM(BPM) / 4,
		getMilliecondsFromBPM(BPM) / 2,
		getMilliecondsFromBPM(BPM),
		getMilliecondsFromBPM(BPM) * 2,
		getMilliecondsFromBPM(BPM) * 4
	];

	// Number of total notes that are able to be assigned. 7 is one octave, 14 is two octaves, 21 is three octaves.
	// Going above 21 is NOT recommended and has NOT been tested, but should theoretically work. DO NOT use values 
	// that aren't multiples of 7. Works best with 7, 14, and 21. Do not ever exceed 63.
	// NOTE: This software works using 7-note octaves, meaning that the root note's octave jump is not included in
	//       the scale. For example, C major is C, D, E, F, G, A, B. It does NOT include the C of the next octave.
	//var numNotes = 7;

	// The array of size numNotes that is used to house the cutoffs for each of the numNotes incremements. 
	// The value of MIN_MAX_AMPLITUDE_DIFFERENCE is divided by numNotes, and the result (let's call this X) is then used to 
	// create evenly-spaced "sections" in the array. 
	// incrementArr[0] will always be 0, and incrementArr[numNotes - 1] will always be Constants.MAX_AMPLITUDE + AMPLITUDE_OFFSET.
	// incrementArr[1] will be X. incrementArr[2] will be X * 2. incrementArr[3] will be X * 3.
	// In runtime, the data that the headset relays will be compared to entries in incrementArr simultaneously to find
	// which values it falls between, and from there a note will be declared. For example, let's say incrementArr[0] is 0,
	// incrementArr[1] is 0.5, and incrementArr[2] is 1.0. The headset relays data equal to 0.75. Because 0.75 falls
	// between incrementArr[1] and [2], it will be assigned to note 1, the floor of the indexes it fell between.
	var incrementArr = new Array(numNotes);

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

	// The instrument that each channel will be "playing" SineWave as a default unless changed from GUI
	var FP1Instrument = instrumentArr[0],
		FP2Instrument = instrumentArr[1],
		C3Instrument = instrumentArr[2],
		C4Instrument = instrumentArr[3];

	//These values will determine all instrument volume which is changed in GUI
	var FP1VolChange = 0, FP2VolChange = 0, C3VolChange = 0, C4VolChange = 0

	var FP1Volume = Constants.DEFAULT_VOLUME - FP1VolChange,
		FP2Volume = Constants.DEFAULT_VOLUME -  FP2VolChange,
		C3Volume = Constants.DEFAULT_VOLUME - C3VolChange,
		C4Volume = Constants.DEFAULT_VOLUME - C4VolChange;

	var keySignature = Constants.KEY_SIGNATURES[scale][keyNum];
		
	// ------------------------------------------------------------------------------ CUSTOM HELPER FUNCTIONS ------------------------------------------------------------------------------

	var decodedMIDIString = '';

	function previewFile() {
		const [file] = document.querySelector('input[type=file]').files;
		const reader = new FileReader();
	  
		if (file)
			//reader.readAsText(file);
			reader.readAsBinaryString(file);

		reader.addEventListener("load", () =>
		{
			console.log("Data from MIDI file converted to base64: " + btoa(reader.result));
			decodedMIDIString = btoa(reader.result);
		}, false);
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
		//COOOL TRICK
		//you can pass setState as a parameter and have it change in a different function
		setMIDIFile(writeURI)
		// pass writeURI to the database

		// downloadURI(writeURI, "BrainBeatsMasterpiece"); // <------------ this is where the MIDI file is actually generated
		// playMidiFile(writeURI);
		console.log("From the function:" + writeURI);
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

	// This creates the array in which different "increments" for notes are housed. I already sort-of explained this
	// near the top of this file in the comment for "var incrementArr".
	function InitIncrementArr() {
		var incrementAmount = Constants.MIN_MAX_AMPLITUDE_DIFFERENCE / numNotes; // Dividing the total range by the number of notes

		incrementArr[0] = 0; // First index will always be 0
		incrementArr[numNotes - 1] = Constants.MAX_AMPLITUDE + Constants.AMPLITUDE_OFFSET; // Last index will always be the max value + the offset that was used to remove negative numbers.

		// Fill out the array so that each index is populated with incrementAmount * index
		for (var i = 1; i < numNotes - 1; i++)
			incrementArr[i] = incrementAmount * i + Constants.AMPLITUDE_OFFSET;
	}

	// Takes in the raw value from the headset and the sensor it came from and assigns a note.
	function NoteDeclarationRaw(ampValue) {
		let ampValue2 = 0;
		ampValue2 = (ampValue - -Constants.AMPLITUDE_OFFSET); // Applies the offset to the headset's raw data

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
	
	return (
		<>
		<div id="buttons">
		  <button id="ganglion" className="recordButton">
			RECORD
		  </button>
		  <button id="Disconnect" className="stopButton" onClick={generateAndDownloadMIDIFile}>
			STOP
		  </button>
		</div>
		{/* <input type="file" onChange={previewFile}></input> */}

		<label for="file-upload" className="custom-file-upload">
    				Upload MIDI
				</label>
		<input id="file-upload" onChange={previewFile} type="file"/>

		<div style={{ color: "white" }}>Helpful Buttons</div>
		<button onClick={handleStuff}>Print Debug Stuff</button> <br></br>
		<button onClick={generateAndDownloadMIDIFile}>
		  Download MIDI and play WIP
		</button>
		<button onClick={downloadData}>Download Raw Data</button> <br></br>
	  </>
    );

}

export default Record;
