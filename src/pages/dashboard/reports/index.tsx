import DashboardHeader from '@components/dashboard/DashboardHeader'
import DashboardNavbar from '@components/dashboard/DashboardNavbar'
import styles from './reports.module.scss'
import layout from '../layout.module.scss'
import { useQuery } from '@tanstack/react-query'
import fetchReports from '@components/helpers/fetchReports'

const Reports = () => {
  const {
    data: reports,
    isLoading,
    isError,
  } = useQuery(['reports'], fetchReports)
  console.log(reports)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

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

            <div className={styles.reportsContainer}>
              {reports.map((report: any) => {
                return (
                  <div key={report.id} className={styles.report}>
                    <h3>{report.message}</h3>
                    <p>{report.description}</p>
                    <p>{report.id}</p>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </main>
    </div>
  )
}

export default Reports
