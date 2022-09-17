import DashboardLayout from 'components/layouts/dashboardLayout/DashboardLayout'
import styles from './dashboard.module.scss'

const index = () => {
  return (
    <div className={styles.container}>
      <main>
        <DashboardLayout />
      </main>
    </div>
  )
}

export default index
