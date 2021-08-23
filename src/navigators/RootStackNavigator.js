import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';

import PoliceOpenItemScreen from "../screens/PoliceOpenItemScreen";
import VillageOpenItemScreen from "../screens/VillageOpenItemScreen";
import HospitalOpenItemScreen from "../screens/HospitalOpenItemScreen";
import PharmacyOpenItemScreen from "../screens/PharmacyOpenItemScreen";
import UserProfileScreen from '../screens/UserProfileScreen';
import TopTabScreen from "../screens/TopTabScreen";
import HealthGuidelineScreen from "../screens/HealthGuidelineScreen";
import PharmacyWebScreen from "../screens/PharmacyWebScreen";

//import { LanguageContext } from '../components/LanguageContext';
//import LanguageSelectionScreen from '../screens/LanguageSelectionScreen';
import { useSelector } from "react-redux";

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

const Stack = createStackNavigator();

const RootStackNavigator = ({ navigation }) => {

    let currentTheme = useSelector((state) => {
        return state;
    });

    return (
        // <LanguageContext.Consumer>
        //     {({ storedLanguage }) => (
                <NavigationContainer theme={currentTheme ? customDarkTheme : customDefaultTheme}>
                    <Stack.Navigator>
                        {/* {storedLanguage ? ( */}
                            <>
                                <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
                                <Stack.Screen name="Grama Niladhari Details" component={VillageOpenItemScreen} options={{ headerShown: true }} />
                                <Stack.Screen name="Police Station Details" component={PoliceOpenItemScreen} options={{ headerShown: true }} />
                                <Stack.Screen name="Hospital Details" component={HospitalOpenItemScreen} options={{ headerShown: true }} />
                                <Stack.Screen name="Osusala Details" component={PharmacyOpenItemScreen} options={{ headerShown: true }} />
                                <Stack.Screen name="Profile" component={UserProfileScreen} />
                                <Stack.Screen name="How to be Healthy" component={TopTabScreen} />
                                <Stack.Screen name="Health Guidelines" component={HealthGuidelineScreen} />
                                <Stack.Screen name="Pharmacies" component={PharmacyWebScreen} />
                            </>
                        {/* ) : (
                            <>
                                <Stack.Screen name="Language" component={LanguageSelectionScreen} options={{ headerShown: false }} />
                            </>
                        )} */}
                    </Stack.Navigator>
                </NavigationContainer>
        //     )}
        // </LanguageContext.Consumer>
    )

}

export default RootStackNavigator;