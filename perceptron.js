const activationFunction = x => Number(x >= 0);
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

    const line = () => Line({
        m: -weights[0] / weights[1],
        b: -weights[2] / weights[1],
    });

    return {weights, guess, train, line};
};
