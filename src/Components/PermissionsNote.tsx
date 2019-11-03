import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";

export default function PermissionsNote() {
  const { container, title } = styles;

  return (
    <View style={container}>
      <Text style={title}>You have not granted access to camera</Text>
      <TouchableOpacity onPress={() => Linking.openURL("App-Prefs:root")}>
        <Text style={{ color: "blue" }}>
          Go to settings to change permissions
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    margin: 10
  }
});
