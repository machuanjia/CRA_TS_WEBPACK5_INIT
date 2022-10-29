/*
 * @Author: D.Y.M
 * @Date: 2021-12-24 13:59:16
 * @LastEditTime: 2021-12-24 16:27:24
 * @FilePath: /mlplatform/web/main/src/views/Dashboard/components/count/index.tsx
 * @Description:
 */
import CountTo from 'react-count-to'

import styles from './index.module.less'

export const Count = (props: { icon: React.ReactElement; to: number; title: string }) => {
  const { title, to, icon } = props
  return (
    <div className={styles['card-panel']}>
      <div className={styles['card-aside']}>{icon}</div>
      <div className={styles['card-main']}>
        <div className={styles['card-title']}>{title}</div>
        <div className={styles['card-count']}>
          <CountTo to={to} speed={to} />
        </div>
      </div>
    </div>
  )
}
