/*
 * @Author: lubenben
 * @Date: 2022-06-27 14:39:34
 * @LastEditors: lubenben
 * @LastEditTime: 2022-07-18 14:23:46
 */
import { useState } from 'react'

import { createModel } from 'hox'

function useCapability() {
  const [loading, setLoading] = useState(true)
  const [taskList, setTaskList] = useState([])
  const [list, setList] = useState([])
  const [selectList, setSelectList] = useState([])
  const [detail, setDetail] = useState(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [searchText, setSearchText] = useState('')

  return {
    taskList,
    setTaskList,
    list,
    setList,
    selectList,
    setSelectList,
    detail,
    setDetail,
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

export default createModel(useCapability)
