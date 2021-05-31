// ./navigation/DrawerNavigator.js

import React, { Component } from "react";
import { WebView } from "react-native-webview";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useSelector, useDispatch } from "react-redux";

import RootStackScreen from "./StackNavigator";

import PoliceStationsScreen from "../screens/PoliceStationsScreen";
import VillegeServiceScreen from "../screens/VillegeServiceScreen";
import HospitalsScreen from "../screens/HospitalsScreen";
import TopTabScreen from "../screens/TopTabScreen";

import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export class HealthGuidlineScreen extends Component {
  render() {
    return (
      <WebView source={{ uri: "https://covid19.gov.lk/guidelines.html" }} />
    );
  }
}

export class RateUsScreen extends Component {
  render() {
    return <WebView source={{ uri: "https://play.google.com/" }} />;
  }
}

export class PrivacyPolicyScreen extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: "https://github.com/Developers-In/covid19/blob/master/Privacy%20Policy.md",
        }}
      />
    );
  }
}

export class TermsConditionScreen extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: "https://github.com/Developers-In/covid19/blob/master/Terms%20%26%20Conditions.md",
        }}
      />
    );
  }
}

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => {
    return state;
  });

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={({ focused, color, size }) => (
          <Ionicons
            color={"#5c5c5c"}
            size={size}
            name={focused ? "color-palette" : "color-palette"}
          />
        )}
        label="Change Theme"
        onPress={() =>
          dispatch({ type: "change_theme", payload: !currentTheme })
        }
        labelStyle={{ fontSize: 15, fontWeight: "bold", paddingLeft: 1 }}
      />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      backBehavior="initialRoute"
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        labelStyle: { fontWeight: "bold", fontSize: 15 },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={RootStackScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-home"
              size={24}
              color={focused ? "#3c6c91" : "#5c5c5c"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="How to be Healthy"
        component={TopTabScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome5
              name="hand-holding-heart"
              size={22}
              color={focused ? "#3c6c91" : "#5c5c5c"}
            />
          ),
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Health Guidelines"
        component={HealthGuidlineScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome5
              name="head-side-mask"
              size={24}
              color={focused ? "#3c6c91" : "#5c5c5c"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Grama Niladhari"
        component={VillegeServiceScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="users"
              size={22}
              color={focused ? "#3c6c91" : "#5c5c5c"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Police Stations"
        component={PoliceStationsScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="police-badge"
              size={24}
              color={focused ? "#3c6c91" : "#5c5c5c"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Hospitals"
        component={HospitalsScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome5
              name="hospital-alt"
              size={23}
              color={focused ? "#3c6c91" : "#5c5c5c"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Rate Us"
        component={RateUsScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons
              name="star-rate"
              size={24}
              color={focused ? "#3c6c91" : "#5c5c5c"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicyScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons
              name="privacy-tip"
              size={24}
              color={focused ? "#3c6c91" : "#5c5c5c"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Terms & Conditions"
        component={TermsConditionScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-document-text"
              size={24}
              color={focused ? "#3c6c91" : "#5c5c5c"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
