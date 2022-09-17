import DashboardLayout from 'components/layouts/dashboardLayout/DashboardLayout'
import styles from './products.module.scss'

const products = () => {
  return (
    <div className={styles.container}>
      <main>
        <DashboardLayout />
      </main>
    </div>
  )
}

export default products
