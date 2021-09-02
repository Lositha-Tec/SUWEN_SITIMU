import React, {useState} from "react";
import { SafeAreaView, StyleSheet, View, } from "react-native";
import { WebView } from "react-native-webview";
import { config } from "../configurations/LoadConfigurations";
import { channel } from "../configurations/ChannelConfigurations";
import { AdMobBannerComponent } from "../components/AdMobBannerComponent";
import { ActivityIndicatorComponent } from "../components/ActivityIndicatorComponent";

export default function PlaylistsScreen() {
    const [loading, setLoading] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <WebView
                    style={{ marginTop: -51 }}
                    source={{ uri: `https://m.youtube.com/channel/${channel}/playlists` }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onLoadStart={() => setLoading(true)}
                    onLoad={() => setLoading(false)}
                    renderLoading={ActivityIndicatorComponent}
                    startInLoadingState={true}
                    allowsFullscreenVideo={true}
                    injectedJavaScript={config}
                />
                {loading ? <ActivityIndicatorComponent /> : null}
                <AdMobBannerComponent />
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
