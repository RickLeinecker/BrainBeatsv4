import { useRecoilValue } from 'recoil';
import { userModeState } from '../../Components/context/GlobalState'
import TrackCard from '../TrackCard/TrackCard'
import './Search.css';

const Search = () => {


    // let recentTracks = list recently searched tracks if any
    // let topTracks = Call same api point we used for home for top voted tracks
    // let userTracks = list a "My tracks" section if logged in 
    // let tracks = list a "all tracks" section with lazy loading of ~ 9 tracks 

    
    return (
        <div className='container' id='main-container'>
            <h2 className='text-decoration-underline' > Search for a track </h2>
            <br />

            <div className='form-outline' >
                <input className='form-control' />

            </div>

            <br />
            <h3 id='note'>Populate list of: </h3>
            <h3 id='note'>search results. </h3>
            <h3 id='note'>filtering?</h3>
            f
            {/* <TrackCard /> Should this component have an argument for track type? (! recent tracks, top tracks, user tracks, etc...) */}

        </div>);
}

export default Search;