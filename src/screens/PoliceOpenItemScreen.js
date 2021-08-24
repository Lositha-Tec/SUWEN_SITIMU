import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, } from "react-native";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { AdMobBannerComponent } from "../components/AdMobBannerComponent";

import AppLoading from 'expo-app-loading';
import {
  useFonts, ExpletusSans_600SemiBold, ExpletusSans_700Bold,
} from '@expo-google-fonts/expletus-sans';

const PoliceOpenItemScreen = ({ route }) => {
  const { item } = route.params;

  let [fontsLoaded] = useFonts({
    ExpletusSans_600SemiBold,
    ExpletusSans_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.detailContainer}>
            <View style={styles.rowSection}>
              <View style={styles.detailsTitleRow}>
                <Text style={styles.detailTitleTextOne}>Province</Text>
              </View>
              <View style={styles.detailDataRow}>
                <Text style={styles.detailDataField}>{item.province}</Text>
              </View>
            </View>

            <View style={styles.rowSection}>
              <View style={styles.detailsTitleRow}>
                <Text style={styles.detailTitleTextTwo}>Division</Text>
              </View>
              <View style={styles.detailDataRow}>
                <Text style={styles.detailDataField}>{item.police_division}</Text>
              </View>
            </View>

            <View style={styles.rowSection}>
              <View style={styles.detailsTitleRow}>
                <Text style={styles.detailTitleTextThree}>Police Station</Text>
              </View>
              <View style={styles.detailDataRow}>
                <Text style={styles.detailDataField}>{item.police_station}</Text>
              </View>
            </View>

            <View style={[styles.detailGroup, { marginTop: 30 }]}>
              <Fontisto
                name="phone"
                size={20}
                color={"gray"}
                style={{ marginTop: 5 }}
              />
              <Text style={styles.detailText}>Contact Numbers</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${item.oic_mobile}`);
              }}
            >
              <View style={styles.contactGroup}>
                <Fontisto
                  name="mobile-alt"
                  size={25}
                  color={"#1eae98"}
                  style={{ marginTop: 3 }}
                />
                <Text style={styles.contactText}>
                  OIC Mobile: {item.oic_mobile}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                item.office_number == "-"
                  ? styles.buttonNotDisplay
                  : styles.buttonDisplay
              }
              //disabled={item.office_number == "-"}
              onPress={() => {
                Linking.openURL(`tel:${item.office_number}`);
              }}
            >
              <View style={styles.contactGroup}>
                <MaterialCommunityIcons
                  name="phone-outgoing"
                  size={20}
                  color={"#1eae98"}
                  style={{ marginTop: 4 }}
                />
                <Text style={styles.contactText}>
                  Office Number : {item.office_number}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <AdMobBannerComponent />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  rowSection: {
    marginBottom: 35,
  },
  detailsTitleRow: {
    justifyContent: "center",
    alignItems: "center",
  },
  detailDataRow: {
    justifyContent: "center",
    alignItems: "center",
  },
  detailDataField: {
    color: "#87a7b3",
    fontSize: 20,
    marginTop: 5,
    fontFamily: 'ExpletusSans_600SemiBold',
  },
  detailTitleTextOne: {
    color: "#007580",
    fontFamily: 'ExpletusSans_700Bold',
    fontSize: 35,
  },
  detailTitleTextTwo: {
    color: "#de8971",
    fontFamily: 'ExpletusSans_700Bold',
    fontSize: 35,
  },
  detailTitleTextThree: {
    color: "#344fa1",
    fontFamily: 'ExpletusSans_700Bold',
    fontSize: 35,
  },
  detailGroup: {
    flexDirection: "row",
    marginBottom: 10,
    paddingBottom: 15,
  },
  detailText: {
    fontSize: 20,
    fontFamily: 'ExpletusSans_600SemiBold',
    color: "gray",
    paddingLeft: 10,
  },
  contactGroup: {
    flexDirection: "row",
    marginBottom: 15,
    borderWidth: 0,
    padding: 15,
    backgroundColor: "#afb9c8",
    borderRadius: 10,
  },
  contactText: {
    fontSize: 20,
    fontFamily: 'ExpletusSans_600SemiBold',
    color: "black",
    paddingLeft: 20,
  },
  buttonDisplay: {
    display: "flex",
  },
  buttonNotDisplay: {
    display: "none",
  },
});

export default PoliceOpenItemScreen;
