/* eslint-disable @next/next/no-img-element */
import styles from './DashboardNavbar.module.scss'

import { IoStatsChartSharp } from 'react-icons/io5'
import { BsBag } from 'react-icons/bs'
import { BiUserCircle, BiLogIn, BiNotification } from 'react-icons/bi'
import { RiSettingsLine } from 'react-icons/ri'

const DashboardNavbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>LOGO</div>
      <div className={styles.navbar}>
        <a className={styles.navbar__item}>
          <IoStatsChartSharp />
          <span>Dashboard</span>
        </a>

        <a className={styles.navbar__item}>
          <BsBag />
          <span>Products</span>
        </a>

        <a className={styles.navbar__item}>
          <BiUserCircle />
          <span>Customers</span>
        </a>

        <a className={styles.navbar__item}>
          <BiNotification />
          <span>Orders</span>
        </a>

        <a className={styles.navbar__item}>
          <RiSettingsLine />
          <span>Settings</span>
        </a>

        <a className={`${styles.navbar__item} ${styles.logout}`}>
          <BiLogIn />
          <span>Log out</span>
        </a>
      </div>
    </div>
  )
}

export default DashboardNavbar
