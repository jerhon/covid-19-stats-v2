import { Action } from "redux";
import { AsyncActionPostfix} from "../../Constants";

export interface AsyncCall<TDataType> {
    notRequested: boolean;
    inProgress: boolean;
    success: boolean;
    failure: boolean;
    data?: TDataType;
    error?: any;
}

export interface AsyncSuccessAction<TReturn> extends Action {
    data: TReturn;
}
export interface AsyncFailureAction extends Action {
    error: any;
}

export function createAsyncReducer<TReturn>(actionPrefix: string)  {
    return (state: any, action: Action) : AsyncCall<TReturn> => {
        if (state === undefined) {
            state = { notRequested: true, inProgress: false, success: false, failure: false };
        }

        if (action.type === actionPrefix + AsyncActionPostfix.ASYNC_IN_PROGRESS) {
            return { notRequested: false, inProgress: true, success: false, failure: false };
        } else if (action.type === actionPrefix + AsyncActionPostfix.ASYNC_SUCCESS) {
            return { notRequested: false, inProgress: false, success: true, failure: false, data: (action as AsyncSuccessAction<TReturn>).data }
        } else if (action.type === actionPrefix + AsyncActionPostfix.ASYNC_FAILURE) {
            return { notRequested: false, inProgress: false, success: false, failure: true, error: (action as AsyncFailureAction).error }
        }

        return state;
    }
}