/* eslint-disable @next/next/no-img-element */
import styles from './customers.module.scss'
import layout from '../layout.module.scss'
import DashboardNavbar from '@components/dashboard/DashboardNavbar'
import DashboardHeader from '@components/dashboard/DashboardHeader'

const Customers = () => {
  return (
    <div className={styles.container}>
      <main>
        <div className={layout.container}>
          <main>
            <div className={layout.navbarContainer}>
              <DashboardNavbar />
            </div>
            <div className={layout.headerContainer}>
              <DashboardHeader />
            </div>

            <div className={styles.content}></div>
          </main>
        </div>
      </main>
    </div>
  )
}

export default Customers
