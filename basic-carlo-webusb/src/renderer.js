import "babel-polyfill";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import AppBtc from "@ledgerhq/hw-app-btc";

const initial =
  "<h1>Connect your Ledger and open Bitcoin app. Click anywhere to start...</h1>";

const $main = document.getElementById("main");
$main.innerHTML = initial;

document.body.addEventListener("click", async () => {
  $main.innerHTML = initial;
  try {
    const transport = await TransportWebUSB.create();
    transport.setDebugMode(true);
    const appBtc = new AppBtc(transport);
    const { bitcoinAddress } = await appBtc.getWalletPublicKey(
      "44'/0'/0'/0/0",
      false
    );
    const h2 = document.createElement("h2");
    h2.textContent = bitcoinAddress;
    $main.innerHTML = "<h1>Your first Bitcoin address:</h1>";
    $main.appendChild(h2);
    await appBtc.getWalletPublicKey("44'/0'/0'/0/0", true);
  } catch (e) {
    const $err = document.createElement("code");
    $err.style.color = "#f66";
    $err.textContent = String(e.message || e);
    $main.appendChild($err);
  }
});
