
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
   ActivityIndicator,
   
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useState, useEffect } from "react";
  import { MapPinIcon, ArrowLeftIcon, EllipsisVerticalIcon, ChevronRightIcon } from "react-native-heroicons/outline";
  import {useNavigation} from "@react-navigation/native"
  import CardProduct from "../components/CardProduct";


const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    index: i
  });
}


const DetailOrderScreen = (props) => {
    const navigation = useNavigation()
    const id_table = props.route.params
    const [activeCategory, setActiveCategory] = useState(1)

    const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    // Thực hiện gọi API để lấy dữ liệu mới
    // Ví dụ: fetch(`your_api_endpoint?page=${page}`)
    // Sau đó cập nhật dữ liệu và tăng số trang
    // setData(newData);
    // setPage(page + 1);
    // setLoading(false);
    // Trong ví dụ này, tôi sẽ sử dụng setTimeout để giả lập việc gọi API
    setTimeout(() => {
      const newData = Array.from({ length: 10 }, (_, index) => ({ id: index + data.length, name: `Item ${index + data.length}` }));
      setData([...data, ...newData]);
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };

    return (
        <View style={{backgroundColor:"#F1F1F1"}} className="flex-1  relative box-border">
        <SafeAreaView className="flex-1">
          <View
            style={{
              borderBottomColor: "rgb(199, 199, 199)",
              borderBottomWidth: 1,
            }}
            className="px-4 pb-4 mr-2 ml-2 pt-2 flex-row justify-between items-center"
          >
            <TouchableOpacity className=" rounded-full" onPress={() => navigation.goBack()}>
              <ArrowLeftIcon size="27" color="rgb(179, 179, 179)" />
            </TouchableOpacity>
  
            <View className="flex-row items-center space-x-2">
              {/* <Image
                source={require("../assets/logo4.png")}
                className="h-9 w-40 rounded-full"
              /> */}
              <Text className="font-semibold" style={{fontSize:20}}>Chi tiết đơn</Text>
            </View>
            <EllipsisVerticalIcon size="27" color="rgb(179, 179, 179)" />
          </View>

          <View style={{height: 40, 
               borderBottomColor: "rgb(199, 199, 199)",
              borderBottomWidth: 1,}} className="mr-2 ml-2 flex-row">
                <View className="w-1/2 flex-row items-center"
                   style={{
                    borderRightColor: "rgb(199, 199, 199)",
                    borderRightWidth: 1,
                    
                   }}
                >
                     <MapPinIcon size="23" color="#0080ff" style={{marginLeft:8}} />
                     <Text className=" ml-2" style={{color:"#0080ff"}}>Ăn tại bàn</Text>
                </View>
                <View className="w-1/2 flex-row items-center"><Text className="ml-4">Bàn số 12</Text></View>

           </View>

           {/* list order */}
          <View
             style={{height:580}}
            className=" w-full flex-row mt-4  justify-center "
          >    
                <View className="h-full w-11/12 ">
                    <FlatList
                        data={data}
                        renderItem={(item) => <CardProduct item={item}/>}
                        keyExtractor={item => item.id.toString()}
                        onEndReached={fetchData}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                    />
                </View>
          </View>

          <View style={{
            
              backgroundColor:"white",
              
              
          }} className="h-14 flex-row items-center justify-between" >
              <Text style={{marginLeft:14}}  className="font-semibold ">Bàn số {id_table}</Text>
              <Text className="font-semibold">Số lượng món ăn: 20</Text>
              <TouchableOpacity onPress={() => navigation.navigate("DetailOrder")} style={{backgroundColor:  "#0080ff" , borderRadius:10, marginRight:15}}  className="p-2 flex-row items-center">
                    <Text style={{color: "white"}} className="font-semibold">Tiếp theo</Text>
                    <ChevronRightIcon size="20" color="white" />
               </TouchableOpacity>
          </View>
        
        </SafeAreaView>
        
      </View>
    )
}

export default DetailOrderScreen