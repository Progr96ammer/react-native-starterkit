import React, { Component } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import home from './views/auth/home';
import login from './views/auth/login';
import signup from './views/auth/signup';
import emailVerifyForm from './views/auth/emailVerifyForm';
import splash from './views/splash';
import SyncDatabase from './views/middleware/syncdatabase';
import forgetPassword from './views/auth/forgetPassword';
import PasswordResetVerify from './views/auth/PasswordResetVerify';
import resetPassword from './views/auth/resetPassword';
import profile from './views/auth/profile';

const Drawer = createDrawerNavigator();

class app extends Component {
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName={'splash'}>
                    <Drawer.Screen name="splash" component={splash} />
                    <Drawer.Screen name="SyncDatabase" component={SyncDatabase} />
                    <Drawer.Screen name="home" component={home} />
                    <Drawer.Screen name="emailVerifyForm" component={emailVerifyForm} />
                    <Drawer.Screen name="login" component={login} />
                    <Drawer.Screen name="signup" component={signup} />
                    <Drawer.Screen name="forgetPassword" component={forgetPassword} />
                    <Drawer.Screen name="PasswordResetVerify" component={PasswordResetVerify} />
                    <Drawer.Screen name="resetPassword" component={resetPassword} />
                    <Drawer.Screen name="profile" component={profile} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

export default app;
