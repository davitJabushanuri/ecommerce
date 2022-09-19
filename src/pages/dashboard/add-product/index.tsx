import DashboardHeader from 'components/Dashboard/DashboardHeader'
import DashboardNavbar from 'components/Dashboard/DashboardNavbar'
import styles from './add-product.module.scss'
import layout from '../layout.module.scss'
import ProductForm from 'components/ProductForm/ProductForm'

const addProduct = () => {
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
            <div className={layout.content}>
              <ProductForm />
            </div>
          </main>
        </div>
      </main>
    </div>
  )
}

export default addProduct
