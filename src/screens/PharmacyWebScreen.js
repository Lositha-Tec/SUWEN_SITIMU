import React, { useState, useEffect } from 'react'
import { SafeAreaView, View } from 'react-native'
import { WebViewComponent } from "../components/WebViewComponent";
import { AdMobBannerComponent } from "../components/AdMobBannerComponent";
import { pharmacyConfig } from '../components/Configurations';
import { checkConnected } from '../components/CheckConnectedComponent';
import NoNetworkConnection from "../components/NoNetworkConnection";

const pharmacyURL = "www.pharmacy.health.gov.lk/"

export default function PharmacyWebScreen() {
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
                    <WebViewComponent source={{ uri: `${pharmacyURL}` }} injectedJavaScript={pharmacyConfig} />
                </View>
                <AdMobBannerComponent />
            </SafeAreaView>
        ) : (<NoNetworkConnection navigation={false} />)
    );
}