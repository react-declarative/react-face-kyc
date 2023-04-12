export const createDraw = (context: CanvasRenderingContext2D, {
    height,
    width,
}: {
    height: number;
    width: number;
}) => ({
    x,
    y,
    w,
    h,
}: {
    x: number;
    y: number;
    w: number;
    h: number;
}, color = 'white') => {
    // context.clearRect(0, 0, width, height);

    const side = Math.min(w, h) * 0.3;

    const line = ([x1, y1]: number[], [x2, y2]: number[]) => {
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.lineWidth = 3;
      context.strokeStyle = color;
      context.stroke();
    };

    line([x, y], [x, y + side]);
    line([x, y], [x + side, y]);

    line([x + w, y], [(x + w) - side, y]);
    line([x + w, y], [x + w, y + side]);

    line([x, y + h], [x, (y + h) - side]);
    line([x, y + h], [x + side, y + h]);

    line([x + w, y + h], [(x + w) - side, y + h]);
    line([x + w, y + h], [x + w, (y + h) - side]);

};

export default createDraw;
