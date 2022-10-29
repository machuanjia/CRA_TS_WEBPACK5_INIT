/*
 * @Author: lubenben
 * @Date: 2022-07-02 20:19:02
 * @LastEditors: lubenben
 * @LastEditTime: 2022-09-07 15:46:22
 */
import React, { useContext, useEffect, useState } from 'react'

import { Button, Form, message, Spin } from 'antd'
import { createTaskList } from 'async-task-mapping'
import { CollectionModal, OtterFormTextArea } from 'otter-pro'
import { MODAL_SIZE } from 'otter-pro/es/constants'
import { ut } from 'otter-pro/es/i18n'
import MonacoEditor from 'react-monaco-editor'
import { useParams } from 'react-router-dom'

import { useCapabilityTemplateService, useGlobalModel } from '@/models'

import { TemplateContext } from '../../../context'

// @info: 初始化一个任务列表，一个组件内可以同时初始化多个
const taskList = createTaskList({ordered: false, requestCount: 1, responseCount: 2})

const TemplateCollection = () => {
  const { t } = ut()
  const { capabilityId } = useParams()
  const [code, setCode] = useState<string>()
  const { projectId } = useGlobalModel()
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('')
  const { templateID, isTemplateCollection, setIsTemplateCollection } = useContext(TemplateContext)
  const { createTemplateService, getTemplateDetailService } = useCapabilityTemplateService()
  const [isReadonly, setIsReadonly] = useState(false)

  const init = () => {
    setCode('')
    setDescription('')
  }

  const handleClose = () => {
    setIsReadonly(false)
    setIsTemplateCollection(false)
  }

  const initData = async () => {
    setLoading(true)

    const [err, data]: any = await getTemplateDetailService(projectId, capabilityId, templateID)

    if (!err) {
      const { description, spec } = data

      setCode(JSON.stringify(spec, null, '\t'))
      setDescription(description)
    } else {
      message.error(err)
    }
    // @info: 完成接口请求任务
    taskList.pushResponse(null)
    
    setLoading(false)
  }

  useEffect(() => {
    // @info: 判断条件前置，一进页面就可以判断
    if (templateID && isTemplateCollection) {
      initData()
      // @info: taskList也可以用await，但是eslint规定不能把useEffect写成async函数，所以用then
      taskList.request().then(() => {
        setIsReadonly(true)
      })
    } else {
      init()
    }
  }, [isTemplateCollection])

  const handleCreate = async () => {
    let spec = {}
    try {
      spec = JSON.parse(code)
    } catch (error) {
      message.error('JSON 格式不对!')
      return
    }

    setLoading(true)
    const props = {
      description,
      spec,
    }
    const [err] = await createTemplateService(projectId, capabilityId, { template: props })

    if (!err) {
      message.success('创建标注模板成功')
      handleClose()
    }

    setLoading(false)
  }

  const handleDidMountEditor = (e) => {
    if (templateID) {
      // @info: 完成渲染任务
      taskList.pushResponse(null)
    } else {
      e.focus()
      init()
      setIsReadonly(false)
    }
  }

  const handleEditor = (value) => {
    setCode(value)
  }

  return (
    <CollectionModal
      title={!templateID ? t('common.actions.create') : '查看'}
      isVisible={isTemplateCollection}
      width={MODAL_SIZE.LG}
      onClose={handleClose}
    >
      <Spin spinning={loading}>
        <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          <Form.Item>
            <MonacoEditor
              width="100%"
              height={!templateID ? 400 : 600}
              language="json"
              theme="vs-dark"
              value={code}
              options={{ readOnly: isReadonly }}
              onChange={(value) => handleEditor(value)}
              editorDidMount={(e) => handleDidMountEditor(e)}
            />
          </Form.Item>
          {!templateID && (
            <>
              <Form.Item label={t('common.list.description')}>
                <OtterFormTextArea
                  rows={4}
                  maxLength={256}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('common.placeholder.description')}
                />
              </Form.Item>
              <Form.Item className=" text-right">
                <Button onClick={handleClose} className=" mr-4">
                  {t('common.actions.cancel')}
                </Button>
                <Button type="primary" onClick={handleCreate}>
                  {t('common.actions.ok')}
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Spin>
    </CollectionModal>
  )
}

export default TemplateCollection
