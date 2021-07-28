import React from "react";
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity, } from "react-native";
import { MaterialIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import SymptomsImageComponent from "../components/SymptomsImageComponent";
import { AdMobBannerComponent } from "../components/AdMobBannerComponent";

function SymptomsScreen() {
  const { colors } = useTheme();
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.symptomsContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <FontAwesome name="certificate" size={30} color="#FF0000" />
            <Text
              style={[
                styles.headerText,
                { color: colors.symptomHeaderTextColor },
              ]}
            >
              Serious symptoms:
            </Text>
          </View>

          <SymptomsImageComponent
            image={require("../../assets/Symptoms/shortness_breath.jpg")}
            text="Difficulty breathing or shortness of breath"
          />
          <SymptomsImageComponent
            image={require("../../assets/Symptoms/chest_pain.jpg")}
            text="Chest pain or pressure"
          />
          <SymptomsImageComponent
            image={require("../../assets/Symptoms/loss_of_speech.jpg")}
            text="Loss of speech or movement"
          />
        </View>

        <View style={styles.symptomsContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <FontAwesome name="certificate" size={30} color="#DF8B0C" />
            <Text
              style={[
                styles.headerText,
                { color: colors.symptomHeaderTextColor },
              ]}
            >
              Most common symptoms:
            </Text>
          </View>

          <SymptomsImageComponent
            image={require("../../assets/Symptoms/fever.jpg")}
            text="Fever"
          />
          <SymptomsImageComponent
            image={require("../../assets/Symptoms/dry_cough.jpg")}
            text="Dry Cough"
          />
          <SymptomsImageComponent
            image={require("../../assets/Symptoms/tiredness.jpg")}
            text="Tiredness"
          />
        </View>

        <View style={styles.symptomsContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <FontAwesome name="certificate" size={30} color="#FCF209" />
            <Text
              style={[
                styles.headerText,
                { color: colors.symptomHeaderTextColor },
              ]}
            >
              Less common symptoms:
            </Text>
          </View>
          <SymptomsImageComponent
            image={require("../../assets/Symptoms/aches.jpg")}
            text="Aches and pains"
          />
          <SymptomsImageComponent
            image={require("../../assets/Symptoms/sore_throte.jpg")}
            text="Sore throat"
          />
          <SymptomsImageComponent
            image={require("../../assets/Symptoms/diarrhoea.jpg")}
            text="Diarrhoea"
          />
          <SymptomsImageComponent
            image={require("../../assets/Symptoms/conjunctivitis.png")}
            text="Conjunctivitis"
          />
          <SymptomsImageComponent
            image={require("../../assets/Symptoms/headache.jpg")}
            text="Headache"
          />
          <SymptomsImageComponent
            image={require("../../assets/Symptoms/taste_and_smell.jpg")}
            text="Loss of taste or smell"
          />
          <SymptomsImageComponent
            image={require("../../assets/Symptoms/rash.jpg")}
            text="A rash on skin, or discolouration of fingers or toes"
          />

        </View>

        <View style={styles.adviceContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 10,
            }}
          >
            <FontAwesome5
              name="dice-d20"
              size={16}
              color={colors.paraTextColor}
              style={{ marginTop: 3 }}
            />
            <Text style={[styles.adviceText, { color: colors.paraTextColor }]}>
              Seek immediate medical attention if you have serious symptoms.
              Always call before visiting your doctor or health facility.
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 10,
            }}
          >
            <FontAwesome5
              name="dice-d20"
              size={16}
              color={colors.paraTextColor}
              style={{ marginTop: 3 }}
            />
            <Text style={[styles.adviceText, { color: colors.paraTextColor }]}>
              People with mild symptoms who are otherwise healthy should manage
              their symptoms at home.
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 10,
            }}
          >
            <FontAwesome5
              name="dice-d20"
              size={16}
              color={colors.paraTextColor}
              style={{ marginTop: 3 }}
            />
            <Text style={[styles.adviceText, { color: colors.paraTextColor }]}>
              On average it takes 5–6 days from when someone is infected with
              the virus for symptoms to show, however it can take up to 14 days.
            </Text>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <View style={styles.linkContainer}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
                )
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.linkText}>LEARN MORE</Text>
                <MaterialIcons name="double-arrow" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <AdMobBannerComponent />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 16,
  },
  symptomsContainer: {
    marginTop: 10,
  },
  headerText: {
    fontSize: 25,
    paddingLeft: 10,
    fontWeight: "bold",
    color: "#000000",
  },
  symptomsText: {
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  adviceContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  adviceText: {
    paddingLeft: 10,
    fontSize: 18,
    marginBottom: 15,
  },
  linkContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1c6278",
    padding: 20,
    width: "90%",
    borderRadius: 10,
    marginBottom: 20,
  },
  linkText: {
    color: "white",
    fontSize: 20,
    marginRight: 10,
    fontWeight: "bold",
    marginTop: 3,
  },
});

export default SymptomsScreen;
