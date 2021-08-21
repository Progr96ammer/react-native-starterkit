import {Alert ,Animated ,Easing , View} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from 'expo-splash-screen';
import Svg, {
    Circle,
} from 'react-native-svg';
import {
    NativeBaseProvider,
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    Icon,
    IconButton,
    HStack,
    Divider, Center
} from 'native-base';

export default function SyncDatabase({ navigation }) {
    const rotationRef = useRef(new Animated.Value(0)).current;
    Animated.loop(
        Animated.timing(rotationRef, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false,
        })
    ).start();
    const getItem = async ()=>{
        await SplashScreen.preventAutoHideAsync();
        let token = await AsyncStorage.getItem('token');
        if (token !== null){
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
                            SplashScreen.hideAsync();
                            navigation.navigate('emailVerifyForm');
                        }
                        if (json.url == '/home') {
                            SplashScreen.hideAsync();
                            navigation.navigate('home');
                        }
                        if (json.url == '/sessionNotFound') {
                            SplashScreen.hideAsync();
                            AsyncStorage.removeItem('token');
                            navigation.navigate('login');
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
        else{
            SplashScreen.hideAsync();
            navigation.navigate('login');
        }
    }
    getItem()
    const rotation = rotationRef.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    return (
        <NativeBaseProvider>
        </NativeBaseProvider>
    );
}
