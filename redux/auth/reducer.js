import actions from "./actions";
const initAuth = {
    user_info: {}
}

const AuthReducer = (state = initAuth, action) => {
    switch (action.type) {
        case actions.types.USER_INFO:
            return {
                ...state,
                ...{
                    user_info: action.payload.data,
                },
            };

        default:
            return state;
    }
}

export default AuthReducer