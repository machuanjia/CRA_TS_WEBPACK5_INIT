/*
 * @Author: D.Y.M
 * @Date: 2022-02-25 15:49:19
 * @LastEditTime: 2022-02-25 16:24:46
 * @FilePath: /main/src/views/Dashboard/components/bar/index.tsx
 * @Description: 
 */
import React from 'react';

import { Column } from '@ant-design/plots';

const DemoColumn = () => {
  const data = [
    {
      type: '通用文字识别',
      sales: 3800,
    },
    {
      type: '通用表格识别',
      sales: 5200,
    },
    {
      type: '印章识别',
      sales: 6100,
    },
    {
      type: '验证码识别',
      sales: 14500,
    },
    {
      type: '通用卡证识别',
      sales: 4800,
    },
    {
      type: '通用票据识别',
      sales: 3800,
    }
  ];
  const config = {
    data,
    height:300,
    xField: 'type',
    yField: 'sales',
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '数量',
      },
    },
    maxColumnWidth: 50,
  };
  return <Column {...config} />;
};
 export default DemoColumn
