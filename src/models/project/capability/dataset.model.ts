import { useState } from 'react'

import { createModel } from 'hox'

function useDefaultDataset() {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const [tags, setTags] = useState(null)
  const [searchText, setSearchText] = useState('')

  return {
    list,
    setList,
    total,
    setTotal,
    page,
    setPage,
    pageSize,
    setPageSize,
    loading,
    setLoading,

    tags,
    setTags,
    searchText,
    setSearchText,
  }
}

export default createModel(useDefaultDataset)
