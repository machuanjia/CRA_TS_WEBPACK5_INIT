/*
 * @Author: lubenben
 * @Date: 2022-07-26 14:09:12
 * @LastEditors: lubenben
 * @LastEditTime: 2022-07-28 20:24:17
 */
import { message } from 'antd'

import { useAppModel, useAppService } from '@/models'

export const useRolling = () => {
  const { setLongrunningTask } = useAppModel()
  const { operationTaskService } = useAppService()
  const rolling = (name) =>
    new Promise((resolve, reject) => {
      setLongrunningTask({
        id: name,
        process: 0,
        isVisible: true,
      })

      const getInfo = async () => {
        const [err, data]: any = await operationTaskService(name)
        if (err) {
          setLongrunningTask({ id: name, process: 0, isVisible: false })
          return
        }
        if (data.done) {
          if (data.error) {
            if (data.error.message) {
              message.error(data.error.message)
            }
            reject(data?.error?.message)
            setLongrunningTask({
              id: name,
              process: 0,
              isVisible: false,
            })
          } else {
            resolve(data)
            if (data?.response?.hint) {
              message.warn(data.response.hint)
            }
            setLongrunningTask({
              id: name,
              process: 0,
              isVisible: false,
            })
          }
        } else {
          setLongrunningTask({
            id: name,
            process: data.metadata.progress || 0,
            isVisible: true,
          })
          setTimeout(() => {
            getInfo()
          }, 1000)
        }
      }
      getInfo()
    })

  return { rolling }
}
