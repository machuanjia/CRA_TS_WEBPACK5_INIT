/*
 * @Author: lubenben
 * @Date: 2022-06-27 14:39:52
 * @LastEditors: lubenben
 * @LastEditTime: 2022-07-04 14:00:40
 */
import to from 'await-to-js'
import { EntityAdapter } from 'otter-pro/es/entity'

import { getTemplates, getTemplateDetail, getLatestTemplateDetail, createTemplate } from '@/apis'

import useCapabilityTemplateModel from './template.model'

import type { IList } from 'otter-pro'

const useCapabilityTemplateService = () => {
  const { setLoading, list, setList, total, setTotal, setDetail, setLastDetail } =
    useCapabilityTemplateModel()

  const getTemplatesService = async (projectId: string, aiCapabilityId: string, params = {}) => {
    const [err, data]: IList[] = await to(getTemplates(projectId, aiCapabilityId, params))

    if (!err) {
      const { templates = [], total_size = 0 } = data

      setList(templates)
      setTotal(total_size)
    }

    setLoading(false)
    return [err, data]
  }

  const getTemplateDetailService = async (
    projectId: string,
    aiCapabilityId: string,
    templateId: string,
  ) => {
    const [err, data] = await to(getTemplateDetail(projectId, aiCapabilityId, templateId))

    if (!err) {
      setDetail(data)
    }

    return [err, data]
  }

  const getLatestTemplateDetailService = async (projectId: string, aiCapabilityId: string) => {
    const [err, data] = await to(getLatestTemplateDetail(projectId, aiCapabilityId))

    if (!err) {
      setLastDetail(data)
    }

    return [err, data]
  }

  const createTemplateService = async (projectId: string, aiCapabilityId: string, payload = {}) => {
    const [err, data]: any = await to(createTemplate(projectId, aiCapabilityId, payload))

    if (!err) {
      setList(EntityAdapter.create(data, list))
      setTotal(total + 1)
    }

    return [err, data]
  }

  return {
    getTemplatesService,
    createTemplateService,
    getTemplateDetailService,
    getLatestTemplateDetailService,
  }
}

export default useCapabilityTemplateService
