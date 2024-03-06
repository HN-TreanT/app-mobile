import { View, Text, Image, TextInput, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import {BottomSheet, Button, ListItem } from "@rneui/themed"
import {useNavigation} from "@react-navigation/native"
import authServices from "../utils/services/authServices";
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
    const navigation = useNavigation()
    const [activeCategory, setActiveCategory] = useState(1)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const handleOnPress =async () => {
       if(username && password) {
        // authServices.login
        console.log(username)
        console.log(password)
        authServices.login({
            username: username,
            password: password
        }).then(async (res) => {
            await AsyncStorage.setItem("access_token", res?.data.access_token)
            await AsyncStorage.setItem("refresh_token", res?.data.refresh_token)
            navigation.navigate("home")
        }).catch(err => {
            console.log(err)
        })
       } else {
        console.log("dien thong tin day du")
       }

    }
    return (
        <View className="flex-1 relative bg-white box-border">
            
             {/* <Image source={require("../assets/beansBackground1.png")}
             className="w-full absolute -top-5 opacity-10" style = {{height: 220}}/> */}
            {/* <Text>Hoang Nam</Text> */}
            <SafeAreaView className="flex-1">
                <View>
                    <Text>username</Text>
                    <TextInput onChangeText={(value) => setUsername(value)} placeholder="Tên đăng nhập"></TextInput>
                </View>

                <View>
                    <Text>password</Text>
                    <TextInput onChangeText={(value) => setPassword(value)} placeholder="Tên đăng nhập"></TextInput>
                </View>
                <Button
                onPress={handleOnPress}
                title={'Đăng nhập'}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
            />

               
            </SafeAreaView>
        </View>
    )
}

export default LoginScreen


