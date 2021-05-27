import React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

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
    </RootStack.Navigator>
  );
}

export default RootStackScreen;
