import React, {  useEffect, useState } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Radio } from 'antd'
import { ut } from 'otter-pro/es/i18n'

import SelectTags from './SelectTags'

const RADIO_LIST = ['全部', '真实数据', '合成数据']
const { Search } = Input;

const FilterList = ({onChange, save, allTags}) => {
  const { t } = ut()
  const [filterParmas, setFilterParmas] = useState({
    searchText: '',
    datasetType: '',
    filterTags: []
  })

  const resetTagsList = () => {
    const initData = {
      searchText: '',
      datasetType: '',
      filterTags: JSON.parse(JSON.stringify(allTags))
    }
    setFilterParmas(initData)
    onChange(initData)
  }

  useEffect(() => {
    if(allTags) {
      resetTagsList()
    }
  }, [allTags])

  const changeValue = ({search = true, ...arg}) => {
    if(search) {
      onChange({...filterParmas, ...arg})
    }
    setFilterParmas({...filterParmas, ...arg})
  }

  return <>
    <Search 
      className="search mr-2 mb-2 mt-2 w-72" 
      enterButton={<SearchOutlined />} 
      value={filterParmas.searchText} 
      placeholder={t('common.placeholder.title')} 
      allowClear
      onChange={(e)=>changeValue({searchText: e.target.value, search: false})}
      onSearch={()=>changeValue({})}/>
    <header className='font-bold text-medium mb-4 mt-2'>数据类型</header>
    <Radio.Group
      className='mb-4'
      value={filterParmas.datasetType}
      onChange={(e)=> changeValue({datasetType: e.target.value})}>
      {RADIO_LIST.map((title, i) => <Radio value={i} key={title}>{title}</Radio>)}
    </Radio.Group>
    <SelectTags filterTags={filterParmas.filterTags} setFilterTags={(tags) => changeValue({filterTags: tags})} />
    <Button className="w-full mt-3.5" onClick={()=>resetTagsList()}>重置</Button>
    <Button type="primary" className="w-full mt-3.5" onClick={save}>确定</Button>
  </>
}
export default FilterList
