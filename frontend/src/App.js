import web3 from './web3'
import Lottery from './Lottery'
import { useEffect, useState } from 'react';
import InfoPanel from './InfoPanel/InfoPanel'
import LotteryRegistration from './LotteryRegistration/LotteryRegistration'

function App() {
  const [manager, setManager] = useState('')
  const [balance, setBalance] = useState('')
  const [noOfPlayers, setNoOfPlayers] = useState(0)

  useEffect(() => {
    getInitData()
  }, [])

  const getInitData = async () => {
    const getManager = Lottery.methods.manager().call()
    const players = Lottery.methods.getPlayers().call()
    const balance = web3.eth.getBalance(Lottery.options.address)

    Promise.all([getManager, players, balance]).then((values) => {
      setManager(values[0])
      setNoOfPlayers(values[1].length)
      setBalance(values[2])
    });

  }

  const title = 'Lottery'

  return (
    <div className="container">
      <InfoPanel title={title} manager={manager} noOfPlayers={noOfPlayers} balance={web3.utils.fromWei(balance, 'ether')} />
      <LotteryRegistration />

    </div>
  );
}

export default App;
