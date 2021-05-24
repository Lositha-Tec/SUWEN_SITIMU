import React, { Component } from "react";
import { StyleSheet, StatusBar, View, Button, Text } from "react-native";
import { WebView } from "react-native-webview";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { themeReducer } from "./src/reducers/themeReducer";
import { useSelector, useDispatch } from "react-redux";

import { Provider } from "react-redux";
import { createStore } from "redux";

import LocalDataScreen from "./src/screens/LocalDataScreen";
import GlobalDataScreen from "./src/screens/GlobalDataScreen";
import TimelineScreen from "./src/screens/TimelineScreen";
import MessageServiceScreen from "./src/screens/MessageServiceScreen";
import PoliceStationsScreen from "./src/screens/PoliceStationsScreen";
import VillegeServiceScreen from "./src/screens/VillegeServiceScreen";
import TopTabScreen from "./src/screens/TopTabScreen";

import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

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
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const RootHome = () => {
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

// function NewScreen2 () {
//   return(
//     <View>
//       <Text>
//         New Screen2
//       </Text>
//     </View>
//   )
// }

// function NewScreen ({navigation}) {
//   return(
//     <View>
//       <Text>
//         New Screen
//       </Text>
//       <Button title="Heyyyyyyyyyyy" onPress={()=> navigation.navigate(NewScreen2)} />
//     </View>
//   )
// }

export default App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="gray" />
      <Navigation />
    </Provider>
  );
};

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

function MyDrawer() {
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
        component={RootHome}
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
      {/* <Drawer.Screen
        name="New Screen"
        component={NewScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-document-text"
              size={24}
              color={focused ? "#3c6c91" : "#5c5c5c"}
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button
//         title="Go to Settings"
//         onPress={() => navigation.navigate("Settings")}
//       />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// function SettingsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Notifications" component={NotificationsScreen} />
//       <Stack.Screen name="Settings" component={SettingsScreen} />
//     </Stack.Navigator>
//   );
// }

export function Navigation() {
  let currentTheme = useSelector((state) => {
    return state;
  });

  return (
    <NavigationContainer
      theme={currentTheme ? customDarkTheme : customDefaultTheme}
    >
      <MyDrawer />
      {/* <MyStack /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
