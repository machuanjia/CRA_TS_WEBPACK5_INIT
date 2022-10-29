import React, { useContext, useEffect, useState } from 'react'

import { Spin, message } from 'antd'
import to from 'await-to-js'
import { CollectionModal } from 'otter-pro'
import { ut } from 'otter-pro/es/i18n'

import { searchUsers, getTeamMembers, addTeamMember, deleteTeamMember } from '@/apis'
import DetailDescription from '@/components/DetailDescription'
import DetailTitle from '@/components/DetailTitle'
import SelectMember from '@/components/SelectMember'
import { useAppModel, useTeamService } from '@/models'

import { TeamContext } from '../context'

const TeamDetail = () => {
  const { t } = ut()

  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { info } = useAppModel()
  const [currentId, setCurrentId] = useState('')
  const { isTeamDetailVisible, setIsTeamDetailVisible, teamId, setTeamId } = useContext(TeamContext)

  const { getTeamDetailService, updateTeamService } = useTeamService()

  const initDetail = async () => {
    if (teamId) {
      const [err, data]: any = await getTeamDetailService(teamId)
      if (!err) {
        const { title, description } = data

        setCurrentId(data.create_operation.creator.id)
        setTitle(title)
        setDescription(description)
      }
    }
  }

  useEffect(() => {
    initDetail()
    setLoading(false)
  }, [isTeamDetailVisible])

  const handleClose = () => {
    setTeamId(null)
    setIsTeamDetailVisible(false)
  }

  const updateTitle = async (title: string) => {
    setTitle(title)
    const [err] = await updateTeamService(teamId, { update_mask: 'title' }, { title })
    if (err) {
      message.error(t('team.msg.updateFailed'))
    } else {
      message.success(t('team.msg.updateSuccess'))
    }
  }

  const updateDescription = async (description: string) => {
    const [err] = await updateTeamService(teamId, { update_mask: 'description' }, { title, description })
    if (err) {
      message.error(t('team.msg.updateFailed'))
    } else {
      message.success(t('team.msg.updateSuccess'))
    }
  }

  const onSearch = async (searchText: string) => {
    const payload = {
      page: 1,
      page_size: 10,
      'filter_args.name': searchText,
      'filter_args.phone': searchText,
      'filter_args.email': searchText,
    }
    const [err, data]: any = await to(searchUsers(payload))
    if (data) {
      const { users } = data
      return [err, users]
    }

    return [err, data]
  }

  const onLoadMore = async (payload: { page; page_size }) => {
    const { page, page_size } = payload
    const [err, data] = await to(getTeamMembers(teamId, { page, page_size }))
    return [err, data]
  }

  const onAdd = async (useId) => {
    const [err, data] = await to(addTeamMember(teamId, useId))
    return [err, data]
  }

  const onDelete = async (userId) => {
    const [err] = await to(deleteTeamMember(teamId, userId))
    return [err]
  }

  return (
    <CollectionModal
      title="设置"
      width={980}
      entity={teamId}
      isVisible={isTeamDetailVisible}
      onClose={handleClose}
    >
      <Spin spinning={loading}>
        <div className=" overflow-y-scroll" style={{ maxHeight: '70vh' }}>
          <DetailTitle disabled={currentId !== info.id} title={title} onSuccess={updateTitle} />
          <DetailDescription
            disabled={currentId !== info.id}
            description={description}
            onSuccess={updateDescription}
          />
          <SelectMember
            title="成员"
            createId={currentId}
            userId={info.id}
            onSearch={onSearch}
            onAdd={onAdd}
            onLoadMore={onLoadMore}
            onDelete={onDelete}
          />
        </div>
      </Spin>
    </CollectionModal>
  )
}

export default TeamDetail
