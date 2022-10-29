/*
 * @Author: lubenben
 * @Date: 2022-06-27 18:48:09
 * @LastEditors: lubenben
 * @LastEditTime: 2022-10-19 11:52:40
 */
import React, { useContext, useEffect, useState } from 'react'

import { Button, Checkbox, Form, message, Select, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { OtterFormInput, OtterFormTextArea } from 'otter-pro'
import { ut } from 'otter-pro/es/i18n'

import { useGlobalModel, useCapabilityModel, useCapabilityService } from '@/models'

import { CapabilityContext } from '../../context'

const { Option } = Select

const BasicInfo = () => {
  const { t } = ut()
  const [form] = useForm()
  const { projectId } = useGlobalModel()
  const [loading, setLoading] = useState(false)
  const { selectList, taskList, page, pageSize, detail } = useCapabilityModel()
  const { capabilityId, selectedState, setIsCollectionVisible, isView } =
    useContext(CapabilityContext)
  const [capabilityList, setCapabilityList] = useState([])
  const {
    getAiTasksService,
    getAiCapabilitiesService,
    createAiCapabilityService,
    updateAiCapabilityService,
  } = useCapabilityService()

  useEffect(() => {
    if (capabilityId && detail) {
      setCapabilityList(selectList.filter((item) => item.id !== detail.ai_capability.id))
    } else {
      setCapabilityList(selectList)
    }
  }, [selectList, capabilityId, detail])

  const initial = {
    title: '',
    description: '',
    ai_task: '',
    ai_capability: '',
  }

  const initData = async () => {
    setLoading(true)
    await getAiCapabilitiesService(
      projectId,
      {
        page: 1,
        page_size: 200,
        'filter_args.state': selectedState,
        'filter_args.is_share': false,
      },
      true,
    )
    await getAiTasksService(projectId, { page: 1, page_size: 200 })
    setLoading(false)
  }

  useEffect(() => {
    projectId && initData()
  }, [projectId])

  const init = () => {
    if (capabilityId && detail) {
      form.setFieldsValue({
        title: detail?.ai_capability?.title,
        description: detail?.ai_capability?.description,
        ai_task: detail?.ai_task?.title,
        ai_capability: detail?.parent_ai_capability?.title,
        is_pre_annotation_with_text_recognition:
          detail?.ai_capability?.is_pre_annotation_with_text_recognition,
      })
    } else {
      form.setFieldsValue({
        title: '',
        description: '',
        ai_task: undefined,
        ai_capability: undefined,
        is_pre_annotation_with_text_recognition: false,
      })
    }
  }

  useEffect(() => {
    init()
  }, [detail, capabilityId])

  const save = async ({
    title,
    description,
    ai_task,
    ai_capability,
    is_pre_annotation_with_text_recognition,
  }) => {
    setLoading(true)
    if (capabilityId) {
      const mask = 'description,parent_ai_capability_id,is_pre_annotation_with_text_recognition'
      const update_mask =
        detail?.ai_capability?.title !== title
          ? { update_mask: 'title,' + mask }
          : { update_mask: mask }

      const prop = {
        title,
        description,
        is_pre_annotation_with_text_recognition,
        parent_ai_capability_id:
          ai_capability === detail?.parent_ai_capability?.title
            ? detail?.parent_ai_capability?.id
            : ai_capability,
      }

      const [err] = await updateAiCapabilityService(projectId, capabilityId, update_mask, prop)
      if (err) {
        if (err.details) {
          message.error(err.message)
        }
      } else {
        message.success('更新AI能力成功')
      }
    } else {
      const prop = ai_capability
        ? {
            ai_capability: {
              title,
              description,
              is_pre_annotation_with_text_recognition,
            },
            ai_task_id: ai_task,
            ai_capability_id: ai_capability,
          }
        : {
            ai_capability: {
              title,
              description,
              is_pre_annotation_with_text_recognition,
            },
            ai_task_id: ai_task,
          }
      const [err]: any = await createAiCapabilityService(projectId, prop)
      if (err) {
        if (err.details) {
          message.error(err.message)
        }
      } else {
        const params = {
          page,
          page_size: pageSize,
          'filter_args.state': selectedState,
        }
        await getAiCapabilitiesService(projectId, params)
        message.success(t('创建AI能力成功'))
      }
    }

    setLoading(false)
    setIsCollectionVisible(false)
  }

  const handleCancel = () => {
    setIsCollectionVisible(false)
  }

  return (
    <Spin spinning={loading}>
      <Form
        name="info"
        className=" max-w-5xl flex-1"
        style={{ margin: 'auto' }}
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={initial}
        onFinish={save}
        autoComplete="off"
      >
        <Form.Item
          label={t('common.list.title')}
          name="title"
          rules={[{ required: true, message: t('common.placeholder.title') }]}
        >
          <OtterFormInput
            maxLength={32}
            readOnly={isView}
            placeholder={t('common.placeholder.title')}
          />
        </Form.Item>
        <Form.Item label={t('common.list.description')} name="description">
          <OtterFormTextArea
            rows={4}
            maxLength={256}
            readOnly={isView}
            placeholder={t('common.placeholder.description')}
          />
        </Form.Item>
        <Form.Item
          label="AI任务"
          name="ai_task"
          rules={[{ required: true, message: t('common.placeholder.title') }]}
        >
          <Select
            placeholder="请选择AI任务"
            disabled={capabilityId || isView}
            dropdownClassName="overlay-3"
          >
            {taskList.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="父AI能力" name="ai_capability">
          <Select
            placeholder="请选择AI能力"
            allowClear
            disabled={isView}
            dropdownClassName="overlay-3"
          >
            {capabilityList.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="is_pre_annotation_with_text_recognition" valuePropName="checked">
          <Checkbox disabled={isView}>是否使用通用文字预标注</Checkbox>
        </Form.Item>
        {!isView && (
          <Form.Item className=" text-right">
            {!capabilityId && (
              <Button onClick={handleCancel} className=" mr-4">
                {t('common.actions.cancel')}
              </Button>
            )}
            <Button type="primary" htmlType="submit">
              {t('common.actions.ok')}
            </Button>
          </Form.Item>
        )}
      </Form>
    </Spin>
  )
}

export default BasicInfo
