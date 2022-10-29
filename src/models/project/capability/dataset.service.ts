/*
 * @Author: lubenben
 * @Date: 2022-08-08 16:44:43
 * @LastEditors: lubenben
 * @LastEditTime: 2022-10-19 10:02:55
 */
import to from 'await-to-js'

import {
  getTags,
  getAllowAnnotations,
  getDefaultDatasets,
  addDefaultDataset,
  removeDefaultDataset,
  getSets,
  getDatasetsLatestAnnotatedVersions,
} from '@/apis'
import { useGlobalModel } from '@/models'

import useDefaultDatasetModel from './dataset.model'

import type { IList } from 'otter-pro'

const useDefaultDatasetService = () => {
  const { projectId } = useGlobalModel()
  const { setLoading, setList, setTotal, setTags } = useDefaultDatasetModel()

  const getAllowAnnotationsService = async (projectId: string, aiCapabilityId: string) =>
    await to(getAllowAnnotations(projectId, aiCapabilityId))

  const getTagsService = async (proID, payload = {}) => {
    const [err, data]: any = await to(getTags(proID, payload))
    if (data) {
      setTags(data.tags || [])
    }
    return [err, data]
  }

  const getSetsListService = (data) => getSets(projectId, data)

  const getDatasetsLatestAnnotatedVersionsService = async (payload) =>
    getDatasetsLatestAnnotatedVersions(projectId, payload)

  const getDefaultDatasetsService = async (
    projectId: string,
    aiCapabilityId: string,
    params = {},
  ) => {
    const [err, data]: IList[] = await to(getDefaultDatasets(projectId, aiCapabilityId, params))

    if (!err) {
      const { dataset_dataset_versions = [], total_size = 0 } = data

      setList(dataset_dataset_versions)
      setTotal(total_size)
    }

    setLoading(false)
    return [err, data]
  }

  const addDefaultDatasetService = async (aiCapabilityId: string, payload = {}) =>
    await to(addDefaultDataset(projectId, aiCapabilityId, payload))

  const removeDefaultDatasetService = async (aiCapabilityId: string, payload = {}) =>
    await to(removeDefaultDataset(projectId, aiCapabilityId, payload))

  return {
    getTagsService,
    getSetsListService,
    getDatasetsLatestAnnotatedVersionsService,
    getAllowAnnotationsService,
    getDefaultDatasetsService,
    addDefaultDatasetService,
    removeDefaultDatasetService,
  }
}

export default useDefaultDatasetService
