import { useCallback, useState, useRef } from 'react';
import { Source, compose } from 'react-declarative';

import { stateEmitter, cordEmitter, messageEmitter } from './emitters';

import createStream from './utils/createStream';
import createVideo from './utils/createVideo';
import createDraw from './utils/createDraw';
import calcRoi from './utils/calcRoi';
import createWorker from './utils/createWorker';
import createMainLoop from './utils/createMainLoop';

import { CC_VIDEO_HEIGHT, CC_VIDEO_WIDTH } from '../../config/params';

const notifier = Source.merge([
    stateEmitter,
    cordEmitter,
    messageEmitter,
]);

const initStream = async () => {
    const stream = await createStream({
        height: CC_VIDEO_HEIGHT,
        width: CC_VIDEO_WIDTH,
    });
    const [ track ] = stream.getVideoTracks();
    const { height = CC_VIDEO_HEIGHT, width = CC_VIDEO_WIDTH } = track.getSettings();
    const video = createVideo(stream);
    return { stream, video, height, width};
};

export const useFaceWasm = () => {

    const stopCaptureRef = useRef(() => undefined);

    const [msgText, setMsgText] = useState("Loading");
    const [msgColor, setMsgColor] = useState("orange");
    const [workerLoaded, setWorkerLoaded] = useState(false);

    const beginCapture = useCallback(async (canvas: HTMLCanvasElement) => {

        let cord: any = null;
        let color: any = null;

        const { stream, video, height, width } = await initStream();
        const context = canvas.getContext('2d');

        if (!context) {
            throw new Error();
        }

        if (!stream) {
            throw new Error();
        }

        const drawHelper = createDraw(context, {
            height,
            width,
        });
    
        const drawBoxes = () => {
            if (cord !== null && color !== null) {
                drawHelper(cord, color);
            }
            const roi = calcRoi({
                height,
                width,
            });
            drawHelper(roi, 'orange');
        };

        const disposeNotifier = notifier.connect((signal) => {
            if (signal.type === 'facewasm-cord') {
                cord = {
                    x: Number(signal.x),
                    y: Number(signal.y),
                    w: Number(signal.w),
                    h: Number(signal.h),
                };
            } else if (signal.type === 'facewasm-msg') {
                color = signal.color;
                setMsgText(signal.text);
                setMsgColor(signal.color);
            }
        });

        const disposeLoop = createMainLoop(context, video, {
            drawBoxes,
            height,
            width,
        });

        const disposeWorker = createWorker(height, width, () => {
            setWorkerLoaded(true);
        });

        const disposeVideo = () => {
            stream.getVideoTracks()[0].stop();
            document.body.removeChild(video);
        };

        stopCaptureRef.current = compose(
            () => disposeNotifier(),
            () => disposeWorker(),
            () => disposeLoop(),
            () => disposeVideo(),
        );

    }, []);

    const stopCapture = useCallback(() => stopCaptureRef.current(), []);

    return {
        msgText,
        msgColor,
        workerLoaded,
        beginCapture,
        stopCapture,
    };
};

export default useFaceWasm;
