import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Button } from "react-native";

export const EContactItem = (props) => {
  return (
    <View>
      <View style={styles.contactItemContainer}>
        <View style={styles.itemContainer}>
          <View style={styles.imageIcon}>
            <Image
              source={props.imageSource}
              style={[styles.contactImg, props.style]}
            />
          </View>
          <View>
            {props.displayStyle ?
              <View>
                <TouchableOpacity style={styles.btnContact} onPress={props.onPressItem2}>
                  <Text style={styles.itemText}>{props.labelComponent2}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnContact} onPress={props.onPressItem}>
                  <Text style={styles.itemText}>{props.labelComponent}</Text>
                </TouchableOpacity>
              </View> :
              <>
                <TouchableOpacity style={styles.btnContact} onPress={props.onPressItem}>
                  <Text style={styles.itemText}>{props.labelComponent}</Text>
                </TouchableOpacity>
              </>
            }
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactItemContainer: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    width: 150,
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
    height: 220,
    backgroundColor:"white"
    //borderWidth: 1
  },
  itemContainer: {
    //borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginTop: 25,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  itemIcon: {},
  contactImg: {
    width: 110,
    height: 100,
    borderRadius: 10,
    //marginBottom: 20
  },
  itemText: {
    marginTop: 5,
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  btnContact: {
    backgroundColor: "red",
    width: 120,
    borderRadius: 5,
    padding: 2,
    margin: 5,
  }
});
