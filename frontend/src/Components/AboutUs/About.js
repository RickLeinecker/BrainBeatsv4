import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className='aboutMainBody'>
      <img src="../Navbar/logo.jpg" />
      <hr />
      <p>BrainBeats is a Senior Design project for computer science students at the University of Central Florida. The project is sponsored by Dr. Leinecker, and has been ongoing since 2019. The premise of BrainBeats is to take the electrical waves in your brain (using an EEG device) and utilize them to generate "music".</p>
      <p>The functionality of this platform allows you to create a script for your recording session, record your song with an EEG headset utilizing your own unique musical settings, posting your recorded songs, downloading the MIDI equivalent of your song, and creating playlists with music you enjoy. The platform allows you to connect with other users creating music with their own EEG headset, and to interact with their posts.</p>
    </div>
  )
}

export default About