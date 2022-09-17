import DashboardHeader from 'components/Dashboard/DashboardHeader'
import DashboardNavbar from 'components/Dashboard/DashboardNavbar'

import styles from './DashboardLayout.module.scss'

const DashboardLayout = () => {
  return (
    <div className={styles.container}>
      <main>
        <div className={styles.navbarContainer}>
          <DashboardNavbar />
        </div>
        <div className={styles.headerContainer}>
          <DashboardHeader />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
