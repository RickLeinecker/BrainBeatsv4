import { useState } from 'react';

function Record() {

    //Set onLoad to link
    const [type, setType] = useState('link');

    function clicky() {
        alert(type)
    }
    return (
        <div>
            <select onChange={e => { setType(e.target.value) }}>
                <option value={"link"}>Youtube</option>
                <option value={"script"}>Script</option>
            </select>
            <ScriptThing show={type === "script"} />
            <LinkThing show={type === "link"} />
        </div>
    );
}

function LinkThing(shown) {
    //Link test
    //https://www.youtube.com/watch?v=l0jJGlalLh8

    const [id, setId] = useState('');
    let correctLink = id.split('=');

    function handelChange(e) {

    }
    if (shown.show) {
        return (
            <div>
                <input placeholder='Youtube Link' onChange={(e) => setId(e.target.value)} /> <br />
                <iframe
                    width="853"
                    height="480"
                    src={`https://www.youtube.com/embed/${correctLink[1]}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title="Embedded youtube"
                />
            </div>)
    }
    return <></>;
}

function ScriptThing(shown) {
    const [script, setScript] = useState();
    if (shown.show) {
        return <div>Script Stuff Here</div>
    }
    return <></>;
}

export default Record;