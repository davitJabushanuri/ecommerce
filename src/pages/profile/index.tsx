import styles from './profile.module.scss'

import Card from '@components/Card/Card'
import Header from '@components/Header/Header'
import useFavorites from '@components/hooks/useFavorites'
import useUser from '@components/hooks/useUser'

const User = () => {
  const { data: user, isLoading, isSuccess } = useUser()
  const favoriteMutation = useFavorites()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <main>
        <Header />
        <div className={styles.favorites}>
          {isSuccess &&
            user?.favorites.map((favorite: any) => {
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
