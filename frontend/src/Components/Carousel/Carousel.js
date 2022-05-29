import React from "react";
import { Carousel } from "react-responsive-carousel";

export default () => (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <Carousel autoPlay width={700} showThumbs={false} showIndicators={false}
        infiniteLoop={true} dynamicHeight={true} interval={10000}>
            <div>
                <img alt="" src="http://via.placeholder.com/2048x1024" />
            </div>
            <div>
                <img alt="" src="http://via.placeholder.com/2048x1024" />
            </div>
            <div>
                <img alt="" src="http://via.placeholder.com/2048x1024" />
            </div>
        </Carousel>
    </div>
);


// Don't forget to include the css in your page 
// <link rel="stylesheet" href="carousel.css"/>
// Begin DemoSliderControls