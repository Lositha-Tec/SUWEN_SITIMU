// import React in our code
import React, { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import PharmacyData from "../data/osusal";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// import all the components we are going to use
import {
  Alert,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";
const PharmaciesScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(PharmacyData);
    setMasterDataSource(PharmacyData);
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
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
          onPress={() => navigation.navigate("Osusala Details", { item })}
        >
          {item.name.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
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
          name="arrow-back-ios"
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
          placeholder="Search Osusala"
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
    //paddingTop: 20,
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

export default PharmaciesScreen;
