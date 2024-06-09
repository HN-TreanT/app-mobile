
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
   ActivityIndicator,
   TouchableWithoutFeedback,
   StyleSheet,
   ScrollView
   
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useState, useEffect } from "react";
  import { MapPinIcon, ArrowLeftIcon, 
    EllipsisVerticalIcon, 
    XMarkIcon,
    ClipboardDocumentCheckIcon, // gop don
    DocumentDuplicateIcon,// tach don
    DocumentMinusIcon,//huy don
    ArrowLeftEndOnRectangleIcon, //Chuyen ban
   } from "react-native-heroicons/outline";
  import {PlusCircleIcon} from "react-native-heroicons/solid"
  import {useNavigation} from "@react-navigation/native"
  import CardOrderDetail from "../components/CardOrderDetail";
  import {BottomSheet, Button, ListItem } from "@rneui/themed"
  import {SafeAreaProvider} from "react-native-safe-area-context"
  import {useDispatch, useSelector} from "react-redux"
  import actions from "../redux/order/actions";
import { convertPrice } from "../utils/helpers/convertPrice";
import { orderService } from "../utils/services/invoiceServices";
import { useContext } from "react";
import { AppContext } from "../context/appContext";
const DetailOrderScreen = (props) => {
    const {socket} = useContext(AppContext)
    const selectedOrder = useSelector((state) => state.order.selectedOrder)
    const infoEmployee = useSelector((state) => state.auth.user_info)
    const dispatch = useDispatch() 
    const navigation = useNavigation()
    const id_table = props.route.params
    const [activeCategory, setActiveCategory] = useState(1)
    const [visible, setIsVisible] = useState(false)

    const [data, setData] = useState(selectedOrder?.lst_invoice_detail || []);
  

  const list = [
    { 
      title: 'Gộp đơn', 
      icon: <ClipboardDocumentCheckIcon size={25} color={"#0080ff"} style={{marginRight:4}}/>, 
      onPress: () => console.log("gop don") 
    },
    { 
      title: 'Tách đơn', 
      icon: <DocumentDuplicateIcon size={25} color={"#0080ff"} style={{marginRight:4}}/>, 
      onPress: () => console.log("tach don") 
    },
    { 
      title: 'Hủy đơn', 
      icon: <DocumentMinusIcon size={25} color={"#0080ff"} style={{marginRight:4}}/>, 
      onPress: () => console.log("huy don") 
    },
    { 
      title: 'Chuyển bàn', 
      icon: <ClipboardDocumentCheckIcon size={25} color={"#0080ff"} style={{marginRight:4}}/>, 
      onPress: () => console.log(" chuyen ban") 
    },
  ];

    const handleSave = () => {
      if(selectedOrder?.id) {
        console.log(selectedOrder)
        const lst_invoice_detail = selectedOrder?.invoice_details.map((item) => {
          return {
           id_invoice: selectedOrder?.id,
           id_product: !item?.isCombo ? item?.id_product : null,
           id_combo: item?.isCombo ? item?.id_product : null,
           isCombo: item?.isCombo,
           price: item?.price,
           amount: item?.amount
          }
         })
         
         const dataSubmit = {
           id_employee: selectedOrder?.id_employee ? selectedOrder?.id_employee : null,
           id_customer: selectedOrder?.id_customer ? selectedOrder?.id_customer : null,
           id_promotion: selectedOrder?.id_promotion ? selectedOrder?.id_promotion : null,
           lst_invoice_detail: lst_invoice_detail
    
         }

         console.log(dataSubmit)

      } else {

        const dataSubmit = {
          ...selectedOrder,
          lst_invoice_detail: data,
          id_employee: infoEmployee?.id
        }

        orderService.create(dataSubmit).then(res => {

            if(res.status) {
              socket.emit("change_order", {
                status: true,
                id_invoice: res?.id,
                table: dataSubmit?.id_tables
                  ? dataSubmit?.id_tables.join(",")
                  : "",
              });
              navigation.navigate("home")
              dispatch(actions.action.selectedOrder({
                lst_invoice_detail: [],
                id_tables: []
              }))
            }
        }).catch(err => {
          console.log(err)
        })
      

      }
    }

    return (
      <View style={{backgroundColor:"#F1F1F1"}} className="flex-1  relative box-border">
           
        <SafeAreaView className="flex-1">
          <View
            style={{
              borderBottomColor: "rgb(199, 199, 199)",
              borderBottomWidth: 1,
            }}
            className="px-4 pb-4 pt-2 flex-row justify-between items-center"
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
            <TouchableOpacity onPress={() => setIsVisible(true)}>
                <EllipsisVerticalIcon size="27" color="rgb(179, 179, 179)" />
            </TouchableOpacity>
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
                <View className="w-1/2 flex-row items-center"><Text className="ml-4">Bàn số {selectedOrder?.tablefood_invoices ? selectedOrder?.tablefood_invoices[0].id_table : ""}</Text></View>

           </View>

           {/* list order */}
           <View
             style={{height:487}} // doi voiw oppo , doi voi android studio 600
            className=" w-full flex-row mt-4  justify-center "
          >    
                <View className="h-full w-11/12 ">
                    {/* <FlatList
                      // className="overflow-visible"
                        data={data}
                        renderItem={({item}) => <CardOrderDetail data={data} setData={setData} item={item}/>}
                        keyExtractor={(item,index) => index}
                        onEndReachedThreshold={0.5}
                    /> */}
                    <ScrollView>
                      {
                        Array.isArray(data) && data.map((item, index) => {
                          return <CardOrderDetail key={index} data={data} setData={setData} item={item}/>
                        })
                      }
                    </ScrollView>
                </View>
          </View>

          <View style={{          
              backgroundColor:"white",
                          
          }} className="h-32 flex-col justify-end" >
              <View style={{backgroundColor:"#eff8fe", borderWidth:1, borderColor:"#e6e6e6"}} className="m-3 flex-row justify-end items-center">
                   <Text  style={{fontSize:15, paddingTop:4, paddingBottom:4,}} className="font-bold">Tổng: {Array.isArray(selectedOrder?.lst_invoice_detail) ? convertPrice(selectedOrder?.lst_invoice_detail.reduce((sum, item) => sum + item.price, 0)) : '0 đ'}</Text>
              </View>
          
              <View className="flex-row h-14 justify-around">
                 <TouchableOpacity onPress={() => navigation.navigate("Product")} style={{backgroundColor:  "#cccccc" , borderRadius:10, marginRight:15}}  className="w-24 m-2  flex-row items-center justify-center">
                      <PlusCircleIcon size="20" color="white" />
                      <Text style={{color: "white"}} className="font-semibold p-2">Thêm</Text>
                      
                 </TouchableOpacity>
          
                <TouchableOpacity onPress={() => handleSave()}  style={{ backgroundColor:"#0080ff", borderColor:"rgb(179, 179, 179)",borderWidth:1, borderRadius:10, marginRight:15}}  className="w-1/3 m-2 flex-row items-center justify-center">
                      <Text style={{color: "white"}} className="font-semibold p-2">Lưu</Text>
                  
                </TouchableOpacity>

               
                <TouchableOpacity  style={{backgroundColor:  "#24A019" , borderRadius:10, marginRight:15}}  className="w-1/3 m-2 flex-row items-center justify-center">
                      <Text style={{color: "white"}} className="font-semibold p-2">Thanh toán</Text>
                   
                </TouchableOpacity>


              </View>
          </View>
        
        </SafeAreaView>
        {/* <SafeAreaProvider> */}
      
            <BottomSheet backdropStyle={styles.containerStyle} onBackdropPress={() => setIsVisible(false)}    modalProps={{
               containerStyle: styles.containerStyle
            
            }} isVisible={visible}>
             
                 <View style={{flex: 1, borderTopRightRadius: 10, borderTopLeftRadius: 10}}>
                  {list.map((l, i) => (
                      <ListItem
                        key={i}
                        onPress={l.onPress} 
                      >
                        <ListItem.Content className="flex-row justify-start items-center">
                            {l.icon}
                            <ListItem.Title >{l.title}</ListItem.Title>
                        </ListItem.Content>
                      </ListItem>
                    ))}
                      <ListItem style={{borderTopColor: "#e6e6e6", borderTopWidth: 1}}>
                          <ListItem.Content className="flex-row justify-start items-center" >
                            <XMarkIcon size={25} color={"#0080ff"} style={{marginRight:4}}/>
                            <ListItem.Title >Đóng</ListItem.Title>
                          </ListItem.Content>
                      </ListItem>
                 </View>

             
                
            </BottomSheet>
        
        {/* </SafeAreaProvider> */}
       
      </View>
    )
}

const styles = StyleSheet.create({
  containerStyle: {
     
  }
})

export default DetailOrderScreen