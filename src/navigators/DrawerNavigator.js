//React
import React, { useState } from 'react';
import { WebView } from "react-native-webview";

//React Navigation
import {
  createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { useSelector, useDispatch } from "react-redux";

//Screens
import PoliceStationsScreen from '../screens/PoliceStationsScreen';
import VillegeServiceScreen from "../screens/VillegeServiceScreen";
import HospitalsScreen from "../screens/HospitalsScreen";
import PharmaciesScreen from "../screens/PharmaciesScreen";
import TopTabScreen from "../screens/TopTabScreen";
import SettingScreen from "../screens/SettingScreen";

import { NoConnectionComponent } from '../components/NoConnectionComponent.js';

//Icons
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

import { checkConnected } from '../components/CheckConnectedComponent';
import NoNetworkConnection from "../components/NoNetworkConnection";

//Bottom Tab Navigator
import BottomTabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

export const HealthGuidlineScreen = (props) => {
  const [connectStatus, setConnectStatus] = useState(false)
  checkConnected().then(res => {
    setConnectStatus(res)
  })
  return (
    connectStatus ? (
      <WebView source={{ uri: "https://covid19.gov.lk/guidelines.html" }} />
    ) : (<NoNetworkConnection navigation={false} onCheck={checkConnected} />)
  );
}

export const RateUsScreen = (props) => {
  const [connectStatus, setConnectStatus] = useState(false)
  checkConnected().then(res => {
    setConnectStatus(res)
  })
  return (
    connectStatus ? (
      <WebView source={{ uri: "https://play.google.com/store/apps/details?id=com.developers_in.strong_village" }} />
    ) : (<NoNetworkConnection navigation={false} onCheck={checkConnected} />)
  );
}

export const PrivacyPolicyScreen = (props) => {
  const [connectStatus, setConnectStatus] = useState(false)
  checkConnected().then(res => {
    setConnectStatus(res)
  })
  return (
    connectStatus ? (
      <WebView source={{ uri: "http://developers-in.com/covistatica/privacy.html" }} />
    ) : (<NoNetworkConnection navigation={false} onCheck={checkConnected} />)
  );
}

export const TermsConditionScreen = (props) => {
  const [connectStatus, setConnectStatus] = useState(false)
  checkConnected().then(res => {
    setConnectStatus(res)
  })
  return (
    connectStatus ? (
      <WebView source={{ uri: "http://developers-in.com/covistatica/terms.html" }} />
    ) : (<NoNetworkConnection navigation={false} onCheck={checkConnected} />)
  );
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

//Drawer Navigator (This is the 2nd Navigator function connected with Root Stack Navigator function)
export default function DrawerNavigator() {
  // const [connectStatus, setConnectStatus] = useState(false)
  // checkConnected().then(res => {
  //   setConnectStatus(false)
  // })
  return (
    // <NoConnectionComponent.Consumer>
    // {({ connectionStatus }) => (
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
        component={BottomTabNavigator}
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
          headerTintColor: "gray",
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
          headerShown: true,
          headerTintColor: "gray",
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
        name="Osusal"
        component={PharmaciesScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons
              name="local-hospital"
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
          headerShown: true,
          headerTintColor: "gray",
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
          headerShown: true,
          headerTintColor: "gray",
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
          headerShown: true,
          headerTintColor: "gray",
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-document-text"
              size={24}
              color={focused ? "#3c6c91" : "#5c5c5c"}
            />
          ),
          headerShown: true,
          headerTintColor: "gray",
        }}
      />
    </Drawer.Navigator>
    
    // )}
    // </NoConnectionComponent.Consumer>

  );
}