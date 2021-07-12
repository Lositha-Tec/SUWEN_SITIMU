import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Button
} from "react-native";

import { RFPercentage } from "react-native-responsive-fontsize";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Picker } from "@react-native-picker/picker";

import countryData from "../data/gramaniladari";

export default function GlobalDataScreen({ navigation }) {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    console.log(selectedCountry);

    // set country data to countries array in loading screen
    useEffect(() => {
        setCountries(countryData);
    }, []);

    // fill countries into dropdown
    const DropDownData = countries.map((c) => {
        return <Picker.Item key={c.gn_name} value={c.gn_name} label={c.gn_name + " " + c.gn_number} />;
    });


    return (
        <View style={styles.fullPage}>
            <View style={styles.lblTextContainer}>
                <Text style={styles.lblText}>Please select your Grama Niladhari Division</Text>
            </View>
            <View style={styles.pickersParent}>
                <View style={styles.countryPickerParent}>
                    <Picker
                        selectedValue={selectedCountry}
                        style={styles.countryPicker}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedCountry(itemValue);
                        }}
                        mode="dialog"
                    >
                        <Picker.Item label="Select Grama Niladhari Division" value="" />
                        {DropDownData}
                    </Picker>
                </View>
            </View>
            <View style={styles.BtnSubmitContainer}>
                <TouchableOpacity style={styles.BtnSubmit} onPress={()=> navigation.navigate("Login")}>
                    <Text style={styles.BtnSubmitText}>submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fullPage: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center"
    },
    lblTextContainer: {
        marginTop: 70,
    },
    lblText: {
        fontSize: 18,
    },
    pickersParent: {
        flexDirection: "row",
    },
    countryPickerParent: {
        borderWidth: 1,
        borderColor: "#b0b0b0",
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,

    },
    countryPicker: {
        height: Dimensions.get("window").height / 20,
        width: wp("90%"),
    },
    BtnSubmitContainer: {
        marginTop: 10
    },
    BtnSubmit: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        width: wp("90%"),
    },
    BtnSubmitText: {
        color: "white",
        fontSize: 18,
        textAlign: "center"
    }
});
