/*
 * @Author: D.Y.M
 * @Date: 2021-11-22 17:12:05
 * @LastEditTime: 2022-07-19 15:58:31
 * @FilePath: /main/src/views/Team/components/Collection.tsx
 * @Description:
 */
import React, { useContext, useState, useEffect } from 'react'

import { message, Spin, Form, Button } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { CollectionModal, OtterFormInput, OtterFormTextArea } from 'otter-pro'
import { ut } from 'otter-pro/es/i18n'

import type { ITeam } from '@/interfaces'
import { useTeamService } from '@/models'

import { TeamContext } from '../context'

const TeamCollection = () => {
  const { t } = ut()
  const [form] = useForm()
  const { isTeamCollectionVisible, setIsTeamCollectionVisible, teamId } = useContext(TeamContext)
  const { createTeamService, getTeamDetailService } = useTeamService()
  const handleClose = () => {
    setIsTeamCollectionVisible(false)
  }
  const [loading, setLoading] = useState(true)
  const initial = {
    title: '',
    description: '',
  }
  const initForm = (title = '', description = '') => {
    form.setFieldsValue({
      title,
      description,
    })
    setLoading(false)
  }
  const initDetail = async () => {
    if (teamId) {
      const [err, data]: (ITeam | any)[] = await getTeamDetailService(teamId)
      if (!err) {
        const { title, description } = data
        initForm(title, description)
      }
    } else {
      initForm()
    }
  }
  useEffect(() => {
    initDetail()
  }, [isTeamCollectionVisible])

  const save = async ({ title, description }) => {
    setLoading(true)
    const [err] = await createTeamService({ title, description })
    if (err) {
      message.error(t('team.msg.createFailed'))
    } else {
      message.success(t('team.msg.createSuccess'))
    }

    setLoading(false)
    setIsTeamCollectionVisible(false)
  }
  const onFinishFailed = () => {}
  return (
    <CollectionModal entity={teamId} isVisible={isTeamCollectionVisible} onClose={handleClose}>
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
            <Button className=" mr-4" onClick={handleClose}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </CollectionModal>
  )
}

export default TeamCollection
