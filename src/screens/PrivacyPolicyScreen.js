import React, { useState, useEffect } from 'react'
import { SafeAreaView, View } from 'react-native'
import { WebViewComponent } from "../components/WebViewComponent";
import { AdMobBannerComponent } from "../components/AdMobBannerComponent";
import { checkConnected } from '../components/CheckConnectedComponent';
import NoNetworkConnection from "../components/NoNetworkConnection";

const privacyURL = "http://developers-in.com/mobile_app/suwensitimu/privacy.html"

export default function PrivacyPolicyScreen() {
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
                    <WebViewComponent source={{ uri: `${privacyURL}` }} />
                </View>
                <AdMobBannerComponent />
            </SafeAreaView>
        ) : (<NoNetworkConnection navigation={false} />)
    );
}