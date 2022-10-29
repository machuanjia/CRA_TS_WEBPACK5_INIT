/*
 * @Author: D.Y.M
 * @Date: 2022-02-22 19:31:13
 * @LastEditTime: 2022-03-02 11:12:10
 * @FilePath: /main/src/layouts/LongrunningTasks/index.tsx
 * @Description:
 */

import { useEffect, useState } from 'react'

import { GlobalLoading } from 'otter-pro'

import { useAppModel } from '@/models'

const LongrunningTasks = () => {
  const [isTaskVisible, setIsTaskVisible] = useState(false)
  const [taskProcess, setTaskProcess] = useState(0)
  const { longrunningTask } = useAppModel()

  useEffect(() => {
    const { process=0, isVisible=false} = longrunningTask
    setIsTaskVisible(isVisible)
    setTaskProcess(process)
  }, [longrunningTask])

  return (
    <div
      className={`h-full w-full flex justify-center items-center absolute bg-white opacity-80 z-10 ${
        !isTaskVisible && 'hidden'
      }`}
    >
      <GlobalLoading description={`${taskProcess}%`} className="" />
    </div>
  )
}
export default LongrunningTasks
