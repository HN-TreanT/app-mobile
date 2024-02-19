import React from "react";
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
const Stack = createNativeStackNavigator();
import HomeTab from "../components/HomeTab";
import HomeTab2 from "../components/HomeTab2";
// const Tab = createBottomTabNavigator()


export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{contentStyle: {backgroundColor:"white"}}}>
                {/* <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen}></Stack.Screen>
                <Stack.Screen name="Product" options={{headerShown: false}} component={ProductScreen}></Stack.Screen> */}
                <Stack.Screen  name="Home" options={{headerShown: false}} component={HomeTab2}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
