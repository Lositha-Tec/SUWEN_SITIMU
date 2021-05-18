import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import Constant from "expo-constants";

const MessageScreen = () => {
    const { colors } = useTheme();
    return (
        <View style={styles.parent}>
            <FontAwesome5 name="info-circle" size={60} color="#1faabf" />
            <Text style={[styles.msgText,{ color:colors.msgTxtColor}]}>We hope to provide messaging service as soon as possible</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: Constant.statusBarHeight
    },

    msgText: {
        marginTop: 50,
        fontWeight: "bold",
        fontSize: 20,
        paddingHorizontal:10,
        textAlign: "center",
    }
});

export default MessageScreen;