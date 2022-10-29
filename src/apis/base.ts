/*
 * @Author: D.Y.M
 * @Date: 2021-11-23 17:26:17
 * @LastEditTime: 2021-12-25 13:36:16
 * @FilePath: /mlplatform/web/main/src/apis/base.ts
 * @Description:
 */
import { initEntityApis } from 'otter-pro/es/api'

import { request } from '@/utils'

const initApis = (prefix: string) => {
  return initEntityApis(prefix,request)
}
export default initApis
