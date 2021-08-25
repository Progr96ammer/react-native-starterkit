import {Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from "jwt-decode";
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
import React, { Component } from 'react';
import Loading from "../components/loading";

class profile extends Component {
    state = {
        name: '',
        nameError: '',
        username: '',
        usernameError: '',
        password: '',
        passwordError: '',
        loading:false,
    };
    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');
        try {
            var decoded = jwt(JSON.parse(token).reftoken);
            this.setState({name:decoded.user.name})
            this.setState({username:decoded.user.username})
            console.log(this.state.name)
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
    storeData = async (value) => {
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
    update = async () => {
        this.setState({loading:true})
        const token = await AsyncStorage.getItem('token');
        return fetch('http://progr96ammer-noder.herokuapp.com/user/profile',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token':token,
            },
            body: JSON.stringify({
                name: this.state.name,
                username: this.state.username,
                password: this.state.password,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({loading:false})
                this.setState({nameError:''})
                this.setState({usernameError:''})
                this.setState({passwordError:''})
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
                                this.setState({nameError:value.msg})
                            }
                            if (value.param == 'username') {
                                this.setState({usernameError:value.msg})
                            }
                            if (value.param == 'password') {
                                this.setState({passwordError:value.msg})
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
                    this.storeData(json.token);
                    this.props.navigation.goBack();
                }
            })
    }
    render() {
        return (
            this.state.loading?(<Loading/>):(
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
                            <Input value={this.state.name} onChangeText={(text)=>this.setState({name:text})}/>
                            <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                                {this.state.nameError}
                            </FormControl.Label>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                                Username
                            </FormControl.Label>
                            <Input value={this.state.username} onChangeText={(text)=>this.setState({username:text})}/>
                            <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                                {this.state.usernameError}
                            </FormControl.Label>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                                Current Password
                            </FormControl.Label>
                            <Input onChangeText={(text)=>this.setState({password:text})} type="password" />
                            <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600}}>
                                {this.state.passwordError}
                            </FormControl.Label>
                        </FormControl>
                        <VStack  space={2}  mt={5}>
                            <Button onPress={this.update} colorScheme="cyan" _text={{color: 'white' }}>
                                Update
                            </Button>
                        </VStack>
                    </VStack>
                </Box>
            </NativeBaseProvider>)
        );
    }
}

export default profile;
