import React from 'react'
import { StyleSheet, Text, View, Image } from "react-native";
import HeaderNoNetwork from './HeaderNoNetwork';
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

const NoNetworkConnection = (props) => {
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
            <View style={{ flex: 1, backgroundColor: "white" }}>
                {props.navigation ? (
                    <HeaderNoNetwork navigation={props.navigation} />
                ) : (<></>)}
                <View style={styles.mainContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingText}>No internet connection</Text>
                    </View>
                    <Image source={require('../../assets/img/wifi-coverage.gif')} style={styles.imageStyles} resizeMode="contain" />
                    <View style={styles.warnContainer}>
                        <Text style={styles.warnText}>Please check your network connection!!</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: "center",
        backgroundColor: "white",
    },
    headingContainer: {
        marginTop: "20%",
    },
    headingText: {
        textAlign: "center",
        fontSize: 35,
        color: "#808080",
        fontFamily: 'ExpletusSans_700Bold',
    },
    imageStyles: {
        width: "40%",
        height: "40%"
    },
    warnContainer: {
        marginTop: 10
    },
    warnText: {
        color: "red",
        fontSize: 18,
        textAlign: "center",
        fontFamily: 'ExpletusSans_500Medium',
    },
})

export default NoNetworkConnection;