import {combineReducers} from "redux";
import * as reducers from "./reducers";

export function createReducers() {
    return combineReducers({ ...reducers });
}

export type StoreType = {
    [K in keyof typeof reducers]: ReturnType<typeof reducers[K]>
}
