import DashboardHeader from 'components/Dashboard/DashboardHeader'
import DashboardNavbar from 'components/Dashboard/DashboardNavbar'
import styles from './orders.module.scss'
import layout from '../layout.module.scss'

const orders = () => {
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
          </main>
        </div>
      </main>
    </div>
  )
}

export default orders
