module.exports = {
    randomRangeInclusive: function(min = 0, max = 100) {
        min = Math.ceil(min)
        max = Math.floor(max)

        return Math.floor(Math.random() * (max - min + 1) + min)
    },

    gavg: function(values) {
        if (!(values instanceof Array)) throw new Error('Parameter has to be an array')

        return Math.pow(values.reduce((a, b) => a * b), 1 / values.length)
    },

    attackStrategy: {
      '0': 'random',
      '1': 'weakest',
      '2': 'strongest'
    }
}
