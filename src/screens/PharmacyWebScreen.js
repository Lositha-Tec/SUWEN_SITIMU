import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { WebViewComponent } from "../components/WebViewComponent";
import { AdMobBannerComponent } from "../components/AdMobBannerComponent";
import { pharmacyConfig } from '../components/Configurations';
import { checkConnected } from '../components/CheckConnectedComponent';
import NoNetworkConnection from "../components/NoNetworkConnection";

import AppLoading from 'expo-app-loading';
import { useFonts, ExpletusSans_500Medium, } from '@expo-google-fonts/expletus-sans';

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

    let [fontsLoaded] = useFonts({
        ExpletusSans_500Medium,
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            connectStatus ? (
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <WebViewComponent source={{ uri: `${pharmacyURL}` }} injectedJavaScript={pharmacyConfig} />
                    </View>
                    <View style={{ alignItems: "center", marginTop: 10 }}>
                        <Text style={{ color: "gray", fontFamily: 'ExpletusSans_500Medium', }}>
                            Data Source: www.pharmacy.health.gov.lk
                        </Text>
                    </View>
                    <AdMobBannerComponent />
                </SafeAreaView>
            ) : (<NoNetworkConnection navigation={false} />)
        );
    }
}