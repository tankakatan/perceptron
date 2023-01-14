import {random} from 'util';
import {Line} from 'la';

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

    const train = ({inputs, guess, target, learningRate}) => {
        const error = target - guess; // 0 | 1 | -1

        for (let i = 0; i < weights.length; i++) {
            weights[i] += error * inputs[i] * learningRate; // Gradient Descent
        }
    }

    const line = () => Line({
        m: -weights[0] / weights[1],
        b: -weights[2] / weights[1],
    });

    return {weights, guess, train, line};
};

export default Perceptron;
