import * as React from 'react';
import {Alert} from "react-native";
import {useState} from 'react';
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
import {verticalAlign} from "styled-system";

export default function App({ navigation }) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [token, setToken] = useState('');
    const login = () => {
        return fetch('http://progr96ammer-noder.herokuapp.com/user/login',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                credential: email,
                password: password
            })
        })
            .then((response) => response.json())
            .then((json) => {
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
                    setToken(json.token)
                    navigation.navigate('home')
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
                    Sign in to continue!
                </Heading>

                <VStack space={2} mt={5}>
                    <FormControl>
                        <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            E-mail or username
                        </FormControl.Label>
                        <Input onChangeText={(text)=>setEmail(text)} />
                        <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                            {emailError}
                        </FormControl.Label>
                    </FormControl>
                    <FormControl mb={5}>
                        <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Password
                        </FormControl.Label>
                        <Input onChangeText={(text)=>setPassword(text)} type="password" />
                        <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                            {passwordError}
                        </FormControl.Label>
                        <Link
                            _text={{ fontSize: 'xs', fontWeight: '700', color:'cyan.500' }}
                            alignSelf="flex-end"
                            mt={1}
                        >
                            Forget Password?
                        </Link>
                    </FormControl>
                    <VStack  space={2}>
                        <Button onPress={login} colorScheme="cyan" _text={{color: 'white' }}>
                            Login
                        </Button>
                    </VStack>
                    <HStack justifyContent="center">
                        <Text fontSize='sm' color='muted.700' fontWeight={400}>I'm a new user. </Text>
                        <Link onPress={() => navigation.navigate('signup')} _text={{ color: 'cyan.500', bold: true, fontSize: 'sm' }} >
                            Sign Up
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
}
