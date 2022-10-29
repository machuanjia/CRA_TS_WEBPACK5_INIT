/*
 * @Author: D.Y.M
 * @Date: 2021-11-22 17:12:05
 * @LastEditTime: 2022-07-22 10:51:49
 * @FilePath: /main/src/views/Project/components/CollectionForm.tsx
 * @Description:
 */
import React, { useState } from 'react'

import { Button, Form, message, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { OtterFormInput, OtterFormTextArea } from 'otter-pro'
import { ut } from 'otter-pro/es/i18n'

import { useProjectModel, useProjectService } from '@/models'

const ProjectCollectionForm = ({ setIsProjectCollectionVisible, setProjectId }) => {
  const { t } = ut()
  const [form] = useForm()
  const { createProjectService, getProjectsService } = useProjectService()
  const { page, pageSize } = useProjectModel()
  const [loading, setLoading] = useState(false)
  const initial = {
    title: '',
    description: '',
  }

  const save = async ({ title, description }) => {
    setLoading(true)
    const [err] = await createProjectService({ title, description })
    if (err) {
      message.error(t('project.msg.createFailed'))
    } else {
      const params = {
        page,
        page_size: pageSize,
      }
      await getProjectsService(params)
      message.success(t('project.msg.createSuccess'))
    }
    setLoading(false)
    setIsProjectCollectionVisible(false)
  }
  const onFinishFailed = () => {}
  const handleCancel = () => {
    setProjectId(null)
    setIsProjectCollectionVisible(false)
  }
  return (
    <Spin spinning={loading}>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={initial}
        onFinish={save}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="名称" name="title" rules={[{ required: true, message: '请输入名称!' }]}>
          <OtterFormInput maxLength={32} placeholder="请输入名称" />
        </Form.Item>
        <Form.Item label="描述" name="description">
          <OtterFormTextArea rows={4} maxLength={256} placeholder="请输入描述" />
        </Form.Item>
        <Form.Item className=" text-right">
          <Button onClick={handleCancel} className=" mr-4">
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default ProjectCollectionForm
