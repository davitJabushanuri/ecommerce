import DashboardHeader from 'components/Dashboard/DashboardHeader'
import DashboardNavbar from 'components/Dashboard/DashboardNavbar'
import styles from './settings.module.scss'

const products = () => {
  return (
    <div className={styles.container}>
      <main>
        <DashboardHeader />
        <DashboardNavbar />
      </main>
    </div>
  )
}

export default products
