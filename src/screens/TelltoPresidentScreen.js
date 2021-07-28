import React, { useState, useEffect } from 'react'
import { SafeAreaView, View } from 'react-native'
import { WebViewComponent } from "../components/WebViewComponent";
import { AdMobBannerComponent } from "../components/AdMobBannerComponent";
import { config } from '../components/Configurations';
import { checkConnected } from '../components/CheckConnectedComponent';
import NoNetworkConnection from "../components/NoNetworkConnection";

const tellToPresidentURL = "https://tell.president.gov.lk/"

export default function TelltoPresidentScreen() {
    const [connectStatus, setConnectStatus] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            checkConnected().then(res => {
                setConnectStatus(res)
            })
        }, 10);
        return () => clearInterval(interval);
    }, []);

    return (
        connectStatus ? (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <WebViewComponent source={{ uri: `${tellToPresidentURL}` }} injectedJavaScript={config} />
                </View>
                <AdMobBannerComponent />
            </SafeAreaView>
        ) : (<NoNetworkConnection navigation={false} />)
    );
}