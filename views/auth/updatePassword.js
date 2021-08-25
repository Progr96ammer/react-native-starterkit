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
import {verticalAlign} from "styled-system";
import Loading from "../components/loading";

export default function App({ navigation :{goBack}}) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    const update = async () => {
        setLoading(true)
        const token = await AsyncStorage.getItem('token');
        return fetch('http://progr96ammer-noder.herokuapp.com/user/updatePassword',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token':token,

            },
            body: JSON.stringify({
                currentPassword:currentPassword,
                newPassword:newPassword,
                confirmPassword:confirmNewPassword,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                setLoading(false)
                setCurrentPasswordError('')
                setNewPasswordError('')
                setConfirmNewPasswordError('')
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
                            if (value.param == 'currentPassword') {
                                setCurrentPasswordError(value.msg)
                            }
                            if (value.param == 'newPassword') {
                                setNewPasswordError(value.msg)
                            }
                            if (value.param == 'confirmPassword') {
                                setConfirmNewPasswordError(value.msg)
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
                    goBack();
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

                    <FormControl mb={5}>
                        <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Current Password
                        </FormControl.Label>
                        <Input onChangeText={(text)=>setCurrentPassword(text)} type="password" />
                        <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                            {currentPasswordError}
                        </FormControl.Label>
                    </FormControl>
                    <FormControl mb={5}>
                        <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            New Password
                        </FormControl.Label>
                        <Input onChangeText={(text)=>setNewPassword(text)} type="password" />
                        <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                            {newPasswordError}
                        </FormControl.Label>
                    </FormControl>
                    <FormControl mb={5}>
                        <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                            Confirm New Password
                        </FormControl.Label>
                        <Input onChangeText={(text)=>setConfirmNewPassword(text)} type="password" />
                        <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                            {confirmNewPasswordError}
                        </FormControl.Label>
                    </FormControl>
                    <VStack  space={2}>
                        <Button onPress={update} colorScheme="cyan" _text={{color: 'white' }}>
                            Update
                        </Button>
                    </VStack>
                </VStack>
            </Box>
        </NativeBaseProvider>)
    );
}
