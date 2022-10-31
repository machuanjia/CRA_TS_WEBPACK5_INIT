/*
 * @Author: D.Y.M
 * @Date: 2021-10-19 16:43:46
 * @LastEditTime: 2022-10-19 12:10:07
 * @FilePath: /main/src/App.tsx
 * @Description:
 */
import { useEffect } from 'react'

import { useMount } from 'ahooks'
import { useNavigate } from 'react-router-dom'

import { Routers } from '@/routes'
import { getStateFromURl } from '@/utils'

import GlobalState from './layouts/GlobalState'
import { useAppModel, useAppService, useGlobalModel, useGlobalService } from './models'
import globalActions from './models/global/global'

const App = () => {
  const history = useNavigate()
  const { projectId } = useGlobalModel()
  const { setGlobalProjectService } = useGlobalService()
  const { domains, permissions, info, setLevel } = useAppModel()
  const { getInfoService, getDomainsService, getUserResourcesService } = useAppService()
  useMount(() => {
    getInfoService()
    getDomainsService()
  })

  const getPermissions = async () => {
    const domainId = domains.find((item) => item.title === '项目').id

    const [err, data] = await getUserResourcesService(domainId, { data_id: projectId })
    if (!err) {
      const { resources, level } = data
      setLevel(level)
      if (!resources) {
        history('/projects')
      }
    }
  }

  useEffect(() => {
    if (projectId && domains && domains.length > 0 && permissions.length === 0) {
      getPermissions()
    }
  }, [projectId, domains, permissions])

  useEffect(() => {
    projectId &&
      domains.length > 0 &&
      permissions.length > 0 &&
      info &&
      globalActions.setGlobalState({ loading: false })
  }, [projectId, domains, permissions, info])

  useEffect(() => {
    const pdi = getStateFromURl('projects')
    if (pdi && pdi.length === 32) {
      setGlobalProjectService(pdi)
    }
  }, [])

  return (
    <>
      <GlobalState />
      <Routers />
    </>
  )
}

export default App
