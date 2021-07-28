import React from 'react';
import { Share, Linking } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, FontAwesome, FontAwesome5, MaterialIcons, MaterialCommunityIcons, Fontisto  } from "@expo/vector-icons";
import BottomTabNavigator from './TabNavigator';

import TopTabScreen from "../screens/TopTabScreen";
import HealthGuidelineScreen from "../screens/HealthGuidelineScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import TermsConditionScreen from "../screens/TermsConditionScreen";
import TelltoPresidentScreen from "../screens/TelltoPresidentScreen";
import VillegeServiceScreen from "../screens/VillegeServiceScreen";
import PoliceStationsScreen from '../screens/PoliceStationsScreen';
import HospitalsScreen from "../screens/HospitalsScreen";
import PharmacyWebScreen from "../screens/PharmacyWebScreen";
import VaccinationScreen from "../screens/VaccinationScreen";
import PharmaciesScreen from "../screens/PharmaciesScreen";
import SettingScreen from "../screens/SettingScreen";

const rateUsURl = `https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.developers_in.suwen_sitimu&ddl=1&pcampaignid=web_ddl_1&showAllReviews=true`

const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'https://play.google.com/store/apps/details?id=com.developers_in.suwen_sitimu',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const Drawer = createDrawerNavigator();

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
          <MaterialIcons
            color={"#5c5c5c"}
            size={size}
            name={focused ? "star-rate" : "star-rate"}
          />
        )}
        label="Rate Us"
        onPress={() => Linking.openURL(`${rateUsURl}`)}
        labelStyle={{ fontSize: 15, fontWeight: "bold", paddingLeft: 1 }}
      />
      <DrawerItem
        icon={({ focused, color, size }) => (
          <FontAwesome
            color={"#5c5c5c"}
            size={size}
            name={focused ? "share-alt" : "share-alt"}
          />
        )}
        label="Share App"
        onPress={onShare}
        labelStyle={{ fontSize: 15, fontWeight: "bold", paddingLeft: 1 }}
      />
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

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      backBehavior="initialRoute"
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        labelStyle: { fontWeight: "bold", fontSize: 15 },
      }}
      drawerStyle={{
        //width: 300,
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
        component={HealthGuidelineScreen}
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
        name="Pharmacies"
        component={PharmacyWebScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons
              name="local-hospital"
              size={23}
              color={focused ? "#3c6c91" : "#5c5c5c"}
            />
          ),
          headerShown: true,
          headerTintColor: "gray",
        }}
      />
      <Drawer.Screen
        name="Vaccination Program"
        component={VaccinationScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Fontisto 
              name="injection-syringe"
              size={23}
              color={focused ? "#3c6c91" : "#5c5c5c"}
            />
          ),
          headerShown: true,
          headerTintColor: "gray",
        }}
      />
      {/* <Drawer.Screen
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
      /> */}
      <Drawer.Screen
        name="Tell to President"
        component={TelltoPresidentScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome5
              name="user-tie"
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
      {/* <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome5
              name="cog"
              size={24}
              color={focused ? "#3c6c91" : "#5c5c5c"}
            />
          ),
          headerShown: true,
          headerTintColor: "gray",
        }}
      /> */}
    </Drawer.Navigator>

  );
}
