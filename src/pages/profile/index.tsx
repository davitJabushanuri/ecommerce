import styles from './profile.module.scss'

import Card from '@components/Card/Card'
import Header from '@components/Header/Header'
import fetchUsers from '@components/helpers/fetchUsers'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

const User = () => {
  const { data: session } = useSession()

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery(['users'], () => fetchUsers())
  const user = users?.find((user: any) => user.email === session?.user?.email)
  console.log(user)

  if (isLoading) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <main>
        <Header />
        <h1>Profile</h1>
        <div className={styles.favorites}>
          {user.favorites.map((favorite: any) => {
            return <Card key={favorite.id} product={favorite.product} />
          })}
        </div>
      </main>
    </div>
  )
}

export default User
