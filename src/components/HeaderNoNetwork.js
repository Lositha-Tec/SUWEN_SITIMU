import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderNoNetwork(props) {
  const { colors } = useTheme();
  return (
    <View style={{ backgroundColor: colors.headerColor }}>
      <View style={styles.menuIcon}>
        <Ionicons
          name="menu-outline"
          size={35}
          color={colors.menuIconColor}
          onPress={() => props.navigation.openDrawer()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuIcon: {
    paddingLeft: 15,
    marginTop: 10,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: RFPercentage(4),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
    color: "#DC143C",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    textShadowColor: "#800000",
  },
  lastUpdateTime: {
    fontSize: RFPercentage(2),
    marginBottom: 15,
    fontWeight: "bold",
  },
});
