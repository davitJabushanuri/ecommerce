import DashboardHeader from 'components/dashboard/DashboardHeader'
import DashboardNavbar from 'components/dashboard/DashboardNavbar'
import { GetStaticProps } from 'next'
import styles from './dashboard.module.scss'

const index = () => {
  return (
    <div className={styles.container}>
      <DashboardHeader />
      <DashboardNavbar />
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
