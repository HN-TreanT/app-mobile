
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
import { BellIcon, ArrowLeftIcon, MagnifyingGlassIcon, ChevronRightIcon, ChevronLeftIcon, ChevronUpIcon } from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native"
import CardProduct from "../components/CardProduct";
import BottomSheetProduct from "../components/BottomSheetProduct";
import { productServices } from "../utils/services/productServices";
import { categoryServices } from "../utils/services/categoryServices";
import {useDispatch, useSelector} from "react-redux"
import actions from "../redux/order/actions";
import { convertPrice } from "../utils/helpers/convertPrice";

const ProductScreen = (props) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const selectedOrder = useSelector((state) => state.order.selectedOrder )

    const table = props.route.params
    const [activeCategory, setActiveCategory] = useState()
    const [visible, setVisible] = useState(false)

    const [invoiceDetails, setInvoiceDetails] = useState([])

    const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(2)
  const [changeInputText, setChangeTextInput] = useState()
  const [search, setSearch] = useState();

  const [categories, setCategories] = useState([])
  const fetchData = () => {
    if (data.length < total) {
      setLoading(true);
    productServices.listAll({
      page: page,
      size: 10,
      ...(activeCategory && {id_category: activeCategory}),
      ...(search && search != "" && {name : search})
    }).then((res) => {
      if (Array.isArray(res?.data?.data)) {
        const temp = res?.data?.data.map((item) => {
          return {
            key: item?.id,
            ...item
          }
        })
        setData([...data, ... temp])
        setTotal(res?.data?.TotalPage)
        if (res?.data?.data.length > 0) {
          setPage(page + 1)
         }
          setLoading(false)
        
      }
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
    }
  };




  const getCategory = () => {
    categoryServices.get({
      page: 1,
      size: 100
    }).then((res) => {
      if (Array.isArray(res?.data?.data)) {
        const temp = res?.data?.data.map((item) => {
          return {
            id: item?.id,
            title: item?.name || ""
          }
        })
        const  all = {
          id: null,
          title:"Tất cả"
        }
        setCategories([...[all],...temp])
      }

    }).catch(err => {
        console.log(err)
    })
  }

  useEffect(() => {
    
    getCategory()
  }, []);

  useEffect(() => {
    fetchData();
  }, [activeCategory])

 
  const renderFooter = () => {
    return isLoading ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };

  const hanldeActiceCategory = (item) => {
    setActiveCategory(item.id)
    setPage(1)
    setTotal(2)
    setData([])
  }

  const handleSubmitEditing = () => {
   setSearch(changeInputText)
   setPage(1)
   setTotal(2)
   setData([])
  }

  const handleNextPage = () => {
    
    const newSelectedOrder = {
      ...selectedOrder,
      lst_invoice_detail: invoiceDetails
    }
    dispatch(actions.action.selectedOrder(newSelectedOrder))
    navigation.navigate("DetailOrder")
  }

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
            <TouchableOpacity className=" rounded-full" onPress={() => {
              navigation.goBack()
              dispatch(actions.action.selectedOrder({}))
            }}>
              <ArrowLeftIcon size="27" color="rgb(179, 179, 179)" />
            </TouchableOpacity>
  
            <View className="flex-row items-center space-x-2">
              <Text className="font-semibold" style={{fontSize:20}}>Sản phẩm</Text>
            </View>
            <BellIcon size="27" color="rgb(179, 179, 179)" />
          </View>
           {/* search bar */}
           <View className="mx-5 mt-6">
                        <View className="flex-row justify-center items-center rounded-full p-1 bg-[#e6e6e6]">
                            <TextInput onSubmitEditing={() => handleSubmitEditing()} onChangeText={(search) => setChangeTextInput(search)} placeholder="Tìm kiếm" className="p-1 flex-1 font-semibold text-gray-700"/>
                            <TouchableOpacity className="rounded-full p-2" style={{backgroundColor:"rgb(179, 179, 179)"}}>
                                <MagnifyingGlassIcon size="25" strokeWidth={2} color="white"/>
                            </TouchableOpacity>
                        </View>
            </View>
           <View className="h-10 px-5 mt-6"> 
                <FlatList
                    
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categories}                      
                        keyExtractor={item => item.id}
                        className="overflow-visible"
                        renderItem={({item}) => {
                            const isActive =item.id == activeCategory
                            return (
                                <TouchableOpacity onPress={() => hanldeActiceCategory(item)} style={{backgroundColor: isActive ? "#0080ff" : 'white', borderRadius:10}}  className="p-2 x-5  mr-2 shadow">
                                    <Text style={{color: isActive ? "white" : "black"}} className={isActive ? "font-semibold": "font-normal"}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        }}
                />
          </View>

           {/* list order */}
          <View
             style={{height:444}}// treen oppo laf 444, tren may ao laf 590
             className=" w-full flex-row mt-4  justify-center "
          >    
                <View className="h-full w-11/12 ">
                    <FlatList
                        data={data}
                        renderItem={({item}) => <CardProduct invoiceDetails={invoiceDetails} setInvoiceDetails={setInvoiceDetails} item={item}/>}
                        keyExtractor={item => item.id.toString()}
                        onEndReached={fetchData}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                    />
                </View>
          </View>

         <View
             style={{
                
              backgroundColor:"white",
              zIndex:99,
                    
          }}
          className="h-20 flex-col items-center">
             <TouchableOpacity onPress={() => setVisible(true)} >
                <ChevronUpIcon size="25" color="black" />
             </TouchableOpacity>
              <View style={{borderTopColor:"#e6e6e6", borderTopWidth: 1}}  className=" mr-2 ml-2 h-14 w-full flex-row items-center justify-between" >
              
                  <View style={{marginLeft:7}}>
                    <Text style={{fontSize: 15}}  className="font-medium ">Thành tiền: {convertPrice(invoiceDetails.reduce((sum, acc) => sum + acc?.price , 0))}</Text>
                    <Text style={{color:"rgb(179, 179, 179)"}}  className="font-semibold ">Đặt hàng: {invoiceDetails.length}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleNextPage()} style={{backgroundColor:  "#0080ff" , borderRadius:10, marginRight:15}}  className="p-2 flex-row items-center">
                        <Text style={{color: "white"}} className="font-semibold">Tiếp theo</Text>
                        <ChevronRightIcon size="20" color="white" />
                  </TouchableOpacity>
              </View>
              <BottomSheetProduct invoiceDetails={invoiceDetails} setInvoiceDetails={setInvoiceDetails} visible={visible} setIsVisible={setVisible}/>
         </View>
       
        </SafeAreaView>
       
        
      </View>
    )
}

export default ProductScreen