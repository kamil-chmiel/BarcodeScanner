import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Results = ({ navigation }) => {
  const { container, data } = styles;

  return (
    <View style={container}>
      <Text style={data}>{"Barcode type: " + navigation.getParam("codeData").type}</Text>
      <Text style={data}>{"Barcode data: " + navigation.getParam("codeData").data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  data: {
    fontSize: 17,
    margin: 5
  }
});

export default Results;
