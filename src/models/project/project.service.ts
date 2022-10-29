/*
 * @Author: D.Y.M
 * @Date: 2021-11-14 15:24:41
 * @LastEditTime: 2022-07-13 10:05:34
 * @FilePath: /main/src/models/project/project.service.ts
 * @Description:
 */
import to from 'await-to-js'
import { EntityAdapter } from 'otter-pro/es/entity'

import {
  getProjects,
  createProject,
  getProjectDetail,
  updateProjectDetail,
  deleteProject,
  getProjectRoles,
} from '@/apis'
import { useGlobalService } from '@/models'
import { showAppLoading, hideAppLoading } from '@/utils'

import useProjectModel from './project.model'

const useProjectService = () => {
  const { setGlobalProjectService } = useGlobalService()

  const { list, total, setList, setPermissionList, setRolesList, setTotal, setLoading, setDetail } =
    useProjectModel()

  const getProjectDatas = async (
    params: {
      page: number
      page_size: number
    } = { page: 1, page_size: 200 },
  ) => {
    let dataList = []
    let permissionList = {}
    const [err, data]: any = await to(getProjects(params))
    if (err) {
      return [dataList, permissionList, err]
    } else if (data) {
      const { projectDetail = [], permissions = {}, total_size } = data
      dataList = [...dataList, ...projectDetail]
      permissionList = { ...permissionList, ...permissions }
      if (dataList.length < total_size && projectDetail.length === params.page_size) {
        const res = await getProjectDatas({ ...params, page: params.page + 1 })
        dataList = [...dataList, ...res[0]]
        permissionList = { ...permissionList, ...res[1] }
      }
    }
    return [dataList, permissionList]
  }

  const getProjectsService = async (
    params: {
      page: number
      page_size: number
      filter_args?: any
    } = { page: 1, page_size: 200 },
  ) => {
    showAppLoading()
    const [dataList, permissionList, err] = await getProjectDatas(params)
    if (dataList) {
      setList(dataList)
      setPermissionList(permissionList)
      setTotal(dataList.length)
      if (Object.keys(params).join().indexOf('filter_args') === -1) {
        localStorage.setItem(
          'internalProject',
          JSON.stringify(
            dataList.filter((item) => item.project.is_internal).map((item) => item.project.id),
          ),
        )
        if (!localStorage.getItem('activeProject')) {
          const defaultList = dataList.filter((item) => item.project.is_default)
          setGlobalProjectService((defaultList.length > 0 ? defaultList : dataList)[0]?.project?.id)
        } else {
          const defaultProject = dataList.find(
            (item) => item.project.id === localStorage.getItem('activeProject'),
          )
          if (!defaultProject && dataList.length > 0) {
            setGlobalProjectService(dataList[0].project.id)
          }
        }
      }
    }
    hideAppLoading()
    setLoading(false)
    return [err, dataList]
  }
  const createProjectService = async (payload) => {
    const [err, data] = await to(createProject(payload))
    // if (data) {
    //   setList(EntityAdapter.create(data, list))
    //   setTotal(total + 1)
    // }
    return [err, data]
  }
  const getProjectDetailService = async (id: string) => {
    const [err, data] = await to(getProjectDetail(id))
    if (data) {
      setDetail(data)
    }
    return [err, data]
  }
  const updateProjectService = async (id: string, params, payload) => {
    const [err, data] = await to(updateProjectDetail(id, params, payload))
    if (data) {
      setList(EntityAdapter.update(data, list))
    }
    return [err, data]
  }
  const deleteProjectService = async (id: string) => {
    const [err, data] = await to(deleteProject(id))
    if (!err) {
      const index = list.findIndex((n: any) => {
        return n.project.id === id;
      });
      if (index >= 0) {
        list.splice(index, 1);
        setList([...list])
        setTotal(total - 1)
      }
    }
    return [err, data]
  }

  const getProjectRolesService = async (domainId: string) => {
    const [err, data]: any = await to(getProjectRoles(domainId))

    if (!err) {
      setRolesList(data.roles)
    }

    return [err, data]
  }

  return {
    getProjectsService,
    createProjectService,
    getProjectDetailService,
    updateProjectService,
    deleteProjectService,
    getProjectRolesService,
  }
}

export default useProjectService
