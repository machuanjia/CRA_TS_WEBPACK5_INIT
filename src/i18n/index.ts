/*
 * @Author: D.Y.M
 * @Date: 2021-12-16 10:02:59
 * @LastEditTime: 2022-02-15 10:53:24
 * @FilePath: /main/src/i18n/index.ts
 * @Description: 
 */
import {LOCAL_TYPES, setI18nResources} from 'otter-pro/es/i18n'

import enUsTrans from './locales/en-us.js'
import zhCnTrans from './locales/zh-cn.js'

export const setResources = () => {
  setI18nResources([
    {
      key: LOCAL_TYPES.enUS,
      source: enUsTrans,
    },
    {
      key: LOCAL_TYPES.zhCN,
      source: zhCnTrans,
    },
  ])
}
