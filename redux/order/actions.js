const types = {
    SELECTED_ORDER: "order/selected_order"
}

const action = {
    selectedOrder: (data) => {
        return {
            type: types.SELECTED_ORDER,
            payload: {data}
        }
    }
}

const actions = {
    types, action
}

export default actions;
export const AuthActions = action;