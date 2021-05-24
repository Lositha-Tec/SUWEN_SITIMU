import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";

const SearchInput = ({ term, setTerm, placeholder, placeholderTextColor, }) => {
  const isLoading = false;
  //const throttlingTime = 500;

  //   useEffect(() => {
  //     const timeoutId = setTimeout(() => {
  //       if (term) {
  //         onChangeText(term);
  //       }
  //     }, throttlingTime);
  //     return () => {
  //       clearTimeout(timeoutId);
  //     };
  //   }, [term]);

  const clearTerm = () => {
    setTerm("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchIconContainer}>
        <AntDesign name="search1" size={24} color="black" />
      </View>
      <TextInput
        style={styles.inputStyle}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        autoCapitalize={"none"}
        onChangeText={setTerm}
        value={term}
      />
      {!!term && (
        <View style={styles.iconContainer}>
          {!isLoading && (
            <Entypo
              name="cross"
              size={20}
              onPress={clearTerm}
              color="#7A8D9D"
            />
          )}
          {isLoading && <ActivityIndicator color={"#00BFDF"} />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#ededed",
  },
  inputStyle: {
    width: "80%",
  },
  iconContainer: {
    width: "10%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  searchIconContainer: {
    width: "10%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export default SearchInput;
