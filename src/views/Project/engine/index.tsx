/*
 * @Author: lubenben lubenben@laiye.com
 * @Date: 2022-06-14 12:42:11
 * @LastEditors: lubenben
 * @LastEditTime: 2022-06-27 16:28:59
 * @FilePath: /mlplatform/web/main/src/views/Project/engine/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react'

import { useParams } from 'react-router-dom'

import { EngineContext } from '../context'
import AiEngineList from './components/List'

const AiEngine = () => {
  const { id } = useParams()
  const [projectId, setProjectId] = useState(id)
  const [engineId, setEngineId] = useState('')
  const [isCollectionVisible, setIsCollectionVisible] = useState(false)

  return (
    <EngineContext.Provider
      value={{
        engineId,
        setEngineId,
        projectId,
        setProjectId,
        isCollectionVisible,
        setIsCollectionVisible,
      }}
    >
      <AiEngineList />
    </EngineContext.Provider>
  )
}

export default AiEngine
