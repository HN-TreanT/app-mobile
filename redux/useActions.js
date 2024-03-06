import { AuthActions } from "./auth/actions";
import {StateAction} from "./state/actions"
const useActions = () => {
    const actions = {
        AuthActions, StateAction
    }
    return actions
}

export default useActions;