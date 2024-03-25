import AuthReducer from "./auth/reducer";
import StateReducer from "./state/reducer"
import OrderReducers from "./order/reducer";
const rootReducer = {
    auth: AuthReducer,
    state: StateReducer,
    order: OrderReducers
}

export default rootReducer