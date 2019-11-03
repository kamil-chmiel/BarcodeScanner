import React, { Component } from "react";
import { View } from "react-native";
import * as Permissions from "expo-permissions";
import Camera from "../Components/Camera";
import DataPanel from "../Components/DataPanel";
import PermissionsNote from "../Components/PermissionsNote";
import TorchButton from "../Components/TorchButton";

interface State {
  dropDownIsOpen: boolean;
  hasCameraPermission: boolean;
  isScanning: boolean;
  torchOn: boolean;
  codeData: object;
}

export default class Scanner extends Component<State> {
  constructor(props) {
    super(props);
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

  handleTorch = () => {
    this.setState({ torchOn: !this.state.torchOn });
  };

  render() {
    const { hasCameraPermission, isScanning, torchOn, codeData } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <PermissionsNote />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            torchOn={torchOn}
            showScanning={isScanning}
            onBarCodeRead={this.onBarCodeRead}
          />
          <TorchButton torchOn={torchOn} onButtonPress={this.handleTorch} />
          {!isScanning ? (
            <DataPanel
              codeType={codeData.type}
              codeData={codeData.data}
              onCloseView={this.closeCodeDataView}
            />
          ) : null}
        </View>
      );
    }
  }
}
