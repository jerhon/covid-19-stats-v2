import axios from "axios";

const baseUrl = "https://api.covidtracking.com/";

export interface NationStatistics {
    date: string,
    states: number,
    positive: number,
    negative: number,
    pending: number,
    hospitalizedCurrently: number,
    hospitalizedCumulative: number,
    inIcuCurrently: number,
    inIcuCumulative: number,
    onVentilatorCurrently: number,
    onVentilatorCumulative: number,
    recovered: number,
    dateChecked: string,
    death: number,
    hospitalized: number,
    lastModified: string,
    total: number,
    totalTestResults: number,
    posNeg: number,
    deathIncrease: number,
    hospitalizedIncrease: number,
    negativeIncrease: number,
    positiveIncrease: number,
    totalTestResultsIncrease: number,
    hash: string
}

export async function getNationDaily() {
    return (await axios.get<NationStatistics[]>(baseUrl + "v1/us/daily.json")).data.reverse();
}

export interface StateStatistics {
    dataQualityGrade: string,
    date: number,
    death: number,
    deathConfirmed: number | null,
    deathIncrease: number | null,
    deathProbable: number | null,
    fips: string,
    grade: string,
    hash: string,
    hospitalizedCumulative: number | null,
    hospitalizedCurrently: number | null,
    hospitalizedIncrease: number | null,
    inIcuCumulative: number | null,
    inIcuCurrently: number | null,
    lastUpdateEt: string,
    negative: number,
    negativeIncrease: number,
    negativeRegularScore: number,
    negativeScore: number,
    negativeTestsAntibody: number | null,
    negativeTestsPeopleAntibodies: number | null,
    negativeTestsViral: number | null,
    onVentilatorCumulative: number | null,
    onVentilatorCurrently: number | null,
    pending: number | null,
    positive: number,
    positiveCasesViral: number | null,
    positiveIncrease: number | null,
    positiveScore: number | null,
    positiveTestsAntibody: number | null,
    positiveTestsAntigen: number | null,
    positiveTestsPeopleAntibody: number | null,
    positiveTestsPeopleAntigen: number | null,
    positiveTestsViral: number | null,
    score: number,
    state: string,
    total: number,
    totalTestEncountersViral: number | null,
    totalTestResults: number | null,
    totalTestResultsIncrease: number | null,
    totalTestResultsSource: number | null,
    totalTestsAntibody: number | null,
    totalTestsAntigen: number | null,
    totalTestsPeopleAntibody: number | null,
    totalTestsPeopleAntigen: number | null,
    totalTestsPeopleViral: number | null,
    totalTestsViral: number | null
}

export async function getStatesCurrent(): Promise<StateStatistics[]> {
    return ((await axios.get<StateStatistics[]>(baseUrl + "v1/states/current.json")).data as StateStatistics[]);
}


export async function getSingleStateDaily(state: string): Promise<StateStatistics[]> {
    return (await axios.get(baseUrl + `v1/states/${state}/current.json`)).data as StateStatistics[];
}