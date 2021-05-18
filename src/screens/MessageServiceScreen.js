import React from 'react';
import { StyleSheet, View } from "react-native";

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import firebase from 'firebase';
import { firebaseConfig } from './../../config';

import LoadingScreen from './LoadingScreen';
import LoginScreen from './LoginScreen';
import MessageScreen from './MessageScreen';

firebase.initializeApp(firebaseConfig)

const MessageServiceScreen = () => {
  return (
    <AppNavigator />
  );
};

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  MessageScreen: MessageScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({});

export default MessageServiceScreen;