const types = {
    IS_LOADING: "state/loading_state",
    IS_LOGIN: "state/login_state"
}

const action = {
    loadingState(isLoading) {
        return {
            type: types.IS_LOADING,
            payload: { isLoading },
        };
    },
    loginState(isLogin) {
        return {
            type: types.IS_LOGIN,
            payload: { isLogin },
        };
    },
}

const actions = {
    types, action
}

export default actions;
export const StateAction = action;