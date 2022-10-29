/*
 * @Author: D.Y.M
 * @Date: 2021-11-14 11:58:41
 * @LastEditTime: 2021-12-02 16:03:01
 * @Description:
 */
import { useState } from 'react'

import { createModel } from 'hox'

function useGlobal() {
    const [projectId, setProjectId] = useState('')
    return {
        projectId,
        setProjectId,
    }
}

export default createModel(useGlobal)
