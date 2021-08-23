import 'react-native-gesture-handler';
import React, { Component } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer,DrawerActions } from '@react-navigation/native';
import home from './views/auth/home';
import login from './views/auth/login';
import signup from './views/auth/signup';
import emailVerifyForm from './views/auth/emailVerifyForm';
import Splash from './views/splash';
import forgetPassword from './views/auth/forgetPassword';
import PasswordResetVerify from './views/auth/PasswordResetVerify';
import resetPassword from './views/auth/resetPassword';
import profile from './views/auth/profile';
import updatePassword from './views/auth/updatePassword';
import deleteAccount from './views/auth/deleteAccount';
import setting from './views/auth/setting';
import {
    NativeBaseProvider,
    Button,
    Icon,
} from 'native-base';
import {Ionicons} from "@expo/vector-icons";

const Stack = createStackNavigator();

class app extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'Splash'}>
                    <Stack.Screen options={{headerShown: false,gestureEnabled: false}} name="Splash" component={Splash} />
                    <Stack.Screen name="home" component={home} options={({navigation})=>({
                        headerLeft: ()=> null,
                        gestureEnabled: false,
                        headerRight: (props) => (
                            <NativeBaseProvider>
                                <Button
                                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                                    variant="unstyled"
                                    endIcon={<Icon as={Ionicons} name="reorder-three-outline" size={7} />}
                                    _text={{
                                        fontSize:'md'
                                    }}
                                >

                                </Button>
                            </NativeBaseProvider>
                        ),})
                    }/>
                    <Stack.Screen name="emailVerifyForm" component={emailVerifyForm} options={({navigation})=>({
                        headerLeft: ()=> null,
                        gestureEnabled: false,
                        headerRight: (props) => (
                            <NativeBaseProvider>
                                <Button
                                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                                    variant="unstyled"
                                    endIcon={<Icon as={Ionicons} name="reorder-three-outline" size={7} />}
                                    _text={{
                                        fontSize:'md'
                                    }}
                                >

                                </Button>
                            </NativeBaseProvider>
                        ),})
                    } />
                    <Stack.Screen name="setting" component={setting} />
                    <Stack.Screen options={{headerShown: false,gestureEnabled: false}} name="login" component={login} />
                    <Stack.Screen name="signup" component={signup} />
                    <Stack.Screen name="forgetPassword" component={forgetPassword} />
                    <Stack.Screen name="PasswordResetVerify" component={PasswordResetVerify} />
                    <Stack.Screen name="resetPassword" component={resetPassword} />
                    <Stack.Screen name="profile" component={profile} />
                    <Stack.Screen name="updatePassword" component={updatePassword} />
                    <Stack.Screen name="deleteAccount" component={deleteAccount} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default app;
