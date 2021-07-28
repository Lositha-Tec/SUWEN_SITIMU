import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AdMobBannerComponent } from "../components/AdMobBannerComponent";

const VillageOpenItemScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.detailContainer}>
          <View style={styles.rowSection}>
            <View style={styles.detailsTitleRow}>
              <Text style={styles.detailTitleTextOne}>Province</Text>
            </View>
            <View style={styles.detailDataRow}>
              <Text style={styles.detailDataField}>{item.p_name}</Text>
            </View>
          </View>

          <View style={styles.rowSection}>
            <View style={styles.detailsTitleRow}>
              <Text style={styles.detailTitleTextTwo}>District</Text>
            </View>
            <View style={styles.detailDataRow}>
              <Text style={styles.detailDataField}>{item.d_name}</Text>
            </View>
          </View>

          <View style={styles.rowSection}>
            <View style={styles.detailsTitleRow}>
              <Text style={styles.detailTitleTextThree}>
                Divisional Secretariat
              </Text>
            </View>
            <View style={styles.detailDataRow}>
              <Text style={styles.detailDataField}>{item.ds_name}</Text>
            </View>
          </View>

          <View style={styles.rowSection}>
            <View style={styles.detailsTitleRow}>
              <Text style={styles.detailTitleTextFour}>
                Grama Niladhari Division
              </Text>
            </View>
            <View style={styles.detailDataRow}>
              <Text style={styles.detailDataField}>{item.gn_name}</Text>
            </View>
          </View>

          <View style={styles.rowSection}>
            <View style={styles.detailsTitleRow}>
              <Text style={styles.detailTitleTextFive}>GN Division Number</Text>
            </View>
            <View style={styles.detailDataRow}>
              <Text style={styles.detailDataField}>{item.gn_number}</Text>
            </View>
          </View>
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
});

export default VillageOpenItemScreen;
