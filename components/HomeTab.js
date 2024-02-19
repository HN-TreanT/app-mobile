import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import { themeColors } from '../theme';
import {HomeIcon as HomeOutline, HeartIcon as HeartOutline, ShoppingBagIcon as BagOutline } from 'react-native-heroicons/outline';
import {HomeIcon as HomeSolid, HeartIcon as HeartSolid, ShoppingBagIcon as BagSolid} from 'react-native-heroicons/solid';
import { View } from 'react-native';
import HomeScreen2 from '../screens/OrderScreen';
const Tab = createBottomTabNavigator()


const HomeTab = () => {
    return (
        <Tab.Navigator screenOptions={({route})=>({
            headerShown:false,
            tabBarShowLabel: false,
            tabBarIcon:({focused, color, size }) => menuIcons(route, focused),
            tabBarStyle:{
                marginBottom:30,
                borderRadius: 50,
                backgroundColor:themeColors.bgLight,
                marginHorizontal:30,
                height:60
            },
        })}>
            {/* <Tab.Screen name='home' component={HomeScreen}></Tab.Screen> */}
            <Tab.Screen name='home' component={HomeScreen2}></Tab.Screen>

            <Tab.Screen name='cart' component={CartScreen}></Tab.Screen>
            <Tab.Screen name='product' component={ProductScreen}></Tab.Screen>    
        </Tab.Navigator>
    )
}

export default HomeTab

const menuIcons = (route, focused) => {
    let icon ;
    if (route.name === 'home') {
        icon =  focused? <HomeSolid size="27" color={themeColors.bgLight} /> : <HomeOutline size="27" strokeWidth={2} color="white" />
      } else if (route.name === "product") {
        icon =  focused? <HeartSolid size="27" color={themeColors.bgLight} /> : <HeartOutline size="27" strokeWidth={2} color="white" />
      } else {
     icon =  focused? <BagSolid size="27" color={themeColors.bgLight} /> : <BagOutline size="27" strokeWidth={2} color="white" />

      }
      let buttonClass = focused? "bg-white": "";
      return (
        <View className={"flex items-center rounded-full p-2 shadow " + buttonClass}>
          {icon}
        </View>
      )
}