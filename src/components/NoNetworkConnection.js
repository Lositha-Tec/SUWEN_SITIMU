import React from 'react'
import { StyleSheet, Text, View, Image } from "react-native";
import HeaderNoNetwork from './HeaderNoNetwork';

const NoNetworkConnection = (props) => {
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
        fontWeight: "bold",
        color: "#808080"
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
        textAlign: "center"
    },
})

export default NoNetworkConnection;