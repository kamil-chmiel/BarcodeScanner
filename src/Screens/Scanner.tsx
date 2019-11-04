import React, { Component } from "react";
import { View } from "react-native";
import * as Permissions from "expo-permissions";
import Camera from "../Components/Camera";
import PermissionsNote from "../Components/PermissionsNote";
import TorchButton from "../Components/TorchButton";
import { withNavigationFocus } from "react-navigation";

interface State {
  hasCameraPermission: boolean;
  isTorchOn: boolean;
  codeData: { type: string; data: string };
}

class Scanner extends Component<any, State> {
  state = {
    hasCameraPermission: null,
    isTorchOn: false,
    codeData: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  onBarCodeRead = (codeData: { type: string; data: string }) => {
    this.setState({ codeData });
    this.props.navigation.navigate("Results", { codeData: codeData });
  };

  closeCodeDataView = () => {
    this.setState({ codeData: null });
  };

  handleTorch = () => {
    this.setState({ isTorchOn: !this.state.isTorchOn });
  };

  render() {
    const { hasCameraPermission, isTorchOn } = this.state;
    const isFocused = this.props.navigation.isFocused();

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <PermissionsNote />;
    } else if (isFocused) {
      return (
        <View style={{ flex: 1 }}>
          <Camera torchOn={isTorchOn} onBarCodeRead={this.onBarCodeRead} />
          <TorchButton torchOn={isTorchOn} onButtonPress={this.handleTorch} />
        </View>
      );
    } else {
      return <View />;
    }
  }
}

export default withNavigationFocus(Scanner);
