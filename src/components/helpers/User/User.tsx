/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { RiUser6Line } from 'react-icons/ri'
import { BiChevronDown } from 'react-icons/bi'

import styles from './User.module.scss'

const User = () => {
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
  )
}

export default User
