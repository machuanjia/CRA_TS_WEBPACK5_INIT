/*
 * @Author: D.Y.M
 * @Date: 2021-10-21 16:06:54
 * @LastEditTime: 2022-06-10 19:03:32
 * @FilePath: /main/src/layouts/Notice/index.tsx
 * @Description:
 */
import { useContext, useState } from 'react'

import { CloseOutlined } from '@ant-design/icons'
import { Drawer, Tabs } from 'antd'
import { Icon, OtterAvatar, Text } from 'otter-pro'

import { MainContext } from '../context'
import styles from './index.module.less'

const { TabPane } = Tabs

const Notice = () => {
  enum TYPES {
    MESSAGE = 'msg',
    LOG = 'log',
  }
  const [type, setType] = useState(TYPES.MESSAGE)
  const [helpVisible, setHelpVisible] = useState(false)
  const { isCollapsed } = useContext(MainContext)
  const checkVisible = () => {
    setHelpVisible(!helpVisible)
  }
  const changeTab = (key) => {
    setType(key)
  }
  return (
    <>
      <div className={`${styles['notice-wrap']} ${isCollapsed && styles['notice-wrap-close']}`} onClick={checkVisible}>
        <Text type="link">
          <Icon name="message" /> <span className={`${isCollapsed && 'hidden'}`}>通知</span>
        </Text>
      </div>

      <Drawer
        title={
          <Tabs
            defaultActiveKey={TYPES.MESSAGE}
            className={`${styles['notice-title']} ${!isCollapsed && styles['notice-title-open']}`}
            onChange={changeTab}
          >
            <TabPane tab="消息" key={TYPES.MESSAGE} />
            <TabPane tab="通知" key={TYPES.LOG} />
          </Tabs>
        }
        placement="left"
        closable={false}
        width={isCollapsed ? 378 : 547}
        onClose={() => setHelpVisible(false)}
        visible={helpVisible}
        className={`${styles['notice-body']} ${!isCollapsed && styles['notice-body-open']}`}
        mask={false}
        extra={
          <Text type="link">
            <CloseOutlined className={`${styles['notice-close']} text-base`} onClick={checkVisible} />
          </Text>
        }
      >
        {
          type === TYPES.MESSAGE && <div><section className=" border-b border-medium p-4 flex flex-row hover:bg-medium cursor-pointer">
            <aside className="pr-2">
              <OtterAvatar className="cursor-pointer" name="Admin" />
            </aside>
            <div className=" flex-1">
              <header className=" text-xs text-weak">
                <Text type="info" className="mr-2 text-holder">
                  管理员
                </Text>
                发布系统消息
              </header>
              <div className=" bold text-base mt-2 mb-2 text-weak">机器学习平台1.0上线</div>
              <footer className=" text-holder text-xs">2小时前 · V1.0 机器学习平台V1.0</footer>
            </div>
          </section></div>
        }

        {
          type === TYPES.LOG && <div><section className=" border-b border-medium p-4 flex flex-row hover:bg-medium cursor-pointer">
            <div className=" flex-1">
              <header className=" text-xs text-weak">
                <Text type="info" className="mr-2 text-holder">
                  管理员
                </Text>
                发布系统消息
              </header>
              <div className=" bold text-base mt-2 mb-2 text-weak">机器学习平台1.0上线</div>
              <footer className=" text-holder text-xs">2小时前 · V1.0 机器学习平台V1.0</footer>
            </div>
          </section>
          </div>
        }

      </Drawer>
    </>
  )
}

export default Notice
