import styles from './customers.module.scss'
import layout from '../layout.module.scss'
import DashboardNavbar from 'components/Dashboard/DashboardNavbar'
import DashboardHeader from 'components/Dashboard/DashboardHeader'

const Customers = ({ customers }: any) => {
  console.log(customers)

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

export default Customers

export const getServerSideProps = async (context: any) => {
  const res = await fetch('http://localhost:3000/api/users')
  const customers = await res.json()

  return {
    props: {
      customers,
    },
  }
}
