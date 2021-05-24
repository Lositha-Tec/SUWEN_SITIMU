import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

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
              marginBottom: 20,
            }}
          >
            <FontAwesome name="certificate" size={30} color="#FF0000" />
            <Text style={[styles.headerText,{color:colors.symptomHeaderTextColor}]}>Serious symptoms:</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginLeft: 40,
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="circle"
              size={16}
              color={colors.symptomTextIconColor}
              style={{ marginTop: 5 }}
            />
            <Text style={[styles.symptomsText,{color:colors.symptomTextColor}]}>
              Difficulty breathing or shortness of breath
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginLeft: 40,
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="circle"
              size={16}
              color={colors.symptomTextIconColor}
              style={{ marginTop: 5 }}
            />
            <Text style={[styles.symptomsText,{color:colors.symptomTextColor}]}>Chest pain or pressure</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginLeft: 40,
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="circle"
              size={16}
              color={colors.symptomTextIconColor}
              style={{ marginTop: 5 }}
            />
            <Text style={[styles.symptomsText,{color:colors.symptomTextColor}]}>Loss of speech or movement</Text>
          </View>
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
            <Text style={[styles.headerText,{color:colors.symptomHeaderTextColor}]}>Most common symptoms:</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginLeft: 40,
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="circle"
              size={16}
              color={colors.symptomTextIconColor}
              style={{ marginTop: 5 }}
            />
            <Text style={[styles.symptomsText,{color:colors.symptomTextColor}]}>Fever</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginLeft: 40,
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="circle"
              size={16}
              color={colors.symptomTextIconColor}
              style={{ marginTop: 5 }}
            />
            <Text style={[styles.symptomsText,{color:colors.symptomTextColor}]}>Dry Cough</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginLeft: 40,
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="circle"
              size={16}
              color={colors.symptomTextIconColor}
              style={{ marginTop: 5 }}
            />
            <Text style={[styles.symptomsText,{color:colors.symptomTextColor}]}>Tiredness</Text>
          </View>
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
            <Text style={[styles.headerText,{color:colors.symptomHeaderTextColor}]}>Less common symptoms:</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginLeft: 40,
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="circle"
              size={16}
              color={colors.symptomTextIconColor}
              style={{ marginTop: 5 }}
            />
            <Text style={[styles.symptomsText,{color:colors.symptomTextColor}]}>Aches and pains</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginLeft: 40,
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="circle"
              size={16}
              color={colors.symptomTextIconColor}
              style={{ marginTop: 5 }}
            />
            <Text style={[styles.symptomsText,{color:colors.symptomTextColor}]}>Sore throat</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginLeft: 40,
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="circle"
              size={16}
              color={colors.symptomTextIconColor}
              style={{ marginTop: 5 }}
            />
            <Text style={[styles.symptomsText,{color:colors.symptomTextColor}]}>Diarrhoea</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginLeft: 40,
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="circle"
              size={16}
              color={colors.symptomTextIconColor}
              style={{ marginTop: 5 }}
            />
            <Text style={[styles.symptomsText,{color:colors.symptomTextColor}]}>Conjunctivitis</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginLeft: 40,
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="circle"
              size={16}
              color={colors.symptomTextIconColor}
              style={{ marginTop: 5 }}
            />
            <Text style={[styles.symptomsText,{color:colors.symptomTextColor}]}>Headache</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginLeft: 40,
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="circle"
              size={16}
              color={colors.symptomTextIconColor}
              style={{ marginTop: 5 }}
            />
            <Text style={[styles.symptomsText,{color:colors.symptomTextColor}]}>Loss of taste or smell</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginLeft: 40,
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="circle"
              size={16}
              color={colors.symptomTextIconColor}
              style={{ marginTop: 5 }}
            />
            <Text style={[styles.symptomsText,{color:colors.symptomTextColor}]}>
              A rash on skin, or discolouration of fingers or toes
            </Text>
          </View>
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
              style={{ marginTop: 5 }}
            />
            <Text style={[styles.adviceText,{color:colors.paraTextColor}]}>
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
              style={{ marginTop: 5 }}
            />
            <Text style={[styles.adviceText,{color:colors.paraTextColor}]}>
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
              style={{ marginTop: 5 }}
            />
            <Text style={[styles.adviceText,{color:colors.paraTextColor}]}>
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
    //color: "#2B2727",
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
    //color: "#454141",
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
  },
});

export default SymptomsScreen;
