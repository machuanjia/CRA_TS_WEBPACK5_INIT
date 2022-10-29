/*
 * @Author: lubenben lubenben@laiye.com
 * @Date: 2022-06-14 12:44:34
 * @LastEditors: lubenben lubenben@laiye.com
 * @LastEditTime: 2022-06-14 14:37:53
 * @FilePath: /mlplatform/web/main/src/models/project/engine.model.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from 'react'

import { createModel } from 'hox'

function useEngine() {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const [detail, setDetail] = useState(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [searchText, setSearchText] = useState('')

  return {
    list,
    setList,
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

export default createModel(useEngine)
