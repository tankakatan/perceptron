const Vector = (x, y) => Object.assign([x, y], {
    x,
    y,
    put: ({
        ctx,
        ctx: {canvas: {width, height}},
        radius,
        lineWidth = 1,
        strokeStyle = '#000',
        fillStyle = '#000'
    }) => {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        ctx.arc(
            rescale(x, -1, 1, 0, width),
            rescale(y, -1, 1, height, 0),
            radius,
            0, 2 * Math.PI
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    },
});

const Line = (m, b) => {
    const f = x => m * x + b;
    const f_inverse = y => y / m - b;
    const classify = ({x, y}) => Number(f(x) >= y);
    const toString = (decimals = 2) => (
        `ƒ(x) = ${m.toFixed(decimals)}x ${b < 0 ? '-' : '+'} `+
        `${Math.abs(b).toFixed(decimals)}`
    );

    const draw = ({ctx, ctx: {canvas: {width, height}}, lineWidth = 1, strokeStyle = '#000'}) => {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.beginPath();
        ctx.moveTo(rescale(-1, -1, 1, 0, width), rescale(f(-1), -1, 1, height, 0));
        ctx.lineTo(rescale( 1, -1, 1, 0, width), rescale(f( 1), -1, 1, height, 0));
        ctx.stroke();
        ctx.closePath();
    };

    return {m, b, f_inverse, f, draw, classify, toString};
};
