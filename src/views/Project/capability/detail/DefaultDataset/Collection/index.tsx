/*
 * @Author: lubenben
 * @Date: 2022-08-08 18:27:11
 * @LastEditors: lubenben
 * @LastEditTime: 2022-10-21 11:09:41
 */
import React, { useContext, useEffect, useState } from 'react'

import { Col, message, Row, Spin } from 'antd'
import { CollectionModal, FilterByTags } from 'otter-pro'
import { useParams } from 'react-router-dom'

import { useDefaultDatasetModel, useDefaultDatasetService } from '@/models'
import { getTagsId } from '@/utils/getParams'

import { DefaultDatasetContext } from '../../../../context'
import Dataset from '../Dataset'
import styles from './index.module.less'

const DefaultDatasetCollection = () => {
  const [modalLoading, setModalLoading] = useState(false)
  const [filterParams, setFilterParams] = useState(null)
  const [datasetList, setDatasetList] = useState([])
  const [defaultValue, setDefaultValue] = useState(null)
  const { capabilityId } = useParams()
  const { tags } = useDefaultDatasetModel()
  const [allTags, setAllTags] = useState(null)
  const {
    allowAnnotationID,
    initDefaultDatasets,
    isDefaultDatasetCollectionVisible,
    setIsDefaultDatasetCollectionVisible,
  } = useContext(DefaultDatasetContext)
  const { addDefaultDatasetService } = useDefaultDatasetService()

  useEffect(() => {
    if (tags) {
      const defaultTags = [
        {
          ...tags.find(({ id }) => id === '3xj7TBINaMM1G4t_aCIZlanEcN1Y623X'),
          params: 'filter_args.language_tag_ids',
        },
      ]
      setAllTags(defaultTags)
      setDefaultValue({
        searchText: '',
        datasetType: 1,
        filterTags: defaultTags,
      })
    }
  }, [tags])

  const onFilterChange = (data) => {
    const { searchText, datasetType, filterTags } = data
    const textParams = searchText
      ? {
          'filter_args.id': searchText,
          'filter_args.title': searchText,
          'filter_args.description': searchText,
        }
      : {}
    const params = {
      ...getTagsId(filterTags),
      'filter_args.type': datasetType || 0,
      ...textParams,
    }
    setFilterParams(params)
  }

  const handleSave = async () => {
    setModalLoading(true)
    const [err] = await addDefaultDatasetService(capabilityId, {
      annotate_ai_capability_id: allowAnnotationID,
      dataset_dataset_version_ids: datasetList,
    })
    if (!err) {
      message.success('添加数据集成功')
      setModalLoading(false)
      setIsDefaultDatasetCollectionVisible(false)
      initDefaultDatasets()
    } else {
      setModalLoading(false)
    }
  }

  return (
    <CollectionModal
      title="选择数据集"
      isVisible={isDefaultDatasetCollectionVisible}
      className={`${styles['dataset-modal']} create-training-scroll`}
      wrapClassName="overlay-1"
      maskClosable={false}
      onClose={() => setIsDefaultDatasetCollectionVisible(false)}
      mask={false}
    >
      <Spin spinning={modalLoading}>
        <Row>
          <Col span={16}>
            <Dataset filterParams={filterParams} output={setDatasetList} />
          </Col>
          <Col span={7} className={`${styles['filter-col']}`}>
            <FilterByTags
              onChange={onFilterChange}
              save={handleSave}
              allTags={allTags}
              defaultValue={defaultValue}
            />
          </Col>
        </Row>
      </Spin>
    </CollectionModal>
  )
}

export default DefaultDatasetCollection
