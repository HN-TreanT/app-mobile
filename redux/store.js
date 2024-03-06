import { combineReducers, applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import { routerReducer } from "react-router-redux";
import reducers from "./reducers"
import rootSaga from "./sagas"
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware]

// declare global {
//     interface 
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    composeEnhancers(applyMiddleware(...middleware))
)
sagaMiddleware.run(rootSaga)
export {store}