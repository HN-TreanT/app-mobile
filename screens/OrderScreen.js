import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Switch,
 ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useActions from "../redux/useActions";
import {useDispatch, useSelector} from "react-redux"
import authServices from "../utils/services/authServices";
import { Bars3Icon } from "react-native-heroicons/solid";
import { BellIcon } from "react-native-heroicons/outline";
import { CreditCardIcon as CreditCardSolid, PlusIcon } from "react-native-heroicons/solid";
import React , { useState, useEffect, useCallback } from "react";
import CardOrder from "../components/CardOrder";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native"
import { orderService } from "../utils/services/invoiceServices";
import {useFocusEffect} from "@react-navigation/native"
import { useContext } from "react";
import { AppContext } from "../context/appContext";
import notifyMessage from "../components/notifyMessage";
const OrderScreen = () => {
 
  const navigation = useNavigation()
  const {socket} = useContext(AppContext)
  
  socket.off("announce_success").on("announce_success", function (data) {
    if(data?.message === "success") {
       notifyMessage(`Yêu cầu mã #${data?.id_invoice} hoàn thành`)
    } else {
       
    }
 })
  // test
  const user_info = useSelector((state) => state.auth.user_info)
  const dispatch = useDispatch()
  const actions = useActions()

  ///
  const [isEnabled, setIsEnabled] = useState(false);
 

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(2)

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState)
    setPage(1)
    setData([])
  };

  useEffect(() => { 
      fetchData()
    // }
  }, [isEnabled]);

  
  useFocusEffect(
    useCallback(() => {
      // Call your API here
      fetchDataWithFocus()
      // Cleanup function if needed
      return () => console.log('HomeScreen is unfocused');
    }, [])
  )

  const fetchDataWithFocus = async () => {
    // console.log("recall")
    let thanh_toan = "chua"
    if(isEnabled) {
      thanh_toan = "thanhtoan"
    } else {
     thanh_toan = "chua"
    }
    orderService.listAll({
        page: 1,
        // size: thanh_toan && "hhop",
        size: 10,
        thanh_toan: thanh_toan,
        createdAt: "DESC",
        status:[0,1]
    }).then((res) => {
      //  setLoading(false)
      if (Array.isArray(res?.data?.data)) {
        const temp = res?.data?.data.map((item, index) => {
          return {
            key: item?.id,
            ...item

          }
        })
        setTotal(res?.data?.TotalPage)
        setData(temp)
       if (res?.data?.data.length > 0) {
        setPage(page + 1)
       }
        setLoading(false)
      }
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
      // setLoading(false)
    })
  };


  const fetchData = async () => {
    if (data.length < total) {
      setLoading(true)
    let thanh_toan = "chua"
    if(isEnabled) {
      thanh_toan = "thanhtoan"
    } else {
     thanh_toan = "chua"
    }
    orderService.listAll({
        page: page,
        size: 10,
        thanh_toan: thanh_toan,
        createdAt: "DESC",
        status:[0,1]
    }).then((res) => {
      //  setLoading(false)
      if (Array.isArray(res?.data?.data)) {
        const temp = res?.data?.data.map((item, index) => {
          return {
            key: item?.id,
            ...item

          }
        })
        setTotal(res?.data?.TotalPage)
        setData([...data,...temp])
       if (res?.data?.data.length > 0) {
        setPage(page + 1)
       }
        setLoading(false)
      }
    }).catch(err => {
      console.log(err)
      setLoading(false)
      // setLoading(false)
    })
    }
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };
  return (
    <View className="flex-1 mb-16 relative bg-white box-border">
      <SafeAreaView className="flex-1">
        <View
          style={{
            borderBottomColor: "rgb(199, 199, 199)",
            borderBottomWidth: 1,
          }}
          className="px-4 pb-4 mr-2 ml-2 pt-2 flex-row justify-between items-center"
        >
          <Bars3Icon onPress={() => {
              navigation.navigate("Login")
          }} size="27" color="black" />

          <View className="flex-row items-center space-x-2">
            <Image
              source={require("../assets/logo4.png")}
              className="h-9 w-40 rounded-full"
            />
          </View>
          <TouchableOpacity onPress={async () => notifyMessage("Nguyễn Hoàng Nam")}>
              <BellIcon size="27" color="rgb(179, 179, 179)" />
          </TouchableOpacity>
        </View>
        <View className="h-10 flex-row items-center mr-2 ml-2 justify-between">
          <Text className="font-semibold opacity-70">Tổng số đơn: {total}</Text>
          <View className="flex-row items-center">
            <Text className="font-semibold opacity-70">Thanh toán</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#0080ff" }}
              thumbColor={isEnabled ? "white" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
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
              className="ml-2 pt-3 flex-col h-20 w-24 items-center"
            >
              <CreditCardSolid size="37" color="#0080ff" />
              <Text style={{ color: "#0080ff" }} className="font-semibold">
                Đơn hàng
              </Text>
            </View>
          </View>

          {/* list order */}
          <View
            style={{ backgroundColor: "#e6f5ff" }}
            className="h-full w-3/4 flex-row  justify-center"
          >    
                <View className="h-full w-11/12 ">
                    <FlatList
                        data={data}
                        renderItem={({item}) => <CardOrder item={item}/>}
                        keyExtractor={item => item.id.toString()}
                        onEndReached={fetchData}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                    />
                </View>
          </View>
        
        </View>
      </SafeAreaView>
      <TouchableOpacity onPress={(value) => {
        navigation.navigate("table")
        
      }}>
        <View style={{
              position: "fixed",
              backgroundColor:"#0080ff",
              // top: 50,
              bottom: -40,
              right: 0,
              left: 315,
              width: 30,
              height: 30
            }}>
                <PlusIcon size="30" className="font-bold" style={{
                  color:"white"
                }}/>
            </View>
      </TouchableOpacity>
    </View>
  );
};

export default OrderScreen;
