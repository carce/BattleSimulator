const utils = require('./utils')

module.exports = class Squad {
    constructor(units = []) {
        this.units = units
    }

    get health() {
        return this.units.reduce((a, b) => a + b.health, 0)
    }

    get units() {
        return this._units
    }

    set units(value) {
        if (!(value instanceof Array)) throw new Error('Units need to be passed as an array')

        return this._units = value
    }

    get isActive() {
        let active = false
        for (var i = this._units.length - 1; i > 0; i--) {
            if (this._units[i].isActive) {
                active = true
                break
            }
        }

        return active
    }

    attackSuccess() {
        return utils.gavg(this.units.map(unit => unit.attackSuccess))
    }

    attackDamage() {
        return this.units.reduce((a, b) => a + b.attackDamage, 0)
    }

    takeDamage(dmg) {
        let sharedDmg = dmg / this.units.length

        return this.units.forEach(unit => unit.takeDamage(sharedDmg))
    }

    attack(strategy, enemies) {
        let target

        switch (strategy) {
            case 'random':
                target = enemies[Math.floor(Math.random() * enemies.length)]
            break
            case 'weakest':
                target = enemies[enemies.length - 1]
                
                for(let i = enemies.length - 2; i > 0; i--) {
                    if (target.health > enemies[i].health) target = enemies[i]
                }
            break
            case 'strongest':
                target = enemies[enemies.length - 1]
                
                for(let i = enemies.length - 2; i > 0; i--) {
                    if (target.health < enemies[i].health) target = enemies[i]
                }
            break
            default:
            return
        }

        if (target.attackSuccess() < this.attackSuccess()) target.takeDamage(this.attackDamage())
    }
}
