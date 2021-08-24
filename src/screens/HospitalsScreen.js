import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, FlatList, TouchableOpacity, } from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";

import AppLoading from 'expo-app-loading';
import { useFonts, ExpletusSans_600SemiBold, } from '@expo-google-fonts/expletus-sans';

import { AdMobBannerComponent } from "../components/AdMobBannerComponent";
import HospitalData from "../data/hospital";

const HospitalsScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(HospitalData);
    setMasterDataSource(HospitalData);
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
          onPress={() => navigation.navigate("Hospital Details", { item })}
        >
          {item.name.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  let [fontsLoaded] = useFonts({
    ExpletusSans_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <View style={[styles.container, { backgroundColor: colors.screenBgColor }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 35,
          }}
        >
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
              width: "95%",
            }}
            inputContainerStyle={{ backgroundColor: "#e6e6e6", borderRadius: 10 }}
            searchIcon={{ size: 24 }}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction("")}
            placeholder="Search Hospital"
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
        <AdMobBannerComponent />
      </View>
    );
  }
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
    fontFamily: 'ExpletusSans_600SemiBold',
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default HospitalsScreen;
