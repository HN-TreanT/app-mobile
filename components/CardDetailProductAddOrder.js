import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { PlusCircleIcon, MinusCircleIcon } from "react-native-heroicons/outline";
import { convertPrice } from "../utils/helpers/convertPrice";


const CardDetailProductAddOrder = ({data, invoiceDetails, setInvoiceDetails}) => {
    
    const [count, setCount] = useState(1)

    const handleDecrease = (detail) => {
        const existingDetailIndex = Array.isArray(invoiceDetails)
        ? invoiceDetails.findIndex(item => item.id_product === detail.id_product)
        : -1;
        if (existingDetailIndex !== -1) {
            const updatedDetails = [...invoiceDetails];
            const priceOneProduct =  updatedDetails[existingDetailIndex].price / updatedDetails[existingDetailIndex].amount
            updatedDetails[existingDetailIndex].amount = detail.amount - 1;
            updatedDetails[existingDetailIndex].price  = updatedDetails[existingDetailIndex].amount * priceOneProduct;
          
            if (parseInt(updatedDetails[existingDetailIndex].amount) <= 0) {
              updatedDetails.splice(existingDetailIndex, 1)
            }
            setInvoiceDetails(updatedDetails); 
        }
    }

    const handleIncrease  = (detail) => {
        const existingDetailIndex = Array.isArray(invoiceDetails)
        ? invoiceDetails.findIndex(item => item.id_product === detail.id_product)
        : -1;
        if (existingDetailIndex !== -1) {
            const updatedDetails = [...invoiceDetails]; // Create a copy of the array
            const priceOneProduct =  updatedDetails[existingDetailIndex].price / updatedDetails[existingDetailIndex].amount 
            updatedDetails[existingDetailIndex].amount = detail.amount + 1;
            updatedDetails[existingDetailIndex].price  = updatedDetails[existingDetailIndex].amount * priceOneProduct;
            setInvoiceDetails(updatedDetails);
        }
    }

    const handleRemove = (detail) => {
        const existingDetailIndex = Array.isArray(invoiceDetails)
        ? invoiceDetails.findIndex(item => item.id_product === detail.id_product)
        : -1;
        if (existingDetailIndex !== -1) {
          const updatedDetails = [...invoiceDetails]; // Create a copy of the array
          updatedDetails.splice(existingDetailIndex, 1)
          setInvoiceDetails(updatedDetails);
        }
       }
    return <View style={{
        backgroundColor:"white",
        borderRadius:10,
       
    }} className="w-full mt-2 mb-1 h-20 flex-row items-center">
        {
            data?.image ?  <Image className="h-20 w-20 ml-2" style={{borderRadius:10}} source={{uri: data?.image}}/> :
            <Image className="h-20 w-20 ml-2" style={{borderRadius:10}} source={require("../assets/assets_avatar.png")}/>
        }

        <View className="ml-3 flex-col ">
            <View><Text className="font-semibold" style={{fontSize:18}}>{data.name || " "}</Text></View>
            <View className="flex-row w-56 items-center mt-4 justify-between">
                <View><Text className="font-semibold" style={{fontSize:17}}>{convertPrice(data?.price || 0)}</Text></View>
                <View className="flex-row items-center">
                    <TouchableOpacity delayLongPress={0}  disabled={count == 0 ? true : false} onPress={(value) => handleDecrease(data)}>
                        <MinusCircleIcon size="20" color="#0080ff"/>
                    </TouchableOpacity>
                    <Text className="font-semibold" style={{fontSize:17,color:"black", padding:3}}>{data?.amount}</Text>
                    <TouchableOpacity delayPressIn={0}  onPress={(value) => handleIncrease(data)}>
                        <PlusCircleIcon size="20" color="#0080ff"/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    </View>
}

export default CardDetailProductAddOrder;