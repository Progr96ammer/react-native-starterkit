import 'react-native-gesture-handler';
import React, { Component } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import home from './views/auth/home';
import login from './views/auth/login';
import signup from './views/auth/signup';
import emailVerifyForm from './views/auth/emailVerifyForm';
import Splash from './views/splash';
import SyncDatabase from './views/middleware/SyncDatabase';
import forgetPassword from './views/auth/forgetPassword';
import PasswordResetVerify from './views/auth/PasswordResetVerify';
import resetPassword from './views/auth/resetPassword';
import profile from './views/auth/profile';
import updatePassword from './views/auth/updatePassword';
import deleteAccount from './views/auth/deleteAccount';

const Stack = createStackNavigator();

class app extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'Splash'}>
                    <Stack.Screen options={{headerShown: false,gestureEnabled: false}} name="Splash" component={Splash} />
                    <Stack.Screen options={{headerShown: false,gestureEnabled: false}} name="SyncDatabase" component={SyncDatabase} />
                    <Stack.Screen options={{headerShown: false,gestureEnabled: false}} name="home" component={home} />
                    <Stack.Screen name="emailVerifyForm" component={emailVerifyForm} />
                    <Stack.Screen options={{headerShown: false,gestureEnabled: false}} name="login" component={login} />
                    <Stack.Screen options={{headerShown: false,gestureEnabled: false}} name="signup" component={signup} />
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
