import React from "react";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export default () => (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <Carousel autoPlay showThumbs={false} showIndicators={false}
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
