import { request } from '@/utils'

import initApis from './base'

export const {
  getEntities: getProjects,
  createEntity: createProject,
  getEntityDetail: getProjectDetail,
  updateEntity: updateProject,
  deleteEntity: deleteProject,
} = initApis('projects')

export const updateProjectDetail = (
  projectId: string,
  params: Record<string, unknown>,
  data: Record<string, unknown>,
) => {
  return request({
    url: `/projects/${projectId}`,
    method: 'post',
    params,
    data,
  })
}

export const getProjectRoles = (domainId: string) => {
  return request({
    // baseURL: `https://test-mlp.laiye.com/apis/v1alpha1/`,
    url: `/rbac/domains/${domainId}/roles`,
    method: 'get',
  })
}

export const getProjectPermission = (domainId: string, params: Record<string, unknown>) => {
  return request({
    url: `/rbac/domains/${domainId}/permissions`,
    method: 'get',
    params,
  })
}

export const addProjectPermission = (domainId: string, data: Record<string, unknown>) => {
  return request({
    url: `/rbac/domains/${domainId}/permissions`,
    method: 'post',
    data,
  })
}

export const updateProjectPermission = (
  domainId: string,
  permissionId: string,
  data: Record<string, unknown>,
) => {
  return request({
    url: `/rbac/domains/${domainId}/permissions/${permissionId}/role`,
    method: 'post',
    data,
  })
}

export const deleteProjectPermission = (domainId: string, permissionId: string) => {
  return request({
    url: `/rbac/domains/${domainId}/permissions/${permissionId}`,
    method: 'delete',
  })
}
