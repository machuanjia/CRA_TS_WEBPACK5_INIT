import React, { useContext, useEffect } from 'react'

import { ExportOutlined, ImportOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Dropdown, Input, Menu, message, Radio, Tag, Upload } from 'antd'
import to from 'await-to-js'
import {
  ContentLayout,
  Empty,
  Icon,
  OtterTable,
  OtterTableFieldCreator,
  OtterTableFieldDate,
  OtterTableFieldDescription,
  OtterTableFieldTitle,
  OtterTableTitle,
  Text,
} from 'otter-pro'
import { COLORS } from 'otter-pro/es/constants'
import { ut } from 'otter-pro/es/i18n'
import { uploadClient } from 'otter-pro/es/utils'
import { useNavigate } from 'react-router-dom'

import { STATE } from '@/constants'
import { usePermission, useRolling } from '@/hooks'
import { MainContext } from '@/layouts/context'
import { useGlobalModel, useCapabilityModel, useCapabilityService } from '@/models'

import { CapabilityContext } from '../context'
import AiCapabilityCollection from './components/Collection'

const { Search } = Input

const { clientObject } = uploadClient

const AiCapabilityList = () => {
  const { t } = ut()
  const { projectId } = useGlobalModel()
  const history = useNavigate()
  const {
    setPage,
    setPageSize,
    loading,
    setLoading,
    list,
    page,
    pageSize,
    searchText,
    setSearchText,
  } = useCapabilityModel()
  const [isHasPermission] = usePermission()
  const { rolling } = useRolling()
  const { setIsShowHeader } = useContext(MainContext)
  const {
    getAiCapabilitiesService,
    archiveAiCapabilityService,
    unArchiveAiCapabilityService,
    downloadAICapabilityService,
    getUploadTokenService,
    uploadAICapabilityService,
  } = useCapabilityService()
  const { setCapabilityId, selectedState, setSelectedState, setIsCollectionVisible } =
    useContext(CapabilityContext)

  useEffect(() => {
    setIsShowHeader(true)
  }, [])

  const onSearch = async (arg) => {
    setLoading(true)
    const params = {
      'filter_args.id': arg,
      'filter_args.title': arg,
      'filter_args.description': arg,
      'filter_args.state': selectedState,
    }
    setSearchText(arg)

    await getAiCapabilitiesService(projectId, {
      page: 1,
      page_size: pageSize,
      ...params,
    })

    setPage(1)
  }

  const pageChange = async (p, ps) => {
    setLoading(true)
    const params = {
      'filter_args.id': searchText,
      'filter_args.title': searchText,
      'filter_args.description': searchText,
      'filter_args.state': selectedState,
    }
    await getAiCapabilitiesService(projectId, {
      page: p,
      page_size: ps,
      ...params,
    })

    setPage(p)
    setPageSize(ps)
  }

  useEffect(() => {
    projectId && pageChange(page, pageSize)
  }, [projectId, selectedState])

  const handleExport = async () => {
    setLoading(true)
    const [err, data]: any = await downloadAICapabilityService(projectId)
    if (err) {
      message.error(err)
      return
    }
    rolling(data.name).then(
      (res: {
        response: {
          download_url: string
        }
      }) => {
        const down = document.createElement('a')
        down.href = res.response.download_url
        down.click()
        down.remove()
      },
    )
    setLoading(false)
  }

  const handleUpload = async ({ file }) => {
    setLoading(true)
    const [reject, accessData]: any = await getUploadTokenService()
    if (reject) {
      message.error('没有上传权限')
    }

    const { name: pathName } = file
    const client = clientObject(accessData)
    const options = {
      parallel: 5,
      partSize: 1024 * 1024,
    }

    const [err, data]: any = await to(
      client.multipartUpload(pathName, file?.originFileObj, options),
    )

    if (!err) {
      const upload_url = data?.res?.requestUrls[0]
      const [err, aiCapabilityData]: any = await uploadAICapabilityService(projectId, {
        upload_url,
      })
      if (err) {
        message.error(err.message)
      } else {
        rolling(aiCapabilityData?.name)
          .then(async () => {
            message.success('导入AI能力成功')
            await pageChange(page, pageSize)
          })
          .catch((err) => {
            message.error(err)
          })
      }
    }
    setLoading(false)
  }

  const handleCreate = () => {
    setCapabilityId('')
    setIsCollectionVisible(true)
  }

  const handleSetting = (capabilityId) => {
    setCapabilityId(capabilityId)
    history(`/projects/${projectId}/capability/${capabilityId}/basic`)
  }

  const StatusTransition = ({ record }) => {
    const { state, id } = record

    const handleArchive = async () => {
      setLoading(true)

      if (state === STATE.ACTIVE) {
        const [err] = await archiveAiCapabilityService(projectId, id)

        if (err) {
          message.error(err as any)
        } else {
          message.success('AI能力归档成功')

          await pageChange(page, pageSize)
        }
      } else {
        const [err] = await unArchiveAiCapabilityService(projectId, id)

        if (err) {
          message.error(err as any)
        } else {
          message.success('AI能力取消归档成功')

          await pageChange(page, pageSize)
        }
      }

      setLoading(false)
    }

    if (state === STATE.ACTIVE) {
      return (
        isHasPermission('project.capacity.archive') && (
          <Text
            type="primaryLink"
            onClick={() => {
              handleArchive()
            }}
          >
            <Icon className="mr-1" name="setting" />
            归档
          </Text>
        )
      )
    }
    if (state === STATE.ARCHIVED) {
      return (
        isHasPermission('project.capacity.unArchive') && (
          <Text
            type="primaryLink"
            onClick={() => {
              handleArchive()
            }}
          >
            <Icon className="mr-1" name="setting" />
            取消归档
          </Text>
        )
      )
    }
    return null
  }

  const columns = [
    {
      title: t('common.list.title'),
      dataIndex: 'title',
      key: 'title',
      width: 220,
      fixed: 'left',
      render: (title) => <OtterTableFieldTitle title={title} />,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 320,
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
      title: 'AI任务',
      dataIndex: 'ai_task',
      key: 'ai_task',
      width: 160,
      render: (ai_task) => <Text type="info">{ai_task}</Text>,
    },
    {
      title: '资源类型',
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
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      align: 'center',
      width: 120,
      render: (state) => {
        return (
          <Tag color={state === STATE.ACTIVE ? COLORS.GREEN[600] : COLORS.RED[600]}>
            <span>{state === STATE.ACTIVE ? '生效' : '已归档'}</span>
          </Tag>
        )
      },
    },
    {
      title: t('common.list.createTime'),
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
      width: 180,
      render: (_, record) => <OtterTableFieldDate date={record?.create_operation?.create_time} />,
    },
    {
      title: t('common.list.creator'),
      dataIndex: 'creator',
      key: 'creator',
      align: 'center',
      width: 180,
      render: (_: string, record: any) => {
        return <OtterTableFieldCreator name={record?.create_operation?.creator?.name} />
      },
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      align: 'center',
      width: 180,
      render: (_, record) => <OtterTableFieldDate date={record?.update_operation?.update_time} />,
    },
    {
      title: '更新者',
      dataIndex: 'updater',
      key: 'updater',
      align: 'center',
      width: 180,
      render: (_, record: any) => {
        return <OtterTableFieldCreator name={record?.update_operation?.updater?.name} />
      },
    },
    {
      title: t('common.list.actions'),
      dataIndex: 'actions',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <div className=" flex gap-1">
          <Text
            type="primaryLink"
            onClick={() => {
              handleSetting(record?.id)
            }}
          >
            <Icon className="mr-1" name="setting" />
            设置
          </Text>
          {record?.is_share ? (
            record?.project_id === projectId && <StatusTransition record={record} />
          ) : (
            <StatusTransition record={record} />
          )}
        </div>
      ),
    },
  ]

  const Actions = () => {
    const menu = (
      <Menu
        items={[
          {
            key: '1',
            label: (
              <div onClick={handleExport}>
                <ExportOutlined />
                <span className=" inline-block w-10 ml-3">导出</span>
              </div>
            ),
          },
          {
            key: '2',
            label: (
              <Upload
                accept="Application/zip"
                maxCount={1}
                showUploadList={false}
                onChange={handleUpload}
              >
                <ImportOutlined />
                <span className=" inline-block w-10 ml-3">导入</span>
              </Upload>
            ),
          },
        ]}
      />
    )

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
        <div className=" w-32 ml-2 mr-2">
          <Radio.Group
            value={selectedState}
            className=" w-32 flex"
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <Radio.Button value={STATE.ACTIVE}>激活</Radio.Button>
            <Radio.Button value={STATE.STATE_UNSPECIFIED}>全部</Radio.Button>
          </Radio.Group>
        </div>
        {isHasPermission('project.capacity.create') &&
        isHasPermission('project.capacity.upload') ? (
          <Dropdown.Button
            overlay={menu}
            type="primary"
            className="icon-center"
            onClick={handleCreate}
          >
            <PlusOutlined className=" align-middle" /> 新建
          </Dropdown.Button>
        ) : (
          <Button type="primary" className="icon-center" onClick={handleCreate}>
            <PlusOutlined className=" align-middle" /> 新建
          </Button>
        )}
      </div>
    )
  }

  return (
    <ContentLayout hLeft={<OtterTableTitle title="AI能力" count={0} />} hRight={<Actions />}>
      <OtterTable
        locale={{
          emptyText: (
            <Empty title={t('engine.empty.title')} description={t('engine.empty.description')} />
          ),
        }}
        loading={loading}
        columns={columns}
        dataSource={list}
        scroll={{ x: 1700 }}
        childrenColumnName="sub_capabilities"
      />
      <AiCapabilityCollection />
    </ContentLayout>
  )
}

export default AiCapabilityList
