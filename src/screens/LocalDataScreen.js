import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from "react-native-responsive-screen";
import AppLoading from 'expo-app-loading';
import { useFonts, ExpletusSans_500Medium, } from '@expo-google-fonts/expletus-sans';
import { PieChart } from "react-native-chart-kit";

import Header from "../components/Header";
import Tile from "../components/Tile";
import { ActivityIndicatorComponent } from "../components/ActivityIndicatorComponent";
import { checkConnected } from '../components/CheckConnectedComponent';
import NoNetworkConnection from "../components/NoNetworkConnection";
import { PushNotificationManager } from '../components/PushNotificationManager';

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
  const [connectStatus, setConnectStatus] = useState(false);
  const [covidData, setData] = useState('');
  const { colors } = useTheme();


  useEffect(() => {
    setLoading(true);
    getStatistical().then(json => {
      let covidData = {};
      covidData.update_date_time = json.data.update_date_time;
      covidData.local_total_cases = json.data.local_total_cases;
      covidData.local_active_cases = json.data.local_active_cases;
      covidData.local_new_cases = json.data.local_new_cases;
      covidData.local_total_number_of_individuals_in_hospitals = json.data.local_total_number_of_individuals_in_hospitals;
      covidData.local_recovered = json.data.local_recovered;
      covidData.local_deaths = json.data.local_deaths;
      covidData.local_new_deaths = json.data.local_new_deaths;
      covidData.daily_antigen_testing_data_date = json.data.daily_antigen_testing_data[0].antigen_count;
      covidData.daily_antigen_testing_data_count = json.data.daily_antigen_testing_data[0].date;
      setData(covidData);
      setLoading(false);
    });

    checkConnected().then(res => {
      setConnectStatus(res);
    });
  }, [connectStatus]);

  let [fontsLoaded] = useFonts({
    ExpletusSans_500Medium,
  });

  const screenWidth = Dimensions.get("window").width;

  const recovery = [
    {
      name: "Recovered",
      population: covidData.local_recovered,
      color: "#50cd8a",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14
    },
    {
      name: "Total Confirmed",
      population: covidData.local_total_cases,
      color: "#fdb01a",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14
    },
  ];

  const deaths = [
    {
      name: "Deaths",
      population: covidData.local_deaths,
      color: "#DF1808",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14
    },
    {
      name: "Total Confirmed",
      population: covidData.local_total_cases,
      color: "#fdb01a",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14
    },
  ];

  const recoveredDeaths = [
    {
      name: "Recovered",
      population: covidData.local_recovered,
      color: "#50cd8a",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14
    },
    {
      name: "Deaths",
      population: covidData.local_deaths,
      color: "#DF1808",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14
    },

    {
      name: "In Hospitals",
      population: covidData.local_total_number_of_individuals_in_hospitals,
      color: "#4d4dff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      connectStatus ? (
        <View style={styles.fullPage}>
          {loading ? <ActivityIndicatorComponent /> :
            <>
              <Header
                navigation={props.navigation}
                dateAndTime={covidData.update_date_time}
              />
              <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
                showsVerticalScrollIndicator={false}
              >
                <PushNotificationManager />
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
                </View>

                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 15, width: "100%" }}>
                  <View style={{ width: "80%", alignItems: "center", flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ textAlign: "center", color: "#003503", fontFamily: "ExpletusSans_500Medium", fontSize: 18 }}>
                      Confirmed cases vs Recovered & Discharged
                    </Text>
                    <PieChart
                      data={recovery}
                      width={screenWidth}
                      height={200}
                      chartConfig={chartConfig}
                      accessor={"population"}
                      backgroundColor={"transparent"}
                      paddingLeft={"0"}
                      center={[5, 10]}
                    />
                  </View>
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 15, width: "100%" }}>
                  <View style={{ width: "80%", alignItems: "center", flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ textAlign: "center", color: "#003503", fontFamily: "ExpletusSans_500Medium", fontSize: 18 }}>
                      Confirmed cases vs Deaths
                    </Text>
                    <PieChart
                      data={deaths}
                      width={screenWidth}
                      height={200}
                      chartConfig={chartConfig}
                      accessor={"population"}
                      backgroundColor={"transparent"}
                      paddingLeft={"0"}
                      center={[5, 10]}
                    />
                  </View>
                </View>

                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 15, width: "100%" }}>
                  <View style={{ width: "80%", alignItems: "center", flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ textAlign: "center", color: "#003503", fontFamily: "ExpletusSans_500Medium", fontSize: 18 }}>
                      Recovered vs Deaths
                    </Text>
                    <PieChart
                      data={recoveredDeaths}
                      width={screenWidth}
                      height={200}
                      chartConfig={chartConfig}
                      accessor={"population"}
                      backgroundColor={"transparent"}
                      paddingLeft={"0"}
                      center={[5, 10]}
                    />
                  </View>
                </View>

                <View style={{ alignItems: "center", marginTop: 15 }}>
                  <Text style={{ color: "gray", fontFamily: "ExpletusSans_500Medium" }}>
                    Data Source: https://www.hpb.health.gov.lk
                  </Text>
                </View>
              </ScrollView>
            </>
          }
        </View >
      ) : (<NoNetworkConnection navigation={props.navigation} />)
    );
  }
}

async function getStatistical() {
  let data;
  await fetch("https://www.hpb.health.gov.lk/api/get-current-statistical")
    .then((response) => response.json())
    .then((json) => {
      data = json;
    });
  return data;
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
    //fontWeight: "bold",
    fontFamily: 'ExpletusSans_500Medium',
  },
});
