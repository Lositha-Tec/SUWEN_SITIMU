import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Button } from "react-native";
import { Entypo } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { useFonts, ExpletusSans_600SemiBold, } from '@expo-google-fonts/expletus-sans';

export const EContactItem = (props) => {
  let [fontsLoaded] = useFonts({
    ExpletusSans_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <View style={styles.contactItemContainer}>
          <View style={styles.imageIcon}>
            <Image
              source={props.imageSource}
              style={styles.contactImg}
            />
          </View>
          <View style={{ flex: 1, marginTop: 20 }}>
            {props.displayStyle ?
              <View>
                <TouchableOpacity style={styles.btnContact} onPress={props.onPressItem2}>
                  <Entypo name="phone" size={24} color="white" style={{ marginRight: 5 }} />
                  <Text style={styles.itemText}>{props.labelComponent2}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnContact} onPress={props.onPressItem}>
                  <Entypo name="phone" size={24} color="white" />
                  <Text style={styles.itemText}>{props.labelComponent}</Text>
                </TouchableOpacity>
              </View> :
              <View>
                <TouchableOpacity style={styles.btnContact} onPress={props.onPressItem}>
                  <Entypo name="phone" size={24} color="white" style={{ marginRight: 5 }} />
                  <Text style={styles.itemText}>{props.labelComponent}</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  contactItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    marginBottom: 30,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
  },
  imageIcon: {
    marginTop: 10,
  },
  contactImg: {
    width: 100,
    height: 100,
  },
  itemText: {
    marginTop: 5,
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontFamily: 'ExpletusSans_600SemiBold',
  },
  btnContact: {
    flex: 0.25,
    flexDirection: "row",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  }
});
