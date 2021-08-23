import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Button } from "react-native";
import { Entypo } from '@expo/vector-icons';

export const MainModalComponent = (props) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemIconContainer}>
        <Text style={styles.itemIcon}>{props.iconComponent}</Text>
      </View>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemText} >{props.pageName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 180,
    marginBottom: 30,
    margin: 5,
    padding:10,
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
    //borderWidth: 1
  },
  itemIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    width: 100,
    height: 100,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 0,
    //elevation: 1,
    borderWidth: 2,
  },
  itemIcon: {
    textAlign: "center",
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 5,
  },
  itemText: {
    color: "red",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
});
