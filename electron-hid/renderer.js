const electron = require("electron");
const { ipcRenderer } = electron;

document.getElementById("main").innerHTML =
  "<h1>Connect your Ledger and open Bitcoin app...</h1>";

ipcRenderer.on("bitcoinInfo", (event, arg) => {
  const h1 = document.createElement("h2");
  h1.textContent = arg.bitcoinAddress;
  document.getElementById("main").innerHTML =
    "<h1>Your first Bitcoin address:</h1>";
  document.getElementById("main").appendChild(h1);
  ipcRenderer.send("verifyBitcoinInfo");
});

ipcRenderer.send("requestBitcoinInfo");
