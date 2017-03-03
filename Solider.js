const utils = require('./utils')
const Unit = require('./Unit')

module.exports = class Solider extends Unit {
    constructor(options = {}) {
        super(options)

        this._experience = 0
    }

    get experience() {
        return this._experience
    }

    set experience(value) {
        if (value < 0) return this.experience = 0

        if (value > 50) return this.experience = 50

        return this.experience = value
    }

    get attackSuccess() {
        let chance = 0.5 * (1 + this.health / 100) * utils.randomRangeInclusive(50 + this.experience, 100) / 100

        return chance
    }

    get attackDamage() {
        let damage = 0.05 + this.experience / 100

        return damage
    }

    takeDamage(dmg) {
        this.health -= dmg
        
        console.log(this.health)
    }
}