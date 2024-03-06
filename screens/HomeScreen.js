import { View, Text, Image, TextInput, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux"
import useActions from "../redux/useActions";
// import {Status} from "expo-status-bar"
import {StatusBar} from "expo-status-bar"
import { themeColors } from "../theme";
import {MapPinIcon} from "react-native-heroicons/solid"
import {BellIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline"
import { useState } from "react";
import Carousel  from "react-native-snap-carousel"
import CoffeCard from "../components/CoffeCard";
import { coffeeItems } from "../constants/fakeData";

const categoreis = [
    {
        id: 1,
        title: "Cappuccino",
      },
      {
        id: 2,
        title: "Latte",
      },
      {
        id: 3,
        title: "Espresso",
      },
      {
        id: 4,
        title: "Mocha",
      },
      {
        id: 5,
        title: "Americano",
      },
]

const HomeScreen = () => {
  const user_info = useSelector((state) => state.auth.user_info)
  console.log("check user_info", user_info)
  const dispatch = useDispatch()
  const actions = useActions()
  
    const [activeCategory, setActiveCategory] = useState(1)
    return (
        <View className="flex-1 relative bg-white box-border">
            
             <Image source={require("../assets/beansBackground1.png")}
             className="w-full absolute -top-5 opacity-10" style = {{height: 220}}/>
            {/* <Text>Hoang Nam</Text> */}
            <SafeAreaView className="flex-1">
                <View className="px-4 pt-2 flex-row justify-between items-center">
                    <Image source={require("../assets/avatar.png")} className="h-9 w-9 rounded-full"/>
                   
                    <View className="flex-row items-center space-x-2">
                        <MapPinIcon size="25" color={themeColors.bgLight} />
                        <Text className="text-base font-semibold">Hoàng Quốc Việt, Hà Nội</Text>
                       
                    </View>
                    <TouchableOpacity onPress={() => {
                        console.log("click")
                        dispatch(actions.AuthActions.userInfo({name:"Hoang Nam", age: 20}))
                      }}>
                      <BellIcon  size="27" color="black"/>
                    </TouchableOpacity>

              
                
                </View>
                      {/* search bar */}
                      <View className="mx-5 mt-14">
                        <View className="flex-row justify-center items-center rounded-full p-1 bg-[#e6e6e6]">
                            <TextInput placeholder="Tìm kiếm" className="p-2 flex-1 font-semibold text-gray-700"/>
                            <TouchableOpacity className="rounded-full p-2" style={{backgroundColor:themeColors.bgLight}}>
                                <MagnifyingGlassIcon size="25" strokeWidth={2} color="white"/>
                            </TouchableOpacity>
                        </View>
                </View>

                <View className="px-5 mt-6">
                    <FlatList
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     data={categoreis}
                     keyExtractor={item => item.id}
                     className="overflow-visible"
                     renderItem={({item}) => {
                        const isActive =item.id == activeCategory
                        return (
                            <TouchableOpacity onPress={() => setActiveCategory(item.id)} style={{backgroundColor: isActive ? themeColors.bgLight : 'rgba(0,0,0,0.07)'}} className="p-3 x-5 rounded-full mr-2 shadow">
                                <Text className={"font-semibold" + isActive ? "text-white" : "text-gray-700"}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                     }}
                     />
                </View>

                {/* coffe card */}
                <View className="mt-10 py-2">      
                    <Carousel 
                      layout={'default'} 
                      containerCustomStyle={{overflow:"visible"}}
                      sliderWidth={400}
                      itemWidth={260}
                      loop={true}
                      data={coffeeItems}
                      renderItem={({item}) => <CoffeCard item={item}/>}
                      
                    />
                </View>
            </SafeAreaView>
        </View>
    )
}

export default HomeScreen


