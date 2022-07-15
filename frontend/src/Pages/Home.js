import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Cards from '../Components/Home/Home'
import Carousel from '../Components/Carousel/Carousel'

import "react-responsive-carousel/lib/styles/carousel.min.css"

const Home = () => {
  return (
    <>
    <Navbar />
    <br />
    <Cards />
    </>
  )
}

export default Home