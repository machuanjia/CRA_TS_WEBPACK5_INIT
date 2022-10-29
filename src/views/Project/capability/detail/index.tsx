/*
 * @Author: lubenben
 * @Date: 2022-06-27 18:45:36
 * @LastEditors: lubenben
 * @LastEditTime: 2022-10-19 12:07:13
 */
import React, { useState, useContext, useEffect } from 'react'

import { RightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Icon, NavTabs } from 'otter-pro'
import { Link, useParams, Outlet } from 'react-router-dom'

import { usePermission } from '@/hooks'
import { MainContext } from '@/layouts/context'
import { useGlobalModel, useAppModel, useCapabilityModel, useCapabilityService } from '@/models'

import { CapabilityContext } from '../../context'

const AICapabilityDetail = () => {
  const { projectId } = useGlobalModel()
  const { setIsShowHeader } = useContext(MainContext)
  const { capabilityId } = useParams()
  const { currentRoute } = useAppModel()
  const { detail } = useCapabilityModel()
  const [isHasPermission] = usePermission()
  const [isEndToEnd, setIsEndToEnd] = useState(false)
  const { setIsView } = useContext(CapabilityContext)
  const { getAiCapabilityDetailService } = useCapabilityService()

  useEffect(() => {
    setIsShowHeader(false)
  }, [])

  const [tabs, setTabs] = useState([
    {
      name: '基础信息',
      path: `/projects/${projectId}/capability/${capabilityId}/basic`,
      key: 'BasicInfo',
    },
    {
      name: '数据集标签',
      path: `/projects/${projectId}/capability/${capabilityId}/tag`,
      key: 'DatasetTag',
    },
    {
      name: '标注模板',
      path: `/projects/${projectId}/capability/${capabilityId}/template`,
      key: 'AnnotationTemplate',
    },
  ])

  useEffect(() => {
    if (isEndToEnd && isHasPermission('project.capacity.defaultDataset.list')) {
      setTabs((tab) => {
        tab.push({
          name: '默认数据集',
          path: `/projects/${projectId}/capability/${capabilityId}/dataset`,
          key: 'defaultDataset',
        })
        return [...tab]
      })
    }
  }, [isEndToEnd])

  const SetDetailBread = () => {
    return (
      <div className=" flex flex-row items-center">
        <Link to={`/projects/${projectId}/capability`}>
          <Button type="primary" icon={<Icon name="set" />} size="small" />
        </Link>
        <RightOutlined className=" ml-2 mr-2" />
        {detail?.ai_capability?.title}
      </div>
    )
  }

  const getDetail = async () => {
    const [err, data]: any = await getAiCapabilityDetailService(projectId, capabilityId)
    if (!err) {
      const { ai_capability } = data
      setIsEndToEnd(ai_capability?.is_end_to_end)
    }
  }

  useEffect(() => {
    projectId && capabilityId && getDetail()
  }, [projectId, capabilityId])

  useEffect(() => {
    if (detail) {
      if (detail?.ai_capability?.is_share && detail.project.id !== projectId) {
        setIsView(true)
      }
    }
    return () => {
      setIsView(false)
    }
  }, [detail])

  return (
    <section className="h-screen flex flex-col">
      <header className=" border-b border-solid border-medium h-14 text-secondary flex flex-row items-center pl-2 pr-2">
        <SetDetailBread />
        <div className="flex-1 flex flex-row justify-center">
          <NavTabs tabs={tabs} active={currentRoute?.meta.key} />
        </div>
      </header>
      <div className={` flex-1  overflow-auto`}>
        <Outlet />
      </div>
    </section>
  )
}

export default AICapabilityDetail
