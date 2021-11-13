import {Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from "jwt-decode";
import {
    NativeBaseProvider,
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Button,
    Center,
    Image,
    Pressable,
} from 'native-base';
import React, { Component } from 'react';
import Loading from "../components/loading";
import * as ImagePicker from 'expo-image-picker';

class profile extends Component {
    state = {
        name: '',
        nameError: '',
        username: '',
        usernameError: '',
        password: '',
        image: 'http://progr96ammer-noder.herokuapp.com/images/default_avatar.png',
        imageInfo: '',
        imageError: '',
        passwordError: '',
        loading:false,
        selectedImage:'',
        setSelectedImage:'',
    };
    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');
        try {
            var decoded = jwt(JSON.parse(token).reftoken);
            this.setState({name:decoded.user.name})
            this.setState({username:decoded.user.username})
            if (decoded.user.avatar !=''){
                this.setState({image:'https://progr96ammer-noder.herokuapp.com'+decoded.user.avatar + '?' + new Date()})
            }
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
    openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }
        let localUri = pickerResult.uri;
        let filename = localUri.split('/').pop();
        filename.replace(/\.[^/.]+$/, "")
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        this.setState({ image:pickerResult.uri })
        this.setState({ imageInfo: { uri: localUri,name: filename, type } })
    };
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
        let formData = new FormData();
        formData.append('name',this.state.name);
        formData.append('username',this.state.username);
        formData.append('password',this.state.password);
        formData.append('avatar',this.state.imageInfo);

        const token = await AsyncStorage.getItem('token');
        return fetch('http://progr96ammer-noder.herokuapp.com/user/profile',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'multipart/form-data',
                'X-Access-Token':token,
            },
            body:formData,
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({loading:false})
                this.setState({nameError:''})
                this.setState({usernameError:''})
                this.setState({passwordError:''})
                this.setState({imageError:''})
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
                            if (value.param == 'avatar') {
                                this.setState({imageError:value.msg})
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
                    <Center>
                        <Pressable  style={{borderRadius: 300}} onPress={this.openImagePickerAsync}>
                            <Image
                                size={150}
                                borderRadius={100}
                                resizeMode="cover"
                                key={new Date()}
                                source={{
                                    uri:this.state.image
                                }}
                                alt="Alternate Text"
                            />
                        </Pressable>
                    </Center>
                    <Center>
                        <FormControl.Label _text={{color: 'red.700', fontSize: 'sm', fontWeight: 600, pt:2}}>
                            {this.state.imageError}
                        </FormControl.Label>
                    </Center>

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
