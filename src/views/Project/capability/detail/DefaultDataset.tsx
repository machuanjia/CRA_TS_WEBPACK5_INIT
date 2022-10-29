/*
 * @Author: lubenben
 * @Date: 2022-08-10 09:48:58
 * @LastEditors: lubenben
 * @LastEditTime: 2022-10-21 11:06:40
 */
import React, { useEffect, useState } from 'react'

import { PlusOutlined } from '@ant-design/icons'
import { Button, message, Tabs } from 'antd'
import {
  ContentLayout,
  Empty,
  OtterTable,
  OtterTableActionDelete,
  OtterTableFieldDescription,
  OtterTableFieldTitle,
  Text,
} from 'otter-pro'
import { useDeleteConfirm } from 'otter-pro/es/hooks'
import { ut } from 'otter-pro/es/i18n'
import { useParams } from 'react-router-dom'

import { useDefaultDatasetModel, useDefaultDatasetService, useGlobalModel } from '@/models'

import { DefaultDatasetContext } from '../../context'
import DefaultDatasetCollection from './DefaultDataset/Collection'

import type { IList } from 'otter-pro'

// const { Search } = Input
const { TabPane } = Tabs

const DefaultDatasetList = () => {
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
    searchText,
    // setSearchText,
  } = useDefaultDatasetModel()
  const { capabilityId } = useParams()
  const { projectId } = useGlobalModel()
  const [DeleteConfirm] = useDeleteConfirm()
  const [allowAnnotations, setAllowAnnotations] = useState([])
  const [allowAnnotationID, setAllowAnnotationID] = useState('')
  const [allowAnnotation, setAllowAnnotation] = useState<Record<string, unknown>>()
  const [isDefaultDatasetCollectionVisible, setIsDefaultDatasetCollectionVisible] = useState(false)
  const { getAllowAnnotationsService, getDefaultDatasetsService, removeDefaultDatasetService } =
    useDefaultDatasetService()

  const initAllowAnnotation = async () => {
    if (projectId && capabilityId) {
      const [err, data]: IList[] = await getAllowAnnotationsService(projectId, capabilityId)
      if (!err) {
        const { ai_capabilities = [] } = data

        setAllowAnnotations(ai_capabilities)
        setAllowAnnotationID(ai_capabilities[0]?.id)
        setAllowAnnotation(ai_capabilities[0])
        await getDefaultDatasetsService(projectId, capabilityId, {
          page,
          page_size: pageSize,
          annotate_ai_capability_id: ai_capabilities[0]?.id,
        })
      } else {
        message.error(err as any)
      }
    }
  }

  useEffect(() => {
    projectId && capabilityId && initAllowAnnotation()
  }, [projectId, capabilityId])

  const initDefaultDatasets = async () => {
    setLoading(true)
    await getDefaultDatasetsService(projectId, capabilityId, {
      page,
      page_size: pageSize,
      annotate_ai_capability_id: allowAnnotationID,
    })
    setLoading(false)
  }

  useEffect(() => {
    projectId && allowAnnotationID && initDefaultDatasets()
  }, [projectId, allowAnnotationID])

  const pageChange = async (p: number, ps: number) => {
    setLoading(true)
    const params = searchText
      ? {
          'filter_args.id': searchText,
          'filter_args.description': searchText,
        }
      : {}
    await getDefaultDatasetsService(projectId, capabilityId, {
      page: p,
      page_size: ps,
      annotate_ai_capability_id: allowAnnotationID,
      ...params,
    })

    setPage(p)
    setPageSize(ps)
  }

  const handleAdd = () => {
    setIsDefaultDatasetCollectionVisible(true)
  }

  const handleDelete = async (record) => {
    DeleteConfirm({
      content: `确定要删除默认数据集 ${record?.dataset?.title}`,
      handleOk: async () => {
        const [err] = await removeDefaultDatasetService(capabilityId, {
          annotate_ai_capability_id: allowAnnotationID,
          dataset_dataset_version_ids: [
            {
              dataset_id: record?.dataset?.id,
              version_id: record?.version?.id,
            },
          ],
        })
        if (!err) {
          message.success(t('删除默认数据集成功'))
          setLoading(true)
          if ((total - 1) % pageSize === 0 && page !== 1) {
            await getDefaultDatasetsService(projectId, capabilityId, {
              page: (total - 1) / pageSize,
              page_size: pageSize,
              annotate_ai_capability_id: allowAnnotationID,
            })

            setPage((total - 1) / pageSize)
          } else {
            await getDefaultDatasetsService(projectId, capabilityId, {
              page,
              page_size: pageSize,
              annotate_ai_capability_id: allowAnnotationID,
            })
          }
          setLoading(false)
        }
      },
    })
  }

  const columns = [
    {
      title: '数据集名称',
      dataIndex: 'title',
      key: 'title',
      width: 220,
      fixed: 'left',
      render: (_, record) => <OtterTableFieldTitle title={record?.dataset?.title} />,
    },
    {
      title: '数据集描述',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (_, record) => {
        return <OtterTableFieldDescription description={record?.dataset?.description} />
      },
    },
    {
      title: '数据集ID',
      dataIndex: 'ID',
      key: 'ID',
      width: 300,
      render: (_, record) => <Text type="info">{record?.dataset?.id}</Text>,
    },
    {
      title: '数据集版本',
      dataIndex: 'version',
      key: 'version',
      width: 220,
      render: (_, record) => <Text type="info">{record?.version?.title}</Text>,
    },
    {
      title: '数据集版本ID',
      dataIndex: 'versionID',
      key: 'versionID',
      width: 300,
      render: (_, { version, dataset }) => (
        <Button
          type="link"
          href={`/projects/${projectId}/data/sets/${dataset.id}/version?vid=${version.id}`}
        >
          {version.id}
        </Button>
      ),
    },
    {
      title: t('common.list.actions'),
      dataIndex: 'actions',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <>
          <OtterTableActionDelete onDelete={() => handleDelete(record)} />
        </>
      ),
    },
  ]

  const Actions = () => {
    return (
      <div className=" flex flex-row items-center">
        {/* <Search
          className="search mr-2 ml-4"
          enterButton={<SearchOutlined />}
          defaultValue={searchText}
          placeholder={t('common.placeholder.searchText')}
          allowClear
          onSearch={onSearch}
        /> */}
        <Button type="primary" className="icon-center" onClick={handleAdd}>
          <PlusOutlined className=" align-middle" /> 添加
        </Button>
      </div>
    )
  }

  const handleTabChange = (key) => {
    setAllowAnnotationID(key)
    const aiCapability = allowAnnotations.find((item) => item.id === key)
    setAllowAnnotation(aiCapability)
  }

  return (
    <DefaultDatasetContext.Provider
      value={{
        allowAnnotationID,
        initDefaultDatasets,
        allowAnnotation,
        setAllowAnnotation,
        isDefaultDatasetCollectionVisible,
        setIsDefaultDatasetCollectionVisible,
      }}
    >
      <ContentLayout
        hLeft={
          <Tabs onChange={handleTabChange} type="card">
            {allowAnnotations?.length &&
              allowAnnotations.map((item) => (
                <TabPane tab={item.title} key={item.id} disabled={loading} />
              ))}
          </Tabs>
        }
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
        {isDefaultDatasetCollectionVisible && <DefaultDatasetCollection />}
      </ContentLayout>
    </DefaultDatasetContext.Provider>
  )
}

export default DefaultDatasetList
