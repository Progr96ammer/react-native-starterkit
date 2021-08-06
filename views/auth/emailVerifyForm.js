import * as React from 'react';
import {Alert} from "react-native";
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {
    NativeBaseProvider,
    Center,
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
    const [fresh, setFresh] = useState('');
    const sendFresh = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
            return fetch('http://progr96ammer-noder.herokuapp.com/user/sendEmailVerify',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Access-Token':token,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.errors){
                        json.errors.forEach(value=> {
                                Alert.alert(
                                    "Server error",
                                    'Sorry we can not complete your procedure right now!',
                                    [
                                        { text: "OK", onPress: () => console.log("OK Pressed") }
                                    ]
                                )
                            }
                        )
                    }
                    if(json.url == 'emailVerifyForm?sent=true'){
                        setFresh('fresh')
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
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
    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Box>
                    <VStack space={2} mt={5}>
                        <HStack justifyContent="center">
                            <Heading size="lg" color='primary.500'>
                                Email verification
                            </Heading>
                        </HStack>
                        <HStack justifyContent="center">
                            <Heading color="muted.400" size="xs">
                                A <Heading color="green.400" size="xs">{fresh}</Heading> verification link has been sent to your email address.
                            </Heading>
                        </HStack>
                        <HStack justifyContent="center">
                            <Heading color="muted.400" size="xs">
                                Before proceeding, please check your email for a verification link.
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
        </NativeBaseProvider>
    );
}
