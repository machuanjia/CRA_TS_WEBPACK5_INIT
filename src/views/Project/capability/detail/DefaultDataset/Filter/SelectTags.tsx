import React from 'react'

import { Divider, Tag } from 'antd'

import styles from './index.module.less'

const SelectTags = (props) => {
  const {filterTags, setFilterTags} = props

  const handleSelect = (node, parentTag) => {
    if(parentTag) {
      parentTag.selected = false
    } else {
      node.sub_tags.forEach((item) => {
        item.selected = !node.selected
      })
    }
    node.selected = !node.selected
    setFilterTags([...filterTags])
  }

  const CreateTag = ({tag, parentTag = null, title = ''}) => (<Tag 
    key={tag.id} 
    onClick={() => { handleSelect(tag, parentTag) }} 
    className={`${styles['tag-wrap']} ${tag.selected ? styles['tag-wrap-active'] : ''}`}>
      {title || tag.title}
    </Tag>)

  return <>{filterTags && filterTags.length > 0 ? filterTags.map((parentTag) => <div key={parentTag.id}>
        <Divider className="margin-1" />
        <header className='font-bold text-medium'>{parentTag.title}</header>
        <div className='pt-2 pb-2'>
          <CreateTag tag={parentTag} title="全部"/>
          { parentTag.sub_tags.map((subTag) => <CreateTag key={subTag.id} tag={subTag} parentTag={parentTag} />) }
        </div>
      </div>) : null}
  </>
}
export default SelectTags
