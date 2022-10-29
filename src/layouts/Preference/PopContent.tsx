/*
 * @Author: D.Y.M
 * @Date: 2021-10-27 17:46:33
 * @LastEditTime: 2022-05-10 17:01:58
 * @FilePath: /main/src/layouts/Preference/PopContent.tsx
 * @Description:
 */
import {useEffect, useState} from 'react'

import {CheckOutlined, LogoutOutlined} from '@ant-design/icons'
import {Menu, Tooltip} from 'antd'
import { OtterAvatar, SimpleList} from 'otter-pro'
import {ut} from 'otter-pro/es/i18n'
import { logout } from 'otter-pro/es/utils'
import {useNavigate} from 'react-router-dom'

import {useAppModel, useTeamModel} from '@/models'

import styles from './index.module.less'

const {SubMenu} = Menu

export const Content = () => {
  const {t} = ut()
  const {list} = useTeamModel()
  const {info} = useAppModel()
  const history = useNavigate()
  const [active, setActive] = useState(null)

  useEffect(() => {
    const teamId = localStorage.getItem('activeTeam')
    if (teamId && list) {
      const team = list.find((n) => {
        return n.id === teamId
      })
      if (team) {
        setActive(team)
      }
    }
  }, [list])

  const items = [
    {
      id: 'account',
      title: '账号设置',
    },
    {
      id: 'cost',
      title: '配额与计费',
    },
    {
      id: 'preference',
      title: '团队设置',
    },
  ]
  const handleSelect = ({ key }) => {
    if (key) {
      if (key === 'all') {
        history('/teams')
      } else {
        localStorage.setItem('activeTeam', key)
        const team = list.find((n) => {
          return n.id === key
        })
        if (team) {
          setActive(team)
        }
      }
    }
  }
  const itemAction = ({id})=>{
    if(id === 'account'){
      let url = process.env.REACT_APP_ACCOUNT_URL
      // @ts-ignore
      if(window.config && window.config.ACCOUNT_URL){
        // @ts-ignore
        url = window.config.ACCOUNT_URL
      }
      window.open(url)
    }
  }
  return (
    <section className=" w-52">
      <header className=" border-b border-solid border-medium p-2 pl-4 pr-4 flex flex-row items-center">
        <div className=" mr-2">
          <OtterAvatar className="cursor-pointer" name={info?.name} />
        </div>
        <div className=" flex-1 text-secondary">
          <div className=" font-bold">{info?.name}</div>
          <div className=" text-xs">{info?.phone}</div>
        </div>
      </header>
      <div>
        <SimpleList list={items} onItemClick={itemAction} />
        <Menu mode="vertical" onClick={handleSelect}>
          <SubMenu
            key="team"
            className={`${active?.title && styles['team-menu']}`}
            title={
              <div className="">
                <div>{t('team.change')}</div>
                {
                  active?.title && <div className=" text-weak overflow-hidden truncate w-40">{active.title}</div>
                }
              </div>
            }
          >
            {list.map((n) => {
              return (
                <Menu.Item className=" w-56" key={n.id}>
                  <div className=" flex flex-row">
                    <Tooltip placement="top" title={n.title}>
                      <div className="flex-1 truncate">{n.title}</div>
                    </Tooltip>
                    {active?.id === n.id && (
                      <div>
                        <CheckOutlined />
                      </div>
                    )}
                  </div>
                </Menu.Item>
              )
            })}
            <Menu.Divider />
            <Menu.Item key="all">{t('team.viewAll')}</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
      <footer
        onClick={() => {
          logout()
        }}
        className=" border-t border-solid border-medium p-2  pl-4 pr-4 flex items-center text-secondary cursor-pointer hover:text-primary"
      >
        <LogoutOutlined className=" mr-1" /> 退出
      </footer>
    </section>
  )
}
