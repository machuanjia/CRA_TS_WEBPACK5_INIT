/*
 * @Author: D.Y.M
 * @Date: 2021-10-20 13:57:38
 * @LastEditTime: 2022-02-28 18:08:27
 * @FilePath: /main/src/views/Publish/index.tsx
 * @Description:
 */
import React from 'react'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { ContentLayout, OtterTableTitle, Empty, OtterTable, OtterTableFieldDate, OtterTableFieldCreator, OtterTableFieldDescription, OtterTableFieldTitle } from 'otter-pro'
import { ut } from 'otter-pro/es/i18n'

const { Search } = Input
const Publish = () => {
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
  return <ContentLayout hLeft={<OtterTableTitle title='发布' count={0} />} hRight={<Actions />}>
    <OtterTable locale={{
      emptyText: <Empty
        title="发布"
        description="发布功能提供模型发布、停止、重启、升级、回滚功能。提供统一格式API接口用于和其他系统集成。"
      />
    }} loading={false} dataSource={[]} columns={columns} />
  </ContentLayout>
}
export default Publish
