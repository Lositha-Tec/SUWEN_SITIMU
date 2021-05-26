import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OpenItemScreen from "../screens/OpenItemScreen";

import TabNavigator from "./TabNavigator";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name="Sri Lanka" component={TabNavigator} />
    </MainStack.Navigator>
  );
}

function RootStackScreen() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Police Station Details" component={OpenItemScreen} />
    </RootStack.Navigator>
  );
}

export default RootStackScreen;
