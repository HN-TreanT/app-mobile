import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from "react-native";
import {BottomSheet } from "@rneui/themed"
import { ChevronDownIcon, ChevronRightIcon } from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native"
import CardDetailProductAddOrder from "./CardDetailProductAddOrder";
import { convertPrice } from "../utils/helpers/convertPrice";
import {useDispatch, useSelector} from "react-redux"
import actions from "../redux/order/actions";
const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    id: i,
    key: i
  });
}


const BottomSheetProduct = ({visible, setIsVisible, invoiceDetails, setInvoiceDetails}) => {
    const navigation = useNavigation()
    // const [data, setData] = useState([]);
    const dispatch = useDispatch()
    const selectedOrder = useSelector((state) => state.order.selectedOrder )


    const handleNextPage = () => {
    
        const newSelectedOrder = {
          ...selectedOrder,
          lst_invoice_detail: invoiceDetails
        }
        dispatch(actions.action.selectedOrder(newSelectedOrder))
        setIsVisible(false)
        navigation.navigate("DetailOrder")
      }
    


    return (
        <View>
            <BottomSheet modalProps={{animationType:"slide", transparent:true,  style:{borderTopLeftRadius:10, borderTopRightRadius:10} }}   
            containerStyle={{  zIndex:80}}
            //  backdropStyle={styles.containerStyle} 
             onBackdropPress={() => setIsVisible(false)}  isVisible={visible}>
                 
                <View  className="h-100 flex-col" style={{backgroundColor:"white"}} >
                   <TouchableOpacity  className="w-full flex-row items-center justify-center pt-1 pb-1" style={{borderBottomColor:"#e6e6e6", borderBottomWidth:1}} onPress={() => setIsVisible(false)}>
                      <ChevronDownIcon size="25" color="black"  />
                   </TouchableOpacity>
                   <View className="p-2"><Text style={{fontSize:15}} className="font-semibold">Mặt hàng đã thêm</Text></View>
                    {/* list */}
                    <View className="h-72 w-full flex-row mt-2  justify-center" >
                        <ScrollView style={styles.scrollView}>
                            {
                                invoiceDetails.map((item, index) => {
                                    return <CardDetailProductAddOrder key={index} data={item} invoiceDetails={invoiceDetails} setInvoiceDetails={setInvoiceDetails}/>
                                })
                            }
                        </ScrollView>
                        {/* <View className="h-full w-11/12 ">
                            <FlatList
                                data={data}
                                renderItem={(item) => <CardDetailProductAddOrder data={item}/>}
                                keyExtractor={item => item.id.toString()}
                                // onEndReached={fetchData}
                                // onEndReachedThreshold={0.5}
                                // ListFooterComponent={renderFooter}
                            />
                        </View> */}
                           
                    </View>
                    <View className="p-2" style={{borderTopColor:"#e6e6e6", borderTopWidth:1}}>
                       <Text style={{fontSize:15, marginBottom:2}} className="font-semibold">Tạm tính: {convertPrice(invoiceDetails.reduce((sum, acc) => sum + acc?.price , 0))}</Text>
                    </View>
                    <View style={{borderTopColor:"#e6e6e6", borderTopWidth: 1}}  className=" mr-2 ml-2 h-14 w-full flex-row items-center justify-between" >
                        
                        <View >
                            <Text style={{fontSize: 15}}  className="font-medium ">Thành tiền: {convertPrice(invoiceDetails.reduce((sum, acc) => sum + acc?.price , 0))}</Text>
                            <Text style={{color:"rgb(179, 179, 179)"}}  className="font-semibold ">Đặt hàng: {invoiceDetails.length}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleNextPage()} style={{backgroundColor:  "#0080ff" , borderRadius:10, marginRight:15}}  className="p-2 flex-row items-center">
                                <Text style={{color: "white"}} className="font-semibold">Tiếp theo</Text>
                                <ChevronRightIcon size="20" color="white" />
                        </TouchableOpacity>
                    </View>

                </View>

                
             
                    
            </BottomSheet>

        </View>
    )
   
}

export default BottomSheetProduct

const styles = StyleSheet.create({
    bottomSheetContent: {
      backgroundColor: 'white',
      padding: 20,
      position: 'absolute',
      left: 0,
      right: 0,
      height: 200, // Height of the BottomSheet
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    scrollView: {
        backgroundColor: '#F1F1F1',
        marginHorizontal: 10,
      },
  });
  