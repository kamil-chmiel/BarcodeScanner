import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Camera as ExpoCamera } from "expo-camera";
import BarcodeMask from "react-native-barcode-mask";
import { MaterialIcons } from "@expo/vector-icons";

export default function Camera({
  torchOn,
  handleTourch,
  showScanning,
  onBarCodeRead
}) {
  const { container, preview, bottomOverlay, cameraIcon } = styles;

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
      <View style={bottomOverlay}>
        <TouchableOpacity onPress={() => handleTourch()}>
          <MaterialIcons
            style={cameraIcon}
            size={30}
            color="white"
            name={torchOn ? "flash-on" : "flash-off"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
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
  }
});
