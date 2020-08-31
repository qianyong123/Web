
import React from 'react'
import {
    Chart,
    Interval,
    Tooltip,
    Axis,
    Coordinate,
    Interaction
  } from 'bizcharts';
  
  function Pie(props) {
      const {chartData} = props
    const data = [
      { item: '事例一', count: 40, percent: 0.4 },
      { item: '事例二', count: 21, percent: 0.21 },
      { item: '事例三', count: 17, percent: 0.17 },
      { item: '事例四', count: 13, percent: 0.13 },
      { item: '事例五', count: 9, percent: 0.09 },
    ];
  
    const cols = {
      percent: {
        // formatter: val => {
        //   val = val * 100 + '%';
        //   return val;
        // },
      },
    };
  
  
    return (
      <Chart height={400} data={chartData} scale={cols} autoFit>
        <Coordinate type="theta" radius={0.75} />
        <Tooltip showTitle={false} />
        <Axis visible={false} />
        <Interval
          position="sales"
          adjust="stack"
          color="year"
          style={{
            lineWidth: 1,
            stroke: '#fff',
          }}
          label={['sales', {
            content: (chartData) => {
              return `${chartData.year}`;
            },
          }]}
        />
        <Interaction type='element-single-selected' />
      </Chart>
    );
  }

export default Pie
