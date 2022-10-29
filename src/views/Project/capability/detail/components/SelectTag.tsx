/*
 * @Author: D.Y.M
 * @Date: 2022-04-28 17:34:59
 * @LastEditTime: 2022-08-31 13:43:13
 * @FilePath: /main/src/views/Project/capability/detail/components/SelectTag.tsx
 * @Description:
 */
import React, { useContext, useEffect, useState } from 'react'

import { message, Spin, Tag, TreeSelect } from 'antd'
import { useParams } from 'react-router-dom'

import { usePermission } from '@/hooks'
import { useCapabilityTagModel, useCapabilityTagService } from '@/models'
import { CapabilityContext } from '@/views/Project/context'

import styles from './index.module.less'
import { getDiff, getPathKey, getSelectedChildren } from './select.tag.helper'

const { SHOW_PARENT } = TreeSelect

const SelectTag = () => {
  const [isAddVisible, setIsAddVisible] = useState(true)
  const [selectTags, setSelectTags] = useState([])
  const { getAiCapabilityTagsService, addAICapabilityTagService, deleteAICapabilityTagService } =
    useCapabilityTagService()
  const { list, tags, loading: listLoading } = useCapabilityTagModel()
  const { isView } = useContext(CapabilityContext)
  const [loading, setLoading] = useState(true)
  const [tagOptions, setTagOptions] = useState([])
  const { capabilityId } = useParams()
  const [isHasPermission] = usePermission()

  useEffect(() => {
    setLoading(listLoading)
  }, [listLoading])
  useEffect(() => {
    setTagOptions(
      tags.filter((n) => {
        return !n.read_only
      }),
    )
  }, [tags])

  useEffect(() => {
    setSelectTags(list)
  }, [list])

  const saveNewTag = async (tagtags) => {
    setLoading(true)

    Promise.all(tagtags.map((id) => addAICapabilityTagService(capabilityId, id)))
      .then(async (e) => {
        let isShowMessage = true
        e.forEach(([err]) => {
          if (err) {
            isShowMessage = false
          }
        })
        if (isShowMessage) {
          message.success('添加标签成功')
        }
      })
      .catch((e) => {
        message.error(e)
      })
      .then(async () => {
        setLoading(true)
        const [err] = await getAiCapabilityTagsService(capabilityId, { page: 1, page_size: 200 })
        if (err) {
          message.error(err as any)
        }
        setLoading(false)
      })
  }

  const onSelect = async (id, node) => {
    const [diffData] = getDiff(
      selectTags.map(({ id }) => id),
      getPathKey(tags, 'sub_tags', node.keyIndex, 'yWj7C4iiIkvLww_jPBXLNMRUA-Jh632b'),
    )
    if (!diffData.length) {
      message.error('数据集标签已存在')
      return
    }
    setIsAddVisible(true)
    saveNewTag(diffData)
  }
  const deleteTag = async (e, id) => {
    e.preventDefault()
    setLoading(true)

    const tagtags = getSelectedChildren(tagOptions, selectTags, id)
    Promise.all(tagtags.map((id) => deleteAICapabilityTagService(capabilityId, id)))
      .then(async (e) => {
        let isShowMessage = true
        e.forEach(([err]) => {
          if (err) {
            isShowMessage = false
          }
        })
        if (isShowMessage) {
          message.success('删除标签成功')
        }
      })
      .catch((e) => {
        message.error(e)
      })
      .then(async () => {
        setLoading(true)
        const [err] = await getAiCapabilityTagsService(capabilityId, { page: 1, page_size: 200 })
        if (err) {
          message.error(err as any)
        }
        setLoading(false)
      })
  }
  const tProps = {
    treeData: tagOptions,
    list: [],
    onSelect,
    showCheckedStrategy: SHOW_PARENT,
    dropdownMatchSelectWidth: false,
    placeholder: '请选择标签',
    dropdownStyle: { overflow: 'auto' },
    treeDefaultExpandAll: true,
    fieldNames: {
      key: 'id',
      list: 'id',
      value: 'title',
      children: 'sub_tags',
    },
  }
  return (
    <Spin spinning={loading}>
      <div className=" max-w-2xl m-auto p-4">
        {list && selectTags.length > 0 ? (
          selectTags.map((tag) => (
            <Tag
              key={tag.id}
              closable={!isView && isHasPermission('set.label.delete')}
              className={styles['tag-wrap']}
              onClose={(e) => {
                deleteTag(e, tag.id)
              }}
            >
              {tag?.title}
            </Tag>
          ))
        ) : (
          <div className=" flex justify-center mt-4">
            <h1>暂无标签</h1>
          </div>
        )}
        {!isView &&
          (isAddVisible ? (
            <Tag
              className={styles['tag-wrap']}
              onClick={() => {
                setIsAddVisible(false)
              }}
            >
              + 新标签
            </Tag>
          ) : (
            <TreeSelect dropdownClassName="overlay-2" {...tProps} />
          ))}
      </div>
    </Spin>
  )
}
export default SelectTag
