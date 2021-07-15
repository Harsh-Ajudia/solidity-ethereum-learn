import React from 'react'
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import web3 from '../web3'
import Lottery from '../Lottery'
function LotteryRegistration(props) {

    const [amount, setAmount] = useState('')
    const [message, setMessage] = useState('')

    const onSubmit = async (event) => {
        event.preventDefault()
        console.log('submit')
        setMessage('Waiting on transaction, please wait...')
        const accounts = await web3.eth.requestAccounts()
        console.log(accounts)
        console.log('start')
        await Lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(amount, 'ether')
        })
        console.log('end')
        setMessage('You have been entered the lottery')
    }

    const pickWinner = async () => {
        const accounts = await web3.eth.requestAccounts()
        console.log(accounts)
        console.log('start')

        setMessage('Waiting on transaction, please wait...')

        await Lottery.methods.pickWinner().send({
            from: accounts[0],
            // value: web3.utils.toWei(amount, 'ether')
        })

        setMessage('A winner has been picked')
    }
    return (
        <div className="mt-5">
            <div className="row">
                <div className="border col-md-4 p-4">
                    <form onSubmit={onSubmit}>
                        <h4>Register for lottery</h4>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="amount">Amount of Ether to Enter</label>
                                    <input type="text" value={amount} name="amount" id="amount" className="form-control"
                                        onChange={event => setAmount(event.target.value)} />
                                </div>
                                <Button type="submit" variant="primary" className="mt-4">Enter</Button>
                            </div>


                        </div>
                    </form>

                    <hr />
                    <h4>Ready to pick winner?</h4>
                    <Button variant="info" onClick={pickWinner}>Pick Winner</Button>
                    <hr />
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default LotteryRegistration