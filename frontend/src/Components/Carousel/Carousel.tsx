import React, { useState } from "react";

const Carousel = () => {

    const[isMoving, setIsMoving] = useState(false);
    const toggle = () => setIsMoving(!isMoving);
    return (<div>

    </div>)
}

export default Carousel;