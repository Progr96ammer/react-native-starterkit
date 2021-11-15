import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
    NativeBaseProvider,
    Button,
    VStack,
    Icon,
} from 'native-base';
import {DrawerActions} from "@react-navigation/native";

export default function DrawerContent({stateChanger}) {
    const navigation = useNavigation();
    const  logout = async () => {
        stateChanger(true)
        navigation.dispatch(DrawerActions.toggleDrawer())
        const token = await AsyncStorage.getItem('token');
        return fetch('http://progr96ammer-noder.herokuapp.com/user/logout',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token':token,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                stateChanger(false)
                if (json == 'Soory We Cann`t Complete Your Procedure Right Now, Please try again later!') {
                    Alert.alert(
                        "Connection Error",
                        json,
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    )
                }
                if (json.url == '../'){
                    AsyncStorage.removeItem('token');
                    navigation.navigate('login')
                }

            })
    }
    return (
        <NativeBaseProvider>
            <VStack
                flex={1}
            >
                <Button
                    onPress={() => navigation.navigate('setting')}
                    style={[styles.drawerButton,]}
                    variant="ghost"
                    endIcon={<Icon as={Ionicons} name="cog-outline" size={7} />}
                    _text={{
                        fontSize:'md'
                    }}
                >
                    Setting
                </Button>
            </VStack>
            <VStack>
                <Button
                    onPress={logout}
                    style={[styles.borderTop]}
                    variant="ghost"
                    endIcon={<Icon as={Ionicons} name="log-out-outline" size={7} />}
                    _text={{
                        fontSize:'md'
                    }}
                >
                    Logout
                </Button>
            </VStack>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    drawerButton:{
        borderBottomWidth:1,
        borderBottomColor:'#d4d4d4'
    },
    borderTop:{
        borderTopWidth:1,
        borderTopColor:'#d4d4d4'
    }
});
