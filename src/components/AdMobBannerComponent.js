import React from "react";
import { AdMobBanner } from "expo-ads-admob";
import { addBannerId } from "../components/Configurations";

export const AdMobBannerComponent = () => {
    return (
        <AdMobBanner
            bannerSize="smartBanner"
            adUnitID={addBannerId}
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={(e) => console.log(e)}
        />
    );
};