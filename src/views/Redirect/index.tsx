/*
 * @Author: D.Y.M
 * @Date: 2021-11-22 11:33:05
 * @LastEditTime: 2022-02-15 11:07:31
 * @FilePath: /main/src/views/Redirect/index.tsx
 * @Description: 
 */
import {Button} from 'antd'
import {ut} from 'otter-pro/es/i18n'

const Redirect = () => {
    const {t} = ut()
    return (
        <div>
            <Button>Redirect{t('home')}</Button>
        </div>
    )
}
export default Redirect