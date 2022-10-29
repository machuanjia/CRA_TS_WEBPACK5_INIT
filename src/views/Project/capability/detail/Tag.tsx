/*
 * @Author: lubenben
 * @Date: 2022-06-27 16:31:15
 * @LastEditors: lubenben
 * @LastEditTime: 2022-07-18 15:59:13
 */
import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useCapabilityTagService } from '@/models'

import SelectTag from './components/SelectTag'

const Tag = () => {
  const { capabilityId } = useParams()
  const { getAiCapabilityTagsService, getTagsService } = useCapabilityTagService()

  const initData = async () => {
    await getAiCapabilityTagsService(capabilityId, { page: 1, page_size: 200 })
    await getTagsService({ page: 1, page_size: 200 })
  }

  useEffect(() => {
    initData()
  }, [])

  return <SelectTag />
}

export default Tag
