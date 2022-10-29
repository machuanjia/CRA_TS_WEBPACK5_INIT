/*
 * @Author: D.Y.M
 * @Date: 2021-10-20 15:09:45
 * @LastEditTime: 2022-07-06 17:34:50
 * @FilePath: /main/src/views/Project/List.tsx
 * @Description:
 */
import { useEffect, useState } from 'react'

import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, message, Switch } from 'antd'
import {
  Text,
  Icon,
  ContentLayout,
  Empty,
  OtterTable,
  OtterTableActionDelete,
  OtterTableActions,
  OtterTableFieldCreator,
  OtterTableFieldDate,
  OtterTableFieldDescription,
  OtterTableFieldTitle,
  OtterTableTitle,
} from 'otter-pro'
import { useDeleteConfirm } from 'otter-pro/es/hooks'
import { ut } from 'otter-pro/es/i18n'

import { useGlobalModel, useGlobalService, useProjectModel, useProjectService } from '@/models'

import ProjectCollection from './components/Collection'
import ProjectDetail from './components/Detail'
import { ProjectContext } from './context'

const { Search } = Input
const Project = () => {
  const { t } = ut()
  const [isProjectCollectionVisible, setIsProjectCollectionVisible] = useState(false)
  const [isProjectDetailVisible, setIsProjectDetailVisible] = useState(false)
  const [activeProjectId, setActiveProjectId] = useState('')
  const { getProjectsService, deleteProjectService } = useProjectService()
  const { list, page, pageSize, loading, total, permissionList, setPage } = useProjectModel()
  const { setGlobalProjectService } = useGlobalService()
  const { projectId } = useGlobalModel()
  const [DeleteConfirm] = useDeleteConfirm()
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    localStorage.setItem('activeProject', projectId)
  }, [])
  const onSearch = (val) => {
    setSearchText(val)
    let params = {}
    if (val) {
      setPage(1)
      params = {
        'filter_args.title': val,
        'filter_args.description': val,
      }
    }
    getProjectsService({
      page: 1,
      page_size: pageSize,
      ...params,
    })
  }

  const handleCreate = () => {
    setIsProjectCollectionVisible(true)
  }

  const Actions = () => {
    return (
      <div className="flex flex-row items-center">
        <Search
          className="search mr-2"
          enterButton={<SearchOutlined />}
          defaultValue={searchText}
          placeholder={t('common.placeholder.title')}
          onSearch={onSearch}
          allowClear
        />
        <Button className="icon-center" type="primary" onClick={handleCreate}>
          <PlusOutlined />
          {t('common.actions.create')}
        </Button>
      </div>
    )
  }

  const handleSetting = (id: string) => {
    setActiveProjectId(id)
    setIsProjectDetailVisible(true)
  }

  const handleDelete = (entity: any) => {
    DeleteConfirm({
      content: t('project.msg.delete', { title: entity.project.title }),
      handleOk: async () => {
        const [err] = await deleteProjectService(entity.project.id)
        if (err) {
          message.error(t('project.msg.deleteFailed'))
        } else {
          message.success(t('project.msg.deleteSuccess'))
        }
      },
    })
  }

  const handleStatus = (id) => {
    setGlobalProjectService(id)
    // window.location.href = window.location.href
  }

  const columns = [
    {
      title: t('common.list.title'),
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => {
        return (
          <div className="min-width-150">
            <OtterTableFieldTitle title={record?.project?.title} />
          </div>
        )
      },
    },
    {
      title: t('common.list.description'),
      dataIndex: 'description',
      key: 'description',
      render: (_, record) => {
        return <OtterTableFieldDescription description={record?.project?.description} />
      },
    },
    {
      title: t('common.list.creator'),
      dataIndex: 'creator',
      key: 'creator',
      width: 200,
      render: (text: string, record: any) => {
        return <OtterTableFieldCreator name={record?.project?.create_operation?.creator?.name} />
      },
    },
    {
      title: t('common.list.createTime'),
      dataIndex: 'create_time',
      key: 'create_time',
      width: 200,
      render: (text: string, record: any) => {
        return <OtterTableFieldDate date={record?.project?.create_operation?.create_time} />
      },
    },
    {
      title: t('project.list.role'),
      dataIndex: 'creator',
      key: 'creator',
      width: 110,
      align: 'center',
      render: (_: string, record: any) => {
        return <Text type="info">{record?.role?.title}</Text>
      },
    },
    {
      title: t('common.list.status'),
      dataIndex: 'active',
      key: 'active',
      align: 'center',
      width: 80,
      render: (text: string, record: any) => {
        return (
          <Switch
            checked={record?.project?.id === projectId}
            onChange={() => {
              handleStatus(record?.project?.id)
            }}
          />
        )
      },
    },
    {
      title: t('common.list.actions'),
      dataIndex: 'actions',
      key: 'actions',
      width: 160,
      render: (_: string, record: any) => {
        return (
          <OtterTableActions>
            {(permissionList[record?.project?.id]?.list_member ||
              permissionList[record?.project?.id]?.update) && (
              <Text
                type="primaryLink"
                onClick={() => {
                  handleSetting(record?.project?.id)
                }}
              >
                <Icon className="mr-1" name="setting" />
                设置
              </Text>
            )}
            {!record.is_default &&
              permissionList[record?.project?.id]?.delete &&
              record?.project?.id !== projectId && (
                <OtterTableActionDelete
                  onDelete={() => {
                    handleDelete(record)
                  }}
                />
              )}
          </OtterTableActions>
        )
      },
    },
  ]

  const handleChangePage = (page) => {
    setPage(page)
  }

  return (
    <ProjectContext.Provider
      value={{
        isProjectCollectionVisible,
        setIsProjectCollectionVisible,
        isProjectDetailVisible,
        setIsProjectDetailVisible,
        activeProjectId,
        setActiveProjectId,
      }}
    >
      <ContentLayout
        hLeft={<OtterTableTitle title={t('project.name')} count={total} />}
        hRight={<Actions />}
      >
        <OtterTable
          locale={{
            emptyText: <Empty title="项目" description="项目是组织业务基本单位。" />,
          }}
          loading={loading}
          dataSource={list}
          columns={columns}
          current={page}
          onPaginationChange={handleChangePage}
        />
        <ProjectCollection />
        <ProjectDetail />
      </ContentLayout>
    </ProjectContext.Provider>
  )
}
export default Project
