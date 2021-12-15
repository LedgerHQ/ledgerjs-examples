import React, { useState } from 'react';
import ConnectLedger from './ConnectLedger.js';
import SmartContract from './SmartContract.js';

function App() {
  const [transport, setTransport] = useState(undefined);
  const [eth, setEth] = useState(undefined);
  const [address, setAddress] = useState(undefined);

  const saveInfo = (info) => {
    setAddress(info.address);
    setEth(info.eth);
    setTransport(info.transport);
  }

  return (
    <div className='container'>
      {
      !transport ?
      <ConnectLedger onTransport={(info) => saveInfo(info)}></ConnectLedger> :
      <SmartContract address={address} eth={eth}></SmartContract>
      }
    </div>
  );
}

export default App;
