/*
 * @Author: D.Y.M
 * @Date: 2021-11-14 11:58:41
 * @LastEditTime: 2022-07-14 13:42:42
 * @Description:
 */
import { useState } from 'react'

import { createModel } from 'hox'

function useApp() {
  const [token, setToken] = useState('')
  const [permissions, setPermissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [routes, setRoutes] = useState([])
  const [currentRoute, setCurrentRoute] = useState(null)
  const [bread, setBread] = useState([])
  const [info, setInfo] = useState(null)
  const [longrunningTask, setLongrunningTask] = useState({ id: '', process: 0, isVisible: false })
  const [errors, setErrors] = useState([])
  const [domains, setDomains] = useState([])
  const [permissionList, setPermissionList] = useState([])
  const [level, setLevel] = useState(0)

  return {
    token,
    setToken,
    permissions,
    setPermissions,
    loading,
    setLoading,
    routes,
    setRoutes,
    currentRoute,
    setCurrentRoute,
    bread,
    setBread,
    info,
    setInfo,
    longrunningTask,
    setLongrunningTask,
    errors,
    setErrors,
    domains,
    setDomains,
    permissionList,
    setPermissionList,
    level, 
    setLevel,
  }
}

export default createModel(useApp)
