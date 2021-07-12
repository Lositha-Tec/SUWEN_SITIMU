import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from "@react-navigation/native";

import { View, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions, Text } from 'react-native';

//formik
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons } from '@expo/vector-icons';

//keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

//API Client
import axios from 'axios';

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';

//colors
const { brand, darkLight, primary } = Colors;

//Picker
import { Picker } from "@react-native-picker/picker";

//Picker Data
import villageData from "../data/gramaniladari";

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    Colors,
} from './../components/styles';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const UserProfileScreen = (props) => {
    const navigation = useNavigation();
    //Logout Function
    const clearLogin = () => {
        AsyncStorage.removeItem('covistaticaCredentials').then(() => {
            setStoredCredentials("");
        }).catch(error => console.log(error))
    }

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { name, email, photoUrl, mobile, gramaNiladhariDivision } = storedCredentials;

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const [villages, setVillages] = useState([]);
    const [selectedGgramaNiladhariDivision, setSelectedVillage] = useState("");

    const DB_URL = 'https://dry-waters-33546.herokuapp.com/user/';

    // set village data to villages array in loading screen
    useEffect(() => {
        setVillages(villageData);
    }, []);


    // fill villages into dropdown
    const DropDownData = villages.map((c) => {
        return <Picker.Item key={c.gn_name} value={c.gn_name + " " + c.gn_number} label={c.gn_name + " " + c.gn_number} />;
    });


    //form handling
    const handleAddData = (values, setSubmitting) => {
        handleMessage(null);
        //if
        if (!(mobile && gramaNiladhariDivision)) {
            axios.post(DB_URL + "add", values).then((response) => {
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                } else {
                    const SaveUser = {
                        'email': email,
                        'name': name,
                        'photoUrl': photoUrl,
                        'mobile': data.mobile,
                        'gramaNiladhariDivision': data.gramaNiladhariDivision
                    };
                    persistLogin(SaveUser);
                    handleMessage(message, status);
                    navigation.navigate("Notifications");

                }
                setSubmitting(false);
            }).catch(error => {
                console.log(error);
                setSubmitting(false);
                handleMessage("An error occured. Check your network and try again");
            });
        } else {
            axios.put(DB_URL + "add", values).then((response) => {
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                } else {
                    const SaveUser = {
                        'email': email,
                        'name': name,
                        'photoUrl': photoUrl,
                        'mobile': data.mobile,
                        'gramaNiladhariDivision': data.gramaNiladhariDivision
                    };
                    persistLogin(SaveUser);

                    console.log("Put mapping");

                    handleMessage(message, status);
                    navigation.navigate("Notifications");

                }
                setSubmitting(false);
            }).catch(error => {
                console.log(error);
                setSubmitting(false);
                handleMessage("An error occured. Check your network and try again");
            });
        }

    };


    const persistLogin = (data) => {
        AsyncStorage.setItem('covistaticaCredentials', JSON.stringify(data))
            .then(() => {
                setStoredCredentials(data);
            }).catch((error) => {
                console.log(error);
            })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <InnerContainer>
                    <PageTitle>Welcome</PageTitle>
                    <SubTitle>Personal Details</SubTitle>

                    <Formik
                        initialValues={{ name: name, email: email, mobile: mobile, gramaNiladhariDivision: gramaNiladhariDivision }}
                        onSubmit={(values, { setSubmitting }) => {
                            values = { ...values };
                            values.gramaNiladhariDivision = selectedGgramaNiladhariDivision;
                            if (values.name == '' || values.email == '' || values.mobile == '' || values.gramaNiladhariDivision == '') {
                                handleMessage('Please fill all the fields');
                                setSubmitting(false);
                            }
                            else {
                                handleAddData(values, setSubmitting);
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (<StyledFormArea>
                            <MyTextInput
                                label="Username"
                                icon="person"
                                placeholder="Enter Username"
                                placeholderTextColor={darkLight}
                                //onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                editable={false}
                                selectTextOnFocus={false}
                                value={name}
                            />

                            <MyTextInput
                                label="Email Address"
                                icon="mail"
                                placeholder="Enter email address"
                                placeholderTextColor={darkLight}
                                //onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                editable={false}
                                selectTextOnFocus={false}
                                value={email}
                                keyboardType="email-address"
                            />

                            <MyTextInput
                                label="Mobile Number"
                                icon="device-mobile"
                                placeholder="Enter mobile number"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('mobile')}
                                onBlur={handleBlur('mobile')}
                                value={values.mobile}
                                keyboardType="phone-pad"
                            />
                            <View>
                                <View style={styles.lblTextContainer}>
                                    <Text style={styles.lblText}>Grama Niladhari Division</Text>
                                </View>
                                <View style={styles.pickersParent}>
                                    <View style={styles.countryPickerParent}>
                                        <Picker
                                            selectedValue={gramaNiladhariDivision}
                                            style={styles.countryPicker}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setSelectedVillage(itemValue);

                                            }}
                                            value={values.gramaNiladhariDivision}
                                            mode="dialog"
                                        >
                                            <Picker.Item label="Select Grama Niladhari Division" value="" />
                                            {DropDownData}
                                        </Picker>
                                    </View>
                                </View>
                            </View>

                            <MsgBox type={messageType}>{message}</MsgBox>

                            {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                <ButtonText>Submit</ButtonText>
                            </StyledButton>}

                            {isSubmitting && <StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>}

                        </StyledFormArea>
                        )}

                    </Formik>
                    <Line />
                    <StyledButton onPress={clearLogin}>
                        <ButtonText>Logout</ButtonText>
                    </StyledButton>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({ label, icon, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    lblTextContainer: {
        //marginTop: 70,
    },
    lblText: {
        fontSize: 13,
    },
    pickersParent: {
        flexDirection: "row",
    },
    countryPickerParent: {
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: "#E5E7EB",
    },
    countryPicker: {
        height: Dimensions.get("window").height / 13,
        width: wp("79%"),
    },
})

export default UserProfileScreen;