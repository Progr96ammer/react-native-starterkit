import React, { useState, useEffect } from 'react';
import {Alert, StyleSheet,Linking} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {
    NativeBaseProvider,
    Text,
    Box,
    View,
    List,
    Button,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Icon,
    IconButton,
    HStack,
    Divider, Center
} from 'native-base';
import {bottom} from "styled-system";
import Svg, {Defs, Image, Use} from "react-native-svg";

const Drawer = createDrawerNavigator();

export default function home({ navigation }) {
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
                if (json.url == '../'){
                    AsyncStorage.removeItem('token');
                    navigation.navigate('login')
                }

            })
    }
    const HomeContent = ()=>{
        return(
            <NativeBaseProvider>
                <Box flex={1}>
                <Center mt={'20%'} >
                    <Svg version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 343 86" width="250" height="86">
                        <Defs>
                            <Image  width="343" height="86" id="img1" href="data:image/png;base64,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"/>
                        </Defs>
                        <Use id="Background" href="#img1" x="0" y="0" />
                    </Svg>
                </Center>
                <List.Unordered m={4} spacing={2} border={0}>
                    <List.Item>
                        <VStack>
                            <Text color="#8cc84b" fontSize={'2xl'}>Noder.js
                                <Text> is an open source node.js starter kit, This project was created using node.js language,express.js framework and mongoDb for the database structure in addition to bootstrap framework for the frontend.
                                </Text>
                            </Text>
                        </VStack>
                    </List.Item>
                    <List.Item>
                        <VStack>
                            <Text>The idea of this project is to be the beginning of its development into an integrated framework inspired by the Laravel framework.
                            </Text>
                        </VStack>
                    </List.Item>
                </List.Unordered>
                </Box>
                <Box p={5}>
                    <Button
                        endIcon={<Icon as={Ionicons} name="logo-github" size={7} color="white" />}
                        mx={8}
                        onPress={ ()=>{ Linking.openURL('https://github.com/Progr96ammer/react-native-starterkit')}}
                    >
                        View in gethub
                    </Button>
                </Box>
            </NativeBaseProvider>
        )
    }
    const HomeDrawer = ()=>{
        return(
            <NativeBaseProvider>
                <VStack
                    style={{paddingTop:20}}
                    flex={1}
                >
                    <Button
                        onPress={() => navigation.navigate('setting')}
                        style={[styles.drawerButton,]}
                        variant="ghost"
                        endIcon={<Icon as={Ionicons} name="cog-outline" size={7} />}
                        _text={{
                            fontSize:'md'
                        }}
                    >
                        Setting
                    </Button>
                </VStack>
                <VStack>
                    <Button
                        onPress={logout}
                        style={[styles.drawerButton,styles.borderTop]}
                        variant="ghost"
                        endIcon={<Icon as={Ionicons} name="log-out-outline" size={7} />}
                        _text={{
                            fontSize:'md'
                        }}
                    >
                        Logout
                    </Button>
                </VStack>
            </NativeBaseProvider>
        )
    }

    return (
        <Drawer.Navigator
            drawerPosition={'right'}
            initialRouteName={'homeContent'}
            drawerContent={(props) => <HomeDrawer {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeContent} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    drawerButton:{
        borderBottomWidth:1,
        borderBottomColor:'#d4d4d4'
    },
    borderTop:{
        borderTopWidth:1,
        borderTopColor:'#d4d4d4'
    }
});
