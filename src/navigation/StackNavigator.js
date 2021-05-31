import React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

import OpenItemScreen from "../screens/OpenItemScreen";
import VillageOpenItemScreen from "../screens/VillageOpenItemScreen";

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

function RootStackScreen({ navigation }) {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Police Station Details"
        component={OpenItemScreen}
        options={{
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.navigate("Police Stations");
              }}
            />
          ),
        }}
      />
      <RootStack.Screen
        name="Grama Niladhari Details"
        component={VillageOpenItemScreen}
        options={{
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.navigate("Grama Niladhari");
              }}
            />
          ),
        }}
      />
    </RootStack.Navigator>
  );
}

export default RootStackScreen;
