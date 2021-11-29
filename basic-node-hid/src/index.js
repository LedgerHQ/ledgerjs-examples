import "babel-polyfill";
import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";
import AppBtc from "@ledgerhq/hw-app-btc";

async function example() {
  const transport = await TransportNodeHid.open("");
  transport.setDebugMode(true);
  const appBtc = new AppBtc(transport);
  const result = await appBtc.getWalletPublicKey("44'/0'/0'/0/0");
  return result;
}

example().then(
  result => {
    console.log(result);
  },
  e => {
    console.error(e);
  }
);
