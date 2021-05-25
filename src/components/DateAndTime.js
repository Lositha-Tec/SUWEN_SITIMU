import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { RFPercentage } from "react-native-responsive-fontsize";

const TileParent = (props) => {
    return (
        <View style={styles.tileParent}>
            <Text style={styles.date}>{props.dateAndTime}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tileParent: {
        flex: 1,
        marginBottom: 30
    },

    date: {
        fontSize: RFPercentage(2),
    }
});

export default TileParent;