import actions from "./actions";
const initAuth = {
    selectedOrder: {}
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

        default:
            return state;
    }
}

export default OrderReducers