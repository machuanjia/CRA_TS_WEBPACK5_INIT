import React, { useContext } from 'react'

import { CollectionModal } from 'otter-pro'

import ProjectCollectionForm from '@/views/Project/components/CollectionForm'

import { ProjectContext } from '../context'

const ProjectCollection = () => {
  const { isProjectCollectionVisible, setIsProjectCollectionVisible, projectId, setProjectId } =
    useContext(ProjectContext)
  const handleClose = () => {
    setIsProjectCollectionVisible(false)
  }
  return (
    <CollectionModal
      entity={projectId}
      isVisible={isProjectCollectionVisible}
      onClose={handleClose}
    >
      <ProjectCollectionForm
        setIsProjectCollectionVisible={setIsProjectCollectionVisible}
        setProjectId={setProjectId}
      />
    </CollectionModal>
  )
}

export default ProjectCollection
