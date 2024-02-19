import { View, Text, Image, TextInput, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import {Status} from "expo-status-bar"
import {StatusBar} from "expo-status-bar"
import { themeColors } from "../theme";
import {MapPinIcon, Bars3Icon} from "react-native-heroicons/solid"
import {BellIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline"
import { useState } from "react";
import Carousel  from "react-native-snap-carousel"
import CoffeCard from "../components/CoffeCard";
import { coffeeItems } from "../constants/fakeData";
import { CreditCardIcon as CreditCardSolid } from 'react-native-heroicons/solid';


const OrderScreen = () => {
  
    return (
        <View className="flex-1 relative bg-white">
            <SafeAreaView className="flex-1">
                <View style={{    
                    borderBottomColor:"rgb(199, 199, 199)",
                    borderBottomWidth:1
                }} className="px-4 pb-4 mr-2 ml-2 pt-2 flex-row justify-between items-center">
                    <Bars3Icon size="27" color="black"/>   
                   
                    <View className="flex-row items-center space-x-2">
                        <Image source={require("../assets/logo4.png")} className="h-9 w-40 rounded-full"/>
                    </View>
                    <BellIcon size="27" color="rgb(179, 179, 179)"/>          
                </View>  
                <View className="h-10"></View>  

                <View
                
                style={{
                  // backgroundColor:"#e6f5ff"
                }} className=" flex flex-row mr-2  h-full">
                    <View style={{backgroundColor:"white"}} className="h-full w-1/4 flex-row justify-center ">
                      {/* h-20 p-3 w-32 */}
                        <View style={{backgroundColor:"#e6f5ff",borderBottomLeftRadius: 10}} className="ml-2 pt-3 flex-col h-20 w-24 items-center">
                           <CreditCardSolid  size="37" color="#0080ff"/>
                           <Text >Đơn hàng</Text>
                        </View>
                        
                    </View>
                    <View style={{backgroundColor:"#e6f5ff"}} className=" h-full w-3/4 "><Text>content</Text></View>
                </View>    
            </SafeAreaView>
        </View>
    )
}

export default OrderScreen


