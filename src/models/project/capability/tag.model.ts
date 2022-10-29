/*
 * @Author: lubenben
 * @Date: 2022-06-27 14:39:34
 * @LastEditors: lubenben
 * @LastEditTime: 2022-06-27 16:06:42
 */
import { useState } from 'react'

import { createModel } from 'hox'

function useCapabilityTag() {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const [tags, setTags] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  return {
    list,
    setList,
    tags,
    setTags,
    page,
    setPage,
    pageSize,
    setPageSize,
    loading,
    setLoading,
  }
}

export default createModel(useCapabilityTag)
