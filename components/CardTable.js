import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {useNavigation} from "@react-navigation/native"
import {useDispatch, useSelector} from "react-redux"
import actions from "../redux/order/actions";
import { orderService } from "../utils/services/invoiceServices";

const CardTable = ({item, setIsVisibleConfirmChangeTable, setTableSelect, setIdTableChangeStatus, setVisibleDialog}) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const selectedOrder = useSelector((state) => state.order.selectedOrder)
    let active = false

    if (item.status) {
        active = true
    }

    const handleClickCardTable = () => {
       if (!active) {
        if (selectedOrder?.id) {
            setIsVisibleConfirmChangeTable(true)
            setTableSelect(item)
         } else {
          dispatch(actions.action.selectedOrder({
              id_tables: [item.id]
          }))
          navigation.navigate("Product", item)
         }
       } else {
        orderService.getInvoiceByIdTable(item.id).then((res)  => {
             if (res?.data) {
                const lst_invoice_detail = Array.isArray(res?.data?.invoice_details) ?  res?.data?.invoice_details.map((item) => {
                    return {
                        amount: item?.amount,
                        id_combo: item?.id_combo,
                        id_invoice: item?.id_invoice,
                        id_product: item?.id_product,
                        image:  item?.product?.image,
                        isCombo: item?.isCombo,
                        name: item?.product?.name,
                        price: item?.price,
                    }
                }) : []
               
                const data = {
                    ...res.data,
                    lst_invoice_detail: lst_invoice_detail

                }
                dispatch(actions.action.selectedOrder(data))
                navigation.navigate("DetailOrder")
             }  else {
                setIdTableChangeStatus(item.id)
                setVisibleDialog(true)
             }
             
        }).catch(err => {
            console.log(err)
            setIdTableChangeStatus(item.id)
            setVisibleDialog(true)
        })
       }
    }
    return (
       <TouchableOpacity
         onPress={() => handleClickCardTable()}
       >
           <View     
                style={{
                    backgroundColor:active ? "#0080ff":"white",
                    borderRadius:10,
                
                
                }} className="w-16 mr-3 mt-2 mb-1 h-16 flex-col justify-center items-center"
            >
        
            <Text className="font-bold" style={{fontSize:14, padding:2, paddingRight:6, color: active ? "white" : "black",
                paddingLeft:6, borderBottomColor:"rgb(179, 179, 179)", borderBottomWidth:1}}>{item?.name ? item?.name : ""}</Text>
                <Text style={{color:active ? "white" : "rgb(170, 170, 170)"}}>{active ? "Có người" : "Bàn trống"}</Text>
            </View>
       </TouchableOpacity>
    )
}

export default CardTable