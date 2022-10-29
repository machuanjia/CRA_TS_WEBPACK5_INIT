/*
 * @Author: lubenben lubenben@laiye.com
 * @Date: 2022-06-14 14:04:35
 * @LastEditors: lubenben lubenben@laiye.com
 * @LastEditTime: 2022-06-21 20:10:41
 * @FilePath: /mlplatform/web/main/src/apis/engine.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from '@/utils'

export const getAiEngines = (projectId: string, params: Record<string, unknown>) => {
  return request({
    url: `/projects/${projectId}/ai_engines`,
    method: 'get',
    params,
  })
}

export const createAiEngine = (projectId: string, data: Record<string, unknown>) => {
  return request({
    url: `/projects/${projectId}/ai_engines`,
    method: 'post',
    data,
  })
}

export const updateAiEngine = (
  projectId: string,
  engineId: string,
  params: Record<string, unknown>,
  data: Record<string, unknown>,
) => {
  return request({
    url: `/projects/${projectId}/ai_engines/${engineId}`,
    method: 'post',
    params,
    data,
  })
}

export const deleteAiEngine = (projectId: string, engineId: string) => {
  return request({
    url: `/projects/${projectId}/ai_engines/${engineId}`,
    method: 'delete',
  })
}
