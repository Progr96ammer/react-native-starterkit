import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function home({ navigation }) {
    React.useEffect(() => {
        navigation.addListener('focus', () => {
            const getItem = async ()=>{
                try {
                    var storageToken = await AsyncStorage.getItem('token')
                } catch (e) {
                    Alert.alert(
                        "Server error",
                        'Sorry we can not complete your procedure right now!',
                        [
                            { text: "OK", onPress: () => setTimeout(function(){navigation.navigate('login') }, 3000) }
                        ]
                    )
                }
                if (storageToken == null){
                    navigation.navigate('login')
                }
                navigation.navigate('home')
            }
            setTimeout(()=>{getItem()}, 3000);
        });

    }, [navigation]);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <StatusBar
                hidden={true} />
            <Button
                onPress={() => navigation.navigate('login')}
                title="splash"
            />
        </View>
    );
}
