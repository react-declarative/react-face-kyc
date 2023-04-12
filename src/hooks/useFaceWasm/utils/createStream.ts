export const createStream = ({
    height,
    width,
}: {
    height: number,
    width: number,
}) => 
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: 'user',
            width: {
                min: 0,
                max: width,
            },
            height: {
                min: 0,
                max: height,
            },
        },
    });

export default createStream;
