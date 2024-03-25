import {all, fork, put, select, takeEvery} from "redux-saga/effects"
import actions from "./actions"

function* saga_loadData() {
    try {

        let _params = yield select((state) => state.invoice.params)
    } catch (err){
        console.log(err)
        yield put(actions.action.loadDataSuccess({
            TotalPage: 0,
            data: []
        }))
    }
}
function* listen() {
    yield takeEvery(actions.types.LOAD_DATA, saga_loadData)

}

export default function* mainSaga() {
    yield all([fork(listen)])
}