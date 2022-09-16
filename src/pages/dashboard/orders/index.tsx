import DashboardHeader from 'components/Dashboard/DashboardHeader'
import DashboardNavbar from 'components/Dashboard/DashboardNavbar'
import styles from './orders.module.scss'

const orders = () => {
  return (
    <div className={styles.container}>
      <main>
        <DashboardHeader />
        <DashboardNavbar />
      </main>
    </div>
  )
}

export default orders
