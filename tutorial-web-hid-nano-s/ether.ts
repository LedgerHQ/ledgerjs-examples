import { ethers } from "ethers";

(async() => {

    const connection = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/120a32364030465aa9208b058d0a3df8");

    const wallet = ethers.Wallet.fromMnemonic("skull save rain error depart kiss shadow cute vehicle fire glove sleep");
    const signer = wallet.connect(connection);

    const gasPrice = (await connection.getGasPrice())._hex;
    const recipient = "0x920f19c7F7Ce5b3170AdB94fDcC4570Da95D286b";
    const nonce = await connection.getTransactionCount(wallet.address, "latest");
    const value =  ethers.utils.parseUnits("0.1", "ether")._hex;
    const gasLimit = ethers.utils.hexlify(100000);

    const tx = {
        from:wallet.address,
        to: recipient,
        value: value,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        nonce: nonce,
        chainId:3,
    }

    console.log(tx);

    const transaction =  await signer.sendTransaction(tx);
    console.log(transaction);

})();
