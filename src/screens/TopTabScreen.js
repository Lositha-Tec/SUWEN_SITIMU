import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import WHOGuideScreen from "./WHOGuideScreen";
import SymptomsScreen from "./SymptomsScreen";
import PreventionScreen from "./PreventionScreen";

const Tab = createMaterialTopTabNavigator();

const TopTabScreen = () => {
  return (
    <Tab.Navigator backBehavior="none" tabBarOptions={{labelStyle: { fontSize: 14, fontWeight:"bold" },
    }}>
      <Tab.Screen name="WHO Guide" component={WHOGuideScreen} />
      <Tab.Screen name="Symptoms" component={SymptomsScreen} />
      <Tab.Screen name="Prevention" component={PreventionScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default TopTabScreen;