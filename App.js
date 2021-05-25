import React from "react";
import { StyleSheet, StatusBar } from "react-native";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import DrawerNavigator from "./src/navigation/DrawerNavigator";

import { themeReducer } from "./src/reducers/themeReducer";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import { createStore } from "redux";

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    headerColor: "#3b3b3b",
    fontColor: "white",
    menuIconColor: "white",
    msgTxtColor: "white",
    screenBgColor: "black",
    subTitleColor: "white",
    paraTextColor: "white",
    WHOAdviceTextColor: "white",
    symptomTextIconColor: "white",
    symptomTextColor: "white",
    symptomHeaderTextColor: "white",
  },
};

const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    headerColor: "white",
    fontColor: "black",
    menuIconColor: "gray",
    msgTxtColor: "black",
    screenBgColor: "white",
    subTitleColor: "black",
    paraTextColor: "#454141",
    WHOAdviceTextColor: "black",
    symptomTextIconColor: "black",
    symptomTextColor: "#2B2727",
    symptomHeaderTextColor: "#000000",
  },
};

const store = createStore(themeReducer);

export default App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="gray" />
      <Navigation />
    </Provider>
  );
};

export function Navigation() {
  let currentTheme = useSelector((state) => {
    return state;
  });

  return (
    <NavigationContainer
      theme={currentTheme ? customDarkTheme : customDefaultTheme}
    >
      <DrawerNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});