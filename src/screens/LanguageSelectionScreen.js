import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import i18n from 'i18n-js';

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LanguageContext } from '../components/LanguageContext';

import { sn, en, tn } from '../i18n/SupportedLanguages';

i18n.translations = { sn, en, tn };

const LanguageSelectionScreen = () => {

    const { storedLanguage, setStoredLanguage } = useContext(LanguageContext);

    const selectLanguage = (language) => {
        AsyncStorage.setItem('chosenLanguage', JSON.stringify(language))
            .then(() => {
                setStoredLanguage(language);
                console.log(setStoredLanguage);

            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <View style={styles.selectLanguageContainer}>
            <View>
                <Text>Please select your preferred language</Text>
            </View>
            <TouchableOpacity style={styles.languageBtnContainer} onPress={() => { selectLanguage("sn") }}>
                <Text style={styles.languageBtnText}>Sinhala</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.languageBtnContainer} onPress={() => { selectLanguage("en") }}>
                <Text style={styles.languageBtnText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.languageBtnContainer} onPress={() => { selectLanguage("tn") }}>
                <Text style={styles.languageBtnText}>Tamil</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    selectLanguageContainer: {
        flex: 1,
        marginTop: 40,
        paddingHorizontal: 20,
    },
    languageBtnContainer: {
        backgroundColor: "blue",
        marginVertical: 10,
        padding: 20,
        borderRadius: 10,
    },
    languageBtnText: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    }
})

export default LanguageSelectionScreen
