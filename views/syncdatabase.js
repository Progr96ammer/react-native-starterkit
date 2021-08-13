import React, { Component } from 'react';
import {Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
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

class Syncdatabase extends Component {
    state = { loading: true }
    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');
        try {
            return fetch('http://progr96ammer-noder.herokuapp.com/home',{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Access-Token':token,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json == 'Soory We Cann`t Complete Your Procedure Right Now, Please try again later!') {
                        Alert.alert(
                            "Connection Error",
                            json,
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        )
                    }
                    if (json.url == 'user/emailVerifyForm') {
                        this.setState({ loading: 'user/emailVerifyForm'  });
                    }
                    if (json.url == '/home') {
                        this.setState({ loading: 'home'  });
                    }
                })
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

    render() {
        const { navigation } = this.props;
        if(this.state.loading == 'user/emailVerifyForm'){
            navigation.navigate('emailVerifyForm');
        }
        else if(this.state.loading == 'home'){
            navigation.navigate('home');
        }
        return (
            <NativeBaseProvider>
                <Center flex={1}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            margin: "auto",
                            background: "#f1f2f3",
                        }}
                        width={200}
                        height={200}
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                        display="block"
                    >
                        <circle
                            cx={50}
                            cy={50}
                            fill="none"
                            stroke="#93dbe9"
                            strokeWidth={10}
                            r={35}
                            strokeDasharray="164.93361431346415 56.97787143782138"
                        >
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                repeatCount="indefinite"
                                dur="1s"
                                values="0 50 50;360 50 50"
                                keyTimes="0;1"
                            />
                        </circle>
                    </svg>
                </Center>
            </NativeBaseProvider>
        );
    }
}

export default Syncdatabase;
