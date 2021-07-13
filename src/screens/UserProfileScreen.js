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

const DATA_ARRAY = [];

// const items = [
//     //name key is must.It is to show the text in front
//     { id: 1, name: 'angellist' },
//     { id: 2, name: 'codepen' },
//     { id: 3, name: 'envelope' },
//     { id: 4, name: 'etsy' },
//     { id: 5, name: 'facebook' },
//     { id: 6, name: 'foursquare' },
//     { id: 7, name: 'github-alt' },
//     { id: 8, name: 'github' },
//     { id: 9, name: 'gitlab' },
//     { id: 10, name: 'instagram' },
// ];


function gramaniladariArray() {
    for (let i = 0; i < villageData.length; i++) {
        let gramaniladari = {};
        gramaniladari.id = i;
        gramaniladari.name = villageData[i].gn_name + ' ' + villageData[i].gn_number;
        DATA_ARRAY.push(gramaniladari);
    }
}

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

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const [selectedGgramaNiladhariDivision, setSelectedGgramaNiladhariDivision] = useState("");


    const DB_URL = 'https://dry-waters-33546.herokuapp.com/user/';

    // set village data to villages array in loading screen
    useEffect(() => {
        gramaniladariArray();
        //console.log(DATA_ARRAY);
    }, []);


    // fill villages into dropdown
    // const DropDownData = villages.map((c) => {
    //     return <Picker.Item key={c.gn_name} value={c.gn_name + " " + c.gn_number} label={c.gn_name + " " + c.gn_number} />;
    // });


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
                    //navigation.navigate("Notifications");

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
                    //navigation.navigate("Notifications");

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
                    {/* <PageTitle>Welcome</PageTitle> */}
                    <SubTitle>Personal Details</SubTitle>
                    <Formik
                        initialValues={{ name: name, email: email, mobile: mobile, gramaNiladhariDivision: gramaNiladhariDivision }}
                        onSubmit={(values, { setSubmitting }) => {
                            values = { ...values };
                            values.gramaNiladhariDivision = selectedGgramaNiladhariDivision;
                            console.log(values.gramaNiladhariDivision);
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

                            <View>
                                <Text style={styles.headingText}>
                                    Grama Niladhari Division
                                </Text>
                                <SearchableDropdown
                                    onTextChange={(text) => console.log(text)}
                                    //On text change listner on the searchable input
                                    onItemSelect={(item) => setSelectedGgramaNiladhariDivision(item.id)}
                                    //onItemSelect={(item) => console.log(item.name)}
                                    //onItemSelect called after the selection from the dropdown
                                    containerStyle={{}}
                                    //suggestion container style
                                    textInputStyle={{
                                        //inserted text style
                                        padding: 15,
                                        borderRadius: 5,
                                        marginBottom: 10,
                                        marginTop: 10,
                                        backgroundColor: "#E5E7EB",
                                    }}
                                    itemStyle={{
                                        //single dropdown item style
                                        padding: 10,
                                        marginTop: 2,
                                        backgroundColor: '#FAF9F8',
                                        borderColor: '#bbb',
                                        borderWidth: 1,
                                    }}
                                    itemTextStyle={{
                                        //text style of a single dropdown item
                                        color: '#222',
                                    }}
                                    itemsContainerStyle={{
                                        //items container style you can pass maxHeight
                                        //to restrict the items dropdown hieght
                                        maxHeight: '60%',
                                    }}
                                    items={DATA_ARRAY}
                                    //mapping of item array
                                    //defaultIndex={2}
                                    //default selected item index
                                    placeholder="Search Grama Niladhari Division"
                                    //place holder for the search input
                                    resetValue={false}
                                    //reset textInput Value with true and false state
                                    //underlineColorAndroid="transparent"
                                //To remove the underline from the android input
                                />
                                {/* <View style={styles.lblTextContainer}>
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
                                </View> */}
                                {/*
                                <SearchableDropdown
                                    onTextChange={(text) => console.log(text)}
                                    //On text change listner on the searchable input
                                    onItemSelect={(item) => {console.log(JSON.stringify(item.name))}}
                                    //selectedValue= {gramaNiladhariDivision}
                                    //value={values.gramaNiladhariDivision}
                                    //onItemSelect called after the selection from the dropdown
                                    containerStyle={{ padding: 5 }}
                                    //suggestion container style
                                    textInputStyle={{
                                        //inserted text style
                                        padding: 12,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        backgroundColor: '#FAF7F6',
                                    }}
                                    itemStyle={{
                                        //single dropdown item style
                                        padding: 10,
                                        marginTop: 2,
                                        backgroundColor: '#FAF9F8',
                                        borderColor: '#bbb',
                                        borderWidth: 1,
                                    }}
                                    itemTextStyle={{
                                        //text style of a single dropdown item
                                        color: '#222',
                                    }}
                                    itemsContainerStyle={{
                                        //items container style you can pass maxHeight
                                        //to restrict the items dropdown hieght
                                        maxHeight: '60%',
                                    }}
                                    items={items}
                                    //mapping of item array
                                    //defaultIndex={1}
                                    //default selected item index
                                    placeholder="placeholder"
                                    //place holder for the search input
                                    resetValue={false}
                                    //reset textInput Value with true and false state
                                    underlineColorAndroid="transparent"
                                //To remove the underline from the android input
                                /> */}
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

    headingText: {
        fontSize: 13,
    },
})

export default UserProfileScreen;