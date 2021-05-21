import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

function WHOImageComponent(props) {
  return (
    <View style={styles.mainContainer}>
      <Image source={props.image} style={styles.imageContainer} />
      <Text style={styles.textContainer}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    //borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    padding: 10,
  },
  imageContainer: {
    marginBottom: 12,
  },
  textContainer: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WHOImageComponent;
