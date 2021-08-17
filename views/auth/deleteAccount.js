import * as React from 'react';
import {Alert} from "react-native";
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export default function App({ navigation }) {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const Delete = async () => {
        const token = await AsyncStorage.getItem('token');
        return fetch('http://progr96ammer-noder.herokuapp.com/user/deleteUser',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token':token,

            },
            body: JSON.stringify({
                password:password,
            })
        })
            .then((response) => response.json())
            .then((json) => {
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
                if(json.url == '../'){
                    AsyncStorage.removeItem('token');
                    navigation.navigate('login');
                }
            })
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
                            Password
                        </FormControl.Label>
                        <Input onChangeText={(text)=>setPassword(text)} type="password" />
                        <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                            {passwordError}
                        </FormControl.Label>
                    </FormControl>
                    <VStack  space={2}>
                        <Button onPress={Delete} colorScheme="cyan" _text={{color: 'white' }}>
                            Delete
                        </Button>
                    </VStack>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
}
