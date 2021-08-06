import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';

export default function home({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <StatusBar
                hidden={true} />
            <Button
                onPress={() => navigation.navigate('login')}
                title="Go to login"
            />
        </View>
    );
}
