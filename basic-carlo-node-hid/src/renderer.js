import "babel-polyfill";

const $main = document.getElementById("main");
$main.innerHTML = "<h1>Connect your Ledger and open Bitcoin app.</h1>";

(async () => {
  const { bitcoinAddress } = await getBitcoinInfo(false);
  const h2 = document.createElement("h2");
  h2.textContent = bitcoinAddress;
  document.getElementById("main").innerHTML =
    "<h1>Your first Bitcoin address:</h1>";
  document.getElementById("main").appendChild(h2);
  await getBitcoinInfo(true);
})();
