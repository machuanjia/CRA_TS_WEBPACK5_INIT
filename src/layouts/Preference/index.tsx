/*
 * @Author: D.Y.M
 * @Date: 2021-10-21 16:00:25
 * @LastEditTime: 2022-06-15 11:18:03
 * @FilePath: /main/src/layouts/Preference/index.tsx
 * @Description:
 */

import { useContext, useEffect } from 'react'

import { Popover } from 'antd'
import { OtterAvatar } from 'otter-pro'

import { useAppModel, useTeamModel, useTeamService } from '@/models'

import { MainContext } from '../context'
import styles from './index.module.less'
import { Content } from './PopContent'

const Preference = () => {
  const { page, pageSize } = useTeamModel()
  const { getTeamsService } = useTeamService()
  const { info } = useAppModel()
  const { isCollapsed } = useContext(MainContext)
  useEffect(() => {
    getTeamsService({
      page,
      page_size: pageSize,
    })
  }, [page, pageSize])  // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Popover
      placement="rightBottom"
      title={null}
      content={<Content />}
      overlayClassName={styles['avatar-pop']}
    >
      <div className={`${styles['preference-wrap']} ${isCollapsed && styles['preference-wrap-close']}`}>
        <OtterAvatar name={info?.name} className={styles['preference-avatar-min']}/>
        {
          !isCollapsed &&  <span className='ml-1 text-sm max-w-6xl overflow-ellipsis overflow-hidden'>{info?.name}</span>
        }
      </div>
    </Popover>
  )
}

export default Preference
