import React from 'react';
import { useEffect, useState } from 'react';

import { makeStyles } from '../../styles/makeStyles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import useFaceWasm, { verifyCompleteEmitter } from '../../hooks/useFaceWasm';

import { CC_VIDEO_HEIGHT, CC_VIDEO_WIDTH } from '../../config/params';

import recorder from '../../hooks/useFaceWasm/recorder';

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

    useEffect(() => recorder.resultSubject.once((blob) => {
        const link = document.createElement("a");
        link.download = "verify.webm";
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        queueMicrotask(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        });
    }))

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
