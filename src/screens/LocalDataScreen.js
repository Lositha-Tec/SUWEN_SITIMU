import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { useTheme } from "@react-navigation/native";

import { FontAwesome5 } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Header from "../components/Header";
import Tile from "../components/Tile";

export default function LocalDataScreen(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    fetch("https://www.hpb.health.gov.lk/api/get-current-statistical")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
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
    <View style={styles.fullPage}>
      <Header
        navigation={props.navigation}
        dateAndTime={covidData.update_date_time}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.subTitle, { color: colors.subTitleColor }]}>
          Sri Lanka
        </Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#cc0000"
            style={styles.activityIndicator}
          />
        ) : null}

        <View style={styles.tileParent}>
          <View style={{ flexDirection: "row" }}>
            <Tile
              heading={"Total Confirmed Cases"}
              iconComponent={
                <FontAwesome5 name="hospital" size={30} color="white" />
              }
              count={covidData.local_total_cases}
              tileBackgroundColor={{ backgroundColor: "#fdb01a" }}
            />
            <Tile
              heading={"Active Cases"}
              iconComponent={
                <FontAwesome5 name="procedures" size={30} color="white" />
              }
              count={covidData.local_active_cases}
              tileBackgroundColor={{ backgroundColor: "#e3342f" }}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Tile
              heading={"Daily New Cases"}
              iconComponent={
                <FontAwesome5 name="ambulance" size={30} color="white" />
              }
              count={covidData.local_new_cases}
              tileBackgroundColor={{ backgroundColor: "#7052fb" }}
            />
            <Tile
              heading={"Currently in hospitals"}
              iconComponent={
                <FontAwesome5 name="clinic-medical" size={30} color="white" />
              }
              count={covidData.local_total_number_of_individuals_in_hospitals}
              tileBackgroundColor={{ backgroundColor: "#4d4dff" }}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Tile
              heading={"Recovered & Discharged"}
              iconComponent={
                <FontAwesome5 name="running" size={30} color="white" />
              }
              count={covidData.local_recovered}
              tileBackgroundColor={{ backgroundColor: "#50cd8a" }}
            />
            <Tile
              heading={"Deaths"}
              iconComponent={
                <FontAwesome5 name="bed" size={30} color="white" />
              }
              count={covidData.local_deaths}
              tileBackgroundColor={{ backgroundColor: "#f64a8f" }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Tile
              heading={"New Deaths"}
              iconComponent={
                <FontAwesome5 name="bed" size={30} color="white" />
              }
              count={covidData.local_new_deaths}
              tileBackgroundColor={{ backgroundColor: "#f57b25" }}
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
  );
}

const styles = StyleSheet.create({
  subTitle: {
    fontSize: RFPercentage(3),
    marginBottom: 10,
    fontWeight: "bold",
  },

  tileParent: {
    width: wp("90%"),
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  fullPage: {
    flex: 1,
    backgroundColor: "white",
  },
});
