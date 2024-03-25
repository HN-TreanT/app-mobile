import { AuthActions } from "./auth/actions";
import {StateAction} from "./state/actions"
import { OrderActions } from "./order/actions";
const useActions = () => {
    const actions = {
        AuthActions, StateAction, OrderActions
    }
    return actions
}

export default useActions;