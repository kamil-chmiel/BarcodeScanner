import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  codeType: string;
  codeData: string;
  onCloseView: () => void;
}

const DataPanel: React.FC<Props> = props => {
  const { container, title, data } = styles;
  const { codeType, codeData, onCloseView } = props;

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
      <Text style={data}>{"Barcode type: " + codeType}</Text>
      <Text style={data}>{"Barcode data: " + codeData}</Text>
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
