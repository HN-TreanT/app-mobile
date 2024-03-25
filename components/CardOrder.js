import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import {BellAlertIcon, EllipsisVerticalIcon, EllipsisHorizontalIcon, ClockIcon, CurrencyDollarIcon} from "react-native-heroicons/solid"
import Tag from "./Tag";
import TagStatus from "../constants/TagStatus";
import {useNavigation} from "@react-navigation/native"
import { convertPrice } from "../utils/helpers/convertPrice";

const CardOrder = ({item}) => {

  const navigation = useNavigation()
  const [hiddenDropdown, setHiddenDropdown] = useState(true)
  const createdAt = new Date(item.createdAt);
  const now = new Date();
  let time = now.getTime() - createdAt.getTime();
  let timeOrders;

  if (time < 60000) {
    timeOrders = 0;
  }
  if (time >= 60000 && time < 3600000) {
    time = time / 60000;
    timeOrders = `${Math.floor(time)} phút`;
  }
  if (time >= 3600000 && time < 86400000) {
    time = time / 3600000;
    timeOrders = `${Math.floor(time)} giờ`;
  }
  if (time >= 86400000) {
    time = time / 86400000;
    timeOrders = `${Math.floor(time)} ngày`;
  }
    return(
        <View style={{
            backgroundColor:"white",
            borderRadius:10,
            borderTopColor:"#0080ff",
            borderTopWidth:4,
           
        }} className="w-full mt-2 mb-1 h-36">
           <View className="flex-row h-10 justify-between items-center" style={{borderBottomColor:"rgb(179, 179, 179)", borderBottomWidth:0.5}}>
                <View  className="h-8 w-8 flex items-center justify-center ml-3 -mt-2" style={{backgroundColor:"#0080ff", 
                
                }}>
                    <BellAlertIcon size={20} color={"white"}/>
                </View>
                <View><Text className="font-semibold">MTA Coffee</Text></View>
                <View style={{position:"relative"}} className="mr-2">
                    <TouchableOpacity onPress={() => navigation.navigate("DetailOrder")}>
                        <EllipsisHorizontalIcon size={24} color={"#0080ff"}/> 
                    </TouchableOpacity>    
                </View>
           </View>

           <View className="flex-row h-16 " style={{borderBottomColor:"rgb(179, 179, 179)", borderBottomWidth:0.5}}>
               <View className="w-2/5 flex-row justify-center items-center" style={{borderRightColor:"rgb(179, 179, 179)", borderRightWidth:0.5}}>
                  <Text className="font-semibold">
                  {Array.isArray(item?.tablefood_invoices)
                    ? item.tablefood_invoices
                        .map((item2) => item2?.id_table)
                        .join(",")
                    : ""}
                  </Text>
                </View>
               <View className="w-3/5 flex-col">
                  <View className="w-full h-1/2 flex-row items-center" style={{borderBottomColor:"rgb(179, 179, 179)", borderBottomWidth:0.5}}>
                    <View className="p-2"><ClockIcon  size={17} color={"rgb(179, 179, 179)"}/></View>
                    <Text className="font-semibold opacity-50"  style={{fontSize:12}}>{timeOrders}</Text>
                  </View>
                  <View className="w-full h-1/2 flex-row items-center" >
                    <View className="p-2"><CurrencyDollarIcon  size={17} color={"rgb(179, 179, 179)"}/></View>
                    <Text className="font-semibold opacity-50"  style={{fontSize:12}}>
                     {item?.price < 1000000
                      ? `${item?.price ? convertPrice(item.price) : 0} `
                      : ` ${
                          item?.price
                            ? Math.round(item?.price / 10000) / 100
                            : 0
                        } tr(VNĐ)`}
                    </Text>
                  </View>
               </View>
           </View>
           <View className="flex-row items-center justify-center h-10">
             
              {
                item?.status === 1 ?  <Tag text="Đang dùng bữa" type={TagStatus.green}/> : item?.status === 2 ?  <Tag text="Đã hủy" type={TagStatus.red}/> : 
                <Tag text="Đang thực hiện" type={TagStatus.orange}/>
              }
           </View>
        </View>
    )
}

export default CardOrder