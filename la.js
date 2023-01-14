export const Vector = (x, y) => Object.assign([x, y], {
    x,
    y,
    put: ({
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

export const Line = ({start, end, m, b}) => {
    if (start && end) {
        // Line from two points
        m = (end.y - start.y) / (end.x - start.x);
        b = start.y - m * start.x;
    }

    const f = x => m * x + b;
    const f_inverse = y => y / m - b;
    const classify = ({x, y}) => Number(f(x) >= y);
    const toString = (decimals = 2) => (
        `ƒ(x) = ${m.toFixed(decimals)}x ${b < 0 ? '-' : '+'} `+
        `${Math.abs(b).toFixed(decimals)}`
    );

    const draw = ({ctx, lineWidth = 1, strokeStyle = '#000'}) => {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.beginPath();
        ctx.moveTo(0, f(0));
        ctx.lineTo(ctx.canvas.width, f(ctx.canvas.width));
        ctx.stroke();
        ctx.closePath();
    };

    return {m, b, f_inverse, f, draw, classify, toString};
};
