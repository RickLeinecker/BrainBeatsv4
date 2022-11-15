import React, { useState } from "react";
import parse from 'html-react-parser';
import { Carousel as Caro } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Img1 from '../../images/CarouselImages/XXX.png'

const Carousel = () => {
    const tempImage = "https://cdn.discordapp.com/attachments/1019947812592562217/1021486319425294396/unknown.png" // "https://img.freepik.com/free-vector/music-studio-control-room-singer-booth_107791-1637.jpg?w=2000";
    const imageArray = [tempImage];

    const spawnImages = () => {
        let imageDivs = [""];
         for (let i = 0; i < imageArray.length; i++) {
            imageDivs.push(
                '<div id="cardContainer">' + 
                    '<img alt="About Us" src=' + imageArray[i] + '/>' + 
                    '<Button id="cardStyle" href="/About">About Us</Button>' + 
                '</div>'
            );
         }
         return imageDivs;
    }

    let images = spawnImages();

    return (
    <div className="container">
        <Caro autoPlay showThumbs={false} infiniteLoop={true} 
            dynamicHeight={false} interval={10000}
        > 
        {images.map((image) => (
            <div>{parse(image)}</div>
        ))}

        </Caro>
    </div>
    )
}

export default Carousel;