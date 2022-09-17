import styles from './DashboardHeader.module.scss'
import { RiBarChartHorizontalFill } from 'react-icons/ri'
import useNavbarStore from 'components/store/navbarStore'

const DashboardHeader = () => {
  const toggleNavbar = useNavbarStore((state: any) => state.toggleNavbar)
  return (
    <div className={styles.container}>
      <div className={styles.hamburger}>
        <button onClick={() => toggleNavbar()}>
          <RiBarChartHorizontalFill />
        </button>
      </div>
    </div>
  )
}

export default DashboardHeader
