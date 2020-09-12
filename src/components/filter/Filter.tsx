import React from "react";
import {Button, Checkbox, Tag} from "@blueprintjs/core";
import styles from "./Filter.module.css";

export interface Datapoint {
    name: string;
    key: string;
    description: string;
}

export interface FilterProperties {
    open: boolean;
    onToggleOpen: (open: boolean) => void;
    dataPoints: Datapoint[];
    selected: string[];
    onDataPointChanged: (dataPoint: Datapoint, checked: boolean) => void
}

function FilterHeader( { dataPoints, open, onToggleOpen, onDataPointChanged, selected } : FilterProperties) {

    const tags = dataPoints.filter((dp) => selected.includes(dp.key)).map((dp) => <Tag key={dp.key} onRemove={() => onDataPointChanged(dp, false)}  >{dp.name}</Tag>)

    return (<div className={styles.filterHeader}>
        <Button className={styles.filterOpenClose} icon={ open ? "arrow-up" : "arrow-down" } onClick={() => onToggleOpen(!open)} minimal outlined />
        <span className={styles.filterTitle}>Filter</span>
        <div className={styles.filterTags}>
            {tags}
        </div>
    </div>);
}


export function Filter({ open, onToggleOpen, dataPoints, onDataPointChanged, selected } : FilterProperties) {

    const options =
        <div className={styles.filterTable} >
                {dataPoints.map((dp) => (<div onClick={() => onDataPointChanged(dp, !(dp.key in selected))} className={styles.filterRow}>
                    <div className={styles.filterCheck}>
                        <Checkbox label={dp.name} checked={selected.includes(dp.key)}  onClick={() => onDataPointChanged(dp, !selected.includes(dp.key))}  />
                    </div>
                    <div className={styles.filterDescription}>
                        {dp.description}
                    </div>
                </div>))}
        </div>

    const closedClass = open ? "" : " " + styles.closed;

    return (<div>
        <FilterHeader selected={selected} dataPoints={dataPoints} open={open} onToggleOpen={onToggleOpen} onDataPointChanged={onDataPointChanged} />
        <div id="filterBody" className={styles.filterContent + closedClass}>
            <div>
                {options}
            </div>
        </div>
    </div>)
}