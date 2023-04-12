export const calcRoi = ({
    height,
    width,
}: {
    height: number;
    width: number;
}) => {
    const minSide = Math.min(width, height);
    const roiSide = 0.6 * minSide;
    return {
      x: Math.floor(0.5 * width - 0.5 * roiSide),
      y: Math.floor(0.5 * height - 0.5 * roiSide),
      w: Math.ceil(roiSide),
      h: Math.ceil(roiSide),
    };
};

export default calcRoi;
