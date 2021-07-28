import React from "react";
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,Linking,} from "react-native";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { AdMobBannerComponent } from "../components/AdMobBannerComponent";

const HospitalOpenItemScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.detailContainer}>
          <View style={styles.rowSection}>
            <View style={styles.detailsTitleRow}>
              <Text style={styles.detailTitleTextOne}>Hospital</Text>
            </View>
            <View style={styles.detailDataRow}>
              <Text style={styles.detailDataField}>{item.name}</Text>
            </View>
          </View>

          <View style={[styles.detailGroup, { marginTop: 30 }]}>
            <Fontisto
              name="phone"
              size={20}
              color={"gray"}
              style={{ marginTop: 5 }}
            />
            <Text style={styles.detailText}>Contact Numbers</Text>
          </View>

          <TouchableOpacity
            style={
              item.land_one == "-"
                ? styles.buttonNotDisplay
                : styles.buttonDisplay
            }
            //disabled={item.land_one == "-"}
            onPress={() => {
              Linking.openURL(`tel:${item.land_one}`);
            }}
          >
            <View style={styles.contactGroup}>
              <MaterialCommunityIcons
                name="phone-outgoing"
                size={20}
                color={"#1eae98"}
                style={{ marginTop: 4 }}
              />
              <Text style={styles.contactText}>
                Telephone : {item.land_one}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              item.land_two == "-"
                ? styles.buttonNotDisplay
                : styles.buttonDisplay
            }
            onPress={() => {
              Linking.openURL(`tel:${item.land_two}`);
            }}
          >
            <View style={styles.contactGroup}>
              <MaterialCommunityIcons
                name="phone-outgoing"
                size={20}
                color={"#1eae98"}
                style={{ marginTop: 4 }}
              />
              <Text style={styles.contactText}>
                Telephone : {item.land_two}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              item.land_three == "-"
                ? styles.buttonNotDisplay
                : styles.buttonDisplay
            }
            onPress={() => {
              Linking.openURL(`tel:${item.land_three}`);
            }}
          >
            <View style={styles.contactGroup}>
              <MaterialCommunityIcons
                name="phone-outgoing"
                size={20}
                color={"#1eae98"}
                style={{ marginTop: 4 }}
              />
              <Text style={styles.contactText}>
                Telephone : {item.land_three}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              item.land_four == "-"
                ? styles.buttonNotDisplay
                : styles.buttonDisplay
            }
            onPress={() => {
              Linking.openURL(`tel:${item.land_four}`);
            }}
          >
            <View style={styles.contactGroup}>
              <MaterialCommunityIcons
                name="phone-outgoing"
                size={20}
                color={"#1eae98"}
                style={{ marginTop: 4 }}
              />
              <Text style={styles.contactText}>
                Telephone : {item.land_four}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <AdMobBannerComponent />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  rowSection: {
    marginBottom: 35,
  },
  detailsTitleRow: {
    justifyContent: "center",
    alignItems: "center",
  },
  detailDataRow: {
    justifyContent: "center",
    alignItems: "center",
  },
  detailDataField: {
    color: "#87a7b3",
    fontSize: 20,
    marginTop: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
  detailTitleTextOne: {
    color: "#007580",
    fontWeight: "bold",
    fontSize: 35,
  },
  detailTitleTextTwo: {
    color: "#de8971",
    fontWeight: "bold",
    fontSize: 35,
  },
  detailTitleTextThree: {
    color: "#344fa1",
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
  detailTitleTextFour: {
    color: "#007580",
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
  detailTitleTextFive: {
    color: "#de8971",
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
  detailGroup: {
    flexDirection: "row",
    marginBottom: 10,
    paddingBottom: 15,
  },
  detailText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    paddingLeft: 10,
  },
  contactGroup: {
    flexDirection: "row",
    marginBottom: 15,
    borderWidth: 0,
    padding: 15,
    backgroundColor: "#afb9c8",
    borderRadius: 10,
  },
  contactText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 20,
  },
  buttonDisplay: {
    display: "flex",
  },
  buttonNotDisplay: {
    display: "none",
  },
});

export default HospitalOpenItemScreen;
