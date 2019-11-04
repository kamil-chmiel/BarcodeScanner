import React from "react";
import { View, StyleSheet } from "react-native";
import { Camera as ExpoCamera } from "expo-camera";
import BarcodeMask from "react-native-barcode-mask";

interface Props {
  torchOn: boolean;
  onBarCodeRead: (codeData: { type: string; data: string }) => void;
}

const Camera = (props: Props) => {
  const { container, preview } = styles;
  const { torchOn, onBarCodeRead } = props;

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
        <BarcodeMask />
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
