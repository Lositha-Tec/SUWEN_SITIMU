import React, { useState } from 'react';
import { StatusBar } from 'react-native';

//React Navigation Stack
import RootStackNavigator from './src/navigators/RootStackNavigator';

//App loading
import AppLoading from 'expo-app-loading';

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//import NetInfo from '@react-native-community/netinfo';

//credentials context
import { CredentialsContext } from './src/components/CredentialsContext';
import { LanguageContext } from './src/components/LanguageContext';

import { themeReducer } from "./src/reducers/themeReducer";

import { createStore } from "redux";
import { Provider } from 'react-redux';
import { sn, en, tn } from './src/i18n/SupportedLanguages';

const store = createStore(themeReducer);

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");
  const [storedLanguage, setStoredLanguage] = useState(en);

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('covistaticaCredentials').then((result) => {
      if (result !== null) {
        setStoredCredentials(JSON.parse(result));
      } else {
        setStoredCredentials(null);
      }
    }).catch(error => console.log(error))
  }

  const checkStoredLanguage = () => {
    AsyncStorage.getItem('chosenLanguage').then((result) => {
      if (result !== null) {
        setStoredLanguage(result);
        console.log("selected language is " + result);
      } else {
        setStoredLanguage(null);
      }
    }).catch(error => console.log(error))
  }

  if (!appReady) {
    return (
      <>
        <AppLoading
          startAsync={checkLoginCredentials}
          onFinish={() => setAppReady(true)}
          onError={console.warn}
        />
        <AppLoading
          startAsync={checkStoredLanguage}
          onFinish={() => setAppReady(true)}
          onError={console.warn}
        />
      </>
    )
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }} >
      <LanguageContext.Provider value={{ storedLanguage, setStoredLanguage }}>
        <Provider store={store}>
          <StatusBar backgroundColor="gray" />
          <RootStackNavigator />
        </Provider>
      </LanguageContext.Provider>
    </CredentialsContext.Provider>
  );
}
