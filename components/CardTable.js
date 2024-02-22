import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {useNavigation} from "@react-navigation/native"

const CardTable = ({item}) => {
    const navigation = useNavigation()
    let active = false

    if(item == 1 || item == 3 || item == 10 || item ==8) {
        active= true
    }

    return (
       <TouchableOpacity
         onPress={() => navigation.navigate("Product", item)}
       >
           <View     
                style={{
                    backgroundColor:active ? "#0080ff":"white",
                    borderRadius:10,
                
                
                }} className="w-20 mr-2 mt-2 mb-1 h-20 flex-col justify-center items-center"
            >
        
            <Text className="font-bold" style={{fontSize:20, padding:2, paddingRight:6, color: active ? "white" : "black",
                paddingLeft:6, borderBottomColor:"rgb(179, 179, 179)", borderBottomWidth:1}}>{item}</Text>
                <Text style={{color:active ? "white" : "rgb(170, 170, 170)"}}>Bàn trống</Text>
            </View>
       </TouchableOpacity>
    )
}

export default CardTable