import { ethers } from "ethers";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import Eth from "@ledgerhq/hw-app-eth";

const provider = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/120a32364030465aa9208b058d0a3df8");


const chainId = 3;
let gasPrice;
let addressWallet;
let recipient = "0x920f19c7F7Ce5b3170AdB94fDcC4570Da95D286b";
let value = 0.1;
let gasLimit = 100000;
let nonce;
let _eth;

document.getElementById("connect-ledger").onclick = async function () {

    const transport = await TransportWebHID.create();
    _eth = new Eth(transport);
    const { address } = await _eth.getAddress("44'/60'/0'/0/0", false);

    addressWallet = address;
    gasPrice = (await provider.getGasPrice())._hex;

    document.getElementById("wallet").value = address;
    document.getElementById("gasPrice").value = parseInt(gasPrice,16) + " wei";
    document.getElementById("chainId").value = chainId;
    document.getElementById("value").value = value;
    document.getElementById("recipient").value = recipient;
    document.getElementById("gasLimit").value = gasLimit;
}

document.getElementById("tx-transfer").onclick = async function () {
    addressWallet = document.getElementById("wallet").value;
    recipient =  document.getElementById("recipient").value;
    value =  document.getElementById("value").value;
    gasLimit =  parseInt(document.getElementById("gasLimit").value);
    nonce =  await provider.getTransactionCount(addressWallet, "latest");

    const transaction = {
        to: recipient,
        gasPrice: gasPrice,
        gasLimit: ethers.utils.hexlify(gasLimit),
        nonce: nonce,
        chainId: chainId,
        data: null,
        value: ethers.utils.parseUnits(value, "ether")._hex,
    }

    let unsignedTx = ethers.utils.serializeTransaction(transaction).substring(2);

    const signature = await _eth.signTransaction("44'/60'/0'/0/0",unsignedTx);


    signature.r = "0x"+signature.r;
    signature.s = "0x"+signature.s;
    signature.v = parseInt(signature.v);
    signature.from = addressWallet;

    let signedTx = ethers.utils.serializeTransaction(transaction, signature);

    const hash = (await provider.sendTransaction(signedTx)).hash;
    const url = "https://ropsten.etherscan.io/tx/" + hash;

    document.getElementById("url").value = url;
}