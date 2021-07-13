import React, { useState, useContext } from 'react';

//icons
import { Fontisto } from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    MsgBox,
    MT100,
    Colors,
} from '../components/styles';
import { ActivityIndicator } from 'react-native';

//colors
const { primary } = Colors;

//keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

//API Client
//import axios from 'axios';

import * as Google from 'expo-google-app-auth';

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//API Client
import axios from 'axios';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';

import { checkConnected } from '../components/CheckConnectedComponent';
import NoNetworkConnection from "../components/NoNetworkConnection";


const DB_URL = 'https://dry-waters-33546.herokuapp.com/user/';

const LoginScreen = (props) => {
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    const [connectStatus, setConnectStatus] = useState(false)

    checkConnected().then(res => {
        setConnectStatus(res)
    })

    //context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };

    const handleGoogleSignin = () => {
        setGoogleSubmitting(true);
        const config = {
            iosClientId: `393101834710-eeue5tmj02o27hdmju5rl56dium3cr56.apps.googleusercontent.com`,
            androidClientId: `503174767857-jd18j33hb5ikfstodcq31pe7n1h47vpd.apps.googleusercontent.com`,
            scopes: ['profile', 'email']
        };
        Google.logInAsync(config).then((result) => {
            const { type, user } = result;

            if (type == 'success') {
                const { email, name, photoUrl } = user;
                if ({ email }) {
                    checkDataAlreadyExists(user, 'Google signin is successfull', 'SUCCESS');
                }

            } else {
                handleMessage('Google signin was cancelled');
            }

        }).catch(error => {
            console.log(error);
            handleMessage("An error occured. Check your network and try again");
            setGoogleSubmitting(false);
        })

    };

    const checkDataAlreadyExists = (userGmail, message, status) => {
        axios.get(DB_URL + "get/" + userGmail.email).then((response) => {
            const result = response.data;
            const { user } = result;
            if (user) {
                let User = {
                    name: userGmail.name, 
                    photoUrl: userGmail.photoUrl,
                    email: userGmail.email, 
                    mobile: user.mobile, 
                    gramaNiladhariDivision: user.gramaNiladhariDivision, 
                }
                persistLogin(User);
                props.navigation.navigate("Notifications");

            } else {
                persistLogin(userGmail);
                props.navigation.navigate("Profile");
            }
            handleMessage(message, status);
            setGoogleSubmitting(false);
        }).catch(error => {
            console.log(error);
            handleMessage("An error occured. Check your network and try again");
        });
    }

    const persistLogin = (credentials) => {
        AsyncStorage.setItem('suwenSitimuCredentials', JSON.stringify(credentials))
            .then(() => {
                setStoredCredentials(credentials);

            }).catch((error) => {
                console.log(error);
                handleMessage('Persisting login failed');
            })
            
    }

    return (
        connectStatus ? (
            <KeyboardAvoidingWrapper>
                <StyledContainer>

                    <InnerContainer>
                        <PageLogo resizeMode="cover" source={require('../../assets/img/logo.png')} />
                        <PageTitle>Suwen Sitimu</PageTitle>
                        <SubTitle>Account Login</SubTitle>

                        <StyledFormArea>
                            <MsgBox type={messageType}>{message}</MsgBox>
                            <MT100 />

                            {!googleSubmitting && (<StyledButton google={true} onPress={handleGoogleSignin}>
                                <Fontisto name="google" color={primary} size={25} />
                                <ButtonText google={true}>Sign in with Google</ButtonText>
                            </StyledButton>)}

                            {googleSubmitting && (<StyledButton google={true} disabled={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>)}

                        </StyledFormArea>

                    </InnerContainer>
                </StyledContainer>
            </KeyboardAvoidingWrapper>
        ) : (<NoNetworkConnection navigation={props.navigation} onCheck={checkConnected} />)
    );
};
export default LoginScreen;