import React, { Component } from "react";
import { WebView } from "react-native-webview";

export default class TimelineScreen extends Component {
  render() {
    return <WebView source={{ uri: "http://google.fr/maps/timeline" }} />;
  }
}
