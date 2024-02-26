
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
  import { BellIcon, ArrowLeftIcon, MagnifyingGlassIcon, ChevronRightIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
  import {useNavigation} from "@react-navigation/native"
  import CardProduct from "../components/CardProduct";

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
      {
        id: 6,
        title: "Cafe sữa đã",
      },
      {
        id: 7,
        title: "Cafe đá xay",
      },
      {
        id: 8,
        title: "Cafe chồn",
      },
]

const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    index: i
  });
}


const ProductScreen = (props) => {
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
              <Text className="font-semibold" style={{fontSize:20}}>Sản phẩm</Text>
            </View>
            <BellIcon size="27" color="rgb(179, 179, 179)" />
          </View>
           {/* search bar */}
           <View className="mx-5 mt-6">
                        <View className="flex-row justify-center items-center rounded-full p-1 bg-[#e6e6e6]">
                            <TextInput placeholder="Tìm kiếm" className="p-2 flex-1 font-semibold text-gray-700"/>
                            <TouchableOpacity className="rounded-full p-2" style={{backgroundColor:"rgb(179, 179, 179)"}}>
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
                                <TouchableOpacity onPress={() => setActiveCategory(item.id)} style={{backgroundColor: isActive ? "#0080ff" : 'white', borderRadius:10}}  className="p-2 x-5  mr-2 shadow">
                                    <Text style={{color: isActive ? "white" : "black"}} className={isActive ? "font-semibold": "font-normal"}>{item.title}</Text>
                                   

                                </TouchableOpacity>
                            )
                        }}
                />
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

export default ProductScreen