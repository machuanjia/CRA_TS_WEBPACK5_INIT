/*
 * @Author: lubenben
 * @Date: 2022-06-27 16:28:46
 * @LastEditors: lubenben
 * @LastEditTime: 2022-09-06 11:21:35
 */
import React, { useState, useEffect } from 'react'

// import { useRedirect } from 'otter-pro/es/hooks'
import { Outlet } from 'react-router-dom'

import { STATE } from '@/constants'
import { useGlobalModel, useDefaultDatasetService } from '@/models'

import { CapabilityContext } from '../context'

const AiCapability = () => {
  const { projectId } = useGlobalModel()
  const [capabilityId, setCapabilityId] = useState('')
  const [selectedState, setSelectedState] = useState(STATE.ACTIVE)
  const { getTagsService } = useDefaultDatasetService()

  const [isCollectionVisible, setIsCollectionVisible] = useState(false)
  const [isSetDefaultDataset, setIsSetDefaultDataset] = useState(false)
  const [isView, setIsView] = useState(false)
  // const [redirect] = useRedirect()

  // useEffect(() => {
  //   redirect(`/projects/${projectId}/capability`, `/projects/${projectId}/capability/index`)
  // }, [redirect])

  useEffect(() => {
    if (projectId) getTagsService(projectId)
  }, [projectId])

  return (
    <CapabilityContext.Provider
      value={{
        capabilityId,
        setCapabilityId,
        selectedState,
        setSelectedState,
        isCollectionVisible,
        setIsCollectionVisible,
        isSetDefaultDataset,
        setIsSetDefaultDataset,
        isView,
        setIsView,
      }}
    >
      <Outlet/>
    </CapabilityContext.Provider>
  )
}

export default AiCapability
