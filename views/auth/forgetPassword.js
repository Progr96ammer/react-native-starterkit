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

export default function App({ navigation }) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const send = () => {
        return fetch('http://progr96ammer-noder.herokuapp.com/user/sendResetPassword',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                credential: email,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                setEmailError('')
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
                if(json.url == 'confirmResetPasswordForm?credential='+email+''){
                    navigation.navigate('PasswordResetVerify',{
                        credential:email,
                    });
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
                    Enter E-mail/Username in to continue!
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
                    <VStack  space={2}>
                        <Button onPress={send} colorScheme="cyan" _text={{color: 'white' }}>
                            Login
                        </Button>
                    </VStack>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
}
