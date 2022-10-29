import React, { useContext, useEffect, useState } from 'react'

import { FolderViewOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import {
  ContentLayout,
  Empty,
  OtterTable,
  OtterTableFieldCreator,
  OtterTableFieldDate,
  OtterTableFieldDescription,
  OtterTableTitle,
  Text,
} from 'otter-pro'
import { ut } from 'otter-pro/es/i18n'
import { useParams } from 'react-router-dom'

import { useGlobalModel, useCapabilityTemplateModel, useCapabilityTemplateService } from '@/models'

import { CapabilityContext, TemplateContext } from '../../context'
import TemplateCollection from './components/Collection'

const { Search } = Input

const TemplateList = () => {
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
    setSearchText,
  } = useCapabilityTemplateModel()
  const { capabilityId } = useParams()
  const { projectId } = useGlobalModel()
  const [templateID, setTemplateID] = useState('')
  const [isTemplateCollection, setIsTemplateCollection] = useState(false)
  const { getTemplatesService } = useCapabilityTemplateService()
  const { isView } = useContext(CapabilityContext)

  const onSearch = async (arg) => {
    setLoading(true)
    const params = arg
      ? {
        'filter_args.id': arg,
        'filter_args.description': arg,
      }
      : {}
    setSearchText(arg)

    await getTemplatesService(projectId, capabilityId, {
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
        'filter_args.description': searchText,
      }
      : {}
    await getTemplatesService(projectId, capabilityId, {
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
    setTemplateID('')
    setIsTemplateCollection(true)
  }

  const handleView = (id: string) => {
    setTemplateID(id)
    setIsTemplateCollection(true)
  }

  const columns = [
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
        <Text type="primaryLink" onClick={() => handleView(record?.id)}>
          <FolderViewOutlined className=" mr-1" />
          {t('common.actions.view')}
        </Text>
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
        {
          !isView && <Button type="primary" className="icon-center" onClick={handleCreate}>
            <PlusOutlined className=" align-middle" /> 新建
          </Button>
        }
      </div>
    )
  }

  return (
    <TemplateContext.Provider
      value={{ templateID, setTemplateID, isTemplateCollection, setIsTemplateCollection }}
    >
      <ContentLayout hLeft={<OtterTableTitle title="标注模板" count={0} />} hRight={<Actions />}>
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
        <TemplateCollection />
      </ContentLayout>
    </TemplateContext.Provider>
  )
}

export default TemplateList
