import React, { useContext, useState } from 'react';
import RecordButton from './RecordButton';
import { Carousel } from "react-responsive-carousel";
import { SliderPicker } from 'react-color'
import './record.css'
import { FaAngleRight, FaAngleLeft, FaRegPlayCircle, FaRegPauseCircle } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext';


function Record() {
    //Set onLoad to link
    const [type, setType] = useState('link');
    const { user } = useContext(AuthContext);
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
      };

    return (
        <div>
            <div className="">
                <label className="switch">
                    <input type="checkbox" className="switch-input" checked={checked} onChange={handleChange}/>
                    <span className="switch-label" data-on="Script" data-off="Link"></span>
                    <span className="switch-handle"></span>
                </label>
            </div>
            <ScriptThing show={checked === true} />
            <LinkThing show={checked === false} />
            <Setting />
        </div>
    );
}

function LinkThing(shown) {
    //Link test
    //https://www.youtube.com/watch?v=l0jJGlalLh8

    const [id, setId] = useState('');
    const [stage, setStage] = useState(0)

    let correctLink = id.split('='); //return the string with youtube id

    let url = correctLink[1];
    const goNext = (e) => {
        e.preventDefault()
        setStage(stage + 1)
    }
    const goBack = (e) => {
        e.preventDefault()
        setStage(stage - 1)

    }
    if (shown.show) {
        return <>
            {stage == 0 && (
                <>
                    <div className='container scriptBox'>

                        <p className='textColor'>Script Setting</p>
                        <br />
                        <label className='textColor'>Youtube LInk</label>
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

                        <button className='nextButton' onClick={goNext}>POST {<FaAngleRight />}</button>

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

function ScriptThing(shown) {
    const [script, setScript] = useState('');
    const [speed, setSpeed] = useState(1000);
    const [background, setBackground] = useState('#fff')
    const [textColor, setTextColor] = useState('#000')
    const [stage, setStage] = useState(0)

    let words = script.split(', ');

    //Go to next step in recording
    const goNext = (e) => {
        e.preventDefault()
        setStage(stage + 1)
    }
    //Go back a step in recording
    const goBack = (e) => {
        e.preventDefault()
        setStage(stage - 1)

    }
    if (shown.show) {
        return <>
            {stage == 0 && (
                <>
                    <div className='container scriptBox'>

                        <p className='textColor'>Script Setting</p>
                        <br />
                        <textarea value={script} className='scriptTextBox' rows='5' cols='50' placeholder='Wordbox (seperate inputs by commas and spaces)' onChange={(e) => setScript(e.target.value)} />
                        <br />
                        <label className='textColor'>Slideshow Speed</label> <br />
                        <input value={speed / 1000} type='number' placeholder='(seconds)' onChange={(e) => setSpeed(e.target.value * 1000)} />
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
                                <ValidScript scripts={[words, speed, background, textColor]} />
                            </div>
                            <div className='col scriptBox'>
                                <label className='textColor'>Slideshow Background</label>
                                <SliderPicker color={background} onChangeComplete={(e) => setBackground(e.hex)} />
                                <label className='textColor'>Text color</label>
                                <SliderPicker color={textColor} onChangeComplete={(e) => setTextColor(e.hex)} />
                                <button className='nextButton' onClick={goBack}>{<FaAngleLeft />}SCRIPT</button>
                                <button className='nextButton' onClick={goNext}>POST {<FaAngleRight />}</button>

                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    }
    return <></>;
}

function ValidScript(scripts) {
    console.log(scripts);
    let wordArray = scripts.scripts[0];
    let speed = scripts.scripts[1];
    let backgroundCol = scripts.scripts[2];
    let textColor = scripts.scripts[3];


    return (
        <>
            <div>
                To start click left or right side of slideshow
            </div>
            <Carousel autoPlay width={700} showThumbs={false} showIndicators={false}
                infiniteLoop={true} dynamicHeight={true} interval={speed}>
                {wordArray.map(
                    (word) =>
                        <div style={{ background: `${backgroundCol}`, color: `${textColor}`, padding: '250px' }}>
                            {word}
                        </div>)}
            </Carousel>

        </>
    )


}

function Setting() {
    let st = {
        height: '100px',
        position: 'fixed',
        bottom: '0%',
        width: '100%',
        backgroundColor: '#393838',
        opacity: '1',
    }

    const [record, setRecord] = useState(false)



    return (
        <>
            <div style={st}>
                <table style={{ width: '100%', height: '100px' }}>
                    <tr>
                        <td style={{ width: '25%', textAlign: 'center' }}>
                            <div style={{ color: 'white' }}>Key Signature</div>

                            <select>
                                <option>C</option>
                                <option>C#/Db</option>
                                <option>D</option>
                                <option>D#/Eb</option>
                                <option>E</option>
                                <option>F</option>
                                <option>F#/Gb</option>
                                <option>G</option>
                                <option>G#/Ab</option>
                                <option>A</option>
                                <option>B</option>
                            </select>
                            <div style={{ color: 'white' }}>Scale</div>
                            <select>
                                <option>Major</option>
                                <option>Minor</option>
                            </select>
                        </td>
                        <td style={{ width: '22%', textAlign: 'left' }}>

                        </td>
                        <td style={{ textAlign: 'left' }}>
                            {record ?
                                <>
                                    <button className='recordButton' onClick={(e) => setRecord(false)}>
                                        <FaRegPauseCircle size={60} className='reactIcon' />
                                    </button>
                                </> :
                                <>
                                    <button className='recordButton' onClick={(e) => setRecord(true)}>
                                        <FaRegPlayCircle size={60} className='reactIcon' />
                                    </button>
                                </>

                            }
                        </td>
                        <td style={{ width: '25%', textAlign: 'center' }}>
                            <div style={{ color: 'white' }}>Tempo</div>
                            <input type="text" defaultValue="120" />
                        </td>
                    </tr>

                </table>
            </div>

        </>
    );

}

export default Record;