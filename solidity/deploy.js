const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
    'alter what attend sunset broom dad lucky ride rule pipe matter square',
    'https://rinkeby.infura.io/v3/1d5bcc1bcec849b884daeb0576627f4e'
)

const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Konnichiwa!'] })
        .send({ gas: '1000000', from: account })

    console.log(`deployed from ${account}`)
    console.log(`deployed to ${result.options.address}`)
}

deploy()