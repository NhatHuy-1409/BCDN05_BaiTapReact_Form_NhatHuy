import { combineReducers, createStore } from "redux";
import { manageStuReducer } from "./manageStuReducer";
const rootReducer = combineReducers({
    manageStuReducer
})

export const store = createStore(rootReducer)