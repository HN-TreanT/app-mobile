import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import {PlusIcon } from "react-native-heroicons/solid";
import { convertPrice } from "../utils/helpers/convertPrice";


const CardProduct = ({item, invoiceDetails, setInvoiceDetails}) => {

    


    const handlePress = () => {
        const new_detail = {
            name: item?.name || "",
            image: item?.image,
            id_product:item?.id,
            id_combo: null,
            isCombo:false,
            price:item?.price,
            amount:1
        }
        const existDetailIndex = invoiceDetails.findIndex(detail => detail?.id_product === new_detail?.id_product)
        if (existDetailIndex !== -1) {
            const updateDetails = [...invoiceDetails]
            updateDetails[existDetailIndex].amount += new_detail.amount
            updateDetails[existDetailIndex].price += new_detail.price

        } else {
            setInvoiceDetails([...invoiceDetails, new_detail])
        }

        // dispatch(actions.action.selectedOrder({
        //     ...selectedOrder,
        //     lst_invoice_detail: 
        // }))
    }
    
    return <View style={{
        backgroundColor:"white",
        borderRadius:10,
       
    }} className="w-full mt-2 mb-1 h-20 flex-row items-center">
        {
            item?.image ?  <Image className="h-20 w-20 ml-2" style={{borderRadius:10}} source={{uri: item?.image}}/> :
            <Image className="h-20 w-20 ml-2" style={{borderRadius:10}} source={require("../assets/assets_avatar.png")}/>
        }
        <View className="ml-3 flex-col ">
            <View><Text className="font-semibold" style={{fontSize:18}}>{item?.name || ""}</Text></View>
            <View className="flex-row w-56 items-center mt-4 justify-between">
                <View><Text className="font-semibold" style={{fontSize:17}}>{convertPrice(item?.price || 0)}</Text></View>
                <TouchableOpacity   onPress={() => handlePress()}>
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