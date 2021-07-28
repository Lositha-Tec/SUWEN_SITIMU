import React from "react";
import { View } from "react-native";
import { AdMobBanner } from "expo-ads-admob";
import { addBannerId } from "../components/Configurations";
import { useOrientation } from '../components/useOrientation';
import { timeValidate } from "../components/timeValidate";

export const AdMobBannerComponent = () => {
    const orientation = useOrientation();
    const timeVal = timeValidate();
    return (
        <View style={{ height: timeVal ? 0 : 90, display: orientation === 'PORTRAIT' ? 'flex' : 'none' }}>
            <AdMobBanner
                bannerSize="smartBanner"
                adUnitID={addBannerId}
                servePersonalizedAds // true or false
                onDidFailToReceiveAdWithError={(e) => console.log(e)}
            />
        </View>
    );
};