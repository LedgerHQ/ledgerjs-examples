import React from 'react';

import TransportWebBLE from "@ledgerhq/hw-transport-web-ble";
import Eth from "@ledgerhq/hw-app-eth";


function ConnectLedger({onTransport}) {

  const connectLedger = async() => {
    const transport = await TransportWebBLE.create();
    const eth = new Eth(transport);
    const {address} = await eth.getAddress("44'/60'/0'/0/0", false);
    onTransport({address,eth,transport})
  }


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-4 mt-5 mx-auto'>
          <button onClick={connectLedger}>Connect Your Ledger</button>
        </div>
      </div>
    </div>
  );
}

export default ConnectLedger;
