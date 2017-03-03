const Solider = require('./Solider')
const Vehicle = require('./Vehicle')
const Squad = require('./Squad')
const Army = require('./Army')

let armies = []

let numOfArmies = Math.floor(Math.random() * 1 + 2)

for (let i = numOfArmies; i > 0; i--) {
    let squads = []

    let numOfSquads = Math.floor(Math.random() * 1 + 2)

    for (let j = numOfSquads; j > 0; j--) {
        let units = []

        let numOfUnits = Math.floor(Math.random() * 6 + 5)
        let numOfSoliders = Math.floor(Math.random() * (numOfUnits + 1))
        let numOfVehicles = numOfUnits - numOfSoliders
        
        for (let k = numOfSoliders; k > 0; k--) {
            units.push(new Solider({recharge: Math.random() * 1800 + 200}))
        }

        for (let l = numOfVehicles; l > 0; l--) {
            let numOfSolidersInVehicle = Math.floor(Math.random() * 3 + 1)

            let solidersInVehicle = []

            for (let m = numOfSolidersInVehicle; m > 0; m--) {
                solidersInVehicle.push(new Solider({recharge: Math.random() * 1800 + 200}))
            }

            units.push(new Vehicle({recharge: Math.random() * 1000 + 1000, operators: solidersInVehicle}))
        }

        squads.push(new Squad(units))
    }

    armies.push(new Army(squads))
}

for (let i = numOfArmies - 1; i > 0; i--) {
    armies[i].chooseStrategy()
}

let count = 0;
while (armies.reduce((a, b) => a + b.isActive, 0) > 1) {
    for (let i = numOfArmies - 1; i > 0; i--) {
        let enemies = armies.slice(0, i).concat(armies.slice(i + 1, numOfArmies - 1))
        armies[i].attack(enemies)
    }
    // console.log('Puca', count++)
}

let winner = armies.find(army => army.isActive)

console.log(winner)