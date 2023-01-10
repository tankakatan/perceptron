window.addEventListener('DOMContentLoaded', () => {
    const screen = DebugOutput();
    const learningRate = document.getElementById('learning-rate');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const line = Line({
        start: Vector(0, random(canvas.height)),
        end: Vector(canvas.width, random(canvas.height)),
    });

    const bias = 1;
    const getLearningRate = () => parseFloat(learningRate.value);

    screen.dump({
        'Learning rate': getLearningRate(),
        'Canvas Width': canvas.width,
        'Canvas Height': canvas.height,
        'Bias': bias,
        'Target': line.toString(),
    });

    const numberOfPoints = 100;
    const points = Array.from({length: numberOfPoints}).map(() => (
        Vector(random(canvas.width), random(canvas.height))
    ));

    const perceptron = Perceptron();

    const redraw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        line.draw({ctx});

        let errorCount = 0;

        for (const point of points) {
            const target = line.classify(point)
            const guess = perceptron.train([point.x, point.y, bias], target, getLearningRate());

            errorCount += Number(guess !== target);

            point.put({ctx, radius: 10, fillStyle: target ? '#fff' : '#000'});
            point.put({ctx, radius: 4, fillStyle: guess ? '#0f0' : '#f00'});

            const {weights: [w0, w1, w2]} = perceptron;

            screen.merge({
                'Guess': perceptron.line(ctx).toString(),
                'Weight X': w0,
                'Weight Y': w1,
                'Weight B': w2,
            });
        }

        perceptron.line().draw({ctx, strokeStyle: '#f00'});

        return errorCount;
    };

    let run = true;
    let end = false;
    let iterations = 0;

    const loop = () => requestAnimationFrame(() => {
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

        if (!run) {
            return;
        }

        loop();
    });

    (canvas.onclick = () => {
        run = !run;
        loop();
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
