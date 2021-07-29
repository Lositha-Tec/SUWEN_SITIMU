import React, { useState, useContext, useEffect, } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions, Text, } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { Formik } from 'formik';
import * as yup from 'yup';
import TextInput from '../components/TextInput';

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from "react-native-responsive-screen";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
import SearchableDropdown from 'react-native-searchable-dropdown';
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

const { primary } = Colors;

import villageData from "../data/gramaniladari";

import {
    StyledContainer,
    InnerContainer,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    Colors,
} from './../components/styles';

const ProfileSchema = yup.object().shape({
    mobile: yup
        .string()
        .matches(/(07)(\d){8}\b/, 'Enter a valid phone number')
        .required('Phone number is required'),
});

const UserProfileScreen = (props) => {
    const navigation = useNavigation();

    //Logout Function
    const clearLogin = () => {
        AsyncStorage.removeItem('suwenSitimuCredentials').then(() => {
            setStoredCredentials("");
        }).catch(error => console.log(error))
    }

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { name, email, photoUrl, mobile, gramaNiladhariDivision } = storedCredentials;

    //console.log(storedCredentials);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const [selectedGgramaNiladhariDivision, setSelectedGgramaNiladhariDivision] = useState("");
    const [gramaNiladhariDivisionOne, setGramaNiladhariDivision] = useState(gramaNiladhariDivision);

    const DB_URL = 'https://dry-waters-33546.herokuapp.com/user/';

    let DATA_ARRAY = [];

    const gramaniladariArray = () => {
        for (let i = 0; i < villageData.length; i++) {
            let gramaniladari = {};
            gramaniladari.id = i;
            gramaniladari.name = villageData[i].gn_name + ' ' + villageData[i].gn_number;
            DATA_ARRAY.push(gramaniladari);
        }
    }

    const gramaniladari = () => {
        DATA_ARRAY = [];
        gramaniladariArray();
        if (selectedGgramaNiladhariDivision) {
            setGramaNiladhariDivision(selectedGgramaNiladhariDivision);
        }
        if (gramaNiladhariDivision && mobile) {
            if (gramaNiladhariDivision === selectedGgramaNiladhariDivision) {
                return gramaNilaObject(selectedGgramaNiladhariDivision);
            } else {
                return gramaNilaObject(selectedGgramaNiladhariDivision);
            }
        } else {
            return gramaNilaObject(selectedGgramaNiladhariDivision);
        }
    };

    const gramaNilaObject = (gramaniladariDevision) => {
        let gramaobj = {};
        for (let i = 0; i < DATA_ARRAY.length; i++) {
            if (DATA_ARRAY[i].name === gramaniladariDevision) {
                gramaobj.id = i;
                gramaobj.name = DATA_ARRAY[i].name;
                return gramaobj;
            }
        }
    };


    const handleAddData = (values, setSubmitting) => {
        handleMessage(null);
        if (!(mobile && gramaNiladhariDivision)) {
            axios.post(DB_URL + "add", values).then((response) => {
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                } else {
                    persistLogin(SaveUser(data.mobile, data.gramaNiladhariDivision));
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
                    persistLogin(SaveUser(values.mobile, values.gramaNiladhariDivision));
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

    const SaveUser = (mobile, gramaNiladhariDivision) => {
        let user = {
            'email': email,
            'name': name,
            'photoUrl': photoUrl,
            'mobile': mobile,
            'gramaNiladhariDivision': gramaNiladhariDivision
        }
        return user;
    };

    const persistLogin = (data) => {
        AsyncStorage.setItem('suwenSitimuCredentials', JSON.stringify(data))
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

    const validationErrorMsg = selectedGgramaNiladhariDivision == '' ? 'Select Grama Niladhari Division' : '';

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <InnerContainer>
                    <SubTitle>Personal Details</SubTitle>
                    <Formik
                        initialValues={{ name: name, email: email, mobile: mobile, gramaNiladhariDivision: gramaNiladhariDivision }}
                        validationSchema={ProfileSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            values = { ...values };
                            values.gramaNiladhariDivision = selectedGgramaNiladhariDivision;
                            if (values.name == "") {
                                //handleMessage('Please fill name');
                                setSubmitting(false);
                                console.log(values.name)
                            }
                            if (values.email == "") {
                                //handleMessage('Please fill email');
                                setSubmitting(false);
                                console.log(values.email)
                            }
                            if (values.mobile == "") {
                                //handleMessage('Please fill mobile number');
                                setSubmitting(false);
                                console.log(values.mobile)

                            }
                            if (values.gramaNiladhariDivision == "") {
                                //handleMessage('Please select Grama Niladhari Division');
                                setSubmitting(false);

                                console.log("Grama Niladhari division" + values.gramaNiladhariDivision)
                            }
                            if (values.name && values.email && values.mobile && values.gramaNiladhariDivision) {
                                handleAddData(values, setSubmitting);
                            }
                        }}

                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) =>
                        (<StyledFormArea>
                            <View>
                                <Text style={styles.headingText}>
                                    Grama Niladhari Division
                                </Text>
                                <Text style={{ fontSize: 15, fontWeight: "bold", color: 'green' }}>
                                    Selected Division: {gramaNiladhariDivisionOne}
                                </Text>
                                <SearchableDropdown
                                    onTextChange={(text) => { }}
                                    onItemSelect={(item) => {
                                        setSelectedGgramaNiladhariDivision(item.name);
                                    }}
                                    containerStyle={{ padding: 5 }}
                                    selectedItems={gramaniladari()}
                                    textInputStyle={{
                                        borderColor: selectedGgramaNiladhariDivision == '' ? 'red' : 'green',
                                        //inserted text style
                                        padding: 14,
                                        borderWidth: 3,
                                        borderRadius: 5,
                                        color: 'green',
                                        fontSize: 15,
                                    }}
                                    itemStyle={{
                                        //single dropdown item style
                                        padding: 18,
                                        marginTop: 2,
                                        borderRadius: 5,
                                        backgroundColor: '#FAF9F8',
                                        borderColor: '#bbb',
                                        borderWidth: 1,
                                    }}
                                    itemTextStyle={{
                                        //text style of a single dropdown item
                                        color: 'black',
                                        fontSize: 16
                                    }}
                                    itemsContainerStyle={{
                                        //items container style you can pass maxHeight
                                        //to restrict the items dropdown hieght
                                        maxHeight: '60%',
                                    }}
                                    //defaultIndex={1}
                                    items={DATA_ARRAY}
                                    //default selected item index
                                    placeholder="Select Grama Niladhari Division"
                                    placeholderTextColor="rgba(34, 62, 75, 0.7)"
                                    //place holder for the search input
                                    resetValue={false}
                                />
                                <Text style={{ color: 'red', fontSize: 12, fontWeight: 'bold' }}>
                                    {validationErrorMsg}
                                </Text>
                            </View>

                            <TextInput
                                label='Username'
                                icon='user'
                                placeholder='Enter Username'
                                returnKeyType='next'
                                returnKeyLabel='next'
                                name='name'
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                editable={false}
                                selectTextOnFocus={false}
                                error={errors.name}
                                touched={touched.name}
                                value={name}
                            />

                            <TextInput
                                label='Email Address'
                                icon='mail'
                                placeholder='Enter email address'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                keyboardAppearance='dark'
                                returnKeyType='next'
                                returnKeyLabel='next'
                                name='email'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                editable={false}
                                selectTextOnFocus={false}
                                error={errors.email}
                                touched={touched.email}
                                value={email}
                            />

                            <TextInput
                                label='Mobile Number'
                                icon='mobile'
                                placeholder='Enter your mobile'
                                autoCapitalize='none'
                                keyboardType='phone-pad'
                                keyboardAppearance='dark'
                                returnKeyType='go'
                                returnKeyLabel='go'
                                name='mobile'
                                onChangeText={handleChange('mobile')}
                                onBlur={handleBlur('mobile')}
                                error={errors.mobile}
                                touched={touched.mobile}
                                value={values.mobile}
                            />

                            <MsgBox type={messageType}>{message}</MsgBox>

                            {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                <ButtonText>Submit</ButtonText>
                            </StyledButton>}

                            {isSubmitting && <StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>}
                            {/* <Line />
                            <StyledButton onPress={clearLogin}>
                                <ButtonText>Logout</ButtonText>
                            </StyledButton> */}
                        </StyledFormArea>
                        )}

                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>

    );
};

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

    headingText: {
        fontSize: 13,
    },
})

export default UserProfileScreen;