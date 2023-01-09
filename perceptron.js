const activationFunction = x => x >= 0 ? 1 : -1;
const Perceptron = () => {
    const weights = [random(-1, 1), random(-1, 1), random(-1, 1)];
    const guess = inputs => {
        let weightedSum = 0;
        for (let i = 0; i < weights.length; i++) {
            weightedSum += inputs[i] * weights[i];
        }

        return activationFunction(weightedSum);
    };

    const train = (inputs, target, learningRate) => {
        const assumption = guess(inputs);
        const error = target - assumption; // 0 | 2 | -2

        for (let i = 0; i < weights.length; i++) {
            weights[i] += error * inputs[i] * learningRate; // Gradient Descent
        }

        return guess(inputs);
    }

    const getLineParams = () => ({
        m: - weights[0] / weights[1],
        b: - weights[2] / weights[1],
    });

    const getLine = ({canvas}) => {
        const {m, b} = getLineParams()
        return Line(0, b, canvas.width, m * canvas.width + b);
    };

    const drawLine = (ctx) => {
        const line = getLine(ctx);
        line.draw(ctx, 1, '#f00');
    }

    return {weights, guess, getLineParams, getLine, drawLine, train};
};
