/*
 * @Author: D.Y.M
 * @Date: 2021-11-14 15:24:41
 * @LastEditTime: 2022-06-15 11:17:56
 * @FilePath: /main/src/models/team/team.service.ts
 * @Description:
 */
import to from 'await-to-js'
import { EntityAdapter } from 'otter-pro/es/entity'

import {
  createTeam,
  deleteTeam,
  getTeamDetail,
  getTeams,
  updateTeamDetail,
} from '@/apis'

import useTeamModel from './team.model'

import type { IList } from 'otter-pro'

const useTeamService = () => {
  const { list, total, setList, setTotal, setLoading, setDetail } =
    useTeamModel()
  const getTeamsService = async (params = {}) => {
    const [err, data]: (IList | any)[] = await to(getTeams(params))
    if (data) {
      const { teams = [], total_size = 0 } = data
      setList(teams)
      setTotal(total_size)
    }
    setLoading(false)
    return [err, data]
  }
  const createTeamService = async (payload) => {
    const [err, data] = await to(createTeam(payload))
    if (data) {
      setList(EntityAdapter.create(data, list))
      setTotal(total + 1)
    }
    return [err, data]
  }
  const getTeamDetailService = async (id: string) => {
    const [err, data] = await to(getTeamDetail(id))
    if (data) {
      setDetail(data)
    }
    return [err, data]
  }
  const updateTeamService = async (id: string, params, payload) => {
    const [err, data] = await to(updateTeamDetail(id, params, payload))
    if (data) {
      setList(EntityAdapter.update(data, list))
    }
    return [err, data]
  }
  const deleteTeamService = async (id: string) => {
    const [err, data] = await to(deleteTeam(id))
    if (data) {
      setList(EntityAdapter.delete(id, list))
      setTotal(total - 1)
    }
    return [err, data]
  }

  return {
    getTeamsService,
    createTeamService,
    getTeamDetailService,
    updateTeamService,
    deleteTeamService,
  }
}
export default useTeamService
