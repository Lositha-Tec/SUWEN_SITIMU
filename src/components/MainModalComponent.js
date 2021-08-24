import React from "react";
import { StyleSheet, View, Text, Image, } from "react-native";
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  ExpletusSans_400Regular,
  ExpletusSans_400Regular_Italic,
  ExpletusSans_500Medium,
  ExpletusSans_500Medium_Italic,
  ExpletusSans_600SemiBold,
  ExpletusSans_600SemiBold_Italic,
  ExpletusSans_700Bold,
  ExpletusSans_700Bold_Italic,
} from '@expo-google-fonts/expletus-sans';

export const MainModalComponent = (props) => {
  let [fontsLoaded] = useFonts({
    ExpletusSans_400Regular,
    ExpletusSans_400Regular_Italic,
    ExpletusSans_500Medium,
    ExpletusSans_500Medium_Italic,
    ExpletusSans_600SemiBold,
    ExpletusSans_600SemiBold_Italic,
    ExpletusSans_700Bold,
    ExpletusSans_700Bold_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemIconContainer}>
          <Image
            source={props.imageSource}
            style={styles.itemIcon}
          />
        </View>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>{props.pageName}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 200,
    marginBottom: 30,
    margin: 5,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 5,
  },
  itemIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    width: 100,
    height: 120,
  },
  itemIcon: {
    width: 100,
    height: 120,
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 5,
  },
  itemText: {
    color: "#505051",
    textAlign: "center",
    //fontSize: 20,
    //fontWeight: "bold",
    fontFamily: 'ExpletusSans_500Medium',

  },
});
