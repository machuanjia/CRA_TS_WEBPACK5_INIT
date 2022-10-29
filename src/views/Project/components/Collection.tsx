/*
 * @Author: D.Y.M
 * @Date: 2021-11-22 17:12:05
 * @LastEditTime: 2022-03-11 10:39:52
 * @FilePath: /mlplatform/web/main/src/views/Project/components/Collection.tsx
 * @Description:
 */
import React, { useContext } from 'react'

import { CollectionModal } from 'otter-pro'

import { ProjectContext } from '../context'
import ProjectCollectionForm from './CollectionForm'

const ProjectCollection = () => {
  const { isProjectCollectionVisible, setIsProjectCollectionVisible, activeProjectId, setActiveProjectId } =
    useContext(ProjectContext)
  const handleClose = () => {
    setActiveProjectId('')
    setIsProjectCollectionVisible(false)
  }

  return (
    <CollectionModal
      entity={activeProjectId}
      isVisible={isProjectCollectionVisible}
      onClose={handleClose}
    >
      <ProjectCollectionForm
        setIsProjectCollectionVisible={setIsProjectCollectionVisible}
        setProjectId={setActiveProjectId}
      />
    </CollectionModal>
  )
}

export default ProjectCollection
