import React, { useContext, useEffect } from 'react'

import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, message, Tag } from 'antd'
import {
  ContentLayout,
  Empty,
  OtterTable,
  OtterTableActionDelete,
  OtterTableActionEdit,
  OtterTableFieldCreator,
  OtterTableFieldDate,
  OtterTableFieldDescription,
  OtterTableFieldTitle,
  OtterTableTitle,
  Text,
} from 'otter-pro'
import { COLORS } from 'otter-pro/es/constants'
import { useDeleteConfirm } from 'otter-pro/es/hooks'
import { ut } from 'otter-pro/es/i18n'

import { useEngineModel, useEngineService } from '@/models'

import { EngineContext } from '../../context'
import AiEngineCollection from './Collection'

const { Search } = Input

const AiEngineList = () => {
  const { t } = ut()
  const {
    setPage,
    setPageSize,
    loading,
    setLoading,
    list,
    total,
    page,
    pageSize,
    setDetail,
    searchText,
    setSearchText,
  } = useEngineModel()
  const { getAiEnginesService, deleteAiEngineService } = useEngineService()
  const [DeleteConfirm] = useDeleteConfirm()
  const { setEngineId, projectId, setIsCollectionVisible } = useContext(EngineContext)

  const onSearch = async (arg) => {
    setLoading(true)
    const params = arg
      ? {
          'filter_args.id': arg,
          'filter_args.title': arg,
          'filter_args.description': arg,
        }
      : {}
    setSearchText(arg)

    await getAiEnginesService(projectId, {
      page: 1,
      page_size: pageSize,
      ...params,
    })

    setPage(1)
  }

  const pageChange = async (p, ps) => {
    setLoading(true)
    const params = searchText
      ? {
          'filter_args.id': searchText,
          'filter_args.title': searchText,
          'filter_args.description': searchText,
        }
      : {}
    await getAiEnginesService(projectId, {
      page: p,
      page_size: ps,
      ...params,
    })

    setPage(p)
    setPageSize(ps)
  }

  useEffect(() => {
    pageChange(1, 20)
  }, [])

  const handleCreate = () => {
    setSearchText('')
    setEngineId('')
    setIsCollectionVisible(true)
  }

  const handleEdit = ({ id, title, description }) => {
    setEngineId(id)
    setDetail({ title, description })
    setIsCollectionVisible(true)
  }

  const handleDelete = async (record) => {
    const engineId = record?.id
    DeleteConfirm({
      content: `确定要删除 AI 引擎 ${record?.title}`,
      handleOk: async () => {
        const [err] = await deleteAiEngineService(projectId, engineId)
        if (err) {
          if (err.details) {
            message.error(err.message)
          }
        } else {
          message.success(t('engine.actions.deleteEngineSuccess'))
          setLoading(true)
          if ((total - 1) % pageSize === 0 && page !== 1) {
            await getAiEnginesService(projectId, {
              page: (total - 1) / pageSize,
              page_size: pageSize,
            })

            setPage((total - 1) / pageSize)
          }
          setLoading(false)
        }
      },
    })
  }

  const columns = [
    {
      title: t('common.list.title'),
      dataIndex: 'title',
      key: 'title',
      width: 120,
      render: (title) => <OtterTableFieldTitle title={title} />,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 300,
      render: (id) => <Text type="info">{id}</Text>,
    },
    {
      title: t('common.list.description'),
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (description) => {
        return <OtterTableFieldDescription description={description} />
      },
    },
    {
      title: t('common.list.createTime'),
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
      width: 160,
      render: (_, record) => <OtterTableFieldDate date={record?.create_operation?.create_time} />,
    },
    {
      title: t('engine.list.type'),
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      width: 80,
      render: (_: string, record: any) => {
        return (
          <Tag color={record?.is_share ? COLORS.GRAY[600] : COLORS.GREEN[600]}>
            <span>{record?.is_share ? '系统' : '自定义'}</span>
          </Tag>
        )
      },
    },
    {
      title: t('common.list.creator'),
      dataIndex: 'creator',
      key: 'creator',
      align: 'center',
      width: 150,
      render: (_: string, record: any) => {
        return <OtterTableFieldCreator name={record?.create_operation?.creator?.name} />
      },
    },
    {
      title: t('common.list.actions'),
      dataIndex: 'actions',
      width: 150,
      render: (_, record) => (
        <div className=" flex gap-1">
          {record?.is_share ? (
            record?.project_id === projectId && (
              <>
                <OtterTableActionEdit onEdit={() => handleEdit(record)} />
                <OtterTableActionDelete onDelete={() => handleDelete(record)} />
              </>
            )
          ) : (
            <>
              <OtterTableActionEdit onEdit={() => handleEdit(record)} />
              <OtterTableActionDelete onDelete={() => handleDelete(record)} />
            </>
          )}
        </div>
      ),
    },
  ]

  const Actions = () => {
    return (
      <div className=" flex flex-row items-center">
        <Search
          className="search mr-2 ml-4"
          enterButton={<SearchOutlined />}
          defaultValue={searchText}
          placeholder={t('common.placeholder.searchText')}
          allowClear
          onSearch={onSearch}
        />
        <Button type="primary" className="icon-center" onClick={handleCreate}>
          <PlusOutlined className=" align-middle" /> 新建
        </Button>
      </div>
    )
  }

  return (
    <ContentLayout
      hLeft={<OtterTableTitle title={t('engine.title.engine')} count={0} />}
      hRight={<Actions />}
    >
      <OtterTable
        locale={{
          emptyText: (
            <Empty title={t('engine.empty.title')} description={t('engine.empty.description')} />
          ),
        }}
        total={total}
        loading={loading}
        columns={columns}
        dataSource={list}
        current={page}
        defaultPageSize={pageSize}
        onPaginationChange={pageChange}
      />
      <AiEngineCollection />
    </ContentLayout>
  )
}

export default AiEngineList
