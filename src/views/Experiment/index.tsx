/*
 * @Author: D.Y.M
 * @Date: 2021-10-20 13:57:38
 * @LastEditTime: 2022-02-28 14:25:59
 * @FilePath: /main/src/views/Experiment/index.tsx
 * @Description:
 */
import React from 'react'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { ContentLayout, Empty, OtterTable, OtterTableFieldCreator, OtterTableFieldDate, OtterTableFieldDescription, OtterTableFieldTitle, OtterTableTitle } from 'otter-pro'
import { ut } from 'otter-pro/es/i18n'

const { Search } = Input
const Experiment = () => {
  const { t } = ut()

  const Actions = () => {
    return (
      <div className=" flex flex-row items-center">
        <Search className="search mr-2" placeholder={t('common.placeholder.title')} />
        <Button type="primary" className="icon-center" onClick={() => { }}>
          <PlusOutlined className=" align-middle" /> 新建
        </Button>
      </div>
    )
  }

  const columns = [
    {
      title: t('common.list.title'),
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => {
        return <div className='min-width-150'><OtterTableFieldTitle title={text} /></div>
      },
    },
    {
      title: t('common.list.description'),
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => {
        return <OtterTableFieldDescription description={text} />
      },
    },
    {
      title: t('common.list.creator'),
      dataIndex: 'creator',
      key: 'creator',
      width: 200,
      render: (text: string, record: any) => {
        return <OtterTableFieldCreator name={record?.create_operation?.creator?.name} />
      },
    },
    {
      title: t('common.list.createTime'),
      dataIndex: 'create_time',
      key: 'create_time',
      width: 200,
      render: (text: string, record: any) => {
        return <OtterTableFieldDate date={record.create_operation.create_time} />
      },
    },
    {
      title: t('common.list.status'),
      dataIndex: 'active',
      key: 'active',
      width: 120
    }
  ]
  return <ContentLayout hLeft={<OtterTableTitle title='实验' count={0} />} hRight={<Actions />}>
    <OtterTable locale={{
      emptyText: <Empty
        title="实验"
        description="实验管理模型训练流水线和执行记录。在这里你可以对比每次训练的数据指标，并过程数据进行可视化查看。也可以通过AutoML功能自动搜索最佳的训练参数。"
      />
    }} loading={false} dataSource={[]} columns={columns} />
  </ContentLayout>
}
export default Experiment
