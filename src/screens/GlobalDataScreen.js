import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { useTheme } from '@react-navigation/native';

import { FontAwesome5 } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';

import Header from "../components/Header";
import Tile from "../components/Tile"

import countryData from "../data/countries";

export default function GlobalDataScreen(props) {
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [errMsg, setErrMsg] = useState(null);

  // set country data to countries array in loading screen
  useEffect(() => {
    setLoading(true);

    try {
      // get global data and assign to covidData object
      fetch('https://www.hpb.health.gov.lk/api/get-current-statistical')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } catch (err) {
      setErrMsg(err.message);
    }

    setCountries(countryData);
  }, []);

  // fill countries into dropdown
  const DropDownData = countries.map((c) => {
    return (
      <Picker.Item key={c.Code} value={c.Code} label={c.Name} />
    );
  });

  const fetchData = (itemValue) => {
    setLoading(true);

    // create new date
    let nowDate = new Date();
    let date = nowDate.getDate() - 1;
    let month = nowDate.getMonth() + 1;
    let year = nowDate.getFullYear();
    let paramDate = `${year}-${month}-${date}`;

    // get data from API
    fetch(`https://api.covid19api.com/live/country/${itemValue}/status/confirmed/date/${paramDate}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  // create a new object
  let covidData = {};

  let globalConfirmed = 0;
  let globalActive = 0;
  let globalRecovered = 0;
  let globalDeaths = 0;
  let dateAndTime = "";

  if (selectedCountry == "") {
    if (data.data != undefined) {
      globalConfirmed = data.data.global_total_cases;
      globalActive = data.data.global_new_cases;
      globalRecovered = data.data.global_recovered;
      globalDeaths = data.data.global_deaths;
      dateAndTime = data.data.update_date_time;
    } else {
      console.log('No data received yet');
    }

  } else {
    if (data.length != 0) {
      for (let i in data) {
        globalConfirmed += data[i].Confirmed;
        globalActive += data[i].Active;
        globalRecovered += data[i].Recovered;
        globalDeaths += data[i].Deaths;
        dateAndTime = data[i].Date;
      }
    }
  }

  covidData.update_date_time = dateAndTime;
  covidData.global_confirmed_cases = globalConfirmed;
  covidData.global_active_cases = globalActive;
  covidData.global_recovered = globalRecovered;
  covidData.global_deaths = globalDeaths;

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
              }}
              mode="dialog"
            >
              <Picker.Item label="Select Country" value="" />
              {DropDownData}
            </Picker>
          </View>
        </View>

        <Text style={[styles.subTitle, { color: colors.subTitleColor }]}>Global</Text>

        {loading ? <ActivityIndicator size="large" color="#cc0000" style={styles.activityIndicator} /> : null}

        <View style={styles.tileParent}>
          <View style={{ flexDirection: "row" }}>
            <Tile heading={'Total Confirmed Cases'} iconComponent={<FontAwesome5 name="hospital" size={30} color="white" />} count={covidData.global_confirmed_cases} tileBackgroundColor={{ backgroundColor: '#fdb01a' }} />
            <Tile heading={'Active Cases'} iconComponent={<FontAwesome5 name="procedures" size={30} color="white" />} count={covidData.global_active_cases} tileBackgroundColor={{ backgroundColor: '#e3342f' }} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Tile heading={'Recovered & Discharged'} iconComponent={<FontAwesome5 name="running" size={30} color="white" />} count={covidData.global_recovered} tileBackgroundColor={{ backgroundColor: '#50cd8a' }} />
            <Tile heading={'Deaths'} iconComponent={<FontAwesome5 name="bed" size={30} color="white" />} count={covidData.global_deaths} tileBackgroundColor={{ backgroundColor: '#f64a8f' }} />
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
    height: Dimensions.get('window').height / 20,
    width: wp('90%')
  },

  activityIndicator: {
    marginTop: '10%'
  }
});