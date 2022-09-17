import DashboardLayout from 'components/layouts/dashboardLayout/DashboardLayout'
import styles from './customers.module.scss'

const customers = () => {
  return (
    <div className={styles.container}>
      <main>
        <DashboardLayout />
      </main>
    </div>
  )
}

export default customers
