import React from 'react';

import { Line } from '@ant-design/plots';

const DemoLine = () => {
  const data = [
    {
      year: '2022年02月25日',
      value: 3569,
    },
    {
      year: '2022年02月26日',
      value: 4890,
    },
    {
      year: '2022年02月27日',
      value: 3500,
    },
    {
      year: '2022年02月28日',
      value: 5346,
    },
    {
      year: '2022年03月01日',
      value: 4900,
    },
    {
      year: '2022年03月02日',
      value: 6003,
    },
    {
      year: '2022年03月03日',
      value: 7370,
    },
    {
      year: '2022年03月04日',
      value: 9903,
    },
    {
      year: '2022年03月05日',
      value: 13034,
    },
  ];
  const config = {
    data,
    height:300,
    xField: 'year',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };
  return <Line {...config} />;
};

export default DemoLine

