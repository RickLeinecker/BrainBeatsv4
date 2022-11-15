import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import CreateTrackPage from '../Components/CreateTrack/CreateTrack'

const CreateTrack = () => {
  return (
    <>
        <Navbar />
    <Sidebar />
    <CreateTrackPage />
    </>
  )
}
  
export default CreateTrack;