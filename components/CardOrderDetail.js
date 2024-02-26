import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { PlusCircleIcon, MinusCircleIcon } from "react-native-heroicons/outline";


const CardOrderDetail = ({item}) => {
    const [count, setCout] = useState(1)
    return <View style={{
        backgroundColor:"white",
        borderRadius:10,
       
    }} className="w-full mt-2 mb-1 h-20 ">

        <View className="m-3">
            <View className="flex-row items-center justify-between">
                <Text className="font-semibold" style={{fontSize:18}}>Cafe capuchino</Text>
                <Text className="font-semibold" style={{fontSize:17}}>45.000 đ</Text>
            </View>
            <View className="flex-row justify-end items-center" style={{marginTop:7}}>
                  
                <TouchableOpacity disabled={count == 0 ? true : false} onPress={(value) => setCout(parseInt(count - 1))}>
                    <MinusCircleIcon size="20" color="rgb(179, 179, 179)"/>
                </TouchableOpacity>
                <Text className="font-semibold" style={{fontSize:17,color:"black", padding:3}}>{count}</Text>
                <TouchableOpacity onPress={(value) => setCout(parseInt(count + 1))}>
                   <PlusCircleIcon size="20" color="#0080ff"/>
                </TouchableOpacity>
            </View>
        </View>

    </View>
}

export default CardOrderDetail