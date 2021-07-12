//React
import React, { useState, useContext } from 'react';

//React Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';
//import { NoConnectionComponent } from '../components/NoConnectionComponent.js';

//Icons
import { FontAwesome5 } from "@expo/vector-icons";

//Screens
import LocalDataScreen from '../screens/LocalDataScreen';
import GlobalDataScreen from '../screens/GlobalDataScreen';
import TimelineScreen from '../screens/TimelineScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import MessageServiceScreen from '../screens/MessageServiceScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Tabs = createBottomTabNavigator();

//Bottom Tab Navigator (This is the 3rd navigator function connected with Drawer Navigator function)
const BottomTabNavigator = () => {
    

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
                            } else if (route.name === "Message" && storedCredentials) {
                                iconName = "facebook-messenger";
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
                        labelStyle: { fontWeight: "bold", fontSize: 12 },
                    }}
                >
                    <Tabs.Screen name="Sri Lanka" component={LocalDataScreen} />
                    <Tabs.Screen name="Global" component={GlobalDataScreen} />
                    <Tabs.Screen name="Your history" component={TimelineScreen} />
                    {storedCredentials ? (
                        <>
                            {/* <Tabs.Screen name="Message" component={MessageServiceScreen} /> */}
                            {storedCredentials.mobile ? (
                                <Tabs.Screen name="Notifications" component={NotificationScreen} />
                            ) : (
                                <Tabs.Screen name="Profile" component={UserProfileScreen} />
                            )}
                        </>
                    ) : (
                        <Tabs.Screen name="Login" component={LoginScreen} />
                    )}

                </Tabs.Navigator>

            )}
        </CredentialsContext.Consumer >
    )
}

export default BottomTabNavigator;