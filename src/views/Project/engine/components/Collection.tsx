import React, { useContext, useEffect, useState } from 'react'

import { Button, Form, message, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { CollectionModal, OtterFormInput, OtterFormTextArea } from 'otter-pro'
import { ut } from 'otter-pro/es/i18n'

import { useEngineModel, useEngineService } from '@/models'

import { EngineContext } from '../../context'

const AiEngineCollection = () => {
  const { t } = ut()
  const [form] = useForm()
  const { page, pageSize, detail, setDetail } = useEngineModel()
  const { engineId, setEngineId, projectId, isCollectionVisible, setIsCollectionVisible } =
    useContext(EngineContext)
  const { getAiEnginesService, createAiEngineService, updateAiEngineService } = useEngineService()
  const [loading, setLoading] = useState(false)

  const initial = {
    title: '',
    description: '',
  }

  const init = () => {
    if(!form.setFieldsValue) {
      return
    }
    if (engineId && isCollectionVisible) {
      form.setFieldsValue({
        title: detail.title,
        description: detail.description,
      })
    } else {
      form.setFieldsValue({
        title: '',
        description: '',
      })
    }
  }

  useEffect(() => {
    init()
  }, [isCollectionVisible])

  const save = async ({ title, description }) => {
    setLoading(true)

    if (engineId) {
      const update_mask = detail.title !== title ? {} : { update_mask: 'description' }

      const [err] = await updateAiEngineService(projectId, engineId, update_mask, {
        title,
        description,
      })
      if (err) {
        if (err.details) {
          message.error(err.message)
        }
      } else {
        message.success(t('engine.collection.updateEngineSuccess'))
        form.setFieldsValue({
          title: '',
          description: '',
        })
      }
    } else {
      const [err] = await createAiEngineService(projectId, { title, description })
      if (err) {
        if (err.details) {
          message.error(err.message)
        }
      } else {
        const params = {
          page,
          page_size: pageSize,
        }
        await getAiEnginesService(projectId, params)
        message.success(t('engine.collection.createEngineSuccess'))
      }
    }

    setLoading(false)
    setEngineId(null)
    setIsCollectionVisible(false)
  }

  const handleCancel = () => {
    setEngineId(null)
    setDetail(null)
    setIsCollectionVisible(false)
  }

  return (
    <CollectionModal
      title={engineId ? t('common.actions.update') : t('common.actions.create')}
      isVisible={isCollectionVisible}
      onClose={() => setIsCollectionVisible(false)}
    >
      <Spin spinning={loading}>
        <Form
          name="basic"
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
            <OtterFormInput maxLength={32} placeholder={t('common.placeholder.title')} />
          </Form.Item>
          <Form.Item label={t('common.list.description')} name="description">
            <OtterFormTextArea
              rows={4}
              maxLength={256}
              placeholder={t('common.placeholder.description')}
            />
          </Form.Item>
          <Form.Item className=" text-right">
            <Button onClick={handleCancel} className=" mr-4">
              {t('common.actions.cancel')}
            </Button>
            <Button type="primary" htmlType="submit">
              {t('common.actions.ok')}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </CollectionModal>
  )
}

export default AiEngineCollection
