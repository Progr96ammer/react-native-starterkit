import * as React from 'react';
import {useState} from 'react';
import {Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {
    NativeBaseProvider,
    ScrollView,
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

export default function App({ navigation }) {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

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

    const signup = () => {
        return fetch('http://progr96ammer-noder.herokuapp.com/user/register',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                username: username,
                email: email,
                password: password,
                confirmPassword:confirmPassword,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                setNameError('')
                setUsernameError('')
                setEmailError('')
                setPasswordError('')
                setConfirmPasswordError('')
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
                            if (value.param == 'name') {
                                setNameError(value.msg)
                            }
                            if (value.param == 'username') {
                                setUsernameError(value.msg)
                            }
                            if (value.param == 'email') {
                                setEmailError(value.msg)
                            }
                            if (value.param == 'password') {
                                setPasswordError(value.msg)
                            }
                            if (value.param == 'confirmPassword') {
                                setConfirmPasswordError(value.msg)
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
                if(json.url == 'emailVerifyForm'){
                    storeData(json.token);
                    navigation.navigate('emailVerifyForm');
                }
            })
    }
    return (
        <NativeBaseProvider>
            <Box
                flex={1}
                p={2}
                w="90%"
                mx='auto'
            >
                <Heading size="lg" color='primary.500'>
                    Welcome
                </Heading>
                <Heading color="muted.400" size="xs">
                    Sign up to continue!
                </Heading>

                <VStack space={2} mt={5}>
                    <FormControl>
                        <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Name
                        </FormControl.Label>
                        <Input onChangeText={(text)=>setName(text)} />
                        <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                            {nameError}
                        </FormControl.Label>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Username
                        </FormControl.Label>
                        <Input onChangeText={(text)=>setUsername(text)}/>
                        <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                            {usernameError}
                        </FormControl.Label>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Email
                        </FormControl.Label>
                        <Input onChangeText={(text)=>setEmail(text)}/>
                        <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                            {emailError}
                        </FormControl.Label>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Password
                        </FormControl.Label>
                        <Input onChangeText={(text)=>setPassword(text)} type="password" />
                        <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                            {passwordError}
                        </FormControl.Label>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Confirm Password
                        </FormControl.Label>
                        <Input onChangeText={(text)=>setConfirmPassword(text)} type="password" />
                        <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                            {confirmPasswordError}
                        </FormControl.Label>
                    </FormControl>
                    <VStack  space={2}  mt={5}>
                        <Button onPress={signup} colorScheme="cyan" _text={{color: 'white' }}>
                            SignUp
                        </Button>
                    </VStack>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
}
