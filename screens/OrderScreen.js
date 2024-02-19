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

import { Bars3Icon } from "react-native-heroicons/solid";
import { BellIcon } from "react-native-heroicons/outline";
import { CreditCardIcon as CreditCardSolid } from "react-native-heroicons/solid";
import { useState, useEffect } from "react";
import CardOrder from "../components/CardOrder";

const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    index: i
  });
}

const OrderScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
                        renderItem={(item) => <CardOrder item={item}/>}
                        keyExtractor={item => item.id.toString()}
                        onEndReached={fetchData}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                    />
                </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OrderScreen;
