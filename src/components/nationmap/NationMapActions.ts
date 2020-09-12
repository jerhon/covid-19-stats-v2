import {createAsyncThunk} from "../../store/actions/AsyncActions";
import {ActionTypes} from "../../Constants";
import {getStatesCurrent, StateStatistics} from "../../api/CovidTrackingProject";
import {StoreType} from "../../store/Create";
import {Dispatch} from "redux";
import {StateAbbreviations} from "./NationMap";
import stateNames from "../../data/states.json";

export interface ToggleMapDatapointAction {
    type: typeof ActionTypes.TOGGLE_MAP_DATAPOINT
    key: keyof StateStatistics
}
export interface SetMapSelectedState {
    type: typeof ActionTypes.SET_MAP_ACTIVE_STATE
    state: SelectedState
}
export interface SelectedState {
    abbreviation?: StateAbbreviations,
    name?: string,
    statistics?: StateStatistics
}

export const requestStateStats = createAsyncThunk(ActionTypes.GET_STATE_STATS, () => getStatesCurrent() )
export function setFilter(key: string) {
    return {
        type: ActionTypes.TOGGLE_MAP_DATAPOINT,
        key
    }
}
export function setSelectedState(abbreviation: string) {
    return (dispatch: Dispatch, getState: () => StoreType) => {

        let name = (stateNames as any)[abbreviation];
        let statistics = getState().stateStats?.data?.find((s) => s.state === abbreviation);

        dispatch({ type: ActionTypes.SET_MAP_ACTIVE_STATE, state: { abbreviation, statistics, name }  })
    }
}