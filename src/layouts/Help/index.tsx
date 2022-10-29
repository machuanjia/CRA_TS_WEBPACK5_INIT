/*
 * @Author: D.Y.M
 * @Date: 2021-10-21 16:06:54
 * @LastEditTime: 2022-09-01 18:12:11
 * @FilePath: /main/src/layouts/Help/index.tsx
 * @Description:
 */
import { useContext, useState } from 'react'

import { CloseOutlined } from '@ant-design/icons'
import { Avatar, Divider, Drawer } from 'antd'
import { Icon, Text } from 'otter-pro'

import { MainContext } from '../context'
import styles from './index.module.less'
import V1_2 from './v1.2'
import V1_3 from './v1.3'
import V2_0 from './v2.0'
import V2_1 from './v2.1'

const Help = () => {
  const [helpVisible, setHelpVisible] = useState(false)
  const { isCollapsed } = useContext(MainContext)
  const checkVisible = () => {
    setHelpVisible(!helpVisible)
  }
  return (
    <>
      <div className={`${styles['help-wrap']} ${isCollapsed && styles['help-wrap-close']}`} onClick={checkVisible}>
        <Text type="link">
          <Icon name="help" /> <span className={`${isCollapsed && 'hidden'}`}>帮助</span>
        </Text>
        <span className={`${styles['help-info']}`}>New</span>
      </div>

      <Drawer
        title={<span className={`${styles['help-title']} ${!isCollapsed && styles['help-title-open']}`}>帮助</span>}
        placement="left"
        closable={false}
        onClose={() => setHelpVisible(false)}
        visible={helpVisible}
        width={isCollapsed ? 378 : 547}
        className={`${styles['help-body']} ${!isCollapsed && styles['help-body-open']}`}
        mask={false}
        extra={
          <Text type="link">
            <CloseOutlined className={`${styles['help-close']} text-base`} onClick={checkVisible} />
          </Text>
        }
      >
        <section className='ml-2 flex flex-col'>
          <header className=' flex flex-row justify-center items-center'>
            <div className='flex-1 flex  flex-col justify-center items-center'>
              <Avatar style={{ backgroundColor: '#ffece8', color: '#fc766d ' }} icon={<Icon name="help" />} />
              <div className=' text-xs text-weak mt-2'>帮助中心</div>
            </div>
            <Divider type="vertical" className=' h-6' />
            <div className='flex-1 flex  flex-col justify-center items-center'>
              <Avatar style={{ backgroundColor: '#e6f5ee', color: '#67cfaa ' }} icon={<Icon name="user" />} />
              <div className=' text-xs text-weak mt-2'>客户中心</div>
            </div>
            <Divider type="vertical" className=' h-6' />
            <div className='flex-1 flex  flex-col justify-center items-center'>
              <Avatar style={{ backgroundColor: '#f0f6ff', color: '#6c8fd9 ' }} icon={<Icon name="publish" />} />
              <div className=' text-xs text-weak mt-2'>应用市场</div>
            </div>
          </header>
          <V2_1/>
          <V2_0 />
          <V1_3 />
          <V1_2 />
        </section>
      </Drawer>
    </>
  )
}

export default Help
