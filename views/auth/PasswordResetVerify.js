import * as React from 'react';
import {Alert} from "react-native";
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    NativeBaseProvider,
    Center,
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Button,
    HStack,
} from 'native-base';
import Loading from "../components/loading";

export default function App({route, navigation }) {
    const [fresh, setFresh] = useState('');
    const [verificaionCode, setVerificaionCode] = useState('');
    const [verificaionCodeError, setVerificaionCodeError] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(route.params.credential);
    const sendFresh = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
            setLoading(true)
            return fetch('http://progr96ammer-noder.herokuapp.com/user/sendResetPassword',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Access-Token':token,
                },
                body: JSON.stringify({
                    credential: email,
                })
            })
                .then((response) => response.json())
                .then((json) => {
                    setLoading(false)
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
    const verify = async () => {
        try {
            setLoading(true)
            return fetch('http://progr96ammer-noder.herokuapp.com/user/confirmResetPassword',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    verificationCode: verificaionCode,
                    credential:email,
                })
            })
                .then((response) => response.json())
                .then((json) => {
                    setLoading(false)
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
                    if(json.url == 'resetpassword/email?credential='+email+''){
                        navigation.navigate('resetPassword',{
                            credential:email,
                        });
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
    return (
        loading?(<Loading/>):(
        <NativeBaseProvider>
            <Center flex={1}>
                <Box>
                    <VStack space={2} mt={5}>
                        <HStack justifyContent="center">
                            <Heading size="lg" color='primary.500'>
                                Reset Password
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
        </NativeBaseProvider>)
    );
}
