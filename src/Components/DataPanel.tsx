import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  codeData: { type: string; data: string };
  onCloseView: () => void;
}

const DataPanel = (props: Props) => {
  const { container, title, data } = styles;
  const { codeData, onCloseView } = props;

  return (
    <View style={container}>
      <View
        style={{
          position: "absolute",
          right: 5,
          top: 5
        }}
      >
        <TouchableOpacity onPress={() => onCloseView()}>
          <MaterialIcons name="close" size={25} />
        </TouchableOpacity>
      </View>

      <Text style={title}>Scanned Barcode</Text>
      <Text style={data}>{"Barcode type: " + codeData.type}</Text>
      <Text style={data}>{"Barcode data: " + codeData.data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    alignItems: "center"
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

export default DataPanel;
