import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from "react-native-responsive-screen";
import AppLoading from 'expo-app-loading';
import {
  useFonts, ExpletusSans_400Regular, ExpletusSans_500Medium,
} from '@expo-google-fonts/expletus-sans';

const Tile = (props) => {

  let [fontsLoaded] = useFonts({
    ExpletusSans_400Regular,
    ExpletusSans_500Medium,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <View style={styles.tile}>
        <View style={styles.headingTextParent}>
          <Text style={styles.headingText}>{props.heading}</Text>
        </View>
        <View style={[styles.imageIcon, props.tileBackgroundColor]}>
          {props.iconComponent}
        </View>
        <View>
          <Text style={styles.count}>{props.count}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    width: wp("35%"),
    height: hp("20%"),
    padding: 5,
    margin: 5,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 10,
  },
  headingTextParent: {
    flex: 1,
    marginBottom: 3,
    justifyContent: "flex-start",
  },
  headingText: {
    //fontWeight: "bold",
    fontFamily: 'ExpletusSans_500Medium',
    fontSize: RFPercentage(2),
    textAlign: "center",
    color: "black",
  },
  imageIcon: {
    backgroundColor: "#7052fb",
    width: wp("13%"),
    height: hp("7%"),
    borderRadius: 15,
    padding: 10,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 1 },
    marginTop: 20,
  },
  count: {
    fontSize: RFPercentage(3.5),
    color: "#000",
    fontFamily: 'ExpletusSans_400Regular',
  },
});

export default Tile;
