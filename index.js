const vector = (x, y) => (
    Object.assign([x, y], {
        x,
        y,
        drawPoint: ({ctx, radius, lineWidth = 1, strokeStyle = '#000', fillStyle = '#000'}) => {
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = strokeStyle;
            ctx.fillStyle = fillStyle;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        },
    })
);

const createLine = (x1, y1, x2, y2) => {
    const start = vector(x1, y1);
    const end = vector(x2, y2);
    const k = (y2 - y1) / (x2 - x1);
    const b = y1 - k * x1;
    const getY = (x) => k * x + b;
    const getX = (y) => y / k - b;
    const draw = (ctx, lineWidth = 1, strokeStyle = '#000') => {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        ctx.closePath();
    };
    return {start, end, k, b, getX, getY, draw};
};

const getScreen = () => {
    const pre = document.getElementById('console');
    return {
        clear: () => pre.innerText = '',
        rewrite: (str) => pre.innerText = str,
        write: (str, newLine = true) => pre.innerText += (newLine ? '\n' : '') + str,
    };
};

const zip = (a, b) => a.map((ai, i) => [ai, b[i]]);
const activationFunction = (x) => x >= 0 ? 1 : -1;

const createPerceptron = () => {
    const weights = [
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
    ];

    const guess = (inputs) => activationFunction(
        zip(inputs, weights).reduce((sum, [x, w]) => sum + x * w, 0)
    );

    const getLine = ({canvas}) => {
        const k = - weights[0] / weights[1];
        const b = - weights[2] / weights[1];
        return createLine(0, b, canvas.width, k * canvas.width + b);
    };

    const drawLine = (ctx) => {
        const line = getLine(ctx);
        line.draw(ctx, 1, '#f00');
    }

    return {guess, getLine, drawLine};
};

window.addEventListener('DOMContentLoaded', () => {
    const screen = getScreen();
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const line = createLine(
        0,
        Math.random() * canvas.height,
        canvas.width,
        Math.random() * canvas.height
    );

    line.draw(ctx);

    screen.write(`width = ${canvas.width}`);
    screen.write(`height = ${canvas.height}`);
    screen.write(`k = ${line.k}`);
    screen.write(`b = ${line.b}`);

    const numberOfPoints = 100;
    const points = [];
    const bias = 1;
    const perceptron = createPerceptron();

    perceptron.drawLine(ctx);

    for (let i = 0; i < numberOfPoints; i++) {
        const point = vector(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        );

        points.push(point);
        point.drawPoint({
            ctx,
            radius: 10,
            fillStyle: point.y <= line.getY(point.x) ? '#fff' : '#000',
        });

        const guess = perceptron.guess([point.x, point.y, bias]);
        point.drawPoint({
            ctx,
            radius: 4,
            fillStyle: guess > 0 ? '#0f0' : '#f00',
        });
    }
});
