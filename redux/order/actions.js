const types = {
    SELECTED_ORDER: "order/selected_order",
    LOAD_DATA:"order/load_data",
    LOAD_DATA_SUCCESS:"order/load_data_success"
}

const action = {
    selectedOrder: (data) => {
        return {
            type: types.SELECTED_ORDER,
            payload: {data}
        }
    },

    loadData: (params) =>  {
       return {
         type: types.LOAD_DATA,
         payload:{params}

       }
     },

    loadDataSuccess: (data) =>  {
        return {

            type: types.LOAD_DATA_SUCCESS,
            payload: {data}
        }
    }
    
}

const actions = {
    types, action
}

export default actions;
export const OrderActions = action; 