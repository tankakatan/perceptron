window.addEventListener('DOMContentLoaded', () => {
    const screen = DebugOutput();
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const line = Line(random(-1, 1), random(-1, 1));
    const bias = 1;
    const numberOfPoints = 100;
    const points = Array.from({length: numberOfPoints}).map(() => (
        Vector(random(-1, 1), random(-1, 1))
    ));

    const perceptron = Perceptron();

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
        perceptron.line().draw({ctx, strokeStyle: '#00f'});

        for (const point of points) {
            point.put({ctx, radius: 10, fillStyle: point.target ? '#fff' : '#000'});
            point.put({ctx, radius: 4,
                fillStyle: point.guess === point.target ? '#0f0' : '#f00'
            });
        }
    };

    let run = true;
    let end = false;
    let iteration = 0;
    let learningRate;
    let schedule;

    const scheduler = document.getElementById('schedules');

    (scheduler.onchange = () => {
        const {selectedOptions: [{value: kind}]} = scheduler;

        schedule = schedules[kind]({decay: 0.01, initialRate: 0.1, dropRate: 20});
        learningRate = schedule();
        screen.merge(schedule.info);
    })();

    screen.dump({
        'Canvas Width': canvas.width,
        'Canvas Height': canvas.height,
        'Data Set Size': numberOfPoints,
        'Bias': bias,
        ...schedule.info,
        'Learning Rate': learningRate,
        'Target': line.toString(),
        'Guess': perceptron.line().toString(),
    });

    const loop = e => requestAnimationFrame(() => {
        if (end) {
            return;
        }

        const errorCount = learn(e);
        redraw();

        screen.merge({
            'Guess': perceptron.line().toString(),
            'Total iterations': ++iteration,
            'Number of errors': errorCount,
            'Learning Rate': learningRate,
        });

        if (!errorCount) {
            end = true;
        }

        learningRate = schedule({rate: learningRate, iteration});

        if (!run) {
            return;
        }

        loop();
    });

    (canvas.onclick = e => {
        run = !run;
        if (run && !scheduler.disabled) {
            scheduler.disabled = true;
        }

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
