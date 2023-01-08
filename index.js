const vector = (x, y) => (
    Object.assign([x, y], {x, y})
);

const createLine = (x1, y1, x2, y2) => {
    const start = vector(x1, y1);
    const end = vector(x2, y2);
    const k = (y2 - y1) / (x2 - x1);
    const b = y1 - k * x1;
    const getY = (x) => k * x + b;
    const getX = (y) => y / k - b;
    return {start, end, k, b, getX, getY};
};

const getScreen = () => {
    const pre = document.getElementById('console');
    return {
        clear: () => pre.innerText = '',
        rewrite: (str) => pre.innerText = str,
        write: (str, newLine = true) => pre.innerText += (newLine ? '\n' : '') + str,
    };
};

window.addEventListener('DOMContentLoaded', () => {
    const screen = getScreen();
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height =window.innerHeight;

    const line = createLine(
        0,
        Math.random() * canvas.height,
        canvas.width,
        Math.random() * canvas.height
    );

    screen.write(`width = ${canvas.width}`);
    screen.write(`height = ${canvas.height}`);
    screen.write(`k = ${line.k}`);
    screen.write(`b = ${line.b}`);

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(line.start.x, line.start.y);
    ctx.lineTo(line.end.x, line.end.y);
    ctx.stroke();
    ctx.closePath();

    const numberOfPoints = 100;
    const points = [];

    for (let i = 0; i < numberOfPoints; i++) {
        const point = vector(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        );

        ctx.fillStyle = point.y <= line.getY(point.x) ? '#fff' : '#000';

        ctx.beginPath();
        ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        points.push(point);
    }
});
