import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from "@react-navigation/native";

import WHOImageComponent from "../components/WHOImageComponent";

function WHOGuideScreen({ navigation }) {
  const { colors } = useTheme();
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.paraContainer}>
          <Text style={[styles.paraText,{color:colors.paraTextColor}]}>
            To deal with the public health risk of COVID-19 and its possible
            consequences, the Minister for Health and Medical Research has made
            a number of Orders, under section 7 of the Public Health Act 2010.
            Orders can be amended frequently.
          </Text>
        </View>
        <WHOImageComponent
          image={require("../../assets/WHO/washHand.png")}
          text="Wash hands with soap and water"
        />
        <WHOImageComponent
          image={require("../../assets/WHO/separateRoom.png")}
          text="Stay in a separate, well-ventilated room"
        />
        <WHOImageComponent
          image={require("../../assets/WHO/doNotLeave.png")}
          text="Do not leave home"
        />
        <WHOImageComponent
          image={require("../../assets/WHO/sneeze.png")}
          text="Use a tissue for each sneeze"
        />
        <WHOImageComponent
          image={require("../../assets/WHO/washroom.png")}
          text="When possible, use a separate washroom"
        />
        <WHOImageComponent
          image={require("../../assets/WHO/washing.png")}
          text="Store and wash laundry separately"
        />
        <WHOImageComponent
          image={require("../../assets/WHO/mask.png")}
          text="Wear a mask, protect those arround you "
        />
        <WHOImageComponent
          image={require("../../assets/WHO/objects.png")}
          text="Avoid the use of shared use of objects"
        />
        <WHOImageComponent
          image={require("../../assets/WHO/clean.png")}
          text="Clean surfaces each day"
        />
        <WHOImageComponent
          image={require("../../assets/WHO/visitors.png")}
          text="Do not have visitors in the house"
        />
        <View style={styles.linkContainer}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
              )
            }
          >
            <View style={{flexDirection:"row" }}>
              <Text style={styles.linkText}>LEARN MORE</Text>
              <MaterialIcons name="double-arrow" size={30} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  paraContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  paraText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkContainer: {
    flex:1,
    alignItems: "center",
    backgroundColor: "#1c6278",
    padding:20,
    width:"90%",
    borderRadius:10,
    marginBottom:20
  },
  linkText: {
    color: "white",
    fontSize: 20,
    marginRight:10,
    marginTop: 3,
    fontWeight:"bold"
  },
});

export default WHOGuideScreen;
