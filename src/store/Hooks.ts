import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {StoreType} from "./Create";
import {useCallback} from "react";

export const useStore : TypedUseSelectorHook<StoreType> = useSelector;

export function useWrappedDispatch<TParams extends any[], TReturn>(func: (...args: TParams) => TReturn): (...args: TParams) => void {
    const dispatch = useDispatch();
    return useCallback((...args: TParams) => dispatch(func(...args)), [dispatch, func]);
}