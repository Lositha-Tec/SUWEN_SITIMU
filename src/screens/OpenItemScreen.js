import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OpenItemScreen = ({ route, navigation }) => {
  const { item } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text>Province: {JSON.stringify(item.province)}</Text>
        <Text>Division: {JSON.stringify(item.police_division)}</Text>
        <Text>Station: {JSON.stringify(item.police_station)}</Text>
        <Text>OIC Mobile Number: {JSON.stringify(item.oic_mobile)}</Text>
        <Text>Office Number : {JSON.stringify(item.office_number)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default OpenItemScreen;
