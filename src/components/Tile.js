import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { RFPercentage } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Tile = (props) => {
    return (
        <View style={styles.tile}>
            <View style={styles.headingTextParent}>
                <Text style={styles.headingText}>{props.heading}</Text>
            </View>
            <View style={[styles.imageIcon, props.tileBackgroundColor]}>
                {props.iconComponent}
            </View>
            <View>
                <Text style={styles.count}>{props.count}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        width: wp('35%'),
        height: hp('20%'),
        padding: 5,
        margin: 5,
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "white",
        elevation: 10,
    },

    imageIcon: {
        backgroundColor: '#7052fb',
        width: wp('15%'),
        height: hp('8%'),
        borderRadius: 15,
        padding: 10,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 0, height: 1 },
        marginTop: 20,
    },

    headingTextParent: {
        flex: 1,
        marginBottom: 3,
        justifyContent: "flex-start",
    },

    headingText: {
        fontWeight: "bold",
        fontSize: RFPercentage(2),
        textAlign: "center",
        color: "black",
    },

    count: {
        fontSize: RFPercentage(3),
        color: '#000'
    }
});

export default Tile;