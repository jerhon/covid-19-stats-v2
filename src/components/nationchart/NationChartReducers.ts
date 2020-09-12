import {createAsyncReducer} from "../../store/reducers/AsyncReducer";
import {NationStatistics} from "../../api/CovidTrackingProject";
import {ActionTypes} from "../../Constants";
import {Datapoint} from "../filter/Filter";
import {ToggleDataPointAction, ToggleOpenFilterAction} from "./NationChartActions";
import dataPoints from "../../data/nationDatapoints.json";

export const nationStatistics = createAsyncReducer<NationStatistics[]>(ActionTypes.GET_NATION_STATS);

export interface NationFilterState {
    isOpen: boolean;
    dataPoints: Datapoint[];
    selected: string[];
}

function toggleDataPoint(selected: string[], key: string) {
    if (selected.includes(key)) {
        return selected.filter((s) => s !== key);
    } else {
        let ret = [...selected]
        ret.push(key);
        return ret;
    }
}

export function nationFilter(state: NationFilterState | undefined, action: ToggleOpenFilterAction | ToggleDataPointAction) {
    if (state === undefined) {
        state = {isOpen: false, dataPoints, selected: ["positive"]};
    }

    if (action.type === ActionTypes.TOGGLE_OPEN_FILTER) {
        return {...state, isOpen: !state.isOpen};
    } else if (action.type === ActionTypes.TOGGLE_DATAPOINT) {
        return {
            ...state,
            selected: toggleDataPoint(state.selected, (action as ToggleDataPointAction).key)
        };
    }

    return state;
}
