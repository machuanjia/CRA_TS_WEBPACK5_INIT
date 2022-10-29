/*
 * @Author: lubenben
 * @Date: 2022-06-27 16:30:05
 * @LastEditors: lubenben
 * @LastEditTime: 2022-06-28 18:04:59
 */
import React, { useContext } from 'react'

import { CollectionModal } from 'otter-pro'
import { ut } from 'otter-pro/es/i18n'

import { CapabilityContext } from '../../context'
import Info from './Info'

const AiCapabilityCollection = () => {
  const { t } = ut()
  const { isCollectionVisible, setIsCollectionVisible } = useContext(CapabilityContext)

  return (
    <CollectionModal
      title={t('common.actions.create')}
      isVisible={isCollectionVisible}
      onClose={() => setIsCollectionVisible(false)}
    >
      <Info />
    </CollectionModal>
  )
}

export default AiCapabilityCollection
