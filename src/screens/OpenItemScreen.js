import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Fontisto,
} from "@expo/vector-icons";

//import call from 'react-native-phone-call';

// const [inputValue, setInputValue] = useState('0705278262');

//   const triggerCall = () => {
//     // Check for perfect 10 digit length
//     if (inputValue.length != 10) {
//       alert('Please insert correct contact number');
//       return;
//     }

//     const args = {
//       number: inputValue,
//       prompt: true,
//     };
//     // Make a call
//     call(args).catch(console.error);
//   };

const OpenItemScreen = ({ route, navigation }) => {
  const { item } = route.params;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.detailContainer}>
          <View style={styles.detailGroup}>
            <FontAwesome
              name="circle"
              size={20}
              color={"gray"}
              style={{ marginTop: 5 }}
            />
            <Text style={styles.detailText}>Province: {item.province}</Text>
          </View>

          <View style={styles.detailGroup}>
            <FontAwesome
              name="circle"
              size={20}
              color={"gray"}
              style={{ marginTop: 5 }}
            />
            <Text style={styles.detailText}>
              Division: {item.police_division}
            </Text>
          </View>

          <View style={[styles.detailGroup, { marginBottom: 80 }]}>
            <FontAwesome
              name="circle"
              size={20}
              color={"gray"}
              style={{ marginTop: 5 }}
            />
            <Text style={styles.detailText}>
              Police Station: {item.police_station}
            </Text>
          </View>

          <View style={[styles.detailGroup, { marginBottom: 30 }]}>
            <Fontisto
              name="phone"
              size={20}
              color={"gray"}
              style={{ marginTop: 5 }}
            />
            <Text style={styles.detailText}>Contact Numbers</Text>
          </View>

          <TouchableOpacity /*onPress={triggerCall}*/>
            <View style={styles.contactGroup}>
              <Fontisto
                name="mobile-alt"
                size={25}
                color={"black"}
                style={{ marginTop: 5 }}
              />
              <Text style={styles.contactText}>
                OIC Mobile: {item.oic_mobile}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.contactGroup}>
              <MaterialCommunityIcons
                name="phone-outgoing"
                size={20}
                color={"black"}
                style={{ marginTop: 5 }}
              />
              <Text style={styles.contactText}>
                Office Number : {item.office_number}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  detailContainer: {
    //alignItems: "center",
  },
  detailGroup: {
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: 1,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  detailText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    paddingLeft: 10,
  },
  contactGroup: {
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: 1,
    padding: 15,
    backgroundColor: "orange",
    borderRadius: 10,
  },
  contactText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 20,
  },
});

export default OpenItemScreen;
