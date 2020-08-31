import React from 'react'

import { Chart, Line, Point, Tooltip } from "bizcharts";

// 数据源

function Lines(props) {
const {chartData} = props

  return (
    <Chart
      padding={[10, 20, 50, 40]}
      autoFit
      height={250}
      data={chartData}
      scale={{ value: { min: 0 } }}
    >
      <Line position="year*sales" />
      <Point position="year*sales" />
      <Tooltip showCrosshairs />
    </Chart>
  );
}

export default Lines
