import React, {useState} from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

import * as Google from 'expo-google-app-auth';

const LoginScreen = ({ navigation }) => {
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };

    const handleGoogleSignin = () => {
        setGoogleSubmitting(true);
        const config = {
            iosClientId: `503174767857-18grsq509r3oovst8j48382j9kqadm8r.apps.googleusercontent.com`,
            androidClientId: `503174767857-jd18j33hb5ikfstodcq31pe7n1h47vpd.apps.googleusercontent.com`,
            scopes: ['profile', 'email']
        };
        Google.logInAsync(config).then((result) => {
            const { type, user } = result;

            if (type == 'success') {
                const { email, name, photoUrl } = user;
                handleMessage('Google signin successfull');
                setTimeout(() => navigation.navigate('Message', { email, name, photoUrl }), 1000);
            } else {
                handleMessage('Google signin was cancelled');
                console.log('Google signin was cancelled');
            }
            setGoogleSubmitting(false);

        }).catch(error => {
            console.log(error);
            handleMessage("An error occured. Check your network and try again");
            setGoogleSubmitting(false);
        })

    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <Text style={styles.MsgBox}>{message}</Text>

            {!googleSubmitting && (
                <TouchableOpacity style={styles.googleLoginButton} onPress={handleGoogleSignin}>
                    <FontAwesome5 name="google" size={24} color="white" />
                    <Text style={styles.googleLoginButtonText}>Sign in with Google</Text>
                </TouchableOpacity>
            )}

            {googleSubmitting && (<TouchableOpacity style={styles.googleLoginButton} disabled={true}>
                <ActivityIndicator size="large" color="white" />
            </TouchableOpacity>)}
        </View>
    )
}

const styles = StyleSheet.create({
    googleLoginButton: {
        backgroundColor: "#10B981",
        width: 200,
        padding: 18,
        justifyContent: "center",
        borderRadius: 3,
        flexDirection: "row",
        alignItems: "center"

    },
    googleLoginButtonText: {
        color: "white",
        paddingLeft: 10
    },
    MsgBox : {
        color: "blue",
        fontSize: 12
    }
    
})

export default LoginScreen;