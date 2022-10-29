import React, { useContext, useEffect, useState } from 'react'

import { Spin, message, Tabs } from 'antd'
import to from 'await-to-js'
import { CollectionModal } from 'otter-pro'
import { ut } from 'otter-pro/es/i18n'

import {
  searchUsers,
  getTeamDetail,
  getProjectPermission,
  addProjectPermission,
  deleteProjectPermission,
  updateProjectPermission,
} from '@/apis'
import DetailDescription from '@/components/DetailDescription'
import DetailTitle from '@/components/DetailTitle'
import SelectMember from '@/components/SelectMember'
import { useProjectModel, useProjectService, useAppModel } from '@/models'

import { ProjectContext } from '../context'
import SelectTeam from './SelectTeam'

const { TabPane } = Tabs

const ProjectDetail = () => {
  const { t } = ut()

  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { isProjectDetailVisible, setIsProjectDetailVisible, activeProjectId, setActiveProjectId } =
    useContext(ProjectContext)

  const { domains, info } = useAppModel()
  const [domainId, setDomainId] = useState()
  const { rolesList, permissionList } = useProjectModel()
  const { getProjectDetailService, updateProjectService, getProjectRolesService } =
    useProjectService()

  const initDomainId = () => {
    const id = domains.find((item) => item.title === '项目')?.id
    setDomainId(id)
  }

  const initDetail = async () => {
    setLoading(true)

    if (activeProjectId) {
      const [err, data]: any = await getProjectDetailService(activeProjectId)
      const domainId = domains.find((item) => item.title === '项目')?.id
      await getProjectRolesService(domainId)

      if (!err) {
        const { title, description } = data
        setTitle(title)
        setDescription(description)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    initDomainId()
  }, [domains])

  useEffect(() => {
    initDetail()
  }, [isProjectDetailVisible])

  const handleClose = () => {
    setActiveProjectId(null)
    setIsProjectDetailVisible(false)
  }

  const updateTitle = async (title: string) => {
    setTitle(title)
    const [err] = await updateProjectService(activeProjectId, { update_mask: 'title' }, { title })
    if (err) {
      message.error(t('project.msg.updateFailed'))
    } else {
      message.success(t('project.msg.updateSuccess'))
    }
  }

  const updateDescription = async (description: string) => {
    const [err] = await updateProjectService(
      activeProjectId,
      { update_mask: 'description' },
      { title, description },
    )
    if (err) {
      message.error(t('project.msg.updateFailed'))
    } else {
      message.success(t('project.msg.updateSuccess'))
    }
  }

  const handleSearchMember = async (searchText: string) => {
    const payload = {
      page: 1,
      page_size: 10,
      'filter_args.name': searchText,
      'filter_args.phone': searchText,
      'filter_args.email': searchText,
    }
    const [err, data]: any = await to(searchUsers(payload))

    if (!err) {
      const { users = [] } = data
      return [err, users]
    }

    return [err, data]
  }

  async function handleLoadMoreMember(payload: { page; page_size }) {
    const { page, page_size } = payload

    const params = {
      page,
      page_size,
      data_id: activeProjectId,
      type: 'MEMBER_TYPE_USER',
    }

    const [err, data] = await to(getProjectPermission(domainId, params))
    return [err, data]
  }

  const handleAddMember = async (params: { user_id: string; role_id: string }) => {
    const { user_id, role_id } = params
    const [err, data] = await to(
      addProjectPermission(domainId, { user_id, role_id, data_id: activeProjectId }),
    )
    return [err, data]
  }

  const handleUpdateMember = async (permissionId: string, roleId: string) => {
    const params = { role_id: roleId }
    const [err, data] = await to(updateProjectPermission(domainId, permissionId, params))
    return [err, data]
  }

  const handleDeleteMember = async (permissionId: string) => {
    const [err] = await to(deleteProjectPermission(domainId, permissionId))
    return [err]
  }

  const handleSearchTeam = async (teamId: string) => {
    const [err, data]: any = await to(getTeamDetail(teamId))
    return [err, data]
  }

  const handleLoadMoreTeam = async (payload: { page; page_size }) => {
    const { page, page_size } = payload

    const params = {
      page,
      page_size,
      data_id: activeProjectId,
      type: 'MEMBER_TYPE_TEAM',
    }

    const [err, data] = await to(getProjectPermission(domainId, params))

    return [err, data]
  }

  const handleAddTeam = async ({ teamId, roleId }) => {
    const [err, data] = await to(
      addProjectPermission(domainId, {
        team_id: teamId,
        role_id: roleId,
        data_id: activeProjectId,
      }),
    )
    return [err, data]
  }

  const handleUpdateTeam = async (permissionId: string, roleId: string) => {
    const params = { role_id: roleId }
    const [err] = await to(updateProjectPermission(domainId, permissionId, params))
    return [err]
  }

  const handleDeleteTeam = async (permissionId: string) => {
    const [err] = await to(deleteProjectPermission(domainId, permissionId))
    return [err]
  }

  return (
    <CollectionModal
      title="设置"
      entity={activeProjectId}
      isVisible={isProjectDetailVisible}
      onClose={handleClose}
    >
      <Spin spinning={loading}>
        <div className=" overflow-y-scroll" style={{ maxHeight: '70vh' }}>
          <DetailTitle
            disabled={!permissionList[activeProjectId]?.update}
            title={title}
            onSuccess={updateTitle}
          />
          <DetailDescription
            disabled={!permissionList[activeProjectId]?.update}
            description={description}
            onSuccess={updateDescription}
          />
          <Tabs defaultActiveKey="member">
            <TabPane tab="成员" key="member">
              <SelectMember
                userId={info?.id}
                onSearch={handleSearchMember}
                onAdd={handleAddMember}
                onUpdate={handleUpdateMember}
                onLoadMore={handleLoadMoreMember}
                onDelete={handleDeleteMember}
                rolesList={rolesList}
                addMember={permissionList[activeProjectId]?.add_member}
                listMember={permissionList[activeProjectId]?.list_member}
              />
            </TabPane>
            <TabPane tab="团队" key="team">
              <SelectTeam
                onSearch={handleSearchTeam}
                onAdd={handleAddTeam}
                onUpdate={handleUpdateTeam}
                onLoadMore={handleLoadMoreTeam}
                onDelete={handleDeleteTeam}
                rolesList={rolesList}
              />
            </TabPane>
          </Tabs>
        </div>
      </Spin>
    </CollectionModal>
  )
}

export default ProjectDetail
