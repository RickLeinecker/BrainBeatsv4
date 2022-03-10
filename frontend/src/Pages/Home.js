import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Cards from '../Components/Cards/Cards'

const Home = () => {
  return (
    <>
    <Navbar />
    <br />
    <h1>Your Song</h1>
    <br />
    <Cards />
    <br />
    <h1>Favorite Song</h1>
    <br />
    <Cards />
    </>
  )
}

export default Home