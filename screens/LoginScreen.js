import { View, Text, Image, TextInput, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import {BottomSheet, Button, ListItem } from "@rneui/themed"
import {useNavigation} from "@react-navigation/native"
import authServices from "../utils/services/authServices";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useActions from "../redux/useActions";
import {useDispatch, useSelector} from "react-redux"
import { Input } from '@rneui/themed';
import {UserIcon, LockClosedIcon} from "react-native-heroicons/solid"


const LoginScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const actions = useActions()
    const [activeCategory, setActiveCategory] = useState(1)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [errorMessageUsername, setErrorMessageUsername] = useState("")
    const [errorMessagePassword, setErrorMessagePassword] = useState("") 

    const handleOnPress =async () => {
        if(!username) {
            setErrorMessageUsername("Tên đăng nhập không được để trống!")
        }

        if(!password) {
            setErrorMessagePassword("Mật khẩu không được để trống!")
        }
       if(username && password) {
        authServices.login({
            username: username,
            password: password
        }).then(async (res) => {
            dispatch(actions.AuthActions.userInfo(res?.data))
            await AsyncStorage.setItem("access_token", res?.data.access_token)
            await AsyncStorage.setItem("refresh_token", res?.data.refresh_token)
            navigation.navigate("Home")
        }).catch(err => {
            console.log(err)
            setErrorMessagePassword("Đăng nhập thất bại")
        })
       } else {
        console.log("dien thong tin day du")
         setErrorMessagePassword("Đăng nhập thất bại")
       }

    }
    return (
        <View className="flex-1 relative bg-white box-border">
            
             <Image source={require("../assets/beansBackground1.png")}
             className="w-full h-full absolute -top-5 opacity-10"/> 
            {/* {/* <Text>Hoang Nam</Text> */}
            <SafeAreaView className="flex-1">
                <View className="flex-1 flex-col items-center">
                        <Image

                            source={require("../assets/logo4.png")}
                            className="h-9 w-72 rounded-full mt-12"
                        />

                        <View className="w-3/4 flex-col items-start mt-7 justify-start">
                            <Input 
                            leftIcon={ <UserIcon size="25" color="rgb(179, 179, 179)" /> }
                            label="Tên đăng nhập" 
                            className="w-full" 
                            onChangeText={(value) => {
                                setUsername(value)
                                if(value === "" && !value) {
                                    setErrorMessageUsername("Tên đăng nhập không được để trống!")
                                } else {
                                    setErrorMessageUsername("")
                                }
                            }}
                             placeholder="Tên đăng nhập" renderErrorMessage={true}
                             errorMessage={errorMessageUsername}
                              ></Input>
                            <Input label="Mật khẩu" 
                            errorMessage={errorMessagePassword}
                            renderErrorMessage={true}
                            leftIcon={ <LockClosedIcon size="25" color="rgb(179, 179, 179)" /> }
                            className="w-full" 
                            secureTextEntry={true} 
                            onChangeText={(value) => {
                                setPassword(value)
                                if(value === "" && !value) {
                                    setErrorMessagePassword("Mật khẩu không được để trống!")
                                } else {
                                    setErrorMessagePassword("")
                                }
                            } } placeholder="Mật khẩu"></Input>
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

                </View>
               
            </SafeAreaView>
        </View>
    )
}

export default LoginScreen


