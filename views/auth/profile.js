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
import jwt from "jsonwebtoken";

export default function App({ navigation }) {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

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
    React.useEffect(() => {
        const getProfile = async () => {
            const token = await AsyncStorage.getItem('token');
            try {
                var decoded = jwt.decode(JSON.parse(token).reftoken);
                setName(decoded.user.name)
                setUsername(decoded.user.username)
            } catch(err) {
                Alert.alert(
                    "Server error",
                    'Soory We Cann`t Complete Your Procedure Right Now, Please try again later!',
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                )
            }
        }
        getProfile()
    })

    const update = async () => {
        const token = await AsyncStorage.getItem('token');
        return fetch('http://progr96ammer-noder.herokuapp.com/user/profile',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token':token,
            },
            body: JSON.stringify({
                name: name,
                username: username,
                password: password,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                setNameError('')
                setUsernameError('')
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
                            if (value.param == 'name') {
                                setNameError(value.msg)
                            }
                            if (value.param == 'username') {
                                setUsernameError(value.msg)
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
                if(json.url == 'profile'){
                    console.log(json.token)
                    storeData(json.token);
                    navigation.navigate('profile');
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
                    Profile
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
                        <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Password
                        </FormControl.Label>
                        <Input onChangeText={(text)=>setPassword(text)} type="password" />
                        <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                            {passwordError}
                        </FormControl.Label>
                    </FormControl>
                    <VStack  space={2}  mt={5}>
                        <Button onPress={update} colorScheme="cyan" _text={{color: 'white' }}>
                            Update
                        </Button>
                    </VStack>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
}
