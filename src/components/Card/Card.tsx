import Image from 'next/image'
import styles from './Card.module.scss'
import { useRouter } from 'next/router'

import { AiFillHeart } from 'react-icons/ai'

import { useSession } from 'next-auth/react'
import addToFavorites from '@components/helpers/addToFavorites'

const Card = ({ product }: any) => {
  const router = useRouter()
  const { data: session } = useSession()

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
        <button className={styles.addToCartButton}>Add to Cart</button>
      </div>

      {product.isBestSeller && <p className={styles.bestseller}>Best Seller</p>}
      <button
        onClick={(e) => addToFavorites(session?.user.email, product.id)}
        className={styles.favorites}
      >
        <AiFillHeart />
      </button>
    </div>
  )
}

export default Card
