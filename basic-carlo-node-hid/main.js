require("babel-polyfill");
const TransportNodeHid = require("@ledgerhq/hw-transport-node-hid").default;
const AppBtc = require("@ledgerhq/hw-app-btc").default;

const carlo = require("carlo");
const path = require("path");

(async () => {
  const app = await carlo.launch();
  app.on("exit", () => process.exit());
  app.exposeFunction("getBitcoinInfo", getBitcoinInfo);
  app.serveFolder(path.join(__dirname, "dist"));
  await app.load("index.html");
})();

// This a very basic example
// Ideally you should not run this code in main thread
// but run it in a dedicated node.js process
function getBitcoinInfo(verify) {
  return TransportNodeHid.open("")
    .then(transport => {
      transport.setDebugMode(true);
      const appBtc = new AppBtc(transport);
      return appBtc.getWalletPublicKey("44'/0'/0'/0/0", verify).then(r =>
        transport
          .close()
          .catch(e => {})
          .then(() => r)
      );
    })
    .catch(e => {
      console.warn(e);
      // try again until success!
      return new Promise(s => setTimeout(s, 1000)).then(() =>
        getBitcoinInfo(verify)
      );
    });
}
