import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";
import * as Permissions from "expo-permissions";
import { MaterialIcons } from "@expo/vector-icons";
import BarcodeMask from "react-native-barcode-mask";
import Camera from "../Components/Camera";
import DataPanel from "../Components/DataPanel";

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.handleTourch = this.handleTourch.bind(this);
    this.state = {
      hasCameraPermission: null,
      isScanning: true,
      torchOn: false,
      codeData: null
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  onBarCodeRead = codeData => {
    if (this.state.isScanning) {
      this.setState({ codeData, isScanning: false });
    }
  };

  closeCodeDataView = () => {
    this.setState({ codeData: null, isScanning: true });
  };

  handleTourch() {
    this.setState({ torchOn: !this.state.torchOn });
  }

  render() {
    if (this.state.hasCameraPermission === null) {
      return <View />;
    } else if (this.state.hasCameraPermission === false) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
              margin: 10
            }}
          >
            You have not granted access to camera
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL("App-Prefs:root")}>
            <Text style={{ color: "blue" }}>
              Go to settings to change permissions
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Camera
            torchOn={this.state.torchOn}
            handleTourch={this.handleTourch}
            showScanning={this.state.isScanning}
            onBarCodeRead={this.onBarCodeRead}
          />
          {!this.state.isScanning ? (
            <DataPanel
              codeData={this.state.codeData}
              onCloseView={this.closeCodeDataView}
            />
          ) : null}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  cameraIcon: {
    marginTop: 35,
    marginLeft: 35
  },
  bottomOverlay: {
    position: "absolute"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20
  },
  data: {
    fontSize: 17,
    margin: 5
  }
});
