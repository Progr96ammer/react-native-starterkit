import * as React from 'react';
import {Alert, BackHandler} from "react-native";
import {useState,useEffect} from 'react';
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
import Loading from "../components/loading";

export default function App({ navigation }) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, [])
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

    const login = () => {
        setLoading(true);
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
                setLoading(false);
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
                if (json.url == '/user/emailVerifyForm') {
                    storeData(json.token);
                    navigation.navigate('emailVerifyForm');
                }
            })
    }
    return (
        loading?(<Loading/>):(
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
                            onPress={() => navigation.navigate('forgetPassword')}
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
                    <Center>
                        <HStack>
                            <Heading color="muted.400" size="xs"> You're a new user.? </Heading>
                        </HStack>
                    </Center>
                    <VStack  space={2}>
                        <Button onPress={() => navigation.navigate('signup')} colorScheme="cyan" _text={{color: 'white' }}>
                            Signup
                        </Button>
                    </VStack>
                </VStack>
            </Box>
        </NativeBaseProvider>)
    );
}
