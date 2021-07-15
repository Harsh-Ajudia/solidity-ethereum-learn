import './App.css';
import web3 from './web3'
import Lottery from './Lottery'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log('useeffect')
  }, [])
  const title = 'Lottery'
  console.log(web3.version)

  return (
    <div className="App">
      <h1>{title}</h1>
    </div>
  );
}

export default App;
