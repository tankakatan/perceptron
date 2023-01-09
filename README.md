# Perceptron

A basic neural network unit classifying dots on a plane. See more details [here](https://en.wikipedia.org/wiki/Perceptron).

## Live demo

[https://tankakatan.github.io/perceptron/](https://tankakatan.github.io/perceptron/)

## How it works

Every time the page is refreshed a random set of points and a random line are generated. The desired classification is that the dots above or on the line are white and the rest are black.

`Perceptron` starts with random initial weights and tries to find the line approximation using a primitive supervised learning algorythm as follows.

For each point on the plain `Perceptron` calculates a weighted sum of its' `x`, `y` and a `bias` values. If the sum is greater than 0 (_activation function_) the dot is classified as white and such guess is colored with green.

The weights then get incremented by the product of difference between desired and actual outputs, the corresponding input and the learning rate which can be changed during the training.

Once all the points are classified correctly, the training is considered successful and stops.

## How to use

* To start / pause training click anywhere on the screen
* To change `Learning rate` move the corresponding slider
* Moving cursor to a point on the screen will make its' coordinates `X` and `Y` appear in the debug output area
