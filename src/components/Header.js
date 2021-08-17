import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, Linking, Image } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons, FontAwesome, } from "@expo/vector-icons";
import RNModal from 'react-native-modal';

import { EContactItem } from '../components/EContactItem';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
// import { LanguageContext } from '../components/LanguageContext';
// import * as Localization from 'expo-localization';
// import { si, en, ta } from '../i18n/SupportedLanguages';
// import i18n from 'i18n-js';

// i18n.translations = {
//   si, en, ta
// }

// i18n.locale = Localization.locale;
// i18n.fallbacks = true;

const hospitalColombo = "0112691111";
const suwaSariya = "1990";
const police = "119";
const qurantineUnit = "0112112705";
const presidentTask = "117";
const healthPromotion = "0710107107";
const qurantineInfo1 = "0113090502";
const qurantineInfo2 = "113";
const accidentManagementNo = "0113071073";
const covidSymptomsNo = "1390";
const qurantineAntryNo = "0112860003";

export default function Header(props) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEContactVisible, setModalEContactVisible] = useState(false);
  const navigation = useNavigation();
  const { colors } = useTheme();

  const clearLogin = () => {
    AsyncStorage.removeItem('suwenSitimuCredentials').then(() => {
      setStoredCredentials("");
    }).catch(error => console.log(error))
  }

  return (
    <View style={{ backgroundColor: colors.headerColor }}>
      {props.dateAndTime ? (
        <>
          <View style={styles.userIcon}>
            <Ionicons
              name="menu-outline"
              size={35}
              color={colors.menuIconColor}
              onPress={() => props.navigation.openDrawer()}
            />
            <TouchableOpacity onPress={() => { setModalEContactVisible(true); }}>
              <Image source={require('../../assets/img/contactIcon.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            {/* <Text style={styles.title}>{i18n.t('header')}</Text> */}
            <Text style={styles.title}>COVID-19 UPDATES</Text>
            <Text style={[styles.lastUpdateTime, { color: colors.dateColor }]}>
              Last Updated: {props.dateAndTime}
            </Text>
          </View>
          <View>
            <RNModal isVisible={modalEContactVisible}
              transparent={true}
              hideModalContentWhileAnimating={true}
              onBackdropPress={() => setModalEContactVisible(false)}
              backdropColor={'rgba(0,0,0,0.4)'}
              backdropOpacity={1}
              animationIn={'zoomInDown'}
              animationOut={'zoomOutUp'}
              animationInTiming={1000}
              animationOutTiming={1000}
              backdropTransitionInTiming={1000}
              backdropTransitionOutTiming={1000}
            >
              <View style={styles.eContactModalView}>
                <View style={{ flex: 1, alignItems: "flex-end", paddingBottom: 35 }}>
                  <FontAwesome
                    style={{ paddingRight: 15 }}
                    name="close"
                    size={30}
                    color={"#6666ff"}
                    onPress={() => { setModalEContactVisible(!modalEContactVisible); }}
                  />
                </View>
                <View style={{ flex: 1, alignItems: "center", paddingBottom: 35, backgroundColor: "white", marginHorizontal: 20, marginBottom: 8, borderRadius: 7 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 20, color: "#DC143C" }}>Emergency Contact Numbers</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginBottom: 30 }}>
                    <EContactItem
                      displayStyle={false}
                      onPressItem={() => Linking.openURL(`tel:${hospitalColombo}`)}
                      imageSource={
                        require("../../assets/contacts/hospital.png")
                      }
                      labelComponent={"011 269 1111"}
                    />
                    <EContactItem
                      displayStyle={false}
                      onPressItem={() => Linking.openURL(`tel:${suwaSariya}`)}
                      imageSource={
                        require("../../assets/contacts/suwasariya.png")
                      }
                      labelComponent={"1990"}
                    />
                    <EContactItem
                      displayStyle={false}
                      onPressItem={() => Linking.openURL(`tel:${police}`)}
                      imageSource={
                        require("../../assets/contacts/policeEmergency.png")
                      }
                      labelComponent={"119"}
                    />
                    <EContactItem
                      displayStyle={false}
                      onPressItem={() => Linking.openURL(`tel:${qurantineUnit}`)}
                      imageSource={
                        require("../../assets/contacts/qurantine.png")
                      }
                      labelComponent={"011 211 2705"}
                    />
                    <EContactItem
                      displayStyle={false}
                      onPressItem={() => Linking.openURL(`tel:${presidentTask}`)}
                      imageSource={
                        require("../../assets/contacts/presidentTask.png")
                      }
                      labelComponent={"117"}
                    />
                    <EContactItem
                      displayStyle={false}
                      onPressItem={() => Linking.openURL(`tel:${healthPromotion}`)}
                      imageSource={
                        require("../../assets/contacts/healthPromotion.png")
                      }
                      labelComponent={"071 010 7107"}
                    />
                    <EContactItem
                      displayStyle={false}
                      onPressItem={() => Linking.openURL(`tel:${accidentManagementNo}`)}
                      imageSource={
                        require("../../assets/contacts/accManagement.png")
                      }
                      labelComponent={"011307 1073"}
                    />
                    <EContactItem
                      displayStyle={false}
                      onPressItem={() => Linking.openURL(`tel:${covidSymptomsNo}`)}
                      imageSource={
                        require("../../assets/contacts/covidSymptoms.png")
                      }
                      labelComponent={"1390"}
                    />
                    <EContactItem
                      displayStyle={false}
                      onPressItem={() => Linking.openURL(`tel:${qurantineAntryNo}`)}
                      imageSource={
                        require("../../assets/contacts/qurantineAntry.png")
                      }
                      labelComponent={"011 286 0003"}
                    />
                    <EContactItem
                      displayStyle={true}
                      onPressItem2={() => Linking.openURL(`tel:${qurantineInfo2}`)}
                      onPressItem={() => Linking.openURL(`tel:${qurantineInfo1}`)}
                      imageSource={
                        require("../../assets/contacts/qurantineInfo.png")
                      }
                      labelComponent={"011 309 0502"}
                      labelComponent2={"113"}
                    />
                  </View>
                </ScrollView>
                {/* <View style={{ borderWidth: 1, height: 50 }}>
                  <AdMobBannerComponent/>
                </View> */}
              </View>
            </RNModal>
          </View>
        </>
      ) : (
        <>
          <View style={styles.userIcon}>
            <Ionicons
              name="menu-outline"
              size={35}
              color={colors.menuIconColor}
              onPress={() => props.navigation.openDrawer()}
            />
            <Ionicons
              name="person-circle"
              size={35}
              color={colors.menuIconColor}
              onPress={() => {
                setModalVisible(true);
              }}
            />
          </View>
          <View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}>
              <TouchableOpacity style={styles.modalContainer} onPress={() => { setModalVisible(!modalVisible); }} activeOpacity={0}>
                <View style={styles.modalView}>
                  <View style={styles.logIcons}>
                    <View>
                      <Ionicons
                        style={{ paddingRight: 15 }}
                        name="person-circle"
                        size={50}
                        color={colors.menuIconColor}
                        onPress={() => { setModalVisible(!modalVisible); navigation.navigate("Profile"); }}
                      />
                      <Text>Profile</Text>
                    </View>
                    <View>
                      <Ionicons
                        name="log-out-outline"
                        size={50}
                        color={colors.menuIconColor}
                        onPress={clearLogin}
                      />
                      <Text>Log out</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuIcon: {
    paddingLeft: 15,
    marginTop: 10,
  },
  userIcon: {
    marginTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  logIcons: {
    flexDirection: "row",
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: RFPercentage(4),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
    color: "#DC143C",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    textShadowColor: "#800000",
  },
  lastUpdateTime: {
    fontSize: RFPercentage(2),
    marginBottom: 15,
    fontWeight: "bold",
  },

  modalContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  modalView: {
    margin: 20,
    marginTop: 50,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  eContactModalView: {
    flex: 1,
    //borderWidth: 1,
    backgroundColor: "rgba(214, 214, 194, 0.7)",
    borderRadius: 10,
    padding: 10
  }
});
