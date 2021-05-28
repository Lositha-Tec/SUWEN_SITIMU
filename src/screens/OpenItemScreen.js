import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Fontisto,
} from "@expo/vector-icons";

const OpenItemScreen = ({ route, navigation }) => {
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
              <Text style={styles.detailDataField}>{item.province}</Text>
            </View>
          </View>

          <View style={styles.rowSection}>
            <View style={styles.detailsTitleRow}>
              <Text style={styles.detailTitleTextTwo}>Division</Text>
            </View>
            <View style={styles.detailDataRow}>
              <Text style={styles.detailDataField}>{item.police_division}</Text>
            </View>
          </View>

          <View style={styles.rowSection}>
            <View style={styles.detailsTitleRow}>
              <Text style={styles.detailTitleTextThree}>Police Station</Text>
            </View>
            <View style={styles.detailDataRow}>
              <Text style={styles.detailDataField}>{item.police_station}</Text>
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
            onPress={() => {
              Linking.openURL(`tel:${item.oic_mobile}`);
            }}
          >
            <View style={styles.contactGroup}>
              <Fontisto
                name="mobile-alt"
                size={25}
                color={"#1eae98"}
                style={{ marginTop: 3 }}
              />
              <Text style={styles.contactText}>
                OIC Mobile: {item.oic_mobile}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={item.office_number == "-"}
            onPress={() => {
              Linking.openURL(`tel:${item.office_number}`);
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
                Office Number : {item.office_number}
              </Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
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

export default OpenItemScreen;
