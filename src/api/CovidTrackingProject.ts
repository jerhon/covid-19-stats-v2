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
    deathConfirmed: number,
    deathIncrease: number,
    deathProbable: number,
    fips: string,
    grade: string,
    hash: string,
    hospitalizedCumulative: number,
    hospitalizedCurrently: number,
    hospitalizedIncrease: number,
    inIcuCumulative: number,
    inIcuCurrently: number,
    lastUpdateEt: string,
    negative: number,
    negativeIncrease: number,
    negativeRegularScore: number,
    negativeScore: number,
    negativeTestsAntibody: number,
    negativeTestsPeopleAntibodies: number,
    negativeTestsViral: number,
    onVentilatorCumulative: number,
    onVentilatorCurrently: number,
    pending: number,
    positive: number,
    positiveCasesViral: number,
    positiveIncrease: number,
    positiveScore: number,
    positiveTestsAntibody: number,
    positiveTestsAntigen: number,
    positiveTestsPeopleAntibody: number,
    positiveTestsPeopleAntigen: number,
    positiveTestsViral: number,
    score: number,
    state: string,
    total: number,
    totalTestEncountersViral: number,
    totalTestResults: number,
    totalTestResultsIncrease: number,
    totalTestResultsSource: number,
    totalTestsAntibody: number,
    totalTestsAntigen: number,
    totalTestsPeopleAntibody: number,
    totalTestsPeopleAntigen: number,
    totalTestsPeopleViral: number,
    totalTestsViral: number
}

export async function getStatesCurrent(): Promise<StateStatistics[]> {
    return ((await axios.get<StateStatistics[]>(baseUrl + "v1/states/current.json")).data as StateStatistics[]);
}


export async function getSingleStateDaily(state: string): Promise<StateStatistics[]> {
    return (await axios.get(baseUrl + `v1/states/${state}/current.json`)).data as StateStatistics[];
}