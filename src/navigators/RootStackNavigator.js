//React
import * as React from 'react';

//React Navigation
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LanguageContext } from '../components/LanguageContext';

//import SampleScreen from '../screens/SampleScreen';
import OpenItemScreen from "../screens/OpenItemScreen";
import VillageOpenItemScreen from "../screens/VillageOpenItemScreen";
import HospitalOpenItemScreen from "../screens/HospitalOpenItemScreen";
import PharmacyOpenItemScreen from "../screens/PharmacyOpenItemScreen";
import SaveGNDivisionScreen from '../screens/SaveGNDivisionScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';

//Drawer Navigator
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

import { useSelector } from "react-redux";
import LanguageSelectionScreen from '../screens/LanguageSelectionScreen';

const customDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        headerColor: "#3b3b3b",
        fontColor: "white",
        menuIconColor: "white",
        msgTxtColor: "white",
        screenBgColor: "black",
        subTitleColor: "black",
        paraTextColor: "white",
        WHOAdviceTextColor: "white",
        symptomTextIconColor: "white",
        symptomTextColor: "white",
        symptomHeaderTextColor: "white",
        dateColor: "white",
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
        dateColor: "#737373",
    },
};

//Root Stak Navigator (This is the main navigator function connected with App.js)
const RootStackNavigator = ({ navigation }) => {

    let currentTheme = useSelector((state) => {
        return state;
    });

    return (
        <LanguageContext.Consumer>
            {({ storedLanguage }) => (
                <NavigationContainer theme={currentTheme ? customDarkTheme : customDefaultTheme}>
                    <Stack.Navigator>
                        {storedLanguage ? (
                            <>
                                <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
                                <Stack.Screen name="Grama Niladhari Details" component={VillageOpenItemScreen} options={{ headerShown: true }} />
                                <Stack.Screen name="Police Station Details" component={OpenItemScreen} options={{ headerShown: true }} />
                                <Stack.Screen name="Hospital Details" component={HospitalOpenItemScreen} options={{ headerShown: true }} />
                                <Stack.Screen name="Osusala Details" component={PharmacyOpenItemScreen} options={{ headerShown: true }} />
                                <Stack.Screen name="Profile" component={UserProfileScreen} />
                            </>
                        ) : (
                            <>
                                <Stack.Screen name="Language" component={LanguageSelectionScreen} options={{ headerShown: false }} />
                            </>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </LanguageContext.Consumer>
    )

}

export default RootStackNavigator;