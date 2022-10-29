/*
 * @Author: D.Y.M
 * @Date: 2021-11-14 11:58:41
 * @LastEditTime: 2021-12-02 15:45:40
 * @Description:
 */
import { useState } from 'react'

import { createModel } from 'hox'

function useTeam() {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [detail, setDetail] = useState(null)

  return {
    list,
    setList,
    page,
    setPage,
    pageSize,
    setPageSize,
    detail,
    setDetail,
    total,
    setTotal,
    loading,
    setLoading,
  }
}

export default createModel(useTeam)
