import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  torchOn: boolean;
  onButtonPress: () => void;
}

const TorchButton = (props: Props) => {
  const { bottomOverlay, cameraIcon } = styles;
  const { torchOn, onButtonPress } = props;

  return (
    <View style={bottomOverlay}>
      <TouchableOpacity onPress={() => onButtonPress()}>
        <MaterialIcons
          style={cameraIcon}
          size={30}
          color="white"
          name={torchOn ? "flash-on" : "flash-off"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraIcon: {
    marginTop: 35,
    marginLeft: 35
  },
  bottomOverlay: {
    position: "absolute"
  }
});

export default TorchButton;
