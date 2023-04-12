
const drawImage = (context: CanvasRenderingContext2D, video: HTMLVideoElement, { height, width }: IParams) => {
  context.clearRect(0, 0, width, height);
  context.drawImage(video, 0, 0, width, height);
};

interface IParams {
  drawBoxes?: (ctx: CanvasRenderingContext2D) => void;
  height: number;
  width: number;
}

export const createMainLoop = (context: CanvasRenderingContext2D, video: HTMLVideoElement, params: IParams) => {
  let dispose = false;
  const onPlay = () => {
    try {
      const { drawBoxes } = params;
      drawImage(context, video, params);
      drawBoxes && drawBoxes(context);
    } finally {
      if (!dispose) {
        requestAnimationFrame(onPlay);
      }
    }
  };
  onPlay();
  return () => {
    dispose = true;
  };
};

export default createMainLoop;
