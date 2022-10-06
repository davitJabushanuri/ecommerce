import styles from './cart.module.scss'

import Header from '@components/Header/Header'
import fetchUsers from '@components/helpers/fetchUsers'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Card from '@components/Card/Card'
import removeFromCart from '@components/helpers/removeFromCart'

const ShoppingCart = () => {
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const { data: users } = useQuery(['users'], () => fetchUsers())
  const user = users?.find((user: any) => user.email === session?.user?.email)

  console.log(user)

  const cartMutation = useMutation((id: any) => removeFromCart(id), {
    onSuccess: () => {
      console.log('success')
      queryClient.invalidateQueries(['users'])
    },
    onError: (error) => {
      console.log(error)
    },
    onSettled: () => {
      console.log('settled')
    },
  })

  if (!users) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <main>
        <Header />
        <h1>Shopping Cart</h1>

        <div className={styles.cart}>
          {user?.cartItems?.map((cartItem: any) => {
            return (
              <div key={cartItem.id}>
                <Card product={cartItem.product} />
                <button
                  disabled={cartMutation.isLoading}
                  onClick={() => cartMutation.mutate(cartItem.id)}
                >
                  remove
                </button>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default ShoppingCart
