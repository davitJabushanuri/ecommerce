import DashboardLayout from 'components/layouts/dashboardLayout/DashboardLayout'
import styles from './orders.module.scss'

const orders = () => {
  return (
    <div className={styles.container}>
      <main>
        <DashboardLayout />
      </main>
    </div>
  )
}

export default orders
