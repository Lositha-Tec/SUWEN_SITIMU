import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { useTheme } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import Header from "../components/Header";
import Tile from "../components/Tile"

import { FontAwesome5 } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import DatePicker from 'react-native-datepicker';

export default function GlobalDataScreen(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { colors } = useTheme();
  const [selectedCountry, setSelectedCountry] = useState("");

  //console.log(selectedCountry);
  //console.log(data);

  // useEffect(() => {
  //   fetch('https://www.hpb.health.gov.lk/api/get-current-statistical')
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

  const fetchData = (itemValue) => {
    let nowDate = new Date();
    let date = nowDate.getDate() - 1;
    let month = nowDate.getMonth() + 1;
    let year = nowDate.getFullYear();
    let paramDate = `${year}-${month}-${date}`;

    // fetch('https://covid-19-statistics.p.rapidapi.com/reports/total', {
    //   "method": "GET",
    //   "headers": {
    //     "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
    //     "x-rapidapi-key": '64d5437219msh6241a916f51bac4p1eb404jsn21eb795e8aa2'
    //   }
    // })
    //   .then((response) => response.json())
    //   .then((json) => setData(json))
    //   .catch((error) => console.error(error))
    //   .finally(() => setLoading(false));

    fetch(`https://api.covid19api.com/live/country/${itemValue}/status/confirmed/date/${paramDate}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  let covidData = {};

  if (data.response != undefined) {
    // console.log(data.response[0])
    // covidData.update_date_time = data.data[0].last_update;
    // covidData.global_total_cases = data.data[0].confirmed;
    // covidData.global_new_cases = data.data[0].active;
    // covidData.global_recovered = data.data[0].recovered;
    // covidData.global_deaths = data.data[0].deaths;
    // covidData.global_new_deaths = data.data.global_new_deaths;
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        navigation={props.navigation}
        dateAndTime={covidData.update_date_time}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pickersParent}>
          <View style={styles.countryPickerParent}>
            <Picker
              selectedValue={selectedCountry}
              style={styles.countryPicker}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedCountry(itemValue)
                fetchData(itemValue)
              }
              }
              mode="dialog"
            >
              <Picker.Item label="Select Country" value="" />
              <Picker.Item label="Afganistan" value="af" />
              <Picker.Item label="Sri Lanka" value="lk" />
              <Picker.Item label="India" value="in" />
            </Picker>
          </View>
        </View>

        <Text style={[styles.subTitle, { color: colors.subTitleColor }]}>
          Global
          </Text>

        <View style={styles.tileParent}>
          <View style={{ flexDirection: "row" }}>
            <Tile
              heading={"Total Confirmed Cases"}
              iconComponent={
                <FontAwesome5 name="hospital-alt" size={30} color="white" />
              }
              count={covidData.global_total_cases}
              tileBackgroundColor={{ backgroundColor: "#fdb01a" }}
            />
            <Tile
              heading={"Daily New Cases"}
              iconComponent={
                <FontAwesome5 name="ambulance" size={30} color="white" />
              }
              count={covidData.global_new_cases}
              tileBackgroundColor={{ backgroundColor: "#7052fb" }}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Tile
              heading={"Recovered"}
              iconComponent={
                <FontAwesome5 name="running" size={30} color="white" />
              }
              count={covidData.global_recovered}
              tileBackgroundColor={{ backgroundColor: "#50cd8a" }}
            />
            <Tile
              heading={"Deaths"}
              iconComponent={
                <FontAwesome5 name="bed" size={30} color="white" />
              }
              count={covidData.global_deaths}
              tileBackgroundColor={{ backgroundColor: "#f64a8f" }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Tile
              heading={"New Deaths"}
              iconComponent={
                <FontAwesome5 name="bed" size={30} color="white" />
              }
              count={covidData.global_new_deaths}
              tileBackgroundColor={{ backgroundColor: "#f57b25" }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    fontSize: RFPercentage(3),
    marginBottom: 10
  },

  tileParent: {
    width: wp('90%'),
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },

  pickersParent: {
    flexDirection: "row"
  },

  countryPickerParent: {
    borderWidth: 1,
    borderColor: '#b0b0b0',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10
  },

  countryPicker: {
    height: Dimensions.get('window').width / 12,
    width: 200
  }
});