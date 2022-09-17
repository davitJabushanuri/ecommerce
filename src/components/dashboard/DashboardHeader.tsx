import styles from './DashboardHeader.module.scss'
import { RiBarChartHorizontalFill } from 'react-icons/ri'
import useNavbarStore from 'components/store/navbarStore'
import User from 'components/helpers/User/User'
import { useSession } from 'next-auth/react'

const DashboardHeader = () => {
  const { data: session } = useSession()
  const firstName = session?.user?.name
    ? session?.user?.name.split(' ')[0]
    : 'User'

  const toggleNavbar = useNavbarStore((state: any) => state.toggleNavbar)
  return (
    <div className={styles.container}>
      <div className={styles.hamburger}>
        <button onClick={() => toggleNavbar()}>
          <RiBarChartHorizontalFill />
        </button>
      </div>

      <div className={styles.greeting}>
        <h1>Welcome back, {firstName}</h1>
        <p>Here&apos;s what&apos;s happening with your store today</p>
      </div>

      <div className={styles.user}>
        <User />
      </div>
    </div>
  )
}

export default DashboardHeader
