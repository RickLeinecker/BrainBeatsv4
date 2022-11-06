import React from 'react';
import parse from 'html-react-parser';

let getPopularTracks = (numTracks:number) => {
    // hit api for 'numTracks' tracks
    
    let objArray = [
        {"user":"leinecker", "title":"BrainBeatsTrack", "imageSrc": "https://blog.dozmia.com/content/images/2019/01/Portrait-The-Weeknd.jpg"},
        {"user":"heinrich", "title":"bot", "imageSrc": "https://preview.redd.it/q12z8iajgqm01.jpg?auto=webp&s=910c47b3bf8b9458f88bcc13208b0175455dbb35"},
        {"user":"knightro", "title":"just another knight", "imageSrc": "https://cdn.discordapp.com/attachments/1022862908012634172/1028025868175540355/DALLE_2022-10-07_15.27.09_-_A_brain_listening_music_eyes_open_smiling_vector_art.png"},
        {"user":"people", "title":"making music", "imageSrc": ""},
        {"user":"people", "title":"making music", "imageSrc": ""},
        {"user":"people", "title":"making music", "imageSrc": ""},
        {"user":"people", "title":"making music", "imageSrc": ""},
        {"user":"people", "title":"making music", "imageSrc": ""}
    ];

    return objArray;
}

function PopulateTrackCards() {
    const MAX_COLS:number = 4;
    const MAX_ROWS:number = 2;
    const POPULAR_TRACKS = getPopularTracks((MAX_ROWS * MAX_COLS));
    
    var gridArray:string[] = [];
    
    var currentTrackCounter:number = 0;
    let testArr = [];
    for(let i = 0; i < MAX_ROWS; i++){
        
        let populateStr:string = '<div className="row">';
        let defaultImage = 'https://cdn.discordapp.com/attachments/1022862908012634172/1028025868175540355/DALLE_2022-10-07_15.27.09_-_A_brain_listening_music_eyes_open_smiling_vector_art.png';
        
        for(let j = 0; j < MAX_COLS; j++) {
            let currentTrack = POPULAR_TRACKS[currentTrackCounter++];

            let image = currentTrack.imageSrc == "" ? defaultImage : JSON.stringify(currentTrack.imageSrc);
                
            let title = JSON.stringify(currentTrack.title);
            let user = JSON.stringify(currentTrack.user);

            populateStr += '<div className="col">'
                        +  '<div className="card">'
                        +  '<img src=' + image + ' className="card-img-top" alt="..."/> '
                        +  '<div className="card-body">'
                        +  '<h5 className="card-title">' + title + '</h5>'
                        +  '<p className="card-text">' + user + '</p>'
                        +  '</div></div></div>' 
        }
        
        populateStr += '</div>';
        gridArray.push(populateStr);
    }
    return gridArray;
}

const TrackCard = () => {
    var trackCards = PopulateTrackCards();
    
    return (
        <div className='container text-center'>
            {trackCards.map((trackCard) => (
                <div>{parse(trackCard)}</div>
            ))}
        </div>
    )
};

export default TrackCard;