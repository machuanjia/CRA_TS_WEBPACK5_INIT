/*
 * @Author: D.Y.M
 * @Date: 2022-02-25 11:18:29
 * @LastEditTime: 2022-02-25 11:26:46
 * @FilePath: /main/src/views/Dashboard/components/card/index.tsx
 * @Description: 
 */

import styles from './index.module.less'

const Card = ({ title, children }) => {
    return <section className={styles.card}>
        <header className={styles['card-header']}>{title}</header>
        <div className={styles['card-body']}>{children}</div>
    </section>
}
export default Card