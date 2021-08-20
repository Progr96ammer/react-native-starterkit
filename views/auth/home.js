import React, { useState, useEffect } from 'react';
import {Alert, StyleSheet} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {
    NativeBaseProvider,
    Text,
    Box,
    View,
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
                <VStack
                    flex={1}
                >
                </VStack>
                <VStack>
                    <Button
                        style={[styles.drawerButton,]}
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
    const HomeDrawer = ()=>{
        return(
            <NativeBaseProvider>
                <VStack
                    style={{paddingTop:20}}
                    flex={1}
                >
                    <Button
                        onPress={() => navigation.navigate('profile')}
                        style={[styles.drawerButton,]}
                        variant="ghost"
                        endIcon={<Icon as={Ionicons} name="person-circle-outline" size={7} />}
                        _text={{
                            fontSize:'md'
                        }}
                    >
                        Profile
                    </Button>
                    <Button
                        onPress={() => navigation.navigate('profile')}
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
                        style={[styles.drawerButton,]}
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
    }
});
