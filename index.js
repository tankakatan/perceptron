window.addEventListener('DOMContentLoaded', () => {
    const screen = DebugOutput();
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const line = Line({
        start: Vector(0, random(canvas.height)),
        end: Vector(canvas.width, random(canvas.height)),
    });

    const bias = 1;

    screen.dump({
        'Canvas Width': canvas.width,
        'Canvas Height': canvas.height,
        'Bias': bias,
        'Target': line.toString(),
    });

    const numberOfPoints = 100;
    const points = Array.from({length: numberOfPoints}).map(() => (
        Vector(random(canvas.width), random(canvas.height))
    ));

    let learningRate = 0.1;

    const perceptron = Perceptron();
    screen.merge({'Guess': perceptron.line().toString()});

    const learn = ({noTrain} = {}) => {
        let errorCount = 0;

        for (const point of points) {
            const inputs = [point.x, point.y, bias];

            point.target = line.classify(point)
            point.guess = perceptron.guess(inputs);

            if (!noTrain) {
                perceptron.train({inputs, ...point, learningRate});
            }

            errorCount += Number(point.target !== point.guess);

            const {weights: [w0, w1, w2]} = perceptron;

            screen.merge({'Weight X': w0, 'Weight Y': w1, 'Weight B': w2});
        }

        return errorCount;
    };

    const redraw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        line.draw({ctx});
        perceptron.line().draw({ctx, strokeStyle: '#f00'});

        for (const point of points) {
            point.put({ctx, radius: 10, fillStyle: point.target ? '#fff' : '#000'});
            point.put({ctx, radius: 4, fillStyle: point.guess ? '#0f0' : '#f00'});
        }
    };

    let run = true;
    let end = false;
    let iterations = 0;
    let lastErrorCounts = [];

    const loop = e => requestAnimationFrame(() => {
        if (end) {
            return;
        }

        const errorCount = learn(e);
        redraw();

        screen.merge({
            'Guess': perceptron.line().toString(),
            'Total iterations': ++iterations,
            'Number of errors': errorCount,
            'Learning Rate': learningRate,
        });

        if (!errorCount) {
            end = true;
        }

        lastErrorCounts.push(errorCount);

        if (lastErrorCounts.length > 10) {
            lastErrorCounts = lastErrorCounts.slice(-10);
        }

        learningRate = learningRate * .9;

        if (!run) {
            return;
        }

        loop();
    });

    (canvas.onclick = e => {
        run = !run;
        loop(e);
    })({noTrain: true});

    canvas.onmousemove = debounce(({clientX, clientY}) => {
        const {left, top} = canvas.getBoundingClientRect();
        screen.merge({
          X: clientX - left,
          Y: clientY - top,
        });
    }, 100);
});
