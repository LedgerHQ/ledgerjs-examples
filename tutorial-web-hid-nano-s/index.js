import { ethers } from "ethers";
import { LedgerSigner } from "@ethersproject/hardware-wallets";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import Eth from "@ledgerhq/hw-app-eth";

document.getElementById("tx-transfer").onclick = async function () {
    //https://ropsten.etherscan.io/getRawTx?tx=0x7049bacc4313e56a8211bab47dd477dfc42ca026904bc7c3cb5b7a73ed47006e
    const provider = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/120a32364030465aa9208b058d0a3df8");

    // const signer = new LedgerSigner(provider);

    const transport = await TransportWebHID.create();
    const eth = new Eth(transport);
    const { address } = await eth.getAddress("44'/60'/0'/0/0", false);



    const gasPrice = (await provider.getGasPrice())._hex;
    const recipient = "0x920f19c7F7Ce5b3170AdB94fDcC4570Da95D286b";
    const nonce = await provider.getTransactionCount(address, "latest");
    const value =  ethers.utils.parseUnits("1", "ether")._hex;
    const gas = provider.getFeeData();
    const gasLimit = ethers.utils.hexlify(100000);

    const tx = {
        to: recipient,
        value: value,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        nonce: nonce,
        data: null,
        chainId:3,
    }

    console.log(tx);

    // const transaction =  await signer.sendTransaction(tx);
    // console.log(transaction);

    let unsignedTx = ethers.utils.serializeTransaction(tx).substring(2);

    console.log(unsignedTx);

    const signature = await eth.signTransaction("44'/60'/0'/0/0",unsignedTx);
    console.log(signature);


    signature.r = "0x"+signature.r;
    signature.s = "0x"+signature.s;
    signature.v = parseInt(signature.v);
    signature.from = address;

    let signedTx = ethers.utils.serializeTransaction(tx, signature);

    await provider.sendTransaction(signedTx);

}