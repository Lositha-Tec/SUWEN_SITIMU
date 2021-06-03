import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import GlobalDataScreen from "../screens/GlobalDataScreen";
import MessageServiceScreen from "../screens/MessageServiceScreen";

import { FontAwesome5 } from "@expo/vector-icons";
import TimelineScreen from "../screens/TimelineScreen";
import LocalDataScreen from "../screens/LocalDataScreen";

const Tabs = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tabs.Navigator
      backBehavior="none"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Sri Lanka") {
            iconName = "chart-bar";
          } else if (route.name === "Global") {
            iconName = "globe-americas";
          } else if (route.name === "Your history") {
            iconName = "history";
          } else if (route.name === "Message") {
            iconName = "facebook-messenger";
          }

          return <FontAwesome5 name={iconName} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "red",
        inactiveTintColor: "gray",
        labelStyle: { fontWeight: "bold", fontSize: 12 },
      }}
    >
      <Tabs.Screen name="Sri Lanka" component={LocalDataScreen} />
      <Tabs.Screen name="Global" component={GlobalDataScreen} />
      <Tabs.Screen name="Your history" component={TimelineScreen} />
      {/* <Tabs.Screen name="Message" component={MessageServiceScreen} /> */}
    </Tabs.Navigator>
  );
};

export default BottomTabNavigator;
