import React, {useEffect} from "react";
import {AllStateOptions, NationMap, StateAbbreviations} from "./NationMap";
import {Card, Slider} from "@blueprintjs/core";
import styles from "./NationMapPage.module.css"
import {useStore, useWrappedDispatch} from "../../store/Hooks";
import * as actions from "./NationMapActions";
import {StateStatistics} from "../../api/CovidTrackingProject";

function extractAndScaleData(stateData: StateStatistics[], stat: keyof StateStatistics) {
    const numeric = stateData.map((o) => ({ state: o.state, value: +o[stat]}));
    const max = Math.max(...numeric.map((x) => x.value));
    const min = Math.min(...numeric.map((x) => x.value));

    const colors = numeric.map(({ state, value }) => {
      let scale = (Math.log(value) / Math.log(max) * .65) + (value / max * 0.35);
      return {
          state,
          value,
          scale,
          color: colorConvert(scale)
      }
    });
    console.log(colors);

    return colors;
}

function colorConvert(numeric: number) {
    return '#' + Math.ceil(255 - numeric * 255).toString(16).padStart(2, '0') + '0000'
}

export function NationMapPage() {

    const requestStateStates = useWrappedDispatch(() => actions.requestStateStats);
    const stateStats = useStore((store) => store.stateStats)
    useEffect(() => {
        if (stateStats.notRequested) {
            requestStateStates();
        }
    }, [stateStats.notRequested, requestStateStates]);

    if (!stateStats || !stateStats.data || !stateStats.success) {
        return (<div>Loading...</div>);
    }

    let stateColors = extractAndScaleData(stateStats.data, "positive");
    let options: AllStateOptions = {};
    for (const color of stateColors) {
        options[color.state as StateAbbreviations] = { color: color.color };
    }

    return (
        <Card className={styles.mapPage}>
            <div className={styles.mapWrapper}>
                <NationMap onStateClicked={(state:string)=>alert(state)} states={options} />
            </div>
        </Card>);
}