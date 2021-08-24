import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Alert, } from "react-native";
import * as Location from 'expo-location';
import { WebView } from "react-native-webview";

import { checkConnected } from '../components/CheckConnectedComponent';
import NoNetworkConnection from "../components/NoNetworkConnection";
import { ActivityIndicatorComponent } from "../components/ActivityIndicatorComponent";

const TimelineScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [connectStatus, setConnectStatus] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        const resp = await Location.hasServicesEnabledAsync();
        if (!resp) {
          Alert.alert("Please enable your device location!!")
        }
      })();

    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkConnected().then(res => {
        setConnectStatus(res)
      })
    }, 10);
    return () => clearInterval(interval);

  }, []);

  const myJSCode = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `

  return (
    connectStatus ? (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <WebView
            style={{ flex: 1 }}
            source={{ uri: "https://www.google.com/maps/timeline" }}
            // userAgent={
            //   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2564.109 Safari/537.36"
            // }
            //scalesPageToFit={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            injectedJavaScript={myJSCode}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
          />
          {loading ? <ActivityIndicatorComponent /> : null}
        </View>

      </SafeAreaView>
    ) : (<NoNetworkConnection navigation={props.navigation} />)
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default TimelineScreen;