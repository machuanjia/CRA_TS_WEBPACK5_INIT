/*
 * @Author: lubenben
 * @Date: 2022-09-01 17:59:02
 * @LastEditors: lubenben
 * @LastEditTime: 2022-09-01 18:06:51
 */
import React from 'react'

import { Divider } from 'antd'
import { Text } from 'otter-pro'

import url  from "../../../assets/release1.0.png"


const Help = () => {
  return (
    <div className='mt-6 flex-1 overflow-x-hidden overflow-y-auto'>
      <section className='border-b border-medium mb-6'>
        <header>
          <Text type='link' className=' text-lg'>V2.0.0 机器学习平台</Text>
          <aside className=' text-holder text-xs mt-1'>7月18日~8月31日</aside>
        </header>
        <div className='mt-4 overflow-auto'>
          <img src={url} />
          <div className=" mt-2 text-medium text-base">【新增】</div>
          <div className='mt-4'>
            <div className=" mt-2 text-medium text-base">自动校对:</div>
            <div className=" mt-2 text-medium text-sm">1. 【新增】标注任务增加自动校对页面，支持对历史数据批量执行自动校对任务。单张图片进入验收状态自动生成校对结果。</div>
            <div className=" mt-2 text-medium text-sm">2. 【新增】支持在cvat上展示与不同引擎的diff结果，页面支持根据校对指标排序。</div>
            <div className=" mt-2 text-medium text-sm">2. 【新增】目前支持文字识别、3种验证码校对。</div>
          </div>

          <Divider/>

          <div className='mt-4'>
            <div className=" mt-2 text-medium text-base">测试任务:</div>
            <div className=" mt-2 text-medium text-sm">1. 【新增】支持选择AI引擎、AI能力、数据集发起测试任务。</div>
            <div className=" mt-2 text-medium text-sm">2. 【新增】支持查看数据集维度和数据维度的指标，不同AI能力展示不同指标。</div>
            <div className=" mt-2 text-medium text-sm">3. 【新增】支持为AI能力添加默认测试数据集。</div>
            <div className=" mt-2 text-medium text-sm">4. 【新增】目前支持文字识别、3种验证码测试。</div>
          </div>
          <Divider/>

          <div className='mt-4'>
            <div className=" mt-2 text-medium text-base">其他：</div>
            <div className=" mt-2 text-medium text-sm">1. 【优化】训练任务：支持通过筛选控件选择数据集</div>
            <div className=" mt-2 text-medium text-sm">2. 【新增】AI能力：支持导入导出</div>
            <div className=" mt-2 text-medium text-sm">3. 【优化】数据合成：使用资源前端可配置</div>
            <div className=" mt-2 text-medium text-sm">4. 【新增】模型管理：模型仓库支持配置AI能力</div>
            <div className=" mt-2 text-medium text-sm">5. 【新增】标注工具：支持标注椭圆</div>
            <div className=" mt-2 text-medium text-sm">6. 【优化】所有资源创建、更新时不允许重名</div>
            <div className=" mt-2 text-medium text-sm">7. 【优化】程序重启时，未完成的异步任务自动重试</div>
          </div>
        </div>
        <footer className='mt-4 mb-4'>
          {/* <Text type='primaryLink'>查看更多</Text> */}
        </footer>
      </section>
    </div>
  )
}

export default Help
