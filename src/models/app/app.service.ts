/*
 * @Author: D.Y.M
 * @Date: 2021-11-14 15:24:41
 * @LastEditTime: 2022-07-27 19:36:11
 * @FilePath: /main/src/models/app/app.service.ts
 * @Description:
 */

import { message } from 'antd'
import to from 'await-to-js'

import { getUserInfo, getDomains, getUserResources, getOperationTask } from '@/apis'
import { permissionsListIdMap } from '@/constants'
// import { getPermissionsRouters } from '@/routes'
// import asyncRoutes from '@/routes/async'

import useGlobalService from '../global/global.service'
import useAppModel from './app.model'

const useAppService = () => {
  const { setPermissions, setPermissionList, setInfo, setDomains, setLoading, bread, setBread } =
    useAppModel()
  const { setGlobalService } = useGlobalService()
  const getInfoService = async () => {
    const [err, data]: any = await to(getUserInfo())
    if (data) {
      setInfo(data)
      setGlobalService({ user: data })
      setLoading(false)
    }
    return [err, data]
  }

  const getDomainsService = async () => {
    const [err, data]: any = await to(getDomains())
    if (!err) {
      setDomains(data.domains)
      setGlobalService({ domains: data.domains })
    }
    return [err, data]
  }

  const operationTaskService = async (id) => {
    return await to(getOperationTask(id))
  }

  const getUserResourcesService = async (domainId: string, params: Record<string, unknown>) => {
    const [err, data]: any = await to(getUserResources(domainId, params))
    if (!err) {
      const { resources } = data
      setPermissionList(resources)
      setGlobalService({ resources })
      const permissions = []
      if (resources) {
        resources.forEach((n) => {
          const temp = permissionsListIdMap[n.id]
          if (temp) {
            permissions.push(temp.key)
          }
        })
        setPermissions(permissions)
        setGlobalService({ permissions })
      } else {
        message.warning('没有当前项目权限')
      }
      // const routes = getPermissionsRouters(asyncRoutes, permissions)
      // setRoutes(routes)
    }

    return [err, data]
  }

  const customBreads = async (breads, replace = false) => {
    if (replace) {
      setBread([...breads])
      return
    }
    if (bread.length > breads.length) {
      return
    }
    setBread([...breads, ...bread])
  }

  return {
    getInfoService,
    getDomainsService,
    operationTaskService,
    getUserResourcesService,
    customBreads,
  }
}

export default useAppService
