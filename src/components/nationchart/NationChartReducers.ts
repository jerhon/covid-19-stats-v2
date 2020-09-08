import {createAsyncReducer} from "../../store/reducers/AsyncReducer";
import {NationStatistics} from "../../api/CovidTrackingProject";
import {ActionTypes} from "../../Constants";
import {Datapoint} from "../filter/Filter";
import {ToggleDataPointAction, ToggleOpenFilterAction} from "./NationChartActions";

export const nationStatistics = createAsyncReducer<NationStatistics[]>(ActionTypes.GET_NATION_STATS);

export interface NationFilterState {
    isOpen: boolean;
    dataPoints: Datapoint[];
}

function toggleDataPoint(dataPoints: Datapoint[], key: string) {
    return dataPoints.map((dp) => dp.key === key ? { ...dp, selected: !dp.selected } : dp);
}


const dataPoints : Datapoint[] = [
    {
        name: "Deaths",
        key: "death",
        selected: false,
        description: "Total fatalities with confirmed or probable COBID-19 case diagnosis (per the expanded CSTE case definition of April, 5th 2020 approved by the CDC). In states where the information is available, it only tracks fatalities with confirmed or probable COVID-19 case diagnosis where on the death certificate, COVID-19 is listed as an underlying cause of death according to WHO guidelines."
    },
    {
        name: "Deaths increase",
        key: "deathIncrease",
        selected: false,
        description: "Daily increase in death, calculated from the previous day’s value."
    },
    {
        name: "Hospitalized Total",
        key: "hospitalizedCumulative",
        selected: false,
        description: "Total number of individuals who have ever been hospitalized with COVID-19. Definitions vary by state / territory. Where possible, we report hospitalizations with confirmed or probable COVID-19 cases per the expanded CSTE case definition of April 5th, 2020 approved by the CDC."
    },
    {
        name: "Hospitalized Currently",
        key: "hospitalizedCurrently",
        selected: false,
        description: "Individuals who are currently hospitalized with COVID-19. Definitions vary by state / territory. Where possible, we report hospitalizations with confirmed or probable COVID-19 cases per the expanded CSTE case definition of April 5th, 2020 approved by the CDC."
    },
    {
        name: "Hospitalized Increase",
        key: "hospitalizedIncrease",
        selected: false,
        description: "Daily increase in Total Hospitalizations, calculated from the previous day’s value."
    },
    {
        name: "In ICU Cumulative",
        key: "inIcuCumulative",
        selected: false,
        description: "Total number of individuals who have ever been hospitalized in the Intensive Care Unit with COVID-19. Definitions vary by state / territory. Where possible, we report patients in the ICU with confirmed or probable COVID-19 cases per the expanded CSTE case definition of April 5th, 2020 approved by the CDC."
    },
    {
        name: "In ICU Currently",
        key: "inIcuCurrently",
        selected: false,
        description: "Individuals who are currently hospitalized in the Intensive Care Unit with COVID-19. Definitions vary by state / territory. Where possible, we report patients in the ICU with confirmed or probable COVID-19 cases per the expanded CSTE case definition of April 5th, 2020 approved by the CDC."
    },
    {
        name: "Negative",
        key: "negative",
        selected: false,
        description: "Total number of unique people with a completed PCR test that returns negative. For states / territories that do not report this number directly, we compute it using one of several methods, depending on which data points the state provides. Due to complex reporting procedures, this number might be mixing units and therefore, at best, it should only be considered an estimate of the number of people with a completed PCR test that return negative."
    },
    {
        name: "Negative Increase",
        key: "negativeIncrease",
        selected: false,
        description: "Increase in negative computed by subtracting the value of negative for the previous day from the value for negative from the current day."
    },
    {
        name: "On Ventilator Total",
        key: "onVentilatorCumulative",
        selected: false,
        description: "Total number of individuals who have ever been hospitalized under advanced ventilation with COVID-19. Definitions vary by state / territory. Where possible, we report patients on ventilation with confirmed or probable COVID-19 cases per the expanded CSTE case definition of April 5th, 2020 approved by the CDC."
    },
    {
        name: "On Ventilator Currently",
        key: "onVentilatorCurrently",
        selected: false,
        description: "Individuals who are currently hospitalized under advanced ventilation with COVID-19. Definitions vary by state / territory. Where possible, we report patients on ventilation with confirmed or probable COVID-19 cases per the expanded CSTE case definition of April 5th, 2020 approved by the CDC."
    },
    {
        name: "Pending",
        key: "pending",
        description: "Total number of viral tests that have not been completed as reported by the state or territory.",
        selected: false,
    },
    {
        name:"Positive",
        key: "positive",
        selected:true,
        description: "Total number of people with confirmed OR probable cases of COVID-19 reported by the state or territory (per the expanded CSTE case definition of April 5th, 2020 approved by the CDC). " +
            "A confirmed case is a person who has a positive test result from an FDA approved diagnostic molecular test. " +
            "A probable case is a person who has presentable symptoms WITH epidemiological evidence or has BOTH a positive presumptive laboratory test AND also EITHER presentable symptoms OR epidemiological evidence, or who has been issued a death certificate listing COVID-19 as a cause of death or significant contributing cause of death with no confirmatory testing. Epidemiological evidence refers either to close proximity contact with a known case or travel history to an area with high disease incidence. According to the guidelines, FDA approved antibody and antigen tests are considered presumptive laboratory evidence and therefore only one potential part of the evidence required to classify a case as probable."
    },
    {
        name: "Positive Increase",
        key: "positiveIncrease",
        selected: false,
        description: "The daily increase in API field positive, which measures Cases (confirmed plus probable) calculated based on the previous day’s value."
    },
    {
        name: "Recovered",
        key: "recovered",
        description: "Total number of people that are identified as recovered from COVID-19. States provide very disparate definitions on what constitutes a “recovered” COVID-19 case. Types of “recovered” cases include those who are discharged from hospitals, released from isolation after meeting CDC guidance on symptoms cessation, or those who have not been identified as fatalities after a number of days (30 or more) post disease onset. Specifics vary for each state or territory.",
        selected: false,
    },
    {
        name: "Total Test Results",
        key: "totalTestResults",
        description: "At the national level, this metric is a summary statistic which—because it sums figures from states reporting tests in test encounters with those reporting tests in specimens and in people—is an aggregate calculation of heterogeneous figures. Therefore, it should be contextualized as, at best, an estimate of national testing performance.\n" +
            "\n" +
            "In most states, the totalTestResults field is currently computed by adding positive and negative values because, historically, some states do not report totals, and to work around different reporting cadences for cases and tests. In Colorado and Rhode Island, where reliable testing encounters figures are available with a complete time series, we directly report those figures in this field. We are in the process of switching all states over to use directly reported total figures, using a policy of preferring testing encounters, specimens, and people, in that order.",
        selected: false,
    },
    {
        name: "Total Test Results Increase",
        key: "totalTestResultsIncrease",
        description: "Daily increase in totalTestResults, calculated from the previous day’s value. This calculation includes all the caveats associated with Total tests/totalTestResults, and we recommend against using it at the state/territory level.",
        selected: false
    }
];

export function nationFilter(state: NationFilterState | undefined, action: ToggleOpenFilterAction | ToggleDataPointAction) {
    if (state === undefined) {
        state = { isOpen: false, dataPoints };
    }

    if (action.type === ActionTypes.TOGGLE_OPEN_FILTER) {
        return { ...state, isOpen: !state.isOpen };
    } else if (action.type === ActionTypes.TOGGLE_DATAPOINT) {
        return { ...state, dataPoints: toggleDataPoint(state.dataPoints, (action as ToggleDataPointAction).dataPointKey) };
    }

    return state;
}
