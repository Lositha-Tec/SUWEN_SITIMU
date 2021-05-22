import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
  TouchableOpacity,
} from "react-native";

function PreventionScreen() {
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Text style={styles.preventText}>
          1.Clean your hands often. Use soap and water, or an alcohol-based hand
          rub.
        </Text>
        <Text style={styles.preventText}>
          2.Maintain a safe distance from anyone who is coughing or sneezing.
        </Text>
        <Text style={styles.preventText}>
          3.Wear a mask when physical distancing is not possible.
        </Text>
        <Text style={styles.preventText}>
          4.Don’t touch your eyes, nose or mouth.
        </Text>
        <Text style={styles.preventText}>
          5.Cover your nose and mouth with your bent elbow or a tissue when you
          cough or sneeze.
        </Text>
        <Text style={styles.preventText}>6.Stay home if you feel unwell.</Text>
        <Text style={styles.preventText}>
          7.If you have a fever, cough and difficulty breathing, seek medical
          attention.
        </Text>
        <View style={styles.linkContainer}>
          <Text>Learn more on WHO.int :</Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
              )
            }
          >
            <Text style={styles.linkText}>
              [https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public]
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  preventText: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
  },
  linkContainer: {},
  linkText: {
    color: "blue",
  },
});

export default PreventionScreen;
