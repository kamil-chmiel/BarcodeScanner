import React, { Component } from "react";
import { View } from "react-native";
import * as Permissions from "expo-permissions";
import Camera from "../Components/Camera";
import DataPanel from "../Components/DataPanel";
import PermissionsNote from "../Components/PermissionsNote";
import TorchButton from "../Components/TorchButton";

interface State {
  hasCameraPermission: boolean;
  isScanning: boolean;
  isTorchOn: boolean;
  codeData: { type: string; data: string };
}

export default class Scanner extends Component<any, State> {
  state = {
    hasCameraPermission: null,
    isScanning: true,
    isTorchOn: false,
    codeData: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  onBarCodeRead = (codeData: { type: string; data: string }) => {
    if (this.state.isScanning) {
      this.setState({ codeData, isScanning: false });
    }
  };

  closeCodeDataView = () => {
    this.setState({ codeData: null, isScanning: true });
  };

  handleTorch = () => {
    this.setState({ isTorchOn: !this.state.isTorchOn });
  };

  render() {
    const { hasCameraPermission, isScanning, isTorchOn, codeData } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <PermissionsNote />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            torchOn={isTorchOn}
            showScanning={isScanning}
            onBarCodeRead={this.onBarCodeRead}
          />
          <TorchButton torchOn={isTorchOn} onButtonPress={this.handleTorch} />
          {!isScanning ? (
            <DataPanel
              codeData={codeData}
              onCloseView={this.closeCodeDataView}
            />
          ) : null}
        </View>
      );
    }
  }
}
