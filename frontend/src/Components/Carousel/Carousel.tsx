import React, { useState } from "react";
import parse from 'html-react-parser';
import { Carousel as Caro } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../images/CarouselImages/img1.png"
import img2 from "../../images/CarouselImages/img2.png"
import img3 from "../../images/CarouselImages/img3.png"

const Carousel = () => {
    const imageArray = new Array;
    const imageDivs = new Array;
    
    imageArray.push(img1);
    imageArray.push(img2);
    imageArray.push(img3);

    const spawnImages = () => {
         for (let i = 0; i < imageArray.length; i++) {
            imageDivs.push(
                '<div id="card-container">' + 
                    '<a href="" />' +
                        '<img id="card" alt="" src="' + imageArray[i] + '"/>' + 
                    '</a>' + 
                '</div>'
            );
         }
         return imageDivs;
    }

    let images = spawnImages();

    return (
    <div className="container">
        <Caro autoPlay={true} showThumbs={true} infiniteLoop={true} 
            dynamicHeight={false} interval={10000}
        > 
        {images.map((image) => (
            <div id="cards-container">{parse(image)}</div>
        ))}

        </Caro>
    </div>
    )
}

export default Carousel;