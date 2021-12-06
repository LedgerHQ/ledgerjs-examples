import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import AppEth from "@ledgerhq/hw-app-eth";
import TransportBLE from "@ledgerhq/react-native-hw-transport-ble";
import QRCode from "react-native-qrcode-svg";

const delay = ms => new Promise(success => setTimeout(success, ms));

class ShowAddressScreen extends Component {
  state = {
    error: null,
    address: null
  };

  async componentDidMount() {
    while (!this.state.address) {
      if (this.unmounted) return;
      await this.fetchAddress(false);
      await delay(500);
    }
    await this.fetchAddress(true);
  }

  async componentWillUnmount() {
    this.unmounted = true;
  }

  fetchAddress = async verify => {
    const { transport } = this.props;
    try {
      const eth = new AppEth(transport);
      const path = "44'/60'/0'/0/0"; // HD derivation path
      const { address } = await eth.getAddress(path, verify);
      if (this.unmounted) return;
      this.setState({ address });
    } catch (error) {
      // in this case, user is likely not on Ethereum app
      if (this.unmounted) return;
      this.setState({ error });
      return null;
    }
  };

  render() {
    const { address, error } = this.state;

    return (
      <View style={styles.ShowAddressScreen}>
        {!address ? (
          <>
            <Text style={styles.loading}>Loading your Ethereum address...</Text>
            {error ? (
              <Text style={styles.error}>
                A problem occurred, make sure to open the Ethereum application
                on your Ledger Nano X. (
                {String((error && error.message) || error)})
              </Text>
            ) : null}
          </>
        ) : (
          <>
            <Text style={styles.title}>Ledger Live Ethereum Account 1</Text>
            <QRCode value={address} size={300} />
            <Text style={styles.address}>{address}</Text>
          </>
        )}
      </View>
    );
  }
}

export default ShowAddressScreen;

const styles = StyleSheet.create({
  ShowAddressScreen: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  error: {
    color: "#c00",
    fontSize: 16
  },
  loading: {
    color: "#999",
    fontSize: 16
  },
  title: {
    fontSize: 22,
    marginBottom: 16
  },
  address: {
    marginTop: 16,
    color: "#555",
    fontSize: 14
  }
});