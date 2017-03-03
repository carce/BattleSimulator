const utils = require('./utils')
const Unit = require('./Unit')
const Solider = require('./Solider')

module.exports = class Vehicle extends Unit {
    constructor(options = {}) {
        super(options)

        this.operators = options.operators
    }

    get isActive() {
        if (this.operators.reduce((a, b) => a + b.isActive, 0) <= 0) return false 

        if (this._health <= 0) return false

        return true
    }

    get health() {
        if (this._health <= 0) return 0

        return this._health + this.operators.reduce((a, b) => a + b.health, 0)
    }

    set health(value) {
        if (value < 0) return this._health = 0

        if (value > 100) return this._health = 100

        return this._health = value
    }

    get recharge() {
        return this._recharge
    }

    set recharge(value) {
        if (value < 1000) return this._recharge = 1000

        if (value > 2000) return this._recharge = 2000

        return this._recharge = value
    }

    get operators() {
        return this._operators
    }

    set operators(value) {
        if (!(value instanceof Array)) {
            if (!(value instanceof Solider)) throw new Error('Operators prop has to be an array or a solider')

            return this._operators = [value]
        }
        else {
            for (let i = value.length - 1; i > 0; i--) {
                if (!(value[i] instanceof Solider)) throw new Error('One of the operators is not a solider')
            }

            if (value.length < 1 || value.length > 3) throw new Error('There has to be between 1 and 3 operators')

            return this._operators = value
        }
    }

    get attackSuccess() {
        let chance = 0.5 * (1 + this.health / 100) * utils.gavg(this.operators.map(op => op.attackSuccess))

        return chance
    }

    get attackDamage() {
        let damage = 0.1 + this.operators.reduce((a, op) => a + op.experience / 100, 0)

        return damage
    }

    takeDamage(dmg) {
        this._health = dmg * 0.6

        if (this._health <= 0) return this.operators.forEach(op => op.health = 0)

        this.operators.forEach(op => op.takeDamage(dmg * 0.1))

        let randOp = Math.floor(Math.random() * this.operators.length)

        this.operators[randOp].takeDamage(dmg * 0.1)
    }
}