window.addEventListener('DOMContentLoaded', () => {
    const screen = DebugOutput();
    const learningRate = document.getElementById('learning-rate');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const line = Line(0, random(canvas.height), canvas.width, random(canvas.height));
    const bias = 1;
    const getLearningRate = () => parseFloat(learningRate.value);

    screen.dump({
        'Learning rate': getLearningRate(),
        'Canvas Width': canvas.width,
        'Canvas Height': canvas.height,
        'Target m': line.m,
        'Target b': line.b,
        'Bias': bias,
    });

    const numberOfPoints = 100;
    const points = Array.from({length: numberOfPoints}).map(() => (
        Vector(random(canvas.width), random(canvas.height))
    ));

    const perceptron = Perceptron(learningRate);

    const redraw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        line.draw(ctx);

        let errorCount = 0;

        for (const point of points) {
            const target = line.getTarget(point)
            point.drawPoint({
                ctx,
                radius: 10,
                fillStyle: target > 0 ? '#fff' : '#000',
            });

            const guess = perceptron.train([point.x, point.y, bias], target, getLearningRate());

            point.drawPoint({
                ctx,
                radius: 4,
                fillStyle: guess > 0 ? '#0f0' : '#f00',
            });

            if (guess !== target) {
                errorCount++
            }

            const {weights: [w0, w1, w2]} = perceptron;
            const {m, b} = perceptron.getLineParams();

            screen.merge({
                'Input #1 Weight': w0,
                'Input #2 Weight': w1,
                'Input #3 Weight': w2,
                'Guess m': m,
                'Guess b': b,
            });
        }

        perceptron.drawLine(ctx);

        return errorCount;
    };

    let run = true;
    let end = false;
    let iterations = 0;

    const loop = () => {
        if (end) {
            return;
        }

        const errorCount = redraw();
        screen.merge({
            'Total iterations': ++iterations,
            'Number of errors': errorCount
        });

        if (!errorCount) {
            end = true;
        }

        if (run) {
            requestAnimationFrame(loop);
        }
    };

    (canvas.onclick = () => {
        run = !run;
        requestAnimationFrame(loop);
    })();

    learningRate.oninput = () => {
        screen.merge({'Learning rate': getLearningRate()});
    };

    canvas.onmousemove = debounce(({clientX, clientY}) => {
        const {left, top} = canvas.getBoundingClientRect();
        screen.merge({
          X: clientX - left,
          Y: clientY - top,
        });
    }, 100);
});
