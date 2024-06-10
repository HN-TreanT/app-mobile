import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    Switch,
   ActivityIndicator,
   ScrollView
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  
  import { Bars3Icon, ArrowLeftIcon } from "react-native-heroicons/solid";
  import { BellIcon } from "react-native-heroicons/outline";
  import React, { useEffect, useState, useCallback } from "react";
  import CardTable from "../components/CardTable";
  import { tableSerivces } from "../utils/services/tableServices";
  import { useFocusEffect } from "@react-navigation/native";
  import { useSelector, useDispatch } from "react-redux";
  import { useNavigation } from "@react-navigation/native";
  import { Dialog } from "@rneui/themed";
  import actions from "../redux/order/actions";
  import { invioceDetailServices } from "../utils/services/invoiceDetailSerivces";
  import Toast from "react-native-toast-message";
  import { tableInvoiceService } from "../utils/services/tableInvoiceService";
  const TableScreen = () => {
    const selectedOrder = useSelector((state) => state.order.selectedOrder)
    const dispatch = useDispatch()
    const [dataSource, setDataSource] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [tableSelect, setTableSelect] = useState()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(2)
    const navigation = useNavigation()
    const [isVisbleConfirmChangetable, setIsVisibleConfirmChangeTable] = useState(false)


    const handleChangeVisibleConfirmChangeTable = () => {
      setIsVisibleConfirmChangeTable(!isVisbleConfirmChangetable)
    }

    const fetchData = async () => {
      if (dataSource.length < total) {
        setIsLoading(true)
        tableSerivces.listAll({
          page: page,
          size: 24
        }).then((res) => {
          if (Array.isArray(res?.data?.data)) {
            const temp = res?.data?.data.map((item, index) => {
              return {
                key: item?.id,
                ...item
    
              }
            })
            setTotal(res?.data?.TotalPage)
            setDataSource([...dataSource,...temp])
            if (res?.data?.data.length > 0) {
              setPage(page + 1)
             }
              setIsLoading(false)
          }

        }).catch(err => {
          setIsLoading(false)
          console.log(err)
        })
      }
    }

    useFocusEffect(
      useCallback(() => {
          fetchData()
          return () => console.log('table screen is unfocused');
      }, [])
    )
    
    useEffect(() => {
          fetchData()
    }, [])

    const handleChangeTable = () => {      
        const table_invoice = selectedOrder?.tablefood_invoices[0]
        const dataSubmit = {
          id_table: tableSelect?.id,
          id_invoice: table_invoice?.id_invoice
        }
        if (table_invoice) {
          tableInvoiceService.update(table_invoice?.id, dataSubmit).then(async (res) => {
            if (res?.status) {
             await tableSerivces.update(table_invoice?.id_table, {status: 0})
             await tableSerivces.update(tableSelect?.id, {status: 1})
              Toast.show({
                type: 'success',
                text1: 'Chuyển bàn thành công',
              });
              navigation.navigate("DetailOrder")
              // selectedOrder.tablefood_invoices[0]?.id_table =tableSelect.id
              const table_invoice2 = {
                ...table_invoice,
                id_table: tableSelect?.id
              }
               const dataSelectedOrder = {
                ...selectedOrder,
                tablefood_invoices: [table_invoice2]
              }
              dispatch(actions.action.selectedOrder(dataSelectedOrder))
            }
          }).catch(err => {
            console.log(err)
            Toast.show({
              type: 'error',
              text1: 'Chuyển bàn thất bại',
            });
          })
        }
       
        
    }

    
    return (
      <View className="flex-1 mb-24 relative bg-white box-border">
        <SafeAreaView className="flex-1">
        <Dialog isVisible={isVisbleConfirmChangetable} onBackdropPress={handleChangeVisibleConfirmChangeTable}
        >

          <Dialog.Title title={`Xác nhận chuyển sang ${tableSelect?.name}`}/>
          <Dialog.Actions>
            <Dialog.Button
              title="Xác nhận"
              onPress={() => handleChangeTable()}
            />
            <Dialog.Button title="Hủy" onPress={handleChangeVisibleConfirmChangeTable} />
          </Dialog.Actions>
            
        </Dialog>

          <View
            style={{
              borderBottomColor: "rgb(199, 199, 199)",
              borderBottomWidth: 1,
            }}
            className="px-4 pb-4 mr-2 ml-2 pt-2 flex-row justify-between items-center"
          >
            {
              selectedOrder?.id ?   <TouchableOpacity className=" rounded-full" onPress={() => navigation.goBack()}>
              <ArrowLeftIcon size="27" color="rgb(179, 179, 179)" />
            </TouchableOpacity>  :  <Bars3Icon size="27" color="black" />
            }
           
  
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
              <Text className="font-semibold opacity-70">Bàn trống: 12/48</Text>
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
                className="ml-2 pt-3 flex-col h-16 w-24 items-center"
              >
                
                <Text  className="font-medium">
                  Khu vực 1
                </Text>
                <Text  className="font-medium">
                  Hà Nội
                </Text>
              </View>
            </View>
  
            {/* list order */}
            <View
              style={{ backgroundColor: "#e6f5ff" }}
              className="h-full w-3/4 flex-row justify-center pl-6"
            >    
                 {
                  isLoading  ? <View style={{ paddingVertical: 20 }}>
                     <ActivityIndicator  size="large" color="#0000ff"/>
                  </View> : 
                  
                  <ScrollView  className="h-full w-full "> 
                    <View className="h-full w-full flex-row " style={{flexWrap: 'wrap'}}>
                        {
                            dataSource.map((item, index) => {
                            return  <CardTable setTableSelect={setTableSelect} setIsVisibleConfirmChangeTable={setIsVisibleConfirmChangeTable} key={index} item={item}/>
                            // return <div>{item}</div>
                            })
                        }
                    </View>
                 </ScrollView>
                 }
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  };
  
  export default TableScreen;
  