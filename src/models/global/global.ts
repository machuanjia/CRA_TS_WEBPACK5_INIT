/*
 * @Author: D.Y.M
 * @Date: 2021-11-14 16:02:55
 * @LastEditTime: 2022-04-28 10:02:59
 * @FilePath: /main/src/models/global/global.ts
 * @Description: 
 */
import { initGlobalState } from 'qiankun'

import type { MicroAppStateActions } from 'qiankun'

const appState = {
  projectId: null,
  token:'',
  loading:true,
  longrunning:{
    id:'',
    process:0,
    isVisible:false,
  },
  path:''
}
const globalActions: MicroAppStateActions = initGlobalState(appState)

export default globalActions
