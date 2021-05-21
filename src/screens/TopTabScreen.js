import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import WHOGuideScreen from './WHOGuideScreen';
import SymptomsScreen from './SymptomsScreen';
import PreventionScreen from './PreventionScreen';

const Tab = createMaterialTopTabNavigator();


const TopTabScreen = () => {
  return (
    
      <Tab.Navigator backBehavior="none">
        <Tab.Screen name="WHO Guide" component={WHOGuideScreen} />
        <Tab.Screen name="Symptoms" component={SymptomsScreen} />
        <Tab.Screen name="Prevention" component={PreventionScreen} />
      </Tab.Navigator>
    
  );
};

const styles = StyleSheet.create({});

export default TopTabScreen;
