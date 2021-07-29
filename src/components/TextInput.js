import React, { forwardRef } from 'react';
import { TextInput as RNTextInput, View, StyleSheet, Text } from 'react-native';
import { Entypo as Icon } from '@expo/vector-icons';

const TextInput = forwardRef(({ label, icon, error, errors, touched, ...otherProps }, ref) => {
    const validationColor = !touched ? 'green' : error ? '#FF5A5F' : 'green';
    const validationError = !touched ? '' : error ? 'Mobile number is invalid' : '';

    return (
        <View>
            <View>
                <Text>{label}</Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 60,
                    borderRadius: 5,
                    borderColor: validationColor,
                    borderWidth: 3,
                    padding: 8
                }}
            >
                <View style={{ padding: 8 }}>
                    <Icon name={icon} color={validationColor} size={20} />
                </View>
                <View style={{ flex: 1 }}>
                    <RNTextInput
                        style={{ fontSize: 15, color: validationColor }}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='rgba(34, 62, 75, 0.7)'
                        ref={ref}
                        {...otherProps}
                    />
                </View>
            </View>
            <View>
                <Text style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>{validationError}</Text>
            </View>
        </View>
    );
});

export default TextInput;