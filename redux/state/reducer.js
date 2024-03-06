import actions from "./actions";

const initState = {
    loginState: false,
    loadingState: false,
}

const StateReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.types.IS_LOADING:
            return {
                ...state,
                ...{
                    loadingState: action.payload.isLoading,
                },
            };
        case actions.types.IS_LOGIN:
            return {
                ...state,
                ...{
                    loginState: action.payload.isLogin,
                },
            };
        default:
            return state;
    }
}

export default StateReducer