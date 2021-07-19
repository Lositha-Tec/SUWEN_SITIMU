import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import { si, en, ta } from '../i18n/SupportedLanguages';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { LanguageContext } from '../components/LanguageContext';

const SettingScreen = () => {
    const { storedLanguage, setStoredLanguage } = useContext(LanguageContext);

    const clearLanguage = () => {
        AsyncStorage.removeItem('chosenLanguage').then(() => {
            setStoredLanguage("");
        }).catch(error => console.log(error))
    }
    return (
        <View style={{flex: 1, paddingHorizontal: 20, marginTop: 10}}>
            <Button title="Change Language" onPress={clearLanguage} />
        </View>
    )
}

export default SettingScreen
