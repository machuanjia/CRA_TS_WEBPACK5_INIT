import { useContext, useEffect, useState } from 'react'

import { message, Radio, Table } from 'antd'
import to from 'await-to-js'
import { Empty, Text } from 'otter-pro'

import { useGlobalModel, useCapabilityService, useDefaultDatasetService } from '@/models'

import { DefaultDatasetContext } from '../../../../context'

const idsPiecesLength = 2

const Dataset = ({ filterParams, output }) => {
  const [dataList, setDataList] = useState([])
  const [loading, setLoading] = useState(false)
  const { projectId } = useGlobalModel()
  const { getAiCapabilityDetailService } = useCapabilityService()
  const [capabilityParams, setCapabilityParams] = useState({
    selectedRowKeys: '' || [],
    selectedList: [],
  })
  const [showOnlySelected, setShowOnlySelected] = useState(false)
  const { allowAnnotation } = useContext(DefaultDatasetContext)
  const { getSetsListService, getDatasetsLatestAnnotatedVersionsService } =
    useDefaultDatasetService()

  const getLatestAnnotatedVersions = (ids, aiCapabilityId) => {
    return getDatasetsLatestAnnotatedVersionsService(
      ids.reduce((pre, id) => `${pre}&dataset_ids=${id}`, `ai_capability_id=${aiCapabilityId}`),
    )
  }

  const getIds = async (params, arr) => {
    const [err, datasetList]: any = await to(getSetsListService(params))
    if (err) {
      message.error('获取数据集失败')
      return Promise.resolve(null)
    } else if (!datasetList.datasets) {
      message.error('没有搜索到数据集')
      return Promise.resolve(null)
    }
    const result = [...arr, ...datasetList.datasets.map(({ id }) => id)]
    if (result.length < datasetList.total_size) {
      return getIds({ ...params, page: params.page + 1 }, result)
    } else {
      return Promise.resolve(result)
    }
  }

  const onFilterChange = async () => {
    setLoading(true)
    const [err, data]: any = await getAiCapabilityDetailService(
      projectId,
      allowAnnotation.id,
      false,
    )
    if (err) {
      message.error(err)
      setLoading(false)
      return
    }
    const { filter_tag } = data

    const params = {
      page_size: 200,
      page: 1,
      ...filterParams,
      'filter_args.ai_tag_ids': [filter_tag?.id],
    }
    const datasetIdList = (await getIds(params, [])) || []

    const pieces = new Array(Math.ceil(datasetIdList.length / idsPiecesLength))
      .fill(null)
      .map((_, i) => datasetIdList.slice(i * idsPiecesLength, (i + 1) * idsPiecesLength))

    Promise.all(pieces.map((ids) => getLatestAnnotatedVersions(ids, allowAnnotation.id)))
      .then((res: any) => {
        const result = []
        res.forEach(({ details = [] }) => {
          result.push(...details)
        })
        setDataList(result)
      })
      .catch((err) => {
        message.error(err)
        setDataList([])
      })
      .then(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (filterParams) {
      onFilterChange()
    }
  }, [filterParams])

  useEffect(() => {
    if (capabilityParams) {
      const result = capabilityParams?.selectedList?.map(
        ({ dataset_dataset_version: { dataset, version } }) => ({
          dataset_id: dataset.id,
          version_id: version.id,
        }),
      )
      output(result)
    }
  }, [capabilityParams])

  const columns: any = [
    {
      title: '数据集名称',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      render: (_, { dataset_dataset_version }) => dataset_dataset_version?.dataset.title,
    },
    {
      title: '数据集Id',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (_, { dataset_dataset_version }) => dataset_dataset_version?.dataset.id,
    },
    {
      title: '数据集版本',
      dataIndex: 'versionTitle',
      key: 'versionTitle',
      align: 'center',
      render: (_, { dataset_dataset_version }) => dataset_dataset_version?.version?.title,
    },
    {
      title: '数据量',
      dataIndex: 'dataCount',
      key: 'dataCount',
      align: 'center',
      render: (_, { dataset_dataset_version }) =>
        dataset_dataset_version?.version?.root_dir?.total_file_count || '0',
    },
    {
      title: '数据集版本Id',
      dataIndex: 'versionId',
      key: 'versionId',
      align: 'center',
      render: (_, { dataset_dataset_version }) => dataset_dataset_version?.version?.id,
    },
  ]

  const onSelectChange = (keys, arr) => {
    capabilityParams.selectedRowKeys = keys
    capabilityParams.selectedList = arr
    setCapabilityParams({ ...capabilityParams })
  }
  const rowSelection = {
    selectedRowKeys: capabilityParams.selectedRowKeys || [],
    onChange: onSelectChange,
  }

  return (
    <>
      <Text type="info" className="mt-3 mr-2 inline-block">
        共{dataList?.length || 0}条
      </Text>
      <Text type="info" className="mt-3 mr-2 inline-block">
        已选{capabilityParams?.selectedList?.length || 0}条
      </Text>
      <Radio.Group
        buttonStyle="solid"
        value={showOnlySelected}
        className="mt-3 mr-2 inline-block"
        size="small"
        onChange={(e) => setShowOnlySelected(e.target.value)}
      >
        <Radio.Button value={false}>查看全部</Radio.Button>
        <Radio.Button value={true}>查看已选</Radio.Button>
      </Radio.Group>
      <Table
        locale={{
          emptyText: <Empty title="数据集为空" description="" />,
        }}
        bordered
        loading={loading}
        columns={columns}
        className="mt-3"
        dataSource={showOnlySelected ? capabilityParams?.selectedList : dataList}
        rowSelection={rowSelection}
        pagination={false}
        rowKey={(record) => record?.dataset_dataset_version?.dataset?.id}
        scroll={{ x: '90%' }}
      />
    </>
  )
}

export default Dataset
