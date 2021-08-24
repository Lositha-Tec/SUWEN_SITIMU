import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AppLoading from 'expo-app-loading';
import { useFonts, ExpletusSans_600SemiBold, } from '@expo-google-fonts/expletus-sans';

import WHOGuideScreen from "./WHOGuideScreen";
import SymptomsScreen from "./SymptomsScreen";

const Tab = createMaterialTopTabNavigator();

const TopTabScreen = ({ navigation }) => {

  let [fontsLoaded] = useFonts({ ExpletusSans_600SemiBold });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Tab.Navigator
        backBehavior="none"
        tabBarOptions={{ labelStyle: { fontSize: 14, fontFamily: 'ExpletusSans_600SemiBold', } }}
      >
        <Tab.Screen name="WHO Guide" component={WHOGuideScreen} />
        <Tab.Screen name="Symptoms" component={SymptomsScreen} />
      </Tab.Navigator>
    );
  }
};

const styles = StyleSheet.create({});

export default TopTabScreen;
