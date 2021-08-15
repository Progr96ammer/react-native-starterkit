import * as React from 'react';
import {Alert} from "react-native";
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
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
import {verticalAlign} from "styled-system";

export default function App({ route,navigation }) {
    const [email, setEmail] = useState(route.params.credential);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('token', JSON.stringify(value))
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

    const reset = () => {
        return fetch('http://progr96ammer-noder.herokuapp.com/user/resetPassword',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                credential: email,
                newPassword:newPassword,
                confirmPassword:confirmNewPassword,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                setNewPasswordError('')
                setConfirmNewPasswordError('')
                if (json.errors){
                    json.errors.forEach(value=> {
                            if (value.param == 'attempts') {
                                Alert.alert(
                                    "Too many attempts",
                                    value.msg,
                                    [
                                        { text: "OK", onPress: () => console.log("OK Pressed") }
                                    ]
                                )
                            }
                            if (value.param == 'newPassword') {
                                setNewPasswordError(value.msg)
                            }
                            if (value.param == 'confirmPassword') {
                                setConfirmNewPasswordError(value.msg)
                            }
                        }
                    )
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
                    storeData(json.token);
                    navigation.navigate('home');
                }
            })
            .catch((error) => {
                Alert.alert(
                    "Server error",
                    'Soory We Cann`t Complete Your Procedure Right Now, Please try again later!',
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                )
            });
    }
    return (
        <NativeBaseProvider>
            <Box
                style={{paddingTop:40}}
                flex={1}
                p={2}
                w="90%"
                mx='auto'
            >
                <Heading size="lg" color='primary.500'>
                    Welcome
                </Heading>
                <Heading color="muted.400" size="xs">
                    Sign in to continue!
                </Heading>

                <VStack space={2} mt={5}>

                    <FormControl mb={5}>
                        <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            New Password
                        </FormControl.Label>
                        <Input onChangeText={(text)=>setNewPassword(text)} type="password" />
                        <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                            {newPasswordError}
                        </FormControl.Label>
                    </FormControl>
                    <FormControl mb={5}>
                        <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Confirm New Password
                        </FormControl.Label>
                        <Input onChangeText={(text)=>setConfirmNewPassword(text)} type="password" />
                        <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                            {confirmNewPasswordError}
                        </FormControl.Label>
                    </FormControl>
                    <VStack  space={2}>
                        <Button onPress={reset} colorScheme="cyan" _text={{color: 'white' }}>
                            Reset
                        </Button>
                    </VStack>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
}
