/* eslint-disable @next/next/no-img-element */
import styles from './Navbar.module.scss'
import { TbSmartHome } from 'react-icons/tb'
import { BiShoppingBag, BiBell } from 'react-icons/bi'
import { TbLayoutDashboard } from 'react-icons/tb'
import Link from 'next/link'
import User from 'components/helpers/User/User'
import useUser from '@components/hooks/useUser'

const Navbar = () => {
  const user = useUser()

  return (
    <div className={styles.container}>
      <div className={styles.home}>
        <Link href="/">
          <a>
            <TbSmartHome />
          </a>
        </Link>
      </div>

      <div className={styles.cart}>
        <Link href="/shopping-cart">
          <a>
            <BiShoppingBag />
            {user && user.cartItems && user?.cartItems.length > 0 && (
              <span className={styles.cartItemsCounter}>
                {user.cartItems.length}
              </span>
            )}
          </a>
        </Link>
      </div>

      <div className={styles.settings}>
        <Link href="/settings">
          <a>
            <BiBell />
          </a>
        </Link>
      </div>

      <div className={styles.dashboard}>
        <Link href="/dashboard">
          <a>
            <TbLayoutDashboard />
          </a>
        </Link>
      </div>

      <div className={styles.user}>
        <User />
      </div>
    </div>
  )
}

export default Navbar
