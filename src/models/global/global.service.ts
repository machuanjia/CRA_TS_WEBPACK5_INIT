/*
 * @Author: D.Y.M
 * @Date: 2021-11-30 16:01:44
 * @LastEditTime: 2022-06-15 11:09:13
 * @FilePath: /main/src/models/global/global.service.ts
 * @Description:
 */

import globalActions from './global'
import useGlobalModel from './global.model'

const useGlobalService = () => {
  const { setProjectId } = useGlobalModel()
  const setGlobalService = (payload) => {
    globalActions.setGlobalState(payload)
  }
  const setGlobalProjectService = (id) => {
    setProjectId(id)
    setGlobalService({ projectId: id })
    localStorage.setItem('activeProject', id)
  }
  return { setGlobalProjectService, setGlobalService }
}

export default useGlobalService
