import { Dispatch, Action } from "redux";
import {AsyncActionPostfix} from "../../Constants";

export interface AsyncSuccess<TReturn> extends Action {
    data: TReturn;
}
export interface AsyncFailure extends Action {
    error: any;
}

export type AsyncAction<TReturn> = Action | AsyncSuccess<TReturn> | AsyncFailure;

export function createAsyncThunk<TReturn>(actionPrefix: string, asyncCall: () => Promise<TReturn>) {
    return async (dispatch: Dispatch<AsyncAction<TReturn>>) => {
        dispatch({ type: actionPrefix + AsyncActionPostfix.ASYNC_IN_PROGRESS });
        try {
            const data = await asyncCall();
            dispatch ({ type: actionPrefix + AsyncActionPostfix.ASYNC_SUCCESS, data })
        } catch (error) {
            dispatch({ type: actionPrefix + AsyncActionPostfix.ASYNC_FAILURE, error })
        }
    }
}