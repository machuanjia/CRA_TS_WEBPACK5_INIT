/*
 * @Author: D.Y.M
 * @Date: 2022-03-02 16:39:11
 * @LastEditTime: 2022-06-23 17:42:57
 * @FilePath: /main/src/layouts/Project/index.tsx
 * @Description:
 */
import React, { useContext, useEffect, useState } from 'react'

import { CheckOutlined } from '@ant-design/icons'
import { useMount } from 'ahooks'
import { Popover } from 'antd'
import { Icon, SimpleCheckList, Text } from 'otter-pro'
import { ut } from 'otter-pro/es/i18n'
import { useNavigate } from 'react-router-dom'

import { useAppModel, useGlobalModel, useGlobalService, useProjectModel, useProjectService } from '@/models'
import { appPaths } from '@/routes/async'

import { MainContext } from '../context'
import styles from './index.module.less'

const Project = () => {
  const { t } = ut()
  const { list, page, pageSize } = useProjectModel()
  const { getProjectsService } = useProjectService()
  const { setGlobalProjectService } = useGlobalService()
  const { currentRoute } = useAppModel()
  const { projectId } = useGlobalModel()
  const history = useNavigate()
  const [projectName, setProjectName] = useState('')
  const { isCollapsed } = useContext(MainContext)
  useMount(() => {
    getProjectsService({
      page,
      page_size: pageSize,
    })
  })

  const handleProject = (item) => {
    setGlobalProjectService(item.id)
    if(currentRoute && appPaths.includes(currentRoute.path)){
      window.location.href = `${window.location.protocol}//${window.location.host}/projects/${item.id}/dashboard`
    }else{
      history(`/projects/${item.id}/dashboard`)
    }
  }

  useEffect(() => {
    if (list && list?.length > 0 && projectId) {
      const active = list.find((n) => {
        return n.project.id === projectId
      })
      if (active) {
        setProjectName(active.project.title)
      }
    }
  }, [list, projectId])

  const handleProjects = () => {
    history('/projects')
  }

  const PopContext = () => {
    return (
      <section className=" w-52 flex flex-col">
        <div className=" flex-1 max-h-96 overflow-y-auto overflow-x-hidden">
          <SimpleCheckList
            list={list.map((item) => item.project)}
            selected={projectId}
            onItemClick={handleProject}
            Suffix={CheckOutlined}
            truncate
          />
        </div>
        <footer
          onClick={handleProjects}
          className="border-t border-solid border-medium p-2 pl-4 flex justify-start items-center text-secondary cursor-pointer hover:text-primary"
        >
          <Text type="link">{t('project.viewAll')}</Text>
        </footer>
      </section>
    )
  }
  return (
    <Popover
      content={PopContext}
      title={null}
      placement={isCollapsed ? 'rightTop' : 'bottom'}
      overlayClassName="pop-wrap"
    >
      <div className={`${styles['project-wrap']} ${!isCollapsed && styles['project-wrap-open']}`}>
        <div className={styles['project-bread']}>
          <Icon name="project" />
          {!isCollapsed && (
            <span className="ml-2 max-w-6xl whitespace-nowrap overflow-ellipsis overflow-hidden">
              {projectName || '项目'}
            </span>
          )}
        </div>
      </div>
    </Popover>
  )
}

export default Project
