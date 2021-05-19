import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation, useTheme } from '@react-navigation/native';

import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from '@expo/vector-icons';
import { color } from "react-native-reanimated";

export default function Header(props) {
    const navigation = useNavigation();
    const { colors } = useTheme();
    return (
        <View style={{ backgroundColor: colors.headerColor }}>
            <View style={styles.menuIcon}>
                <Ionicons name="menu-outline" size={35} color={colors.menuIconColor} onPress={() => props.navigation.openDrawer()} />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>COVID-19 UPDATES</Text>
                <Text style={{ color: colors.fontColor, fontSize: RFPercentage(2), marginBottom: 15, }}>Last Updated: {props.dateAndTime}</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    menuIcon: {
        paddingLeft: 15,
        marginTop: 10
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontSize: RFPercentage(4),
        fontWeight: 'bold',
        color: "#7052fb",
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
    },

});