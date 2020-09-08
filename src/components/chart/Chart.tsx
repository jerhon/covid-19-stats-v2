import React from "react";

import { Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip} from "recharts";
import {Datapoint} from "../filter/Filter";


export interface ChartProperties<TData> {
    dataPoints: Datapoint[];
    data: TData[];
}

export function Chart<TData extends object>({dataPoints, data}: ChartProperties<TData>) {

    const lines = dataPoints
        .filter((adp) => adp.selected)
        .map((adp) =>  <Line key={adp.key}
                            name={adp.name}
                            type="monotone"
                            dataKey={adp.key}
                            stroke="#8884d8"
                            animationDuration={250}
                            dot={false}
                             strokeWidth={3}
        />)

    return (

        <ResponsiveContainer width="100%" height={600}>
            <LineChart data={data} >
                <XAxis dataKey="name" />
                <YAxis/>
                <Legend />
                <Tooltip />
                {lines}
            </LineChart>
        </ResponsiveContainer>);
}