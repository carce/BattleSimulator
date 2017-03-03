const utils = require('./utils')
const Squad = require('./Squad')

module.exports = class Army {
    constructor(squads = []) {
        this.squads = squads
    }

    get isActive() {
        return !!this.squads.reduce((a, b) => a + b.isActive, 0)
    }

    get squads() {
        return this._squads
    }

    set squads(value) {
        if (!(value instanceof Array)) throw new Error('Squads should be an array')

        if (value.length < 2) throw new Error('Army has to have at least 2 squads')

        for (let i = value.length - 1; i > 0; i--) {
            if (!(value[i] instanceof Squad)) throw new Error('All squads needs to be instances of the class Squad')
        }

        return this._squads = value
    }

    get strategy() {
        return this._strategy
    }

    set strategy(value) {
        return false
    }

    chooseStrategy() {
        this._strategy = utils.attackStrategy[Math.floor(Math.random() * 3)]
    }

    attack(armies) {
        this.squads.forEach(squad => squad.attack(this.strategy, armies.reduce((a, b) => a.concat(b.squads), []).filter(squad => squad.isActive)))
    }
}
