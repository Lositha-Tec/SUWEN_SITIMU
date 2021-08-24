import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CredentialsContext } from './../components/CredentialsContext';

import { FontAwesome5 } from "@expo/vector-icons";

import AppLoading from 'expo-app-loading';
import {
    useFonts,
    ExpletusSans_400Regular,
    ExpletusSans_400Regular_Italic,
    ExpletusSans_500Medium,
    ExpletusSans_500Medium_Italic,
    ExpletusSans_600SemiBold,
    ExpletusSans_600SemiBold_Italic,
    ExpletusSans_700Bold,
    ExpletusSans_700Bold_Italic,
} from '@expo-google-fonts/expletus-sans';

import LocalDataScreen from '../screens/LocalDataScreen';
import GlobalDataScreen from '../screens/GlobalDataScreen';
import TimelineScreen from '../screens/TimelineScreen';
import LoginScreen from '../screens/LoginScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Tabs = createBottomTabNavigator();

const BottomTabNavigator = () => {
    let [fontsLoaded] = useFonts({
        ExpletusSans_400Regular,
        ExpletusSans_400Regular_Italic,
        ExpletusSans_500Medium,
        ExpletusSans_500Medium_Italic,
        ExpletusSans_600SemiBold,
        ExpletusSans_600SemiBold_Italic,
        ExpletusSans_700Bold,
        ExpletusSans_700Bold_Italic,
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <CredentialsContext.Consumer>
                {({ storedCredentials }) => (
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
                                } else if (route.name === "Profile" && storedCredentials) {
                                    iconName = "user-alt";
                                } else if (route.name === "Notifications" && storedCredentials) {
                                    iconName = "bell";
                                } else if (route.name === "Login" && !storedCredentials) {
                                    iconName = "sign-in-alt";
                                }

                                return <FontAwesome5 name={iconName} size={24} color={color} />;
                            },
                        })}
                        tabBarOptions={{
                            activeTintColor: "red",
                            inactiveTintColor: "gray",
                            labelStyle: { fontFamily: 'ExpletusSans_700Bold', },
                        }}
                    >
                        <Tabs.Screen name="Sri Lanka" component={LocalDataScreen} />
                        <Tabs.Screen name="Global" component={GlobalDataScreen} />
                        <Tabs.Screen name="Your history" component={TimelineScreen} />
                        {storedCredentials ? (
                            <>
                                {storedCredentials.mobile ? (
                                    <Tabs.Screen name="Notifications" component={NotificationScreen} />
                                ) : (
                                    <Tabs.Screen name="Profile" component={UserProfileScreen} />
                                )}
                            </>
                        ) : (
                            <>
                                {/* <Tabs.Screen name="Login" component={LoginScreen} /> */}
                            </>
                        )}
                    </Tabs.Navigator>
                )}
            </CredentialsContext.Consumer >
        )
    }
}

export default BottomTabNavigator;