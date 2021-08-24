import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AdMobBannerComponent } from "../components/AdMobBannerComponent";

import AppLoading from 'expo-app-loading';
import {
  useFonts, ExpletusSans_600SemiBold, ExpletusSans_700Bold,
} from '@expo-google-fonts/expletus-sans';

const VillageOpenItemScreen = ({ route }) => {
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
              <Text style={styles.detailDataField}>{item.p_name}</Text>
            </View>
          </View>

          <View style={styles.rowSection}>
            <View style={styles.detailsTitleRow}>
              <Text style={styles.detailTitleTextTwo}>District</Text>
            </View>
            <View style={styles.detailDataRow}>
              <Text style={styles.detailDataField}>{item.d_name}</Text>
            </View>
          </View>

          <View style={styles.rowSection}>
            <View style={styles.detailsTitleRow}>
              <Text style={styles.detailTitleTextThree}>
                Divisional Secretariat
              </Text>
            </View>
            <View style={styles.detailDataRow}>
              <Text style={styles.detailDataField}>{item.ds_name}</Text>
            </View>
          </View>

          <View style={styles.rowSection}>
            <View style={styles.detailsTitleRow}>
              <Text style={styles.detailTitleTextFour}>
                Grama Niladhari Division
              </Text>
            </View>
            <View style={styles.detailDataRow}>
              <Text style={styles.detailDataField}>{item.gn_name}</Text>
            </View>
          </View>

          <View style={styles.rowSection}>
            <View style={styles.detailsTitleRow}>
              <Text style={styles.detailTitleTextFive}>GN Division Number</Text>
            </View>
            <View style={styles.detailDataRow}>
              <Text style={styles.detailDataField}>{item.gn_number}</Text>
            </View>
          </View>
        </View>
      </View>
      <AdMobBannerComponent />
    </ScrollView>
  );}
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
    textAlign: "center",
  },
  detailTitleTextFour: {
    color: "#007580",
    fontFamily: 'ExpletusSans_700Bold',
    fontSize: 35,
    textAlign: "center",
  },
  detailTitleTextFive: {
    color: "#de8971",
    fontFamily: 'ExpletusSans_700Bold',
    fontSize: 35,
    textAlign: "center",
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
});

export default VillageOpenItemScreen;
