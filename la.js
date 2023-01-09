const Vector = (x, y) => Object.assign([x, y], {
    x,
    y,
    drawPoint: ({
        ctx,
        radius,
        lineWidth = 1,
        strokeStyle = '#000',
        fillStyle = '#000'
    }) => {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    },
});

const Line = (x1, y1, x2, y2) => {
    const start = Vector(x1, y1);
    const end = Vector(x2, y2);
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;
    const getY = (x) => m * x + b;
    const getX = (y) => y / m - b;
    const getTarget = (point) => point.y <= getY(point.x) ? 1 : -1;
    const draw = (ctx, lineWidth = 1, strokeStyle = '#000') => {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        ctx.closePath();
    };

    return {start, end, m, b, getX, getY, draw, getTarget};
};
