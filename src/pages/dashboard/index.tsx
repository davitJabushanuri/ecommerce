import DashboardHeader from 'components/Dashboard/DashboardHeader'
import DashboardNavbar from 'components/Dashboard/DashboardNavbar'
import { GetStaticProps } from 'next'
import styles from './dashboard.module.scss'

const index = () => {
  return (
    <div className={styles.container}>
      <main>
        <DashboardHeader />
        <DashboardNavbar />
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      data: null,
    },
  }
}

export default index
