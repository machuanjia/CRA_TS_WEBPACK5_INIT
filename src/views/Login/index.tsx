/*
 * @Author: D.Y.M
 * @Date: 2021-10-20 15:09:45
 * @LastEditTime: 2022-02-15 11:06:47
 * @FilePath: /main/src/views/Login/index.tsx
 * @Description:
 */
import {Button} from 'antd'
import {ut} from 'otter-pro/es/i18n'

const Login = () => {
    const {t} = ut()
    return (
        <div>
            <Button>login{t('home')}</Button>
        </div>
    )
}
export default Login
