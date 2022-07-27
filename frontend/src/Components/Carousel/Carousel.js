import React from "react";
import { Carousel } from "react-responsive-carousel";
import {Background1} from "../Home/Background1.png";
import {Background2} from "../Home/Background2.png";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export default () => (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <Carousel autoPlay showThumbs={false}
        infiniteLoop={true} dynamicHeight={true} interval={10000}>
            <div>
                <img alt="About Us" src={Background1} />
            </div>
            <div>
                <img alt="Create an account" src={Background2} />
            </div>
        </Carousel>
    </div>
);
