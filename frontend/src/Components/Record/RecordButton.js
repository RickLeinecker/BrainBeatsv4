import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

const Red_color = '#FF214D'
const innerCirVar = {
    circle: {
        transform: 'scale(.5)',
        borderRadius: '100%',
    },
    square: {
        transform: 'scale(0.4)',
        borderRadius: '10%',
    },
    pulseIn: {
        transform: 'scale(.4)',
        opacity: 1,
        boxShadow: `0px 0px 0px 3px ${Red_color}`,        
    },
    pulseOut: {
        transform: 'scale(.4)',
        opacity: 1,
        boxShadow: `0px 0px 0px 1px ${Red_color}`,
    },

}

const outerCirVar = {
    circle: {
        transform: 'scale(.7)',
        opacity: 0.5,
        boxShadow: `0px 0px 0px 5px ${Red_color}`,
    },
    largeCircle: {
        transform: 'scale(.9)',
        opacity: 1,
        boxShadow: `0px 0px 0px 5px ${Red_color}`,
    },
    pulseIn: {
        transform: 'scale(.9)',
        opacity: 1,
        boxShadow: `0px 0px 0px 7px ${Red_color}`,
    },
    pulseOut: {
        transform: 'scale(.9)',
        opacity: 1,
        boxShadow: `0px 0px 0px 3px ${Red_color}`,
    },
}

const ReplayButton = () => {
    const [hover, setHover] = useState(false);

    const innerCircleAnimation = useAnimation();
    const outerCircleAnimation = useAnimation();

    useEffect(() => {
        (async () => {
            if (hover) {
                await outerCircleAnimation.start('largeCircle');
                await outerCircleAnimation.start(['pulseOut', 'pulseIn'], {
                    repeat: Infinity,
                    repeatType: 'mirror'
                });
            }
            else {
                await outerCircleAnimation.start('circle');
            }
        })();
    }, [hover]);

    useEffect(() => {
        (async () => {
            if (hover) {
                await innerCircleAnimation.start('square');
                await innerCircleAnimation.start(['pulseOut', 'pulseIn'], {
                    repeat: Infinity,
                    repeatType: 'mirror'
                });
            }
            else {
                await innerCircleAnimation.start('circle');
                await innerCircleAnimation.stop(['pulseOut', 'pulseIn'])
            }
        })();
    }, [hover]);

    return (
        <>
            <div
                style={{...styles.container}}
                onClick={() => {
                    if (!hover) setHover(true)
                    else setHover(false)
                }} >
                <motion.div initial='circle' animate={outerCircleAnimation} variants={outerCirVar} style={{ ...styles.circle, ...styles.outerCircle }} />
                <motion.div initial='circle' animate={innerCircleAnimation} variants={innerCirVar} style={{ ...styles.circle, ...styles.innerCircle }} />
            </div>
        </>


    )
}

const styles = {
    container: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
    },
    circle: {
        position: 'absolute',
    },
    outerCircle: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 9999,
    },
    innerCircle: {
        width: '90%',
        height: '90%',
        overflow: 'hidden',
        backgroundColor: Red_color,
    },
};

export default ReplayButton