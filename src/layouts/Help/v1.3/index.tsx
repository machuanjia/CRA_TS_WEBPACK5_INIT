/*
 * @Author: lubenben
 * @Date: 2022-07-26 10:46:52
 * @LastEditors: lubenben
 * @LastEditTime: 2022-09-01 18:00:28
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
          <Text type='link' className=' text-lg'>V1.3.0 机器学习平台</Text>
          <aside className=' text-holder text-xs mt-1'>6月9日~7月15日</aside>
        </header>
        <div className='mt-4 overflow-auto'>
          <img src={url} />
          <div className=" mt-2 text-medium text-base">更新：</div>
          <div className='mt-4'>
            <div className=" mt-2 text-medium text-base">训练任务:</div>
            <div className=" mt-2 text-medium text-sm">1. 【新增】创建、运行、停止、删除训练任务，支持指定使用的gpu、cpu、memory的型号和数量。</div>
            <div className=" mt-2 text-medium text-sm">2. 【新增】支持查看训练任务关联的代码、预训练模型、数据集、超参数、算力、产出模型和日志。</div>
          </div>

          <Divider/>

          <div className='mt-4'>
            <div className=" mt-2 text-medium text-base">AI能力：</div>
            <div className=" mt-2 text-medium text-sm">1. 【新增】支持AI引擎、AI能力、AI能力与数据集标签关系的增删改查。AI能力支持设置共享、独享。</div>
            <div className=" mt-2 text-medium text-sm">2. 【新增】标注模板支持版本控制，支持使用新版本的模板订正旧模板的标注结果。</div>
            <div className=" mt-2 text-medium text-sm">3. 【新增】自定义AI能力支持使用通用文字识别进行预标注。</div>
            <div className=" mt-2 text-medium text-sm">4. 【新增】提交单张图片标注结果时增加正确性校验。</div>
            <div className=" mt-2 text-medium text-sm">5. 【优化】数据集版本页面支持展示标注模板。</div>
          </div>
          <Divider/>

          <div className='mt-4'>
            <div className=" mt-2 text-medium text-base">其他：</div>
            <div className=" mt-2 text-medium text-sm">1. 【优化】模型管理：创建模型时自动同步到laiye ops系统。</div>
            <div className=" mt-2 text-medium text-sm">2. 【优化】模型管理：支持pytorch类型checkpoint。</div>
            <div className=" mt-2 text-medium text-sm">3. 【新增】标注任务：增加管理员角色，创建标注任务时将创建者默认设置为管理员。</div>
            <div className=" mt-2 text-medium text-sm">4. 【优化】iframe页面展示数据集、版本、数据、标注任务详情。</div>
            <div className=" mt-2 text-medium text-sm">5. 【优化】cvat通过上下左右快捷键可以调整位置；iframe页面展示所有快捷键提示。</div>
            <div className=" mt-2 text-medium text-sm">6. 【优化】项目管理：项目列表页展示用户角色</div>
            <div className=" mt-2 text-medium text-sm">7. 【优化】菜单栏支持展开、收起。</div>
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
