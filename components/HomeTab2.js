import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import { themeColors } from '../theme';
import { CreditCardIcon as CreditCardOutLine, MapPinIcon as MapOutLineIcon, ClipboardDocumentListIcon as ClipboardDocumentListOutline } from 'react-native-heroicons/outline';
import { CreditCardIcon as CreditCardSolid, MapPinIcon as MapSolidIcon, ClipboardDocumentListIcon as ClipboardDocumentListIconSolid} from 'react-native-heroicons/solid';
import { View } from 'react-native';
import OrderScreen from '../screens/OrderScreen';
import TableScreen from '../screens/TableScreen';
const Tab = createBottomTabNavigator()


const HomeTab2 = () => {
    return (
        <Tab.Navigator screenOptions={({route})=>({
            headerShown:false,
            tabBarShowLabel: false,
            tabBarIcon:({focused, color, size }) => menuIcons(route, focused),
            tabBarStyle:{

            },
        })}>
            <Tab.Screen name='home' component={OrderScreen}></Tab.Screen>
            {/* <Tab.Screen name='Table' component={(props) => <TableScreen {...props} name="oke"/>}></Tab.Screen> */}
            <Tab.Screen name='table' component={TableScreen}></Tab.Screen>

            <Tab.Screen name='product' component={ProductScreen}></Tab.Screen>    
        </Tab.Navigator>
    )
}

export default HomeTab2

const menuIcons = (route, focused) => {
    let icon ;
    if (route.name === 'home') {
        icon =  focused? <ClipboardDocumentListIconSolid size="27" color="#0080ff" /> : <ClipboardDocumentListOutline size="27" strokeWidth={2} color="rgb(179, 179, 179)" />
      } else if (route.name === "product") {
        icon =  focused? <CreditCardSolid size="27" color="#0080ff" /> : <CreditCardOutLine size="27" strokeWidth={2} color="rgb(179, 179, 179)" />
      } else {
     icon =  focused? <MapSolidIcon size="27" color="#0080ff" /> : <MapOutLineIcon size="27" strokeWidth={2} color="rgb(179, 179, 179)" />

      }
      let buttonClass = focused? "bg-white": "";
      return (
        <View className={"flex items-center rounded-full p-2 shadow " + buttonClass}>
          {icon}
        </View>
      )
}