/*
 * @Author: D.Y.M
 * @Date: 2022-04-27 11:08:47
 * @LastEditTime: 2022-04-27 15:19:54
 * @FilePath: /main/src/hooks/usePermission.ts
 * @Description:
 */
import { message } from 'antd'

import { permissionsListMap } from '@/constants'
import { useAppModel } from '@/models'

export const usePermission = () => {
  const { permissionList } = useAppModel()

  const isHasPermission = (key: string, isShowWarning?: boolean) => {
    const isPermission = !!permissionList.find((item) => item.id === permissionsListMap[key]?.id)

    if (isPermission) {
      return true
    } else {
      if (isShowWarning) {
        message.warn(`${permissionsListMap[key]?.name}暂无访问权限!`)
      }
      return false
    }
  }

  return [isHasPermission]
}
