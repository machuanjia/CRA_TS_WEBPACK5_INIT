/*
 * @Author: lubenben
 * @Date: 2022-09-01 17:59:02
 * @LastEditors: lubenben
 * @LastEditTime: 2022-09-01 18:06:51
 */
import React from 'react'

import { Divider } from 'antd'
import { Text } from 'otter-pro'

import url from '../../../assets/release1.0.png'

const Help = () => {
  return (
    <div className="mt-6 flex-1 overflow-x-hidden overflow-y-auto">
      <section className="border-b border-medium mb-6">
        <header>
          <Text type="link" className=" text-lg">
            V2.1.0 机器学习平台
          </Text>
          <aside className=" text-holder text-xs mt-1">9月1日~10月25日</aside>
        </header>
        <div className="mt-4 overflow-auto">
          <img src={url} />
          <div className=" mt-2 text-medium text-base">【新增】</div>
          <div className="mt-4">
            <div className=" mt-2 text-medium text-base">测试任务:</div>
            <div className=" mt-2 text-medium text-sm">
              1.
              新增badcase页面，支持交互式查看单张图片识别错、误召回、漏召回的条目。支持三种验证码、文字识别和手写识别能力。
            </div>
            <div className=" mt-2 text-medium text-sm">
              2.
              新增效果分析页面，支持以时间、引擎、标注任务、数据集等维度查看统计报表，比对不同测试任务效果差异。
            </div>
            <div className=" mt-2 text-medium text-sm">
              3. 区分IDP测试环境和线上环境引擎，机器学习平台可同时评测两个环境的模型。
            </div>
          </div>

          <Divider />

          <div className=" mt-2 text-medium text-base">【优化】</div>
          <div className="mt-4">
            <div className=" mt-2 text-medium text-base">标注任务:</div>
            <div className=" mt-2 text-medium text-sm">
              1.
              增加权限相关功能：标注人员只能查看自己有权限操作的任务；管理员只能设置自己团队下成员的权限。
            </div>
            <div className=" mt-2 text-medium text-sm">
              2. 梳理预标注相关配置，支持选择是否预标注，增加基于过去标注结果重新标注逻辑。
            </div>
            <div className=" mt-2 text-medium text-sm">3. 自定义AI能力支持自动校对。</div>
            <div className=" mt-2 text-medium text-sm">
              4. 数字字母验证码、四则运算验证码支持预标注。
            </div>
            <div className=" mt-2 text-medium text-sm">
              5. 梳理标注模板校验规则，radio、checkbox类型属性支持新增option。
            </div>
            <div className=" mt-2 text-medium text-sm">
              6. 数据属性在cvat中展示为独立label，为常用AI能力增加图片角度字段。
            </div>
            <div className=" mt-2 text-medium text-sm">7. 优化列表页响应速度。</div>
          </div>
        </div>
        <footer className="mt-4 mb-4">{/* <Text type='primaryLink'>查看更多</Text> */}</footer>
      </section>
    </div>
  )
}

export default Help
