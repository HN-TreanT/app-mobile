import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    Switch,
   ActivityIndicator,
   ScrollView
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  
  import { Bars3Icon } from "react-native-heroicons/solid";
  import { BellIcon } from "react-native-heroicons/outline";
  import { CreditCardIcon as CreditCardSolid } from "react-native-heroicons/solid";
  import { useState, useEffect } from "react";
  import CardOrder from "../components/CardOrder";
  import CardTable from "../components/CardTable";
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      title: i,
      id:i
    });
  }
  
  const TableScreen = () => {
  
 
  
    
    return (
      <View className="flex-1 mb-24 relative bg-white box-border">
        <SafeAreaView className="flex-1">
          <View
            style={{
              borderBottomColor: "rgb(199, 199, 199)",
              borderBottomWidth: 1,
            }}
            className="px-4 pb-4 mr-2 ml-2 pt-2 flex-row justify-between items-center"
          >
            <Bars3Icon size="27" color="black" />
  
            <View className="flex-row items-center space-x-2">
              <Image
                source={require("../assets/logo4.png")}
                className="h-9 w-40 rounded-full"
              />
            </View>
            <BellIcon size="27" color="rgb(179, 179, 179)" />
          </View>
          <View className="h-10 flex-row items-center mr-2 ml-2 justify-between">
            <Text className="font-semibold opacity-70">Tổng số đơn: 764</Text>
            <View className="flex-row items-center">
              <Text className="font-semibold opacity-70">Bàn trống: 12/48</Text>
            </View>
          </View>
  
          <View className=" flex flex-row mr-2 h-full">
            <View
              style={{ backgroundColor: "white" }}
              className="h-full w-1/4 flex-row justify-center "
            >
              {/* h-20 p-3 w-32 */}
              <View
                style={{ backgroundColor: "#e6f5ff", borderBottomLeftRadius: 10 }}
                className="ml-2 pt-3 flex-col h-16 w-24 items-center"
              >
                
                <Text  className="font-medium">
                  Khu vực 1
                </Text>
                <Text  className="font-medium">
                  Hà Nội
                </Text>
              </View>
            </View>
  
            {/* list order */}
            <View
              style={{ backgroundColor: "#e6f5ff" }}
              className="h-full w-3/4 flex-row justify-center pl-6"
            >    
                 <ScrollView  className="h-full w-full "> 
                    <View className="h-full w-full flex-row " style={{flexWrap: 'wrap'}}>
                        {
                            data.map((item) => {
                            return  <CardTable key={item.id} item={item.title}/>
                            })
                        }
                    </View>
                 </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  };
  
  export default TableScreen;
  