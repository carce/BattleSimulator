module.exports = class Unit {
    constructor(options = {}) {
        this.health = options.health || 100
        this.recharge = options.recharge || 1000
    }

    get isActive() {
        if (this.health <= 0) return false

        return true
    }

    get health() {
        return this._health
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
        if (value < 100) return this._recharge = 100

        if (value > 2000) return this._recharge = 2000

        return this._recharge = value
    }

    set isActive(value) {
        return false
    }

    set attackSuccess(value) {
        return false
    }

    set attackDamage(value) {
        return false
    }
}
