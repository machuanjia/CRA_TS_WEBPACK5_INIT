import { useContext } from 'react'

import { LeftOutlined } from '@ant-design/icons'

import { toogleAppClass } from '@/utils'

import { MainContext } from '../context'
import styles from './index.module.less'

const Collapser = () => {
  const { isCollapsed, setIsCollapsed } = useContext(MainContext)
  const handleCollapsed = () => {
    const temp = !isCollapsed
    setIsCollapsed(temp)
    localStorage.setItem('isCollapsed', temp.toString())
    toogleAppClass(!temp, 'app-wrap-open')
  }
  return (
    <div
      className={`${styles.collapser} ${isCollapsed && styles['collapser-close']}`}
      onClick={handleCollapsed}
    >
      <LeftOutlined />
    </div>
  )
}

export default Collapser
