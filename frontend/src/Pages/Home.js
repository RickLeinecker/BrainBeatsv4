import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Cards from '../Components/Cards/Cards'
import Carousel from '../Components/Carousel/Carousel'

import "react-responsive-carousel/lib/styles/carousel.min.css"

const Home = () => {
  return (
    <>
    <Navbar />
    <br />
    <Carousel />
    <br />
    <h1>Top Songs</h1>
    <Cards />
    </>
  )
}

export default Home