
import React from 'react'

import { Chart, Interval,Tooltip } from 'bizcharts';

function Bar(props) {
    const {chartData} = props
  return <Chart height={250} autoFit data={chartData} placeholder>
    <Interval position="year*sales"  />
    <Tooltip shared />
  </Chart>
}


export default Bar


