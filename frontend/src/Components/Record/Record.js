import React, { useState } from 'react';
import RecordButton from './RecordButton';
import { Carousel } from "react-responsive-carousel";

function Record() {
    //Set onLoad to link
    const [type, setType] = useState('link');

    return (
        <div>
            <select onChange={e => { setType(e.target.value) }}>
                <option value={"link"}>Youtube</option>
                <option value={"script"}>Script</option>
            </select>
            <ScriptThing show={type === "script"} />
            <LinkThing show={type === "link"} />
            <Setting />
        </div>
    );
}

function LinkThing(shown) {
    //Link test
    //https://www.youtube.com/watch?v=l0jJGlalLh8

    const [id, setId] = useState('');
    let correctLink = id.split('=');
    let url = correctLink[1];
    if (shown.show) {
        return (
            <div>
                <input placeholder='Youtube Link' onChange={(e) => setId(e.target.value)} /> <br />
                <VidLink link={url} />
            </div>)
    }
    return <></>;
}

function VidLink(link) {

    //https://www.youtube.com/watch?v=DSBBEDAGOTc
    if (link.link != undefined) {
        return (
            <>

                <iframe
                    width="853"
                    height="480"
                    src={`https://www.youtube.com/embed/${link.link}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title="Embedded youtube"
                />
            </>
        )
    } else {
        return (
            <>
                <div>Please provide a valid Link</div>
            </>
        )
    }
}

function ScriptThing(shown) {
    const [script, setScript] = useState('');
    let words = script.split(', ');
    if (shown.show) {
        return <>
        <br />
            <input placeholder='Scripts' onChange={(e) => setScript(e.target.value)} /> <br />
            <ValidScript scripts={words} />
            </>
    }
    return <></>;
}

function ValidScript(scripts){
    console.log(scripts);
    let wordArray = scripts.scripts;
    if(wordArray != ''){
        return(
            <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Carousel autoPlay width={700} showThumbs={false} showIndicators={false}
                    infiniteLoop={true} dynamicHeight={true} interval={1000}>
                    {wordArray.map((word) => <div>{word}</div>)}
                </Carousel>
            </div>
            </>
        )
        
    }
    else{
        return(<>
            <div>Please provide valid words</div>
            </>)
        
    }

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
                        <td>
                            <RecordButton />
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