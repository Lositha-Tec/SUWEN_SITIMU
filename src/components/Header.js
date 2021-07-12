import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";

import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';
import { LanguageContext } from '../components/LanguageContext';

export default function Header(props) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const { colors } = useTheme();

  //Logout Function
  const clearLogin = () => {
    AsyncStorage.removeItem('covistaticaCredentials').then(() => {
      setStoredCredentials("");
    }).catch(error => console.log(error))
  }


  return (
    <View style={{ backgroundColor: colors.headerColor }}>
      {props.dateAndTime ? (<>
        <View style={styles.menuIcon}>
          <Ionicons
            name="menu-outline"
            size={35}
            color={colors.menuIconColor}
            onPress={() => props.navigation.openDrawer()}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>COVID-19 UPDATES</Text>
          <Text style={[styles.lastUpdateTime, { color: colors.dateColor }]}>
            Last Updated: {props.dateAndTime}
          </Text>
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
          <View >
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
                        onPress={() => { setModalVisible(!modalVisible); navigation.navigate("Profile");}}
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
      )
      }

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
});
