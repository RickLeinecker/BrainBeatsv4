import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import PlaylistsBody from '../Components/Playlist/PlaylistMain'
import PlaylistBody from '../Components/Playlist/PlaylistSingle'

const Playlists = () => {
  return (
    <>
    <Navbar />
    <PlaylistsBody />
    </>
  )
}
const Playlist = () => {
  return (
    <>
    <Navbar />
    <PlaylistBody />
    </>
  )
}

export {Playlist, Playlists}