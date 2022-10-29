/*
 * @Author: lubenben
 * @Date: 2022-06-27 15:08:42
 * @LastEditors: lubenben
 * @LastEditTime: 2022-08-10 19:55:35
 */
import { request } from '@/utils'

export const getAiTasks = (projectId: string, params: Record<string, unknown>) => {
  return request({
    url: `/projects/${projectId}/ai_tasks`,
    method: 'get',
    params,
  })
}

export const getAiCapabilities = (projectId: string, params: Record<string, unknown>) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities`,
    method: 'get',
    params,
  })
}

export const getTags = async (projectId, params) => {
  return request({
    url: `/projects/${projectId}/tags`,
    method: 'get',
    params,
  })
}

export const getSets = async (projectId, params) => {
  return request({
    url: `/projects/${projectId}/datasets`,
    method: 'get',
    params,
  })
}

export const getDatasetsLatestAnnotatedVersions = async (projectId, paramsUrl: string) => {
  return request({
    url: `/projects/${projectId}/datasets/*/versions/latest?${paramsUrl}`,
    method: 'get',
  })
}

export const getAiCapabilityDetail = (projectId: string, aiCapabilityId: string) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities/${aiCapabilityId}/detail`,
    method: 'get',
  })
}

export const createAiCapability = (projectId: string, data: Record<string, unknown>) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities`,
    method: 'post',
    data,
  })
}

export const updateAiCapability = (
  projectId: string,
  aiCapabilityId: string,
  params: Record<string, unknown>,
  data: Record<string, unknown>,
) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities/${aiCapabilityId}`,
    method: 'post',
    params,
    data,
  })
}

export const archiveAiCapability = (projectId: string, aiCapabilityId: string) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities/${aiCapabilityId}:archive`,
    method: 'post',
  })
}

export const unArchiveAiCapability = (projectId: string, aiCapabilityId: string) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities/${aiCapabilityId}:un_archive`,
    method: 'post',
  })
}

export const downloadAICapability = (projectId: string) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities:download`,
    method: 'post',
  })
}

export const getUploadToken = () => {
  return request({
    url: `/data_sts_credential`,
    method: 'get',
  })
}

export const uploadAICapability = (projectId: string, data: Record<string, unknown>) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities:upload`,
    method: 'post',
    data,
  })
}

// tag
export const getAiCapabilityTags = (
  projectId: string,
  aiCapabilityId: string,
  params: Record<string, unknown>,
) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities/${aiCapabilityId}/tags`,
    method: 'get',
    params,
  })
}

export const addAICapabilityTag = (projectId: string, aiCapabilityId: string, tagId: string) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities/${aiCapabilityId}/tags/${tagId}`,
    method: 'post',
  })
}

export const deleteAICapabilityTag = (projectId: string, aiCapabilityId: string, tagId: string) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities/${aiCapabilityId}/tags/${tagId}`,
    method: 'delete',
  })
}

// 标注模板
export const getTemplates = (
  projectId: string,
  aiCapabilityId: string,
  params: Record<string, unknown>,
) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities/${aiCapabilityId}/templates`,
    method: 'get',
    params,
  })
}

export const createTemplate = (
  projectId: string,
  aiCapabilityId: string,
  data: Record<string, unknown>,
) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities/${aiCapabilityId}/templates`,
    method: 'post',
    data,
  })
}

export const getTemplateDetail = (
  projectId: string,
  aiCapabilityId: string,
  templateId: string,
) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities/${aiCapabilityId}/templates/${templateId}/detail`,
    method: 'get',
  })
}

export const getLatestTemplateDetail = (projectId: string, aiCapabilityId: string) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities/${aiCapabilityId}/templates/latest`,
    method: 'get',
  })
}

export const getAllowAnnotations = (projectId: string, aiCapabilityId: string) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities/${aiCapabilityId}/allow_annotation`,
    method: 'get',
  })
}

export const getDefaultDatasets = (
  projectId: string,
  aiCapabilityId: string,
  params: Record<string, unknown>,
) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities/${aiCapabilityId}/datasets`,
    method: 'get',
    params,
  })
}

export const addDefaultDataset = (
  projectId: string,
  aiCapabilityId: string,
  data: Record<string, unknown>,
) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities/${aiCapabilityId}/datasets:add`,
    method: 'post',
    data,
  })
}

export const removeDefaultDataset = (
  projectId: string,
  aiCapabilityId: string,
  data: Record<string, unknown>,
) => {
  return request({
    url: `/projects/${projectId}/ai_capabilities/${aiCapabilityId}/datasets:remove`,
    method: 'post',
    data,
  })
}
