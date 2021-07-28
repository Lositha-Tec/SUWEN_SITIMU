import React, { useContext, useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, ScrollView, ActivityIndicator, TouchableOpacity, } from 'react-native'
import Header from "../components/Header";
import { checkConnected } from '../components/CheckConnectedComponent';
import NoNetworkConnection from "../components/NoNetworkConnection";

//API Client
import axios from 'axios';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const DB_URL = 'https://dry-waters-33546.herokuapp.com/notification/';

//import for the animation of Collapse and Expand
import * as Animatable from 'react-native-animatable';

//import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';

//Dummy content to show
//You can also use dynamic data by calling web service
const CONTENT = [];

const ActivityIndicatorElement = () => {
    return (
        <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator color="#009688" size="large" />
        </View>
    );
};

const NotificationScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [connectStatus, setConnectStatus] = useState(false)
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { gramaNiladhariDivision } = storedCredentials;

    // set village data to villages array in loading screen
    useEffect(() => {
        setLoading(true);
        getNotification();
        const interval = setInterval(() => {
            checkConnected().then(res => {
                setConnectStatus(res)
            })
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const getNotification = () => {
        axios.get(DB_URL + "get/" + gramaNiladhariDivision).then((response) => {
            const result = response.data;
            const { Notification } = result;

            for (let x in Notification) {
                let notifiDate = new Date(Notification[x].createdAt);
                let date = notifiDate.getDate() - 1;
                let month = notifiDate.getMonth() + 1;
                let year = notifiDate.getFullYear();
                let notificationDate = `${year}-${month}-${date}`;
                let notificationNew = {

                    title: Notification[x].title + ' ' + ' ' + '(' + notificationDate + ')',
                    content: Notification[x].message
                }
                CONTENT.push(notificationNew);
                setLoading(false);
            }

        }).catch(error => {
            console.log(error);
            // handleMessage("An error occured. Check your network and try again");
        });
    }
    {
        // Ddefault active selector
        const [activeSections, setActiveSections] = useState([]);

        // MultipleSelect is for the Multiple Expand allowed
        // True: Expand multiple at a time
        // False: One can be expand at a time
        const [multipleSelect, setMultipleSelect] = useState(true);

        const setSections = (sections) => {
            //setting up a active section state
            setActiveSections(sections.includes(undefined) ? [] : sections);
        };

        const renderHeader = (section, _, isActive) => {
            //Accordion Header view
            return (
                <Animatable.View
                    duration={400}
                    style={[styles.header, isActive ? styles.active : styles.inactive]}
                    transition="backgroundColor">
                    <Text style={styles.headerText}>{section.title}</Text>
                </Animatable.View>
            );
        };

        const renderContent = (section, _, isActive) => {
            //Accordion Content view
            return (
                <Animatable.View
                    duration={400}
                    style={[styles.content, isActive ? styles.active : styles.inactive]}
                    transition="backgroundColor">
                    <Animatable.Text
                        animation={isActive ? 'bounceIn' : undefined}
                        style={{ textAlign: 'center', color: "white", fontSize: 15 }}>
                        {section.content}
                    </Animatable.Text>
                </Animatable.View>
            );
        };

        return (
            connectStatus ? (
            <SafeAreaView style={{ flex: 1 }}>
                <Header
                    navigation={props.navigation}
                //dateAndTime={covidData.update_date_time}
                />
                <View style={styles.container}>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/*Code for Accordion/Expandable List starts here*/}
                        <Accordion
                            activeSections={activeSections}
                            //for any default active section
                            sections={CONTENT}
                            //title and content of accordion
                            touchableComponent={TouchableOpacity}
                            //which type of touchable component you want
                            //It can be the following Touchables
                            //TouchableHighlight, TouchableNativeFeedback
                            //TouchableOpacity , TouchableWithoutFeedback
                            expandMultiple={multipleSelect}
                            //Do you want to expand mutiple at a time or single at a time
                            renderHeader={renderHeader}
                            //Header Component(View) to render
                            renderContent={renderContent}
                            //Content Component(View) to render
                            duration={400}
                            //Duration for Collapse and expand
                            onChange={setSections}
                        //setting the state of active sections
                        />

                    </ScrollView>
                    {loading ? <ActivityIndicatorElement /> : null}
                </View>
            </SafeAreaView>
            ) : (<NoNetworkConnection navigation={props.navigation} />)
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30,
        paddingHorizontal: 20
    },
    header: {
        padding: 20,
        borderRadius: 5,
        marginVertical: 10
    },
    headerText: {
        textAlign: 'center',
        fontSize: 18,
        color: "white",
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
        borderRadius: 10,
    },
    active: {
        backgroundColor: '#3c6c91',
    },
    inactive: {
        backgroundColor: '#3c6c91',
    },
    activityIndicatorStyle: {
        flex: 1,
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
    },
});

export default NotificationScreen
