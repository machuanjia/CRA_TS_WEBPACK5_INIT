/*
 * @Author: lubenben
 * @Date: 2022-06-27 14:39:52
 * @LastEditors: lubenben
 * @LastEditTime: 2022-08-25 14:33:59
 */
import to from 'await-to-js'
import { EntityAdapter } from 'otter-pro/es/entity'

import {
  getAiTasks,
  getAiCapabilities,
  getAiCapabilityDetail,
  createAiCapability,
  updateAiCapability,
  archiveAiCapability,
  unArchiveAiCapability,
  downloadAICapability,
  getUploadToken,
  uploadAICapability,
} from '@/apis'

import useCapabilityModel from './capability.model'

import type { IList } from 'otter-pro'

const useCapabilityService = () => {
  const { setTaskList, setLoading, list, setList, setSelectList, setTotal, setDetail } =
    useCapabilityModel()

  const getAiTasksService = async (projectId: string, params = {}) => {
    const [err, data]: IList[] = await to(getAiTasks(projectId, params))

    if (!err) {
      const { ai_tasks = [] } = data

      setTaskList(ai_tasks)
    }

    return [err, data]
  }

  const getAiCapabilitiesService = async (
    projectId: string,
    params = {},
    isSetSelectList = false,
  ) => {
    const [err, data]: IList[] = await to(getAiCapabilities(projectId, params))

    if (!err) {
      const { ai_capabilities = [], total_size = 0 } = data

      const addAiTask = (capabilities) => {
        const result = []

        capabilities.forEach((capability) => {
          if (capability?.ai_capability?.sub_capabilities) {
            capability.ai_capability.sub_capabilities = addAiTask(
              capability?.ai_capability?.sub_capabilities,
            )
          }

          result.push({
            ai_task: capability?.ai_task?.title,
            project_id: capability?.project?.id,
            ...capability.ai_capability,
          })
          delete capability.ai_task
          delete capability.project
        })

        return result
      }

      if (isSetSelectList) {
        setSelectList(addAiTask(ai_capabilities))
      } else {
        setList(addAiTask(ai_capabilities))
      }
      setTotal(total_size)
    }

    setLoading(false)
    return [err, data]
  }

  const getAiCapabilityDetailService = async (
    projectId: string,
    aiCapabilityId: string,
    isSetDetail = true,
  ) => {
    const [err, data] = await to(getAiCapabilityDetail(projectId, aiCapabilityId))

    if (!err && isSetDetail) {
      setDetail(data)
    }

    return [err, data]
  }

  const createAiCapabilityService = async (projectId: string, payload = {}) => {
    return await to(createAiCapability(projectId, payload))
  }

  const updateAiCapabilityService = async (
    projectId: string,
    aiCapabilityId: string,
    params = {},
    payload = {},
  ) => {
    const [err, data]: any = await to(
      updateAiCapability(projectId, aiCapabilityId, params, payload),
    )

    if (!err) {
      setList(EntityAdapter.update(data, list))
    }

    return [err, data]
  }

  const archiveAiCapabilityService = async (projectId: string, aiCapabilityId: string) => {
    return await to(archiveAiCapability(projectId, aiCapabilityId))
  }

  const unArchiveAiCapabilityService = async (projectId: string, aiCapabilityId: string) => {
    return await to(unArchiveAiCapability(projectId, aiCapabilityId))
  }

  const downloadAICapabilityService = async (projectId: string) => {
    return await to(downloadAICapability(projectId))
  }

  const getUploadTokenService = async () => {
    return await to(getUploadToken())
  }

  const uploadAICapabilityService = async (projectId: string, payload = {}) => {
    return await to(uploadAICapability(projectId, payload))
  }

  return {
    getAiTasksService,
    getAiCapabilitiesService,
    getAiCapabilityDetailService,
    createAiCapabilityService,
    updateAiCapabilityService,
    archiveAiCapabilityService,
    unArchiveAiCapabilityService,
    downloadAICapabilityService,
    getUploadTokenService,
    uploadAICapabilityService,
  }
}

export default useCapabilityService
