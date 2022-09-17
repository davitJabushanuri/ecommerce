import DashboardLayout from 'components/layouts/dashboardLayout/DashboardLayout'
import styles from './add-product.module.scss'

const addProduct = () => {
  return (
    <div className={styles.container}>
      <main>
        <DashboardLayout />
      </main>
    </div>
  )
}

export default addProduct
