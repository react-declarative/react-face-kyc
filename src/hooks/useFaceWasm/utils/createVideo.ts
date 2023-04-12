export const createVideo = (stream: MediaStream) => {
    const video = document.createElement('video');
    video.style.objectFit = 'cover';
    video.srcObject = stream;
    video.style.position = 'fixed';
    video.style.left = `-${window.screen.width}px`;
    document.body.appendChild(video);
    video.play();
    return video;
};

export default createVideo;
