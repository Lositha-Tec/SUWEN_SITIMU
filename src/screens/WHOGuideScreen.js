import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

import WHOImageComponent from "../components/WHOImageComponent";

function WHOGuideScreen() {
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.paraContainer}>
          <Text style={styles.paraText}>
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
});

export default WHOGuideScreen;
