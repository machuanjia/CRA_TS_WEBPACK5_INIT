/*
 * @Author: D.Y.M
 * @Date: 2022-02-26 06:25:09
 * @LastEditTime: 2022-02-28 15:08:51
 * @FilePath: /main/src/layouts/Step/index.tsx
 * @Description:
 */
import { useContext } from 'react'

import { CloseOutlined } from '@ant-design/icons'
import { Timeline } from 'antd'
import { Icon, Text } from 'otter-pro'

import { toogleAppClass } from '@/utils'

import { MainContext } from '../context'

const Step = () => {
  const { isStepVisible, setIsStepVisible } = useContext(MainContext)
  const toggleStep = () => {
    const temp = !isStepVisible
    setIsStepVisible(temp)
    localStorage.setItem('isStepVisible', temp.toString())
    toogleAppClass(temp, 'app-wrap-step')
  }
  return (
    <>
      {isStepVisible ? (
        <section
          className={`border-l border-medium  z-10 bg-main absolute right-0 top-0 bottom-0 flex flex-col  ${
            isStepVisible ? '' : 'hidden'
          }`}
        >
          <header className=" h-14 box-border  text-base flex flex-row items-center p-4">
            <div className="flex-1">
              <Text type="info">流程提醒</Text>
            </div>
            <Text className=" text-sm" type="link" onClick={toggleStep}>
              <CloseOutlined />
            </Text>
          </header>
          <div className="p-4 flex-1 overscroll-y-auto overflow-x-hidden">
            <Timeline>
              <Timeline.Item>
                <div className=" bg-primaryLight rounded-sm p-2 w-36">
                  <div className="text-base text-medium">
                    <Icon className="text-base" name="data" /> 数据
                  </div>
                  <div className="mt-2">
                    <Text type="info" className="text-xs">
                      上传训练数据和验证数据，并完成标注。
                    </Text>
                  </div>
                </div>
              </Timeline.Item>
              <Timeline.Item color="#b33f01">
                <div className=" bg-seriousLight rounded-sm p-2 w-36 mt-4">
                  <div className="text-base text-medium">
                    <Icon className="text-base" name="experiment" /> 实验
                  </div>
                  <div className="mt-2">
                    <Text type="info" className="text-xs">
                      使用预置模型在训练数据上优化效果，通过实验查看训练的过程和结果指标。
                    </Text>
                  </div>
                </div>
              </Timeline.Item>

              <Timeline.Item color="#086954">
                <div className=" bg-successLight rounded-sm p-2 w-36 mt-4">
                  <div className="text-base text-medium">
                    <Icon className="text-base" name="model" /> 模型
                  </div>
                  <div className="mt-2">
                    <Text type="info" className="text-xs">
                      将训练好的模型导入模型仓库管理起来。
                    </Text>
                  </div>
                </div>
              </Timeline.Item>

              <Timeline.Item color="#96020b">
                <div className=" bg-errorLight rounded-sm p-2 w-36 mt-4">
                  <div className="text-base text-medium">
                    <Icon className="text-base" name="test" /> 测试
                  </div>
                  <div className="mt-2">
                    <Text type="info" className="text-xs">
                      用验证数据集端到端评测模型效果，分析出现问题的原因。【回到数据/实验】
                    </Text>
                  </div>
                </div>
              </Timeline.Item>

              <Timeline.Item>
                <div className=" bg-primaryLight rounded-sm p-2 w-36 mt-4">
                  <div className="text-base text-medium">
                    <Icon className="text-base" name="publish" /> 发布
                  </div>
                  <div className="mt-2">
                    <Text type="info" className="text-xs">
                      将模型发布到线上，提供给业务方使用。
                    </Text>
                  </div>
                </div>
              </Timeline.Item>

              <Timeline.Item color="#b33f01">
                <div className=" bg-primaryLight rounded-sm p-2 w-36 mt-4">
                  <div className="text-base text-medium">
                    <Icon className="text-base" name="penetrate" /> 洞察
                  </div>
                  <div className="mt-2">
                    <Text type="info" className="text-xs">
                      持续观测、分析线上效果，发现模型隐藏缺陷，优化模型效果。
                    </Text>
                  </div>
                </div>
              </Timeline.Item>
            </Timeline>
          </div>
        </section>
      ) : (
        <Text type="link" className=" absolute top-4 right-4 z-10">
          <Icon onClick={toggleStep} name="shouqi" />
        </Text>
      )}
    </>
  )
}
export default Step
