import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import Eth from "@ledgerhq/hw-app-eth";
import  Web3 from "web3";
import { ethers } from "ethers";
import eip55 from "eip55";


let _eth;

async function getEth(transport) {
  console.log(_eth,!_eth);
  if (!_eth) {
    if (!transport) {
      transport = await TransportWebHID.create();
    }
    _eth = new Eth(transport);
  }
  return _eth;
}

document.getElementById("tx-transfer").onclick = async function () {
  //https://ropsten.etherscan.io/getRawTx?tx=0x7049bacc4313e56a8211bab47dd477dfc42ca026904bc7c3cb5b7a73ed47006e

  console.log("==============================================================");
  console.log("= Sign and send transaction");
  console.log("==============================================================");
  const eth = await getEth();


  const provider = new ethers.providers.UrlJsonRpcProvider("https://ropsten.infura.io/v3/120a32364030465aa9208b058d0a3df8");




  web3.eth.defaultChain = "ropsten"

  const { address } = await eth.getAddress("44'/60'/0'/0/0", false);
  const gasPrice = await web3.eth.getGasPrice()
  const to = "0x920f19c7F7Ce5b3170AdB94fDcC4570Da95D286b"
  const value = 100000000000
  const nonce = await web3.eth.getTransactionCount(address, 'latest'); // nonce starts counting from 0
  web3.eth.getBalance("0x63E891Eae83A51812E8139f3f5bFC94c2672DD52").then(console.log)

  const transaction = {
    'to': to,
    'value': value,
    'gasPrice': parseInt(gasPrice),
    'gasLimit': 1000000108,
    'nonce': nonce,
    'chainId': 3,
    'data': null,
  };

  console.log(transaction);
  const serializedTransaction = ethers.utils.serializeTransaction(transaction).slice(2);
  console.log(serializedTransaction );

  const signature = await eth.signTransaction("44'/60'/0'/0/0", serializedTransaction);
  console.log(signature)

  web3.eth.sendSignedTransaction(transactionSigned).
  on('receipt', console.log)

  console.log("0x"+signature.r);
  console.log("0x"+signature.s);
  console.log(parseInt("0x"+signature.v));
};























const main = async () => {

  const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/120a32364030465aa9208b058d0a3df8"));

  web3.eth.defaultChain = "ropsten"

  const gasPrice = await web3.eth.getGasPrice()
  const from = "0x1666c4A8bF1Dc4CD9b900d8311E523D40a9e8942"
  const to = "0x920f19c7F7Ce5b3170AdB94fDcC4570Da95D286b"
  const value = await web3.eth.getBalance(from)
  const nonce = await web3.eth.getTransactionCount(from, 'latest'); // nonce starts counting from 0

  const transaction = {
    'from': from,
    'to': to,
    'value': parseInt(value),
    'gas': parseInt(gasPrice),
    'maxFeePerGas': 1000000108,
    'nonce': nonce,
   };

  console.log(transaction);
  let hashCode;

  web3.eth.sendTransaction(transaction)
  .then(console.log)
}
