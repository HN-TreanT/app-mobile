import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { PlusCircleIcon, MinusCircleIcon } from "react-native-heroicons/outline";
import { convertPrice } from "../utils/helpers/convertPrice";


const CardOrderDetail = ({item, data, setData}) => {
    const handleDecrease = (detail) => {
        const existingDetailIndex = Array.isArray(data)
        ? data.findIndex(item => item.id_product === detail.id_product)
        : -1;
        if (existingDetailIndex !== -1) {
            const updatedDetails = [...data];
            const priceOneProduct =  updatedDetails[existingDetailIndex].price / updatedDetails[existingDetailIndex].amount
            updatedDetails[existingDetailIndex].amount = detail.amount - 1;
            updatedDetails[existingDetailIndex].price  = updatedDetails[existingDetailIndex].amount * priceOneProduct;
          
            if (parseInt(updatedDetails[existingDetailIndex].amount) <= 0) {
              updatedDetails.splice(existingDetailIndex, 1)
            }
            setData(updatedDetails); 
        }
    }

    const handleIncrease  = (detail) => {
        const existingDetailIndex = Array.isArray(data)
        ? data.findIndex(item => item.id_product === detail.id_product)
        : -1;
        if (existingDetailIndex !== -1) {
            const updatedDetails = [...data]; // Create a copy of the array
            const priceOneProduct =  updatedDetails[existingDetailIndex].price / updatedDetails[existingDetailIndex].amount 
            updatedDetails[existingDetailIndex].amount = detail.amount + 1;
            updatedDetails[existingDetailIndex].price  = updatedDetails[existingDetailIndex].amount * priceOneProduct;
            setData(updatedDetails);
        }
    }

    const handleRemove = (detail) => {
        const existingDetailIndex = Array.isArray(data)
        ? data.findIndex(item => item.id_product === detail.id_product)
        : -1;
        if (existingDetailIndex !== -1) {
          const updatedDetails = [...data]; // Create a copy of the array
          updatedDetails.splice(existingDetailIndex, 1)
          setData(updatedDetails);
        }
       }
    return <View style={{
        backgroundColor:"white",
        borderRadius:10,
       
    }} className="w-full mt-2 mb-1 h-20 flex-row items-center">

       {/* {
            item?.image ?  <Image className="h-16 w-16 ml-2" style={{borderRadius:10}} source={{uri: item?.image}}/> :
            <Image className="h-20 w-20 ml-2" style={{borderRadius:10}} source={require("../assets/assets_avatar.png")}/>
        } */}
        <Image className="h-20 w-20 ml-2" style={{borderRadius:10}} source={{uri: item?.image}}/> 

        <View className="ml-3 flex-col ">
            <View><Text className="font-semibold" style={{fontSize:18}}>{item.name || " "}</Text></View>
            <View className="flex-row w-56 items-center mt-4 justify-between">
                <View><Text className="font-semibold" style={{fontSize:17}}>{convertPrice(item?.price || 0)}</Text></View>
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => handleDecrease(item) }>
                        <MinusCircleIcon size="20" color="#0080ff"/>
                    </TouchableOpacity>
                    <Text className="font-semibold" style={{fontSize:17,color:"black", padding:3}}>{item?.amount}</Text>
                    <TouchableOpacity onPress={() => handleIncrease(item)}>
                        <PlusCircleIcon size="20" color="#0080ff"/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        {/* <View className="m-3">
            <View className="flex-row items-center justify-between">
                <Text className="font-semibold" style={{fontSize:18}}>{item?.name || ""}</Text>
                <Text className="font-semibold" style={{fontSize:17}}>{convertPrice(item?.price || 0)}</Text>
            </View>
            <View className="flex-row justify-end items-center" style={{marginTop:7}}>
                  
                <TouchableOpacity disabled={count == 0 ? true : false} onPress={(value) => setCout(parseInt(count - 1))}>
                    <MinusCircleIcon size="20" color="rgb(179, 179, 179)"/>
                </TouchableOpacity>
                <Text className="font-semibold" style={{fontSize:17,color:"black", padding:3}}>{item?.amount || 0}</Text>
                <TouchableOpacity onPress={(value) => setCout(parseInt(count + 1))}>
                   <PlusCircleIcon size="20" color="#0080ff"/>
                </TouchableOpacity>
            </View>
        </View> */}

    </View>
}

export default CardOrderDetail