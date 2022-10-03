import DashboardHeader from '@components/dashboard/DashboardHeader'
import DashboardNavbar from '@components/dashboard/DashboardNavbar'
import styles from './settings.module.scss'
import layout from '../layout.module.scss'

const Settings = () => {
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

export default Settings
