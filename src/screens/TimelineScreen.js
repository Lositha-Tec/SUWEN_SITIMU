// import React, { Component } from "react";
// import { View, WebView } from "react-native-webview";

// export default class TimelineScreen extends Component {
//   render() {
//     return (
//         <WebView source={{ uri: "http://google.fr/maps/timeline" }} />
      
//     );
//   }
// }



// React Native Show Progress bar While Loading WebView
// https://aboutreact.com/react-native-show-progress-bar-while-loading-webview/

//import React in our code
import React, { useState } from 'react';

//import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

//import WebView
import { WebView } from 'react-native-webview';

const ActivityIndicatorElement = () => {
  return (
    <View style={styles.activityIndicatorStyle}>
      <ActivityIndicator color="#009688" size="large" />
    </View>
  );
};

const TimelineScreen = () => {
  const [visible, setVisible] = useState(true);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <WebView
          style={{ flex: 1 }}
          //Loading URL
          source={{ uri: 'http://google.fr/maps/timeline' }}
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});

export default TimelineScreen;
