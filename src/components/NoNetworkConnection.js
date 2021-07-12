import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import HeaderNoNetwork from './HeaderNoNetwork';
const NoNetworkConnection = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {props.navigation ? (
                <HeaderNoNetwork
                navigation={props.navigation}
            />
            ) : (<></>)}
            <View style={styles.mainContainer}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Unable to connect</Text>
                </View>
                <Image source={require('../../assets/img/noConnection.png')} style={{ width: "30%", height: "30%" }} resizeMode="contain" />
                <View style={styles.warnContainer}>
                    <Text style={styles.warnText}>Please check your network connection!!</Text>
                </View>
                <TouchableOpacity style={styles.btnReload} onPress={props.onCheck}>
                    <Text style={styles.btnReloadText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        //flex: 1,
        paddingHorizontal: 20,
        alignItems: "center",
        backgroundColor: "white",
        //borderWidth: 1
    },
    headingContainer: {
        marginTop: "20%",
        // /backgroundColor: "white",
    },
    headingText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#808080"
    },
    warnContainer: {
        marginTop: 10
    },
    warnText: {
        color: "red",
        fontSize: 18,
        textAlign: "center"
    },
    btnReload: {
        marginTop: 60,
        backgroundColor: "#3c6c91",
        borderRadius: 10,
        padding: 20,
    },
    btnReloadText: {
        fontSize: 15,
        color: "white"
    },
})

export default NoNetworkConnection;