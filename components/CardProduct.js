import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import {PlusIcon } from "react-native-heroicons/solid";
import { convertPrice } from "../utils/helpers/convertPrice";


const CardProduct = ({item}) => {

    return <View style={{
        backgroundColor:"white",
        borderRadius:10,
       
    }} className="w-full mt-2 mb-1 h-24 flex-row items-center">
        {
            item?.image ?  <Image className="h-20 w-20 ml-2" style={{borderRadius:10}} source={{uri: item?.image}}/> :
            <Image className="h-20 w-20 ml-2" style={{borderRadius:10}} source={require("../assets/avatar.png")}/>
        }
        <View className="ml-3 flex-col ">
            <View><Text className="font-semibold" style={{fontSize:18}}>{item?.name || ""}</Text></View>
            <View className="flex-row w-64 items-center mt-4 justify-between">
                <View><Text className="font-semibold" style={{fontSize:17}}>{convertPrice(item?.price || 0)}</Text></View>
                <TouchableOpacity >
                     {/* <PlusIcon style={{zIndex:999}} size={20}/> */}
                    <View className="flex-row items-center pt-1 pb-1 pr-4 pl-4" style={{backgroundColor:"#C67C4E", borderRadius:5}}>
                        <Text className="font-semibold mr-1" style={{fontSize:16, color:"white"}}>+</Text>
                        <Text className="font-semibold" style={{fontSize:12,color:"white"}}>Thêm</Text>
                    </View>
                </TouchableOpacity>
                

            </View>
        </View>

    </View>
}

export default CardProduct