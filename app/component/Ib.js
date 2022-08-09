import React, { Component } from 'react';
import { TextInput } from 'react-native';

const UselessTextInput = () => {
    const [value, onChangeText] = React.useState('Useless Placeholder');

    return (
        <TextInput  multiline={true}
            style={{ borderColor: 'gray', borderWidth: 2 }}
            onChangeText={text => onChangeText(text)}
            value={value}
            numberOfLines={6}
            textAlignVertical="top"
            maxLength={40}
        />
    );
}

export default UselessTextInput;