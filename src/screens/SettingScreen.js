import React,{useContext} from 'react'
import { View, Text, Button } from 'react-native'
import { sn, en, tn } from '../i18n/SupportedLanguages';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { LanguageContext } from '../components/LanguageContext';

const SettingScreen = () => {
    const { storedLanguage, setStoredLanguage } = useContext(LanguageContext);

    const clearLanguage = () => {
        AsyncStorage.removeItem('chosenLanguage').then(()=>{
            setStoredLanguage("");
        }).catch(error => console.log(error))
    }
    return (
        <View>
            <Text>Settings</Text>
            <Button title="Remove Language" onPress={clearLanguage} /> 
        </View>
    )
}

export default SettingScreen
