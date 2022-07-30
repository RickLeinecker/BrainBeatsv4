import React, { useContext, useState, useEffect, useCallback} from 'react';
import { Carousel } from "react-responsive-carousel";
import { SketchPicker } from 'react-color'
import './record.css'
import { FaAngleRight, FaAngleLeft, FaQuestion } from "react-icons/fa";
import {Accordion, Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import Img from '../Navbar/Logo.jpg'
<<<<<<< HEAD
import {playMidiFile} from './Playback.js';

=======
import { useNavigate } from 'react-router-dom';
>>>>>>> dev
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
import useButtons from './midiUtil';
// import { fsync } from 'fs';

// This will all be fed in from the DB
var midiData = "data:audio/midi;base64,TVRoZAAAAAYAAQACAGBNVHJrAAAAEwD/UQMHRB4A/1gEBAIYCAD/LwBNVHJrAAAAkQD/AwlTYW1wbGVyIDEAkDxkMIA8QACQPmQwgD5AAJBAZDCAQEAAkEFkMIBBQACQQ2QwgENAAJBFZDCARUAAkEdkMIBHQACQSGQwgEhAAJBIZDCASEAAkEdkMIBHQACQRWQwgEVAAJBDZDCAQ0AAkEFkMIBBQACQQGQwgEBAAJA+ZDCAPkAAkDxkMIA8QAD/LwA=";
var instrumentArr = [-1, 0, 1, 2];
var noteTypeArr = [1, 2, 3, 4];

function Record() {
    //needed states
    const user = useRecoilValue(userModeState);
	const jwt = useRecoilValue(userJWT);
	const navigate = useNavigate();

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
	const [errorMsg, setErrorMsg] = useState('');
	
	//Youtube Link
	const [youtubeLink, setYoutubeLink] = useState('')
	//Posting States
	const [title, setTitle] = useState('');
	const [msg, setMsg] = useState('');

	

	const [finishRec, setFinishRec] = useState();
	
	//passing these to Music Generation
	const instrumentList = [parseInt(FP1), parseInt(FP2), parseInt(C3), parseInt(C4)];
	const noteDuration = [parseInt(FP1Note), parseInt(FP2Note), parseInt(C3Note), parseInt(C4Note)];

	// API call to BE to get updated user info to input fields
	useEffect(() => {
		sendAPI('get', `/users/getUserPostsByID?id=${user.id}`, null)
			.then(function (res) {
				setThumbnail(res.data.thumbnail);
				console.log(user)
			})
			.catch(function (err) {
				setErrorMsg(err.response.data.msg);
			})
	}, [])

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
		const bodyData = {
		"userID": user.id,
		"title": title,
		"bpm": BPM,
		"instruments" : instrumentList,
		"noteTypes" : noteDuration,
		"midi": MIDIFile,
		"key": KEY[scale],
		"thumbnail": thumbnail,
		'token': jwt,
	}
		sendAPI('post', '/posts/createPost', bodyData)
			.then((res) =>{
				setMsg('Song posted')
			})
		navigate('/');
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

	// const {MidiElement} = useButtons();


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
							  return <option value={index} key={index}>{item}</option>;
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
<<<<<<< HEAD
			<button onClick={() => console.log(MIDIFile)}>MIDI FILE</button>

			<button onClick={() => console.log(playMidiFile(midiData, instrumentArr, noteTypeArr, BPM))}>HOPEFULLY THIS PLAYS SOMETHING!</button>

=======
>>>>>>> dev
			<img src={Img} className="scriptless"/>
			{/* <MidiElement /> */}
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
			{/* <MidiElement /> */}
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
			{/* <MidiElement /> */}
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
				<img src={thumbnail} style = {{height: "400px", width: "400px"}} />
				
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

export default Record;
