const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const { interface, bytecode } = require('../compile')
const web3 = new Web3(ganache.provider())

let accounts
let inbox
const INITIAL_STRING = 'Hi there'
beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there'] })
        .send({ from: accounts[0], gas: '1000000' })
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        // console.log(inbox.options)
        assert.ok(inbox.options.address)
    })

    it('has default message', async () => {
        const message = await inbox.methods.message().call()
        assert.equal(message, INITIAL_STRING)
    })

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] })
        const message = await inbox.methods.message().call()
        assert.equal(message, 'bye')
    })
})

// class Car {
//     park() {
//         return 'stopped'
//     }
//     drive() {
//         return 'vroom'
//     }
// }

// let car

// beforeEach(() => {
//     console.log('starting')
//     car = new Car()
// })

// describe('Car', () => {
//     it('Park', () => {
//         assert.equal(car.park(), 'stopped')
//     })
//     it('Drive', () => {
//         assert.equal(car.drive(), 'vroom')
//     })
// })