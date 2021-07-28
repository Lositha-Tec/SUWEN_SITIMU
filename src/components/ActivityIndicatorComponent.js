import React from "react";
import { View, StyleSheet, ActivityIndicator, } from "react-native";
import { Colors } from "../components/styles";

const { activityIndicatorColor, activityIndicatorBackgroundColor } = Colors;

export const ActivityIndicatorComponent = () => {
    return (
        <View style={styles.activityIndicatorBackground}>
            <View style={styles.activityIndicatorStyle}>
                <ActivityIndicator color={activityIndicatorColor} size="large" />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    activityIndicatorBackground: {
        height: "100%",
        backgroundColor: activityIndicatorBackgroundColor,
    },
    activityIndicatorStyle: {
        flex: 1,
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
    }
});