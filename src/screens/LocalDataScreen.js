import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, } from "react-native";
import { useTheme } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from "react-native-responsive-screen";

import Header from "../components/Header";
import Tile from "../components/Tile";
import { ActivityIndicatorComponent } from "../components/ActivityIndicatorComponent";
import { checkConnected } from '../components/CheckConnectedComponent';
import NoNetworkConnection from "../components/NoNetworkConnection";

//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { LanguageContext } from '../components/LanguageContext';
//import i18n from 'i18n-js';
//import { si, en, ta } from '../i18n/SupportedLanguages';

// i18n.translations = {
//   si, en, ta
// }

// async function getLanguage() {
//   const choice = await AsyncStorage.getItem('setLanguage')
//   i18n.locale = choice
//   i18n.fallbacks = true
//   console.log('selected ' + choice);

//   console.log("aaaaaaa"+ i18n.currentLocale())
// }

// getLanguage()

// export function t(name) {
//   return i18n.t(name)
// }

//i18n.locale = Localization.locale;
//i18n.fallbacks = true;

export default function LocalDataScreen(props) {
  const [loading, setLoading] = useState(false);
  const [connectStatus, setConnectStatus] = useState(false)
  const [data, setData] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    setLoading(true);
    fetch("https://www.hpb.health.gov.lk/api/get-current-statistical")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

    const interval = setInterval(() => {
      checkConnected().then(res => {
        setConnectStatus(res)
      })
    }, 10);
    return () => clearInterval(interval);

  }, []);

  let covidData = {};

  if (data.data != undefined) {
    covidData.update_date_time = data.data.update_date_time;
    covidData.local_total_cases = data.data.local_total_cases;
    covidData.local_active_cases = data.data.local_active_cases;
    covidData.local_new_cases = data.data.local_new_cases;
    covidData.local_total_number_of_individuals_in_hospitals =
      data.data.local_total_number_of_individuals_in_hospitals;
    covidData.local_recovered = data.data.local_recovered;
    covidData.local_deaths = data.data.local_deaths;
    covidData.local_new_deaths = data.data.local_new_deaths;
  }

  return (
    connectStatus ? (
      <View style={styles.fullPage}>
        {loading ? <ActivityIndicatorComponent /> : null}
        <Header
          navigation={props.navigation}
          dateAndTime={covidData.update_date_time}
        />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.subTitle, { color: colors.subTitleColor }]}>Sri Lanka</Text>

          <View style={styles.tileParent}>
            <View style={{ flexDirection: "row" }}>
              <Tile
                heading={"Daily New Cases"}
                iconComponent={
                  <FontAwesome5 name="ambulance" size={25} color="white" />
                }
                count={covidData.local_new_cases}
                tileBackgroundColor={{ backgroundColor: "#7052fb" }}
              />
              <Tile
                heading={"Active Cases"}
                iconComponent={
                  <FontAwesome5 name="procedures" size={25} color="white" />
                }
                count={covidData.local_active_cases}
                tileBackgroundColor={{ backgroundColor: "#e3342f" }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Tile
                heading={"New Deaths"}
                iconComponent={
                  <FontAwesome5 name="bed" size={25} color="white" />
                }
                count={covidData.local_new_deaths}
                tileBackgroundColor={{ backgroundColor: "#f57b25" }}
              />
              <Tile
                heading={"Total Deaths"}
                iconComponent={
                  <FontAwesome5 name="bed" size={25} color="white" />
                }
                count={covidData.local_deaths}
                tileBackgroundColor={{ backgroundColor: "#f64a8f" }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Tile
                heading={"Total Confirmed Cases"}
                iconComponent={
                  <FontAwesome5 name="hospital" size={25} color="white" />
                }
                count={covidData.local_total_cases}
                tileBackgroundColor={{ backgroundColor: "#fdb01a" }}
              />
              <Tile
                heading={"Currently in hospitals"}
                iconComponent={
                  <FontAwesome5 name="clinic-medical" size={25} color="white" />
                }
                count={covidData.local_total_number_of_individuals_in_hospitals}
                tileBackgroundColor={{ backgroundColor: "#4d4dff" }}
              />
            </View>

            <View style={{ flexDirection: "row", }}>
              <Tile
                heading={"Recovered & Discharged"}
                iconComponent={
                  <FontAwesome5 name="running" size={25} color="white" />
                }
                count={covidData.local_recovered}
                tileBackgroundColor={{ backgroundColor: "#50cd8a" }}
              />
            </View>

            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={{ color: "gray" }}>
                Data Source: https://www.hpb.health.gov.lk
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    ) : (<NoNetworkConnection navigation={props.navigation} />)
  );
}

const styles = StyleSheet.create({
  fullPage: {
    flex: 1,
    backgroundColor: "white",
  },
  tileParent: {
    width: wp("90%"),
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  subTitle: {
    fontSize: RFPercentage(3),
    marginBottom: 10,
    fontWeight: "bold",
  },
});
