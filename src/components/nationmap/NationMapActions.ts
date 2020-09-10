import {createAsyncThunk} from "../../store/actions/AsyncActions";
import {ActionTypes} from "../../Constants";
import {getStatesCurrent} from "../../api/CovidTrackingProject";

export const requestStateStats = createAsyncThunk(ActionTypes.GET_STATE_STATS, () => getStatesCurrent() )