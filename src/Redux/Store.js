import { createStore, applyMiddleware } from "redux";
import { Reducers } from "./Reducers";
import thunk from "redux-thunk";


export const Store = createStore(Reducers, applyMiddleware(thunk));

