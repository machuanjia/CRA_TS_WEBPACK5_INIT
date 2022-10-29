/*
 * @Author: D.Y.M
 * @Date: 2021-11-04 14:24:25
 * @LastEditTime: 2022-06-28 20:32:00
 * @FilePath: /main/src/layouts/Bread/index.tsx
 * @Description:
 */
import React from 'react'

import { RightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Text } from 'otter-pro'
import { Link } from 'react-router-dom'

import { useAppModel } from '@/models'

const Bread = () => {
  const { bread } = useAppModel()

  return (
    <span className={` flex flex-row`}>
      {bread.map((n: { icon: string; name: string; path: string; type: string }, index) => {
        const { icon = '', name = '', path = '', type = '' } = n

        // if (!icon && !name) {
        //   throw new Error('bread item must have icon or name')
        // }

        const BreadContent = ({ type }) => {
          if (type === 'icon') {
            return (
              <span className={` flex flex-row`}>
                <span className=" flex flex-row items-center mr-1">
                  <Button type="primary" icon={icon} size="small" />
                </span>
              </span>
            )
          }

          if (type === 'title') {
            return <span className={` flex flex-row`}>{name}</span>
          }

          return (
            <span className={` flex flex-row`}>
              <span className=" flex flex-row items-center mr-1">
                <Text type="info">{icon}</Text>
              </span>
              {name}
            </span>
          )
        }

        return (
          <span className="flex flex-row items-center text-secondary" key={n.name}>
            {index > 0 && <RightOutlined className=" ml-2 mr-2" />}
            {path && type !== 'title' ? (
              <Link to={path} className=" text-secondary hover:text-primary">
                <BreadContent type={type} />
              </Link>
            ) : (
              <BreadContent type={type} />
            )}
          </span>
        )
      })}
    </span>
  )
}

export default Bread
