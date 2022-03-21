import React from "react";
import { Carousel } from "react-responsive-carousel";

export default () => (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <Carousel autoPlay width={700} showThumbs={false} showIndicators={false}
        infiniteLoop={true} dynamicHeight={true}>
            <div>
                <img alt="" src="https://blog.greendot.org/wp-content/uploads/sites/13/2021/09/placeholder-image.png" />
            </div>
            <div>
                <img alt="" src="https://blog.greendot.org/wp-content/uploads/sites/13/2021/09/placeholder-image.png" />
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