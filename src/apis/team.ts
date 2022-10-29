/*
 * @Author: D.Y.M
 * @Date: 2021-10-28 11:36:08
 * @LastEditTime: 2022-06-14 14:04:11
 * @FilePath: /otter/src/apis/team.ts
 * @Description:
 */
import { request } from '@/utils'

import initApis from './base'

export const {
  getEntities: getTeams,
  createEntity: createTeam,
  getEntityDetail: getTeamDetail,
  updateEntity: updateTeam,
  deleteEntity: deleteTeam,
} = initApis('teams')

export const updateTeamDetail = (
  teamId: string,
  params: Record<string, unknown>,
  data: Record<string, unknown>,
) => {
  return request({
    url: `/teams/${teamId}`,
    method: 'post',
    params,
    data,
  })
}

export const getTeamMembers = (teamId: string, params: Record<string, unknown>) => {
  return request({
    url: `/teams/${teamId}/users`,
    method: 'get',
    params,
  })
}

export const addTeamMember = (teamId: string, data: Record<string, unknown>) => {
  return request({
    url: `/teams/${teamId}/users`,
    method: 'post',
    data,
  })
}

export const deleteTeamMember = (teamId: string, userId: string) => {
  return request({
    url: `/teams/${teamId}/users/${userId}`,
    method: 'delete',
  })
}
