import React from "react";
import { View, StyleSheet } from "react-native";
import { Camera as ExpoCamera } from "expo-camera";
import BarcodeMask from "react-native-barcode-mask";

interface Props {
  torchOn: boolean;
  showScanning: boolean;
  onBarCodeRead: (object) => void;
}

const Camera: React.FC<Props> = props => {
  const { container, preview } = styles;
  const { torchOn, showScanning, onBarCodeRead } = props;

  return (
    <View style={container}>
      <ExpoCamera
        style={preview}
        flashMode={
          torchOn
            ? ExpoCamera.Constants.FlashMode.torch
            : ExpoCamera.Constants.FlashMode.off
        }
        onBarCodeScanned={data => onBarCodeRead(data)}
      >
        {showScanning ? <BarcodeMask /> : null}
      </ExpoCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  }
});

export default Camera;
