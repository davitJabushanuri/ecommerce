/* eslint-disable @next/next/no-img-element */
import styles from './Navbar.module.scss'
import { TbSmartHome } from 'react-icons/tb'
import { BiShoppingBag, BiChevronDown, BiBell } from 'react-icons/bi'
import { RiUser6Line } from 'react-icons/ri'
import { TbSettings } from 'react-icons/tb'
import Link from 'next/link'

import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

const Navbar = () => {
  const { data: session, status } = useSession()
  const [profileModal, setProfileModal] = useState(false)

  const openProfileModal = () => {
    setProfileModal((prev) => !prev)
  }

  const handleSignOut = () => {
    signOut()
  }

  return (
    <div className={styles.container}>
      <div className={styles.home}>
        <Link href="/">
          <a>
            <TbSmartHome />
          </a>
        </Link>
      </div>

      <div className={styles.cart}>
        <Link href="/shopping-cart">
          <a>
            <BiShoppingBag />
          </a>
        </Link>
      </div>

      <div className={styles.settings}>
        <Link href="/settings">
          <a>
            <BiBell />
          </a>
        </Link>
      </div>

      <div className={styles.user}>
        {session ? (
          <>
            <a className={styles.profileContainer} onClick={openProfileModal}>
              <img
                className={styles.profileImage}
                src={session.user?.image! ?? <RiUser6Line />}
                alt="profile image"
              />
              <p>{session?.user?.name}</p>
              <BiChevronDown
                className={`${styles.arrowDown} ${
                  profileModal && styles.arrowUp
                }`}
              />
            </a>

            <div
              className={`${styles.profileModal} ${
                profileModal && styles.openModal
              }`}
            >
              <div className={styles.account}>
                <Link href={`/profile`}>
                  <a>Account settings</a>
                </Link>
              </div>

              <button onClick={handleSignOut}>Sign out</button>
            </div>
          </>
        ) : (
          <Link href="/auth/signin">
            <a>
              <RiUser6Line />
            </a>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
