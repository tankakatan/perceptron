# Perceptron

A basic neural network unit classifying dots on a plane. See more details [here](https://en.wikipedia.org/wiki/Perceptron).

## Live demo

[https://tankakatan.github.io/perceptron/](https://tankakatan.github.io/perceptron/)

## How it works

Every time the page is refreshed a random set of points and a random line are generated. The desired classification is that the dots above or on the line are white and the rest are black.

`Perceptron` starts with random initial weights and tries to find the line approximation using a primitive supervised learning algorythm as follows.

For each point on the plain `Perceptron` calculates a weighted sum of its' `x`, `y` and a `bias` values. If the sum is greater than 0 the dot is considered to be white. If the guess matches the actual class the point is flagged green, and red otherwise.

The weights then get optimised by the product of error (i.e. difference between desired and actual outputs) and the corresponding input times `learning rate`.

The hyperparameter `learning rate` gets decreased over iterations according to the `Learning rate schedule`. Three standard schedules are implemented and available to choose from.

Once all the points are classified correctly, the training is considered successful and stops.

## How to use

* To start / pause training click anywhere on the screen
* To change the `Learning rate schedule` pick a corresponding option before learning starts
* Moving cursor to a point on the screen will make its' coordinates `X` and `Y` appear in the debug output area
