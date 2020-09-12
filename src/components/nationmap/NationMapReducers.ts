import {createAsyncReducer} from "../../store/reducers/AsyncReducer";
import {ActionTypes} from "../../Constants";
import {StateStatistics} from "../../api/CovidTrackingProject";
import dataPoints from "../../data/stateDatapoints.json";
import {SelectedState, SetMapSelectedState, ToggleMapDatapointAction} from "./NationMapActions";

export const stateStats = createAsyncReducer<StateStatistics[]>(ActionTypes.GET_STATE_STATS);

export interface MapFilterState {
    dataPoints: typeof dataPoints;
    selected: keyof StateStatistics;
}

export function mapFilter(state: MapFilterState, action: ToggleMapDatapointAction) {
    if (state === undefined) {
        state = {
            dataPoints,
            selected: 'positive'
        }
    }

    if (action.type === ActionTypes.TOGGLE_MAP_DATAPOINT) {
        return {...state, selected: action.key};
    }

    return state;
}

export function mapHover(state: SelectedState, action: SetMapSelectedState) {
    if (state === undefined) {
        state = {}
    }

    if (action.type === ActionTypes.SET_MAP_ACTIVE_STATE) {
        return { ...action.state };
    }

    return state;
}