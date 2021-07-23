import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";

import { View, ActivityIndicator, StyleSheet, Dimensions, Text } from 'react-native';

//formik
import { Formik } from 'formik';

//icons
import { Octicons } from '@expo/vector-icons';

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

//import SearchableDropdown component
import SearchableDropdown from 'react-native-searchable-dropdown';

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
                    persistLogin(SaveUser(data.mobile,data.gramaNiladhariDivision));
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
                    persistLogin(SaveUser(values.mobile,values.gramaNiladhariDivision));
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

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <InnerContainer>
                    <SubTitle>Personal Details</SubTitle>
                    <Formik
                        initialValues={{ name: name, email: email, mobile: mobile, gramaNiladhariDivision: gramaNiladhariDivision }}
                        onSubmit={(values, { setSubmitting }) => {
                            values = { ...values };
                            values.gramaNiladhariDivision = selectedGgramaNiladhariDivision;
                            if (values.name) {//TODO
                                handleMessage('Please fill all the fields');
                                setSubmitting(false);
                            }
                            if (values.email) {
//TODO
                            }
                            if (values.mobile) {

                            }
                            if (values.gramaNiladhariDivision) {

                            }
                            if (values.name && values.email && values.mobile && values.gramaNiladhariDivision) {
                                handleAddData(values, setSubmitting);
                            }
                        }}

                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                        (<StyledFormArea>
                            <View>
                                <Text style={styles.headingText}>
                                    Grama Niladhari Division
                                </Text>
                                <Text style={styles.headingText}>
                                    {gramaNiladhariDivisionOne}
                                </Text>
                                <SearchableDropdown
                                    onTextChange={(text) => { }}
                                    onItemSelect={(item) => {
                                        setSelectedGgramaNiladhariDivision(item.name);
                                    }}
                                    containerStyle={{ padding: 5 }}
                                    selectedItems={gramaniladari()}
                                    textInputStyle={{
                                        //inserted text style
                                        padding: 12,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        backgroundColor: '#FAF7F6',
                                        color: '#774645',
                                        fontSize: 24,
                                    }}
                                    itemStyle={{
                                        //single dropdown item style
                                        padding: 10,
                                        marginTop: 2,
                                        backgroundColor: '#FAF9F8',
                                        borderColor: '#bbb',
                                        borderWidth: 1,
                                        color: 'red',
                                    }}
                                    itemTextStyle={{
                                        //text style of a single dropdown item
                                        color: 'green',
                                    }}
                                    itemsContainerStyle={{
                                        //items container style you can pass maxHeight
                                        //to restrict the items dropdown hieght
                                        maxHeight: '60%',
                                    }}
                                    defaultIndex={1}
                                    items={DATA_ARRAY}
                                    //default selected item index
                                    placeholder="placeholder"
                                    //place holder for the search input
                                    resetValue={false}
                                />
                            </View>

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

                            <MsgBox type={messageType}>{message}</MsgBox>

                            {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                <ButtonText>Submit</ButtonText>
                            </StyledButton>}

                            {isSubmitting && <StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>}
                            <Line />
                            <StyledButton onPress={clearLogin}>
                                <ButtonText>Logout</ButtonText>
                            </StyledButton>
                        </StyledFormArea>
                        )}

                    </Formik>
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

    headingText: {
        fontSize: 13,
    },
})

export default UserProfileScreen;