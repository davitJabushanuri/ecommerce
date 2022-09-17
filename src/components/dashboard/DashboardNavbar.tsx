/* eslint-disable @next/next/no-img-element */
import styles from './DashboardNavbar.module.scss'

import Link from 'next/link'

import { BsBag, BsBagPlus } from 'react-icons/bs'
import { BiUser, BiLogIn, BiNotification } from 'react-icons/bi'
import { RiSettingsLine } from 'react-icons/ri'
import { IoLogoPolymer } from 'react-icons/io'
import { BiBarChartAlt2 } from 'react-icons/bi'
import { CgClose } from 'react-icons/cg'

import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import useNavbarStore from 'components/store/navbarStore'

const DashboardNavbar = () => {
  const router = useRouter()
  const isNavbarOpen = useNavbarStore((state: any) => state.isNavbarOpen)
  const toggleNavbar = useNavbarStore((state: any) => state.toggleNavbar)

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <div className={`${styles.container} ${isNavbarOpen ? styles.open : ''}`}>
      <div className={styles.close}>
        <button onClick={() => toggleNavbar()}>
          <CgClose />
        </button>
      </div>

      <div className={styles.logoContainer}>
        <Link href={`/`}>
          <a className={styles.logo}>
            <div className={styles.icon}>
              <IoLogoPolymer />
            </div>
            <span>Polymer</span>
          </a>
        </Link>
      </div>

      <div className={styles.navbar}>
        <Link href={`/dashboard`}>
          <a
            className={`${styles.navbar__item} ${
              router.pathname == '/dashboard' && styles.active
            }`}
          >
            <BiBarChartAlt2 />
            <span>Dashboard</span>
          </a>
        </Link>

        <Link href={`/dashboard/products`}>
          <a
            className={`${styles.navbar__item} ${
              router.pathname == '/dashboard/products' && styles.active
            }`}
          >
            <BsBag />
            <span>Products</span>
          </a>
        </Link>

        <Link href={`/dashboard/add-product`}>
          <a
            className={`${styles.navbar__item} ${
              router.pathname == '/dashboard/add-product' && styles.active
            }`}
          >
            <BsBagPlus />
            <span>Add Product</span>
          </a>
        </Link>

        <Link href={`/dashboard/customers`}>
          <a
            className={`${styles.navbar__item} ${
              router.pathname == '/dashboard/customers' && styles.active
            }`}
          >
            <BiUser />
            <span>Customers</span>
          </a>
        </Link>

        <Link href={`/dashboard/orders`}>
          <a
            className={`${styles.navbar__item} ${
              router.pathname == '/dashboard/orders' && styles.active
            }`}
          >
            <BiNotification />
            <span>Orders</span>
          </a>
        </Link>

        <Link href={`/dashboard/settings`}>
          <a
            className={`${styles.navbar__item} ${
              router.pathname == '/dashboard/settings' && styles.active
            }`}
          >
            <RiSettingsLine />
            <span>Settings</span>
          </a>
        </Link>

        <button
          onClick={handleSignOut}
          className={`${styles.navbar__item} ${styles.logout}`}
        >
          <BiLogIn />
          <span>Log out</span>
        </button>
      </div>
    </div>
  )
}

export default DashboardNavbar
