import styles from './profile.module.scss'

import Card from '@components/Card/Card'
import Header from '@components/Header/Header'
import fetchUsers from '@components/helpers/fetchUsers'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import toggleFavorites from '@components/helpers/toggleFavorites'
import useFavorites from '@components/hooks/useFavorites'

const User = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery(['users'], () => fetchUsers())
  const user = users?.find((user: any) => user.email === session?.user?.email)

  const favoriteMutation = useFavorites()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <main>
        <Header />
        <div className={styles.favorites}>
          {user.favorites.map((favorite: any) => {
            return (
              <div key={favorite.id}>
                <Card product={favorite.product} />
                <button
                  disabled={favoriteMutation.isLoading}
                  onClick={() =>
                    favoriteMutation.mutate({
                      productId: favorite.product.id,
                      method: 'remove',
                    })
                  }
                >
                  remove from favorites
                </button>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default User
