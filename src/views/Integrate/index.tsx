/*
 * @Author: D.Y.M
 * @Date: 2021-10-20 13:57:38
 * @LastEditTime: 2022-02-24 18:59:37
 * @FilePath: /main/src/views/Integrate/index.tsx
 * @Description:
 */
import React from 'react'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { ContentLayout, Empty, OtterTableTitle } from 'otter-pro'
import { ut } from 'otter-pro/es/i18n'

const { Search } = Input
const Integrate = () => {
  const { t } = ut()

  const Actions = () => {
    return (
      <div className=" flex flex-row items-center">
        <Search className="search mr-2" placeholder={t('common.placeholder.title')} />
        <Button type="primary" className="icon-center" onClick={() => {}}>
          <PlusOutlined className=" align-middle" /> 新建
        </Button>
      </div>
    )
  }

  return (
    <ContentLayout hLeft={<OtterTableTitle title='集成测试' count={0} />} hRight={<Actions />}>
      <Empty
        title="集成测试"
        description="Publish 是一个数据的集合，通常以表格形式出现。每一列代表一个特定变量。每一行都对应于某一成员的数据集的问题。它列出的价值观为每一个变量，如身高和体重的一个物体或价值的随机数。每个数值被称为数据资料。对应于行数，该数据集的数据可能包括一个或多个成员。"
      />
    </ContentLayout>
  )
}
export default Integrate
