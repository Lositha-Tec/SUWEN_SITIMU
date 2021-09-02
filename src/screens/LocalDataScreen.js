import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from "react-native-responsive-screen";
import AppLoading from 'expo-app-loading';
import { useFonts, ExpletusSans_500Medium, } from '@expo-google-fonts/expletus-sans';

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function LocalDataScreen(props) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [loading, setLoading] = useState(false);
  const [connectStatus, setConnectStatus] = useState(false)
  const [data, setData] = useState([]);
  const { colors } = useTheme();


  useEffect(() => {
    console.log("1st")
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    console.log("2nd")
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

  let [fontsLoaded] = useFonts({
    ExpletusSans_500Medium,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    console.log(expoPushToken)
    return (
      connectStatus ? (
        <View style={styles.fullPage}>
          {loading && expoPushToken ? <ActivityIndicatorComponent /> :
            <>
              <Header
                navigation={props.navigation}
                dateAndTime={covidData.update_date_time}
              />
              <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
                showsVerticalScrollIndicator={false}
              >
                <Text style={[styles.subTitle, { color: colors.subTitleColor }]}>Sri Lanka</Text>
                <Text style={{ color: colors.subTitleColor }}>{expoPushToken}</Text>

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
                    <Text style={{ color: "gray", fontFamily: "ExpletusSans_500Medium" }}>
                      Data Source: https://www.hpb.health.gov.lk
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </>
          }

        </View>
      ) : (<NoNetworkConnection navigation={props.navigation} />)
    );
  }
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    if (token) {
      fetch("https://suwen-sitimu-notfication-api.herokuapp.com/api/save_token", {

        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          appName: "Suwen_Sitimu",
        }),
      })
        .then((x) => {
          if (x.status == 200) {
            alert("Token sent")
          }
          console.log(x.status)

          console.log("Token saved!")
          //setState("This is token")

        })
        .catch(err => {
          console.log(err);
        })
    }

  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
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
