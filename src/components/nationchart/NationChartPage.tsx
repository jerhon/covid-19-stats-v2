import {Chart} from "../chart/Chart";
import {useStore, useWrappedDispatch} from "../../store/Hooks";
import {useEffect} from "react";
import {getNationStatistics, toggleDataPoint, toggleOpenFilter} from "./NationChartActions";
import React from "react";
import {Card} from "@blueprintjs/core";
import styles from "./NationChartPage.module.css";
import {Filter} from "../filter/Filter";

// type NationChart = typeof Chart<NationStatistics>;

export function NationChartPage() {
    const nationStatistics = useStore((s) => s.nationStatistics);
    let getData = useWrappedDispatch(() => getNationStatistics);
    const dataPoints = useStore((s) => s.nationFilter.dataPoints)

    const filterOpen = useStore((s) => s.nationFilter.isOpen);
    const handleFilterOpenChanged = useWrappedDispatch(toggleOpenFilter);
    const handleSwitchFilterOption = useWrappedDispatch(toggleDataPoint);

    useEffect(() => {
        if (nationStatistics.notRequested) {
            getData();
        }
    }, [nationStatistics.notRequested, getData]);


    if (!nationStatistics || !nationStatistics.data) {
        return (<div>Loading!</div>);
    }

    return (<div className={styles.container}>
        <Card className={styles.filter} style={{marginBottom: "16px", width: "100%"}}>
            <Filter open={filterOpen} onToggleOpen={handleFilterOpenChanged} dataPoints={dataPoints} onDataPointChanged={(dp) => handleSwitchFilterOption(dp.key)} />
        </Card>
        <Card className={styles.graph}>
            <div style={{fontWeight: "bolder", marginBottom: "16px"}}>Chart</div>
            <Chart dataPoints={dataPoints} data={nationStatistics.data} />
        </Card>
    </div>);
}