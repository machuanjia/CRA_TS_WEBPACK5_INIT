import {Button} from 'antd'
import {ut} from 'otter-pro/es/i18n'

const Logout = () => {
    const {t} = ut()
    return (
        <div>
            <Button>Logout{t('home')}</Button>
        </div>
    )
}
export default Logout