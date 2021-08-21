import * as React from 'react';
import {Alert, BackHandler, Linking, StyleSheet} from "react-native";
import {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    NativeBaseProvider,
    Center,
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
    Divider, List
} from 'native-base';
import {verticalAlign} from "styled-system";
import Svg, {Defs, Image, Use} from "react-native-svg";

const Drawer = createDrawerNavigator();
export default function App({ navigation }) {
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, [])
    const [fresh, setFresh] = useState('');
    const [verificaionCode, setVerificaionCode] = useState('');
    const [verificaionCodeError, setVerificaionCodeError] = useState('');
    const sendFresh = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
            return fetch('http://progr96ammer-noder.herokuapp.com/user/sendEmailVerify',{
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
                    if(json.url == 'emailVerifyForm?sent=true'){
                        setFresh('fresh')
                    }
                })
        } catch (e) {
            Alert.alert(
                "Server error",
                'Soory We Cann`t Complete Your Procedure Right Now, Please try again later!',
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
        }
    }
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
    const verify = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
            return fetch('http://progr96ammer-noder.herokuapp.com/user/verify/email',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Access-Token':token,
                },
                body: JSON.stringify({
                    verificationCode: verificaionCode,
                })
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.errors){
                        json.errors.forEach(value=> {
                            if (value.param == 'attempts') {
                                Alert.alert(
                                    "Too many attempts",
                                    json.errors.length[i].msg,
                                    [
                                        { text: "OK", onPress: () => console.log("OK Pressed") }
                                    ]
                                )
                            }
                            if (value.param == 'verificationCode') {
                                setVerificaionCodeError(value.msg)
                            }
                        })
                    }
                    if (json == 'Soory We Cann`t Complete Your Procedure Right Now, Please try again later!') {
                        Alert.alert(
                            "Connection Error",
                            json,
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        )
                    }
                    if(json.url == '/home'){
                        navigation.navigate('home');
                    }
                })
        } catch (e) {
            Alert.alert(
                "Server error",
                'Soory We Cann`t Complete Your Procedure Right Now, Please try again later!',
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
        }
    }

    const EmailVerifyDrawer = ()=>{
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

    const EmailVerifyContent = ()=>{
        return(
            <NativeBaseProvider>
                <Center flex={1}>
                    <Box>
                        <VStack space={2} mt={5}>
                            <HStack justifyContent="center">
                                <Heading size="lg" color='primary.500'>
                                    Email verification
                                </Heading>
                            </HStack>
                            <HStack justifyContent="center">
                                <Heading color="muted.400" size="xs">
                                    A <Heading color="green.400" size="xs">{fresh}</Heading> verification code has been sent to your email address.
                                </Heading>
                            </HStack>
                            <FormControl>
                                <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                                    Verification code
                                </FormControl.Label>
                                <Input onChangeText={(text)=>setVerificaionCode(text)} />
                                <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                                    {verificaionCodeError}
                                </FormControl.Label>
                            </FormControl>
                            <Button onPress={verify} colorScheme="cyan" _text={{color: 'white' }}>
                                Verify
                            </Button>
                            <HStack justifyContent="center">
                                <Heading color="muted.400" size="xs">
                                    Before proceeding, please check your email for a verification code.
                                </Heading>
                            </HStack>
                            <HStack justifyContent="center">
                                <Heading color="muted.400" size="xs">
                                    If you did not receive the email
                                </Heading>
                            </HStack>
                        </VStack>
                        <VStack  space={2} mt={5}>
                            <Button onPress={sendFresh} colorScheme="cyan" _text={{color: 'white' }}>
                                Send again
                            </Button>
                        </VStack>
                    </Box>
                </Center>
            </NativeBaseProvider>
        )
    }
    return (
        <Drawer.Navigator
            drawerPosition={'right'}
            initialRouteName={'homeContent'}
            drawerContent={(props) => <EmailVerifyDrawer {...props} />}
        >
            <Drawer.Screen name="EmailVerifyContent" component={EmailVerifyContent} />
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
