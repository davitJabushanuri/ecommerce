import styles from './Header.module.scss'
import { IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import Search from 'components/Search/Search'
import Navbar from 'components/Navbar/navbar'

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>Logo</div>

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
