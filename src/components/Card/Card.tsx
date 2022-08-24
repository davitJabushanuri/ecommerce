import Image from 'next/image'
import styles from './Card.module.scss'
import { useRouter } from 'next/router'

import { AiFillHeart } from 'react-icons/ai'

import { useSession } from 'next-auth/react'
import axios from 'axios'

const Card = ({ product }: any) => {
  const router = useRouter()

  const { data: session } = useSession()

  const addToCart = (e: any) => {
    e.stopPropagation()
    console.log('add to cart')
    if (!session) {
      router.push('/login')
    }
  }

  const addToWishlist = async (e: any, id: string) => {
    e.stopPropagation()
    if (!session) {
      router.push('/login')
    }

    const users = await axios.get(`/api/users`)
    const user = users.data.find((u: any) => u.email === session?.user?.email)

    const favorite = await axios.post(`/api/favorites`, {
      method: 'POST',
      data: {
        userId: user.id,
        productId: product.id,
      },
    })
    console.log(favorite)
  }

  return (
    <div
      onClick={() => {
        router.push(`/product/${product.id}`)
      }}
      className={styles.container}
    >
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={product.image}
          alt="macbook"
          layout="fill"
        />
      </div>
      <div className={styles.nameContainer}>
        <h3>{product?.name}</h3>
      </div>

      <div className={styles.description}>
        <p>{product?.description}</p>
      </div>

      <div className={styles.addToCart}>
        <p className={styles.price}>${product?.price}</p>
        <button onClick={addToCart} className={styles.addToCartButton}>
          Add to Cart
        </button>
      </div>

      {product.isBestSeller && <p className={styles.bestseller}>Best Seller</p>}
      <button
        onClick={(e) => addToWishlist(e, product.id)}
        className={styles.favorites}
      >
        <AiFillHeart />
      </button>
    </div>
  )
}

export default Card
