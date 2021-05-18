import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

import Constant from "expo-constants";
import * as GoogleSignIn from 'expo-google-sign-in';

class LoginScreen extends Component {
    render() {
        return (
            <View style={styles.parent}>
                <TouchableOpacity onPress={() => alert('Button Pressed')} style={styles.googleLoginButton}>
                    <Text style={styles.googleLoginButtonText}>Google Sign-In</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        justifyContent: "center",
        marginTop: Constant.statusBarHeight
    },

    googleLoginButton: {
        padding: 15,
        margin: 10,
        backgroundColor: "#de5246",
        borderRadius: 10
    },

    googleLoginButtonText: {
        textAlign: "center",
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 25
    }
});

export default LoginScreen;