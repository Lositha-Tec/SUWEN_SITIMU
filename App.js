import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, BackHandler, Alert } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { themeReducer } from "./src/reducers/themeReducer";
import { useSelector, useDispatch } from "react-redux";
import * as Location from 'expo-location';

import { Provider } from "react-redux";
import { createStore } from "redux";

import LocalDataScreen from "./src/screens/LocalDataScreen";
import GlobalDataScreen from "./src/screens/GlobalDataScreen";
import TimelineScreen from "./src/screens/TimelineScreen";
import MessageServiceScreen from "./src/screens/MessageServiceScreen";
import PoliceStationsScreen from "./src/screens/PoliceStationsScreen";

import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    headerColor: "#3b3b3b",
    fontColor: "white",
    menuIconColor: "white",
    msgTxtColor: "white",
    screenBgColor: "black",
    subTitleColor: "white"
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
  },
};


const store = createStore(themeReducer);
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const RootHome = () => {
  return (
    <Tabs.Navigator
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
        labelStyle: { fontWeight: "bold", fontSize:12 },
      }}
    >
      <Tabs.Screen name="Sri Lanka" component={LocalDataScreen} />
      <Tabs.Screen name="Global" component={GlobalDataScreen} />
      <Tabs.Screen name="Your history" component={TimelineScreen} />
      {/* <Tabs.Screen name="Message" component={MessageServiceScreen} /> */}
    </Tabs.Navigator>
  );
};

function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => {
    return state;
  });

  return (
    <View style={{ flex: 1,paddingHorizontal:10 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialCommunityIcons
          style={{ padding: 10 }}
          name="keyboard-backspace"
          size={34}
          color="gray"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
      <TouchableOpacity
        style={styles.btnAppear}
        onPress={() =>
          dispatch({ type: "change_theme", payload: !currentTheme })
        }
      >
        <MaterialCommunityIcons
          style={{ paddingRight: 10, paddingLeft: 10 }}
          name="theme-light-dark"
          size={28}
          color="black"
        />
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Change Appearance
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export class RateUsScreen extends Component {
  render() {
    return (
      <WebView
        source={{ uri: "https://play.google.com/" }}
      />
    );
  }
}

export class PrivacyPolicyScreen extends Component {
  render() {
    return (
      <WebView
        source={{ uri: "https://github.com/Developers-In/covid19/blob/master/Privacy%20Policy.md" }}
      />
    );
  }
}

export class TermsAndConditionsScreen extends Component {
  render() {
    return (
      <WebView
        source={{ uri: "https://github.com/Developers-In/covid19/blob/master/Terms%20%26%20Conditions.md" }}
      />
    );
  }
}

export default App = () => {
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Hold on!", "Are you sure you want to close application?", [
  //       {
  //         text: "No",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       { text: "Yes", onPress: () => BackHandler.exitApp() }
  //     ]);
  //     return true;
  //   };
  
  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );
  
  //   return () => backHandler.remove()}, []);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  //console.log(location);

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
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={RootHome} />
        <Drawer.Screen name="Police Stations" component={PoliceStationsScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Rate Us" component={RateUsScreen} />
        <Drawer.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
        <Drawer.Screen name="Terms & Conditions" component={TermsAndConditionsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constant.statusBarHeight,
    paddingTop: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    alignItems: "center",
  },
  btnAppear: {
    alignItems: "flex-start",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
  },
});
