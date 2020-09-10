import {createAsyncReducer} from "../../store/reducers/AsyncReducer";
import {ActionTypes} from "../../Constants";
import {StateStatistics} from "../../api/CovidTrackingProject";

export const stateStats = createAsyncReducer<StateStatistics[]>(ActionTypes.GET_STATE_STATS);
