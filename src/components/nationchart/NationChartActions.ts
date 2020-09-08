import {createAsyncThunk} from "../../store/actions/AsyncActions";
import {ActionTypes} from "../../Constants";
import * as api from "../../api/CovidTrackingProject";

export const getNationStatistics = createAsyncThunk(ActionTypes.GET_NATION_STATS, () => api.getNationDaily());

export interface ToggleOpenFilterAction {
    type: typeof ActionTypes.TOGGLE_OPEN_FILTER
}
export interface ToggleDataPointAction {
    type: typeof ActionTypes.TOGGLE_DATAPOINT,
    dataPointKey: string
}

export function toggleOpenFilter() : ToggleOpenFilterAction  {
    return { type: ActionTypes.TOGGLE_OPEN_FILTER };
}
export function toggleDataPoint(dataPointKey: string) : ToggleDataPointAction {
    return { type: ActionTypes.TOGGLE_DATAPOINT, dataPointKey };
}