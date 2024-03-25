import actions from "./actions";
const initAuth = {
    selectedOrder: {},
    invoices: {
        TotalPage: 0,
        data: []
    },
    params: {}
}

const OrderReducers = (state = initAuth, action) => {
    switch (action.type) {
        case actions.types.SELECTED_ORDER:
            return {
                ...state,
                ...{
                    selectedOrder: action.payload.data,
                },
            };

        case actions.types.LOAD_DATA: 
            return {
                ...state,
                params: action.payload.params
            }
        case actions.types.LOAD_DATA_SUCCESS: 
            return {
                ...state,
                invoices: action.payload.data
            }
        default:
            return state;
    }
}

export default OrderReducers