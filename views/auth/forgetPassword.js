import * as React from 'react';
import {Alert} from "react-native";
import {useState} from 'react';
import {
    NativeBaseProvider,
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Button,
} from 'native-base';
import Loading from "../components/loading";

export default function App({ navigation }) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const send = () => {
        setLoading(true)
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
                setLoading(false)
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
                if(json.url == 'confirmResetPasswordForm?credential='+email.toLowerCase()+''){
                    navigation.navigate('PasswordResetVerify',{
                        credential:email,
                    });
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
        </NativeBaseProvider>)
    );
}
