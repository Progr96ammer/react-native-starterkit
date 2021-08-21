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
                            navigation.navigate('emailVerifyForm');
                            SplashScreen.hideAsync();
                        }
                        if (json.url == '/home') {
                            navigation.navigate('home');
                            SplashScreen.hideAsync();
                        }
                        if (json.url == '/sessionNotFound') {
                            AsyncStorage.removeItem('token');
                            navigation.navigate('login');
                            SplashScreen.hideAsync();
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
            await SplashScreen.hideAsync();
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
            {/*<Center flex={1}>*/}
            {/*    <Animated.View*/}
            {/*        style={{transform: [{rotate: rotation}]}}*/}
            {/*    >*/}
            {/*        <Svg*/}
            {/*            xmlns="http://www.w3.org/2000/svg"*/}
            {/*            style={{*/}
            {/*                margin: "auto",*/}
            {/*                background: "#f1f2f3",*/}
            {/*            }}*/}
            {/*            width={50}*/}
            {/*            height={50}*/}
            {/*            viewBox="0 0 100 100"*/}
            {/*        >*/}
            {/*            <Circle*/}
            {/*                cx={50}*/}
            {/*                cy={50}*/}
            {/*                fill="none"*/}
            {/*                stroke="#93dbe9"*/}
            {/*                strokeWidth={10}*/}
            {/*                r={35}*/}
            {/*                strokeDasharray="164.93361431346415 56.97787143782138"*/}
            {/*            >*/}
            {/*            </Circle>*/}
            {/*        </Svg>*/}
            {/*    </Animated.View>*/}
            {/*</Center>*/}
        </NativeBaseProvider>
    );
}
