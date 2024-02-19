import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import {BellAlertIcon, EllipsisVerticalIcon, EllipsisHorizontalIcon, ClockIcon, CurrencyDollarIcon} from "react-native-heroicons/solid"
import Tag from "./Tag";
import TagStatus from "../constants/TagStatus";


const CardOrder = ({item}) => {
  const [hiddenDropdown, setHiddenDropdown] = useState(true)
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
                    <EllipsisHorizontalIcon size={22} color={"#0080ff"}/>  
                     {/* <View style={{position:"absolute", right:0, top:15, backgroundColor:"white"}} className="h-16 w-24">
                         <FlatList
                            data={[
                              {
                                id: 1,
                                title: "Thanh toán",
                              },
                              {
                                id: 2,
                                title: "Hoàn thành",
                              },
                            ]}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => 
                            // <TouchableOpacity >
                                <Text className={"font-normal pt-2 pb-1 pr-2 pl-2"} style={{}}>{item.title}</Text>
                            // </TouchableOpacity>
                          }
          
                        />

                     </View>          */}
                </View>
           </View>

           <View className="flex-row h-16 " style={{borderBottomColor:"rgb(179, 179, 179)", borderBottomWidth:0.5}}>
               <View className="w-2/5 flex-row justify-center items-center" style={{borderRightColor:"rgb(179, 179, 179)", borderRightWidth:0.5}}>
                  <Text className="font-semibold">10</Text>
                </View>
               <View className="w-3/5 flex-col">
                  <View className="w-full h-1/2 flex-row items-center" style={{borderBottomColor:"rgb(179, 179, 179)", borderBottomWidth:0.5}}>
                    <View className="p-2"><ClockIcon  size={17} color={"rgb(179, 179, 179)"}/></View>
                    <Text className="font-semibold opacity-50"  style={{fontSize:12}}>7 giờ</Text>
                  </View>
                  <View className="w-full h-1/2 flex-row items-center" >
                    <View className="p-2"><CurrencyDollarIcon  size={17} color={"rgb(179, 179, 179)"}/></View>
                    <Text className="font-semibold opacity-50"  style={{fontSize:12}}>20.000 đ</Text>
                  </View>
               </View>
           </View>
           <View className="flex-row items-center justify-center h-10">
              <Tag text="Hoàn thành" type={TagStatus.green}/>
           </View>
        </View>
    )
}

export default CardOrder