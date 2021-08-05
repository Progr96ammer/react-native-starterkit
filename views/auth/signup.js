import * as React from 'react';
import {useState} from 'react';
import {Alert} from "react-native";
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
    Divider
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
                'Sorry we can not complete your procedure right now!',
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
                            if (value.param == 'credential') {
                                setEmailError(value.msg)
                            }
                            if (value.param == 'password') {
                                setPasswordError(value.msg)
                            }
                        }
                    )
                }
                if(json.url == '/home'){
                    storeData('token',json.token);
                    navigation.navigate('home');
                }
            })
            .catch((error) => {
                console.error(error);
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
                    Sign up to continue!
                </Heading>

                <VStack space={2} mt={5}>
                    <FormControl>
                        <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Name
                        </FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Username
                        </FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Email
                        </FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Password
                        </FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Confirm Password
                        </FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <VStack  space={2}  mt={5}>
                        <Button colorScheme="cyan" _text={{color: 'white' }}>
                            SignUp
                        </Button>
                    </VStack>
                    <HStack justifyContent="center">
                        <Text fontSize='sm' color='muted.700' fontWeight={400}>I have an account. </Text>
                        <Link onPress={() => navigation.navigate('login')} _text={{ color: 'cyan.500', bold: true, fontSize: 'sm' }} >
                            Login
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
}
