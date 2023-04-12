import React from 'react';
import { useEffect, useState } from 'react';

import { makeStyles } from '../../styles/makeStyles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import useFaceWasm, { verifyCompleteEmitter } from '../../hooks/useFaceWasm';

import { CC_VIDEO_HEIGHT, CC_VIDEO_WIDTH } from '../../config/params';

import history from '../../history';

const useStyles = makeStyles()({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
});

export const Content = () => {
    const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement>(null as never);
    const { classes } = useStyles();
    const {
        msgColor: color,
        msgText,
        beginCapture,
        stopCapture,
    } = useFaceWasm();

    const handleRef = (ref: HTMLCanvasElement | null) => {
        if (ref) {
            setCanvasRef(ref);
        }
    };

    useEffect(() => {
        if (canvasRef) {
            beginCapture(canvasRef);
        }
    }, [beginCapture, canvasRef]);

    useEffect(() => verifyCompleteEmitter.once(() => {
        history.push('/done-page');
    }), []);

    useEffect(() => () => {
        stopCapture();
    }, [stopCapture]);

    return (
        <Box className={classes.root}>
            <canvas
                ref={handleRef}
                height={CC_VIDEO_HEIGHT}
                width={CC_VIDEO_WIDTH}
            />
            <Typography sx={{ color, textAlign: 'center' }}>
                {msgText}
            </Typography>
        </Box>
    );
};

export default Content;
