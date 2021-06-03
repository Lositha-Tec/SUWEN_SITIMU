import React, { useState, useEffect } from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import DATA from "../data/data";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Alert,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { SearchBar } from "react-native-elements";

const PoliceStationsScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(DATA);
    setMasterDataSource(DATA);
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.police_station
          ? item.police_station.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <TouchableOpacity>
        <Text
          style={styles.itemStyle}
          onPress={() =>
            navigation.navigate("Police Station Details", { item })
          } /*onPress={() => getItem(item)}*/
        >
          {item.police_station.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  const showAlert = (item) =>
    Alert.alert(
      "Police Station Details",
      "\nProvince : " +
        item.province +
        "\n\nDivision : " +
        item.police_division +
        "\n\nStation : " +
        item.police_station +
        "\n\nOIC Mobile Number : " +
        item.oic_mobile +
        "\n\nOffice Number : " +
        item.office_number
    );

  const getItem = (item) => {
    showAlert(item);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.screenBgColor }]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 35,
        }}
      >
        <MaterialIcons
          name="arrow-back"
          size={30}
          color="gray"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            })
          }
        />

        <SearchBar
          platform="android"
          cancelIcon={false}
          inputStyle={{
            backgroundColor: "#e6e6e6",
            lineHeight: 26,
            height: 12,
          }}
          containerStyle={{
            backgroundColor: "transparent",
            width: "90%",
          }}
          inputContainerStyle={{ backgroundColor: "#e6e6e6", borderRadius: 10 }}
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
          placeholder="Search Police Station"
          placeholderTextColor={"black"}
          value={search}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemStyle: {
    padding: 20,
    backgroundColor: "#3c6c91",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default PoliceStationsScreen;
