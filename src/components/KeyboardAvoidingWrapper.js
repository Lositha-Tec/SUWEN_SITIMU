import React from 'react';

import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import {Colors} from './../components/styles';
const {primary} = Colors;

const KeyboardAvoidingWrapper = ({children}) => {
    return (
        <KeyboardAvoidingView style={{flex:1, backgroundColor: primary}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
                    {children}
                </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default KeyboardAvoidingWrapper;

