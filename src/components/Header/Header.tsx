import styles from './Header.module.scss'
import { IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import ShoppingCartIcon from '../../assets/icons/shopping-bag.svg'
import BackIcon from '../../assets/icons/back.svg'
import Image from 'next/image'

const Header = () => {
  return (
    <header className={styles.header}>
      <button className="backIcon">
        <Image src={BackIcon} alt="" />
      </button>
      <button className="shoppingCartIcon">
        <Image src={ShoppingCartIcon} alt="" />
      </button>
    </header>
  )
}

export default Header
