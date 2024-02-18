import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import { themeColors } from '../theme';
import {HomeIcon as HomeOutline, HeartIcon as HeartOutline, ShoppingBagIcon as BagOutline } from 'react-native-heroicons/outline';
import {HomeIcon as HomeSolid, HeartIcon as HeartSolid, ShoppingBagIcon as BagSolid} from 'react-native-heroicons/solid';
import { View } from 'react-native';
const Tab = createBottomTabNavigator()


const HomeTab = () => {
    return (
        <Tab.Navigator screenOptions={({route})=>({
            headerShown:false,
            tabBarShowLabel: false,
            tabBarIcon:({focused, color, size }) => menuIcons(route, focused),
            tabBarStyle:{
                marginBottom:20,
                borderRadius: 50,
                backgroundColor:themeColors.bgLight,
                marginHorizontal:20
            },
            tabBarIconStyle: {
                marginTop:30
            }
        })}>
            <Tab.Screen name='home' component={HomeScreen}></Tab.Screen>
            <Tab.Screen name='cart' component={CartScreen}></Tab.Screen>
            <Tab.Screen name='product' component={ProductScreen}></Tab.Screen>
          


        </Tab.Navigator>
    )
}

export default HomeTab

const menuIcons = (route, focused) => {
    let icon ;
    if (route.name === 'home') {
        icon =  focused? <HomeSolid size="30" color={themeColors.bgLight} /> : <HomeOutline size="30" strokeWidth={2} color="white" />
      } else if (route.name === "product") {
        icon =  focused? <HeartSolid size="30" color={themeColors.bgLight} /> : <HeartOutline size="30" strokeWidth={2} color="white" />
      } else {
     icon =  focused? <BagSolid size="30" color={themeColors.bgLight} /> : <BagOutline size="30" strokeWidth={2} color="white" />

      }
      let buttonClass = focused? "bg-white": "";
      return (
        <View className={"flex items-center rounded-full p-3 shadow " + buttonClass}>
          {icon}
        </View>
      )
}