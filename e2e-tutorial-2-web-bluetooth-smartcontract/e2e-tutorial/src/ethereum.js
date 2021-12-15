import { Contract } from 'ethers';

const getBlockchain = (provider) =>
  new Promise( async (resolve, reject) => {
    if(provider) {
      const simpleStorage = new Contract(
        "0x989c810f64ac577683d49a318adfd98b8d482472",
        [
          {
            "inputs": [],
            "name": "data",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "readData",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_data",
                "type": "uint256"
              }
            ],
            "name": "updateData",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ],
        provider
      );
      resolve({simpleStorage});
      return;
    }
    reject('Provider not recognized');
  });

export default getBlockchain;
