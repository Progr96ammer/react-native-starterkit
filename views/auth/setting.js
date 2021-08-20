import React, { useState, useEffect } from 'react';
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
import {Ionicons} from "@expo/vector-icons";
import {StyleSheet} from "react-native";
export default function home({ navigation }) {
    return (
        <NativeBaseProvider>
            <VStack>
                <Button
                    onPress={() => navigation.navigate('profile')}
                    style={[styles.drawerButton,]}
                    variant="ghost"
                    startIcon={<Icon as={Ionicons} name="person-circle-outline" size={7} />}
                    _text={{
                        fontSize:'md'
                    }}
                >
                    Profile
                </Button>
                <Button
                    onPress={() => navigation.navigate('updatePassword')}
                    style={[styles.drawerButton,]}
                    variant="ghost"
                    startIcon={<Icon as={Ionicons} name="cog-outline" size={7} />}
                    _text={{
                        fontSize:'md'
                    }}
                >
                    Password
                </Button>
                <Button
                    onPress={() => navigation.navigate('deleteAccount')}
                    style={[styles.drawerButton,]}
                    variant="ghost"
                    startIcon={<Icon as={Ionicons} name="trash-outline" size={7} />}
                    _text={{
                        fontSize:'md'
                    }}
                >
                    Delete Account
                </Button>
            </VStack>
        </NativeBaseProvider>
    );
}
const styles = StyleSheet.create({
    drawerButton:{
        justifyContent: "flex-start",
        borderBottomWidth:1,
        borderBottomColor:'#d4d4d4',
    },
    borderTop:{
        borderTopWidth:1,
        borderTopColor:'#d4d4d4'
    }
});
