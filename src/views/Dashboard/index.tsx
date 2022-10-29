/*
 * @Author: D.Y.M
 * @Date: 2021-10-26 14:27:41
 * @LastEditTime: 2022-02-25 16:28:30
 * @FilePath: /main/src/views/Dashboard/index.tsx
 * @Description:
 */

import { Component } from 'react'

import { Col, Row } from 'antd'

import Apps from './components/app'
import DemoColumn from './components/bar'
import Card from './components/card'
import Help from './components/help'
import Info from './components/info'
import DemoLine from './components/line'

class Dashboard extends Component {
  render() {
    return (
        <div className='h-full overflow-x-hidden overscroll-y-auto p-9'>
          <Row gutter={12}>
            <Col span={8}>
              <Card title="简介">
                <Info />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="应用">
                <Apps />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="使用指南">
                <Help />
              </Card>
            </Col>
          </Row>
          <Row gutter={12} className='mt-3'>
            <Col span={12}>
              <Card title="标注任务">
                <DemoColumn/>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="标注燃尽图">
                <DemoLine/>
              </Card>
            </Col>
          </Row>
        </div>
    )
  }
}
export default Dashboard
