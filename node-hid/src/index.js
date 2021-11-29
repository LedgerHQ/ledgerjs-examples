import "babel-polyfill";
import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";
import { listen } from "@ledgerhq/logs";
import AppBtc from "@ledgerhq/hw-app-btc";

async function example() {
  const transport = await TransportNodeHid.open("");
  listen(log => console.log(log))
  const appBtc = new AppBtc(transport);
  const result = await appBtc.getWalletPublicKey({format: "44'/0'/0'/0/0", verify: true});
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
