import style from './Navbar.module.scss'
import { TbSmartHome } from 'react-icons/tb'
import { BiShoppingBag } from 'react-icons/bi'
import { RiUser6Line } from 'react-icons/ri'
import { TbSettings } from 'react-icons/tb'

const navbar = () => {
  return (
    <div className={style.container}>
      <div className={style.home}>
        <TbSmartHome />
      </div>

      <div className={style.cart}>
        <BiShoppingBag />
      </div>

      <div className={style.user}>
        <RiUser6Line />
      </div>

      <div className={style.settings}>
        <TbSettings />
      </div>
    </div>
  )
}

export default navbar
