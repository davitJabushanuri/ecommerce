import style from './Navbar.module.scss'
import { TbSmartHome } from 'react-icons/tb'
import { BiShoppingBag } from 'react-icons/bi'
import { RiUser6Line } from 'react-icons/ri'
import { TbSettings } from 'react-icons/tb'
import Link from 'next/link'

const navbar = () => {
  return (
    <div className={style.container}>
      <div className={style.home}>
        <Link href="/">
          <a>
            <TbSmartHome />
          </a>
        </Link>
      </div>

      <div className={style.cart}>
        <Link href="/shopping-cart">
          <a>
            <BiShoppingBag />
          </a>
        </Link>
      </div>

      <div className={style.user}>
        <Link href="/user">
          <a>
            <RiUser6Line />
          </a>
        </Link>
      </div>

      <div className={style.settings}>
        <Link href="/settings">
          <a>
            <TbSettings />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default navbar
