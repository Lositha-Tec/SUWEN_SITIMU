import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import AppLoading from 'expo-app-loading';
import { useFonts, ExpletusSans_600SemiBold, } from '@expo-google-fonts/expletus-sans';

function WHOImageComponent(props) {
  const { colors } = useTheme();

  let [fontsLoaded] = useFonts({
    ExpletusSans_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.mainContainer}>
        <Image source={props.image} style={styles.imageContainer} />
        <Text
          style={[styles.textContainer, { color: colors.WHOAdviceTextColor }]}
        >
          {props.text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
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
    //fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'ExpletusSans_600SemiBold',
  },
});

export default WHOImageComponent;
