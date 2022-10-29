/*
 * @Author: D.Y.M
 * @Date: 2022-03-02 11:00:34
 * @LastEditTime: 2022-04-28 10:06:38
 * @FilePath: /main/src/layouts/GlobalState/index.tsx
 * @Description:
 */

import { useMount } from 'ahooks'
import { useNavigate } from 'react-router-dom'

import { useAppModel } from '@/models'
import globalActions from '@/models/global/global'
import { hideAppLoading, showAppLoading } from '@/utils'

const GlobalState = () => {
  const history = useNavigate()
  const { setLongrunningTask } = useAppModel()
  const handleState = () => {
    globalActions.onGlobalStateChange((state, prev) => {
      if (state.loading) {
        showAppLoading()
      } else {
        hideAppLoading()
      }
      state.longrunning && setLongrunningTask(state.longrunning)
      if (state.projectId && state.path && state.path !== prev.path) {
        history(`/projects/${state.projectId}${state.path}`)
      }
    })
  }
  useMount(() => {
    handleState()
  })
  return <></>
}
export default GlobalState
