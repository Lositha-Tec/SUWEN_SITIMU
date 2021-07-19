import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Location from 'expo-location';

import { WebView } from "react-native-webview";

import { checkConnected } from '../components/CheckConnectedComponent';
import NoNetworkConnection from "../components/NoNetworkConnection";

const ActivityIndicatorElement = () => {
  return (
    <View style={styles.activityIndicatorStyle}>
      <ActivityIndicator color="#009688" size="large" />
    </View>
  );
};

const TimelineScreen = (props) => {
  const [visible, setVisible] = useState(true);

  const [connectStatus, setConnectStatus] = useState(false)
  checkConnected().then(res => {
    setConnectStatus(res)
  })

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        const res = await Location.hasServicesEnabledAsync();
        if (!res) {
          Alert.alert("Please enable your device location!!")
        }
      })();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (
    connectStatus ? (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <WebView
            style={{ flex: 1 }}
            //Loading URL
            source={{ uri: "https://www.google.com/maps/timeline?hl=en&authuser=0&ei=eOrRYInlB8u7rQHBlpTAAw%3A45&ved=1t%3A17706&pli=1&rapt=AEjHL4OkvJxhF4dqDRgSjqlJPbsaMgM6XIAcxpRrP5YI-5fGFErWtrD760jsXx4MKtn0K2A-EQOnDvK-2uZ5jNZhFhdfdKVgEg&pb" }}
            //Enable Javascript support
            javaScriptEnabled={true}
            //For the Cache
            domStorageEnabled={true}
            onLoadStart={() => setVisible(true)}
            onLoad={() => setVisible(false)}
          />
          {visible ? <ActivityIndicatorElement /> : null}
        </View>

      </SafeAreaView>
    ) : (<NoNetworkConnection navigation={props.navigation} onCheck={checkConnected} />)
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default TimelineScreen;