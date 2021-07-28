import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { ActivityIndicatorComponent } from "../components/ActivityIndicatorComponent";

export const WebViewComponent = (props) => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <WebView
                source={props.source}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onLoadStart={() => setLoading(true)}
                onLoad={() => setLoading(false)}
                renderLoading={ActivityIndicatorComponent}
                startInLoadingState={true}
                injectedJavaScript={props.injectedJavaScript}
            />
            {loading ? <ActivityIndicatorComponent /> : null}
        </>
    );
};