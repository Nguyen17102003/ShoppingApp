import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Register from "../screens/RegisterScreen";
import Login from "../screens/LoginScreen";
import TabNavigator from "./TabNavigator";
export default function AppNavigator(){
    const Stack = createNativeStackNavigator();
    return( 
        <NavigationContainer theme={{colors: {background: "transparent",},}}>
            <Stack.Navigator screenOptions = {{headerShown: false}}>
                <Stack.Screen name = 'Login' component = {Login}></Stack.Screen>
                <Stack.Screen name = 'Register' component = {Register}></Stack.Screen>
                <Stack.Screen name = 'Tab' component = {TabNavigator}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}