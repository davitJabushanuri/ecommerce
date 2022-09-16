import DashboardHeader from 'components/Dashboard/DashboardHeader'
import DashboardNavbar from 'components/Dashboard/DashboardNavbar'
import styles from './add-product.module.scss'

const addProduct = () => {
  return (
    <div className={styles.container}>
      <main>
        <DashboardHeader />
        <DashboardNavbar />
      </main>
    </div>
  )
}

export default addProduct
