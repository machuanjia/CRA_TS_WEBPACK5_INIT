/*
 * @Author: lubenben
 * @Date: 2022-06-27 14:39:34
 * @LastEditors: lubenben
 * @LastEditTime: 2022-06-27 16:21:52
 */
import { useState } from 'react'

import { createModel } from 'hox'

function useCapabilityTemplate() {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const [detail, setDetail] = useState(null)
  const [lastDetail, setLastDetail] = useState(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [searchText, setSearchText] = useState('')

  return {
    list,
    setList,
    detail,
    setDetail,
    lastDetail,
    setLastDetail,
    total,
    setTotal,
    page,
    setPage,
    pageSize,
    setPageSize,
    loading,
    setLoading,
    searchText,
    setSearchText,
  }
}

export default createModel(useCapabilityTemplate)
