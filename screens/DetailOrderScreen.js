
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
  import {PlusCircleIcon} from "react-native-heroicons/solid"
  import {useNavigation} from "@react-navigation/native"
  import CardOrderDetail from "../components/CardOrderDetail";
  import {BottomSheet, Button, ListItem } from "@rneui/themed"
  import {SafeAreaProvider} from "react-native-safe-area-context"
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

  const list = [
    { title: 'List Item 1' },
    { title: 'List Item 2' },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: 'red' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];

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
             style={{height:600}}
            className=" w-full flex-row mt-4  justify-center "
          >    
                <View className="h-full w-11/12 ">
                    <FlatList
                        data={data}
                        renderItem={(item) => <CardOrderDetail item={item}/>}
                        keyExtractor={item => item.id.toString()}
                        onEndReached={fetchData}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                    />
                </View>
          </View>

          <View style={{          
              backgroundColor:"white",
                          
          }} className="h-32 flex-col justify-end" >
              <View style={{backgroundColor:"#eff8fe", borderColor:" #f3f5f7", borderWidth:0.5}} className="m-3 flex-row justify-end items-center">
                   <Text  style={{fontSize:15, paddingTop:4, paddingBottom:4,}} className="font-bold">Tổng: 100.000đ</Text>
              </View>
          
              <View className="flex-row h-14 justify-around">
                 <TouchableOpacity  style={{backgroundColor:  "#24A019" , borderRadius:10, marginRight:15}}  className="w-24 m-2  flex-row items-center justify-center">
                      <PlusCircleIcon size="20" color="white" />
                      <Text style={{color: "white"}} className="font-semibold p-2">Thêm</Text>
                      
                 </TouchableOpacity>
          
                <TouchableOpacity  style={{ borderColor:"rgb(179, 179, 179)",borderWidth:1, borderRadius:10, marginRight:15}}  className="w-1/3 m-2 flex-row items-center justify-center">
                      <Text style={{color: "rgb(179, 179, 179)"}} className="font-semibold p-2">Lưu</Text>
                  
                </TouchableOpacity>

               
                <TouchableOpacity  style={{backgroundColor:  "#0080ff" , borderRadius:10, marginRight:15}}  className="w-1/3 m-2 flex-row items-center justify-center">
                      <Text style={{color: "white"}} className="font-semibold p-2">Thanh toán</Text>
                   
                </TouchableOpacity>


              </View>
          </View>
        
        </SafeAreaView>
        <SafeAreaProvider>
      
            <BottomSheet  modalProps={{
            
            }} isVisible={true}>
                 {list.map((l, i) => (
                    <ListItem
                      key={i}
                      containerStyle={l.containerStyle}
                      onPress={l.onPress}
                    >
                      <ListItem.Content>
                        <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                  ))}
            </BottomSheet>
        
        </SafeAreaProvider>
        
      </View>
    )
}

export default DetailOrderScreen