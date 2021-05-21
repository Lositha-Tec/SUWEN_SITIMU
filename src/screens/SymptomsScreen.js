import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";

function SymptomsScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.symptomsContainer}>
          <Text style={styles.headerText}>1.Most common symptoms:</Text>
          <Text style={styles.symptomsText}>1.Fever</Text>
          <Text style={styles.symptomsText}>2.Dry Cough</Text>
          <Text style={styles.symptomsText}>3.Tiredness</Text>
        </View>

        <View style={styles.symptomsContainer}>
          <Text style={styles.headerText}>2.Less common symptoms:</Text>
          <Text style={styles.symptomsText}>1.Aches and pains</Text>
          <Text style={styles.symptomsText}>2.Sore throat</Text>
          <Text style={styles.symptomsText}>3.Diarrhoea</Text>
          <Text style={styles.symptomsText}>4.Conjunctivitis</Text>
          <Text style={styles.symptomsText}>5.Headache</Text>
          <Text style={styles.symptomsText}>6.Loss of taste or smell</Text>
          <Text style={styles.symptomsText}>
            7.A rash on skin, or discolouration of fingers or toes
          </Text>
        </View>

        <View style={styles.symptomsContainer}>
          <Text style={styles.headerText}>3.Serious symptoms:</Text>
          <Text style={styles.symptomsText}>
            1.Difficulty breathing or shortness of breath
          </Text>
          <Text style={styles.symptomsText}>2.Chest pain or pressure</Text>
          <Text style={styles.symptomsText}>3.Loss of speech or movement</Text>
        </View>

        <View style={styles.adviceContainer}>
          <Text style={styles.adviceText}>
            1.Seek immediate medical attention if you have serious symptoms.
            Always call before visiting your doctor or health facility.
          </Text>
          <Text style={styles.adviceText}>
            2.People with mild symptoms who are otherwise healthy should manage
            their symptoms at home.
          </Text>
          <Text style={styles.adviceText}>
            3.On average it takes 5–6 days from when someone is infected with the
            virus for symptoms to show, however it can take up to 14 days.
          </Text>
        </View>

        <View style={styles.linkContainer}>
          <Text>Learn more on WHO.int :</Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/question-and-answers-hub/q-a-detail/coronavirus-disease-covid-19"
              )
            }
          >
            <Text style={styles.linkText}>
              [https://www.who.int/emergencies/diseases/novel-coronavirus-2019/question-and-answers-hub/q-a-detail/coronavirus-disease-covid-19]
            </Text>
          </TouchableOpacity>
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
  symptomsContainer: {},
  headerText: {
    marginTop: 20,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
  symptomsText: {
    padding: 20,
    backgroundColor: "#3c6c91",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    borderRadius: 10,
  },
  adviceContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  adviceText: {
    fontSize: 18,
    marginBottom:15
  },
  linkContainer: {
    marginBottom: 20,
  },
  linkText: {
    color: "blue",
  },
});

export default SymptomsScreen;
