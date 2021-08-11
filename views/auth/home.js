import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function home({ navigation }) {
    React.useEffect(() => {
        navigation.addListener('focus', () => {
            const getItem = async ()=>{
                const token = await AsyncStorage.getItem('token');
                try {
                    return fetch('http://progr96ammer-noder.herokuapp.com/home',{
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'X-Access-Token':token,
                        },
                    })
                        .then((response) => response.json())
                        .then((json) => {
                            if (json == 'Soory We Cann`t Complete Your Procedure Right Now, Please try again later!') {
                                Alert.alert(
                                    "Connection Error",
                                    json,
                                    [
                                        { text: "OK", onPress: () => console.log("OK Pressed") }
                                    ]
                                )
                            }
                            if (json.url == 'user/emailVerifyForm') {
                                navigation.navigate('emailVerifyForm');
                            }
                        })
                } catch (e) {
                    Alert.alert(
                        "Server error",
                        'Sorry we can not complete your procedure right now!',
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    )
                }
            }
            getItem()
        });

    }, [navigation]);
    const  logout = async () => {
        const token = await AsyncStorage.getItem('token');
        return fetch('http://progr96ammer-noder.herokuapp.com/user/logout',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token':token,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json == 'Soory We Cann`t Complete Your Procedure Right Now, Please try again later!') {
                    Alert.alert(
                        "Connection Error",
                        json,
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    )
                }
                if (json.url == 'logout'){
                    AsyncStorage.removeItem('token');
                    navigation.navigate('login');
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <StatusBar
                hidden={true} />
            <Button
                onPress={logout}
                title="logout"
            />
        </View>
    );
}
