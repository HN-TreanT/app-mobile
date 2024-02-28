import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { PlusCircleIcon, MinusCircleIcon } from "react-native-heroicons/outline";


const CardDetailProductAddOrder = ({data}) => {
    const [count, setCount] = useState(1)
    return <View style={{
        backgroundColor:"white",
        borderRadius:10,
       
    }} className="w-full mt-2 mb-1 h-20 flex-row items-center">
        <Image className="h-16 w-16 ml-2" style={{borderRadius:10}} source={require("../assets/avatar.png")}/>
        <View className="ml-3 flex-col ">
            <View><Text className="font-semibold" style={{fontSize:18}}>Cafe capuchino</Text></View>
            <View className="flex-row w-64 items-center mt-4 justify-between">
                <View><Text className="font-semibold" style={{fontSize:17}}>45.000 đ</Text></View>
                <View className="flex-row items-center">
                    <TouchableOpacity disabled={count == 0 ? true : false} onPress={(value) => setCount(parseInt(count - 1))}>
                        <MinusCircleIcon size="20" color="#0080ff"/>
                    </TouchableOpacity>
                    <Text className="font-semibold" style={{fontSize:17,color:"black", padding:3}}>{count}</Text>
                    <TouchableOpacity onPress={(value) => setCount(parseInt(count + 1))}>
                        <PlusCircleIcon size="20" color="#0080ff"/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    </View>
}

export default CardDetailProductAddOrder;