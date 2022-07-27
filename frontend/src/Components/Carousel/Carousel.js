import React from "react";
import { Carousel } from "react-responsive-carousel";
import Background1 from "./Background1.png";
import Background2 from "./Background2.png";

import Link from 'react-router-dom'

import "react-responsive-carousel/lib/styles/carousel.min.css";

export default () => (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <Carousel autoPlay showThumbs={false}
        infiniteLoop={true} dynamicHeight={true} interval={10000}>
            <div>
                <a href="/About" style={{display: 'block'}}><img alt="About Us" src={Background1} /></a>
            </div>
            <div>
                <a href="/Register" style={{display: 'block'}}><img alt="Create an account" src={Background2} /></a>
            </div>
        </Carousel>
    </div>
);
