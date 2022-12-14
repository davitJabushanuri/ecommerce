import styles from './Header.module.scss'
import Search from 'components/Search/Search'
import Navbar from 'components/Navbar/navbar'
import Link from 'next/link'

import { IoLogoPolymer } from 'react-icons/io'

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <IoLogoPolymer />
          </a>
        </Link>
      </div>

      <div className={styles.search}>
        <Search />
      </div>

      <div className={styles.navbar}>
        <Navbar />
      </div>
    </header>
  )
}

export default Header
