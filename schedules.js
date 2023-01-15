const schedules = {
    time: ({decay, initialRate}) => Object.assign(({rate = initialRate, iteration = 0} = {}) => (
        rate / (1 + decay * iteration)
    ), {
        info: {
            'Schedule': 'Time-based',
            'Decay': decay,
            'Initial Learning Rate': initialRate,
        }
    }),

    step: ({decay, initialRate, dropRate}) => Object.assign(({iteration = 0} = {}) => (
        initialRate * Math.pow(decay, Math.floor((1 + iteration) / dropRate))
    ), {
        info: {
            'Schedule': 'Step-based',
            'Decay': decay,
            'Initial Learning Rate': initialRate,
            'Drop Rate': dropRate,
        }
    }),

    exp: ({decay, initialRate}) => Object.assign(({iteration = 0} = {}) => (
        initialRate * Math.pow(Math.E, -decay * iteration)
    ), {
        info: {
            'Schedule': 'Exponential',
            'Decay': decay,
            'Initial Learning Rate': initialRate,
        }
    }),
};
