/*
 * @Author: lubenben lubenben@laiye.com
 * @Date: 2022-06-21 19:12:34
 * @LastEditors: lubenben lubenben@laiye.com
 * @LastEditTime: 2022-06-21 20:11:24
 * @FilePath: /mlplatform/web/main/src/models/project/engine.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import to from 'await-to-js'
import { EntityAdapter } from 'otter-pro/es/entity'

import { getAiEngines, createAiEngine, updateAiEngine, deleteAiEngine } from '@/apis'

import useEngineModel from './engine.model'

import type { IList } from 'otter-pro'

const useEngineService = () => {
  const { setLoading, list, setList, total, setTotal } = useEngineModel()

  const getAiEnginesService = async (projectId: string, params = {}) => {
    const [err, data]: IList[] = await to(getAiEngines(projectId, params))

    if (!err) {
      const { ai_engines = [], total_size = 0 } = data

      setList(ai_engines)
      setTotal(total_size)
    }

    setLoading(false)
    return [err, data]
  }

  const createAiEngineService = async (projectId: string, payload = {}) => {
    const [err, data]: any = await to(createAiEngine(projectId, payload))

    if (!err) {
      setList(EntityAdapter.create(data, list))
      setTotal(total + 1)
    }

    return [err, data]
  }

  const updateAiEngineService = async (projectId: string, engineId: string, params={}, payload = {}) => {
    const [err, data]: any = await to(updateAiEngine(projectId, engineId, params ,payload))

    if (!err) {
      setList(EntityAdapter.update(data, list))
    }

    return [err, data]
  }

  const deleteAiEngineService = async (projectId: string, engineId: string) => {
    const [err, data]: any = await to(deleteAiEngine(projectId, engineId))

    if (!err) {
      setList(EntityAdapter.delete(engineId, list))
      setTotal(total - 1)
    }

    return [err, data]
  }

  return {
    getAiEnginesService,
    createAiEngineService,
    updateAiEngineService,
    deleteAiEngineService,
  }
}

export default useEngineService
