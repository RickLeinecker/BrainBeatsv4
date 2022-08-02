import React from "react";
import { Carousel } from "react-responsive-carousel";
import Background1 from "./Background1.png";
import Background2 from "./Background2.png";
import { Button } from "react-bootstrap";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const cardStyle ={
    position: 'relative',
    bottom: '50%',
    transform: 'translateY(-50%)',
    fontSize: '24px',
    transform: 'translateX(400px)'
}
const cardContainer = {
    position: 'relative',
    height:'100%',
}

export default () => (
    <div>
        <Carousel autoPlay showThumbs={false}
        infiniteLoop={true} dynamicHeight={true} interval={10000}>
            <div style={cardContainer}>
                <img alt="About Us" src={Background1} /> 
                <Button style={cardStyle}>About Us</Button> 
            </div>
            <div style={cardContainer}>
                <img alt="Create an account" src={Background2} />
                <Button style={cardStyle}>Register</Button>
            </div>
        </Carousel>
    </div>
);
