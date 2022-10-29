/*
 * @Author: lubenben
 * @Date: 2022-06-27 14:39:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-18 18:16:22
 */
import to from 'await-to-js'

import { getAiCapabilityTags, getTags, addAICapabilityTag, deleteAICapabilityTag } from '@/apis'
import { useGlobalModel } from '@/models'
import { addKey } from '@/views/Project/capability/detail/components/select.tag.helper'

import useCapabilityTagModel from './tag.model'

import type { IList } from 'otter-pro'

const useCapabilityTagService = () => {
  const { projectId } = useGlobalModel()
  const { setLoading, setTags, setList } = useCapabilityTagModel()

  const getAiCapabilityTagsService = async (aiCapabilityId: string, params = {}) => {
    const [err, data]: IList[] = await to(getAiCapabilityTags(projectId, aiCapabilityId, params))

    if (!err) {
      const { tags = [] } = data

      setList(tags)
    }

    setLoading(false)
    return [err, data]
  }

  const getTagsService = async (payload = {}) => {
    const [err, data]: any = await to(getTags(projectId, payload))
    if (data) {
      setTags(addKey(data.tags, 'sub_tags') || [])
    }
    return [err, data]
  }

  const addAICapabilityTagService = async (aiCapabilityId: string, tagId: string) => {
    const [err, data] = await to(addAICapabilityTag(projectId, aiCapabilityId, tagId))
    return [err, data]
  }

  const deleteAICapabilityTagService = async (aiCapabilityId: string, tagId: string) => {
    const [err, data] = await to(deleteAICapabilityTag(projectId, aiCapabilityId, tagId))
    return [err, data]
  }

  return {
    getAiCapabilityTagsService,
    getTagsService,
    addAICapabilityTagService,
    deleteAICapabilityTagService,
  }
}

export default useCapabilityTagService
