import React, {useEffect, useState} from "react";
import {AllStateOptions, NationMap, StateAbbreviations} from "./NationMap";
import {Card, Slider} from "@blueprintjs/core";
import styles from "./NationMapPage.module.css"
import {useStore, useWrappedDispatch} from "../../store/Hooks";
import * as actions from "./NationMapActions";
import {StateStatistics} from "../../api/CovidTrackingProject";
import {Filter} from "../filter/Filter";
import {mapFilter} from "./NationMapReducers";
import {SelectedState, setFilter, setSelectedState} from "./NationMapActions";

function extractAndScaleData(stateData: StateStatistics[], stat: keyof StateStatistics) {
    const numeric = stateData.map((o) => ({ state: o.state, value: +(o[stat] ?? -1)}));
    const max = Math.max(...numeric.filter((x) => x).map((x) => x.value));
    const min = Math.min(...numeric.filter((x) => x).map((x) => x.value));

    const colors = numeric.map(({ state, value }) => {
        let color = "#aaaaaa";
        if (value >= 0) {
            let scale = (Math.log(value) / Math.log(max) * .65) + (value / max * 0.35);
            color = colorConvert(scale);
        }
        return {
            state,
            value,
            color
        }
    });

    return colors;
}

function colorConvert(numeric: number) {
    return '#' + Math.ceil(255 - numeric * 255).toString(16).padStart(2, '0') + '0000'
}

function hoverContents(state: SelectedState, key: keyof StateStatistics) {
    return (<div>
        <div>{state.name}</div>
        { state.statistics && <div>{state.statistics[key]}</div> }
    </div>)
}

export function NationMapPage() {

    const requestStateStates = useWrappedDispatch(() => actions.requestStateStats);
    const stateStats = useStore((store) => store.stateStats)
    useEffect(() => {
        if (stateStats.notRequested) {
            requestStateStates();
        }
    }, [stateStats.notRequested, requestStateStates]);
    const handleSetFilter = useWrappedDispatch(setFilter);
    const handleSetActiveState = useWrappedDispatch(setSelectedState)
    const mapFilter = useStore((s) => s.mapFilter);
    const activeState = useStore((s) => s.mapHover);

    if (!stateStats || !stateStats.data || !stateStats.success) {
        return (<div>Loading...</div>);
    }

    let stateColors = extractAndScaleData(stateStats.data, mapFilter.selected);
    let options: AllStateOptions = {};
    for (const color of stateColors) {
        options[color.state as StateAbbreviations] = { color: color.color };
    }



    return (
        <>
            <Card>
                <Filter  selected={[mapFilter.selected]} open={true} onToggleOpen={() => {}} onDataPointChanged={(dp, checked) => handleSetFilter(dp.key) }  dataPoints={mapFilter.dataPoints} />
            </Card>
            <Card className={styles.mapPage}>
                <div className={styles.mapWrapper}>
                    <NationMap onStateHover={handleSetActiveState} states={options} renderPopup={() => hoverContents(activeState, mapFilter.selected)} />
                </div>
            </Card>
        </>);
}