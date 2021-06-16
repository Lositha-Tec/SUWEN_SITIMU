import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const MessageServiceScreen = ({ navigation, route }) => {
  const { name, email, photoUrl } = route.params;
  const AvatarImg = photoUrl ? { uri: photoUrl } : require('../../assets/img/logo.png');
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
      <Text style={styles.WelcomeText}>Welcome {name}</Text>
      <Text style={styles.EmailText}>{email || 'nimal@gmail.com'}</Text>
      <Image style={styles.userImg} source={AvatarImg} />
      <TouchableOpacity style={styles.googleLoginButton} onPress={() => navigation.navigate("Profile")}>
        <Text style={styles.googleLoginButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  WelcomeText: {
    fontSize: 25,
    marginBottom: 10
  },
  EmailText: {
    fontSize: 20,
    marginBottom: 150
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  googleLoginButton: {
    marginTop: 250,
    backgroundColor: "purple",
    padding: 18,
    width: "50%",
    borderRadius: 3,
    alignItems: "center"

  },
  googleLoginButtonText: {
    color: "white",
    //paddingLeft: 10
  }
})

export default MessageServiceScreen;