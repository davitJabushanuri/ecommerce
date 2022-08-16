import Image from 'next/image'
import styles from './Card.module.scss'
import { useRouter } from 'next/router'

import { AiFillHeart } from 'react-icons/ai'

const Card = () => {
  const router = useRouter()

  const addToCart = (e: any) => {
    e.stopPropagation()
    console.log('add to cart')
  }

  return (
    <div
      onClick={() => {
        router.push('/product/1')
      }}
      className={styles.container}
    >
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src="https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="macbook"
          layout="fill"
        />
      </div>
      <h3>Macbook Air M1</h3>

      <div className={styles.description}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.saasd</p>
      </div>

      <div className={styles.addToCart}>
        <p className={styles.price}>$825</p>
        <button onClick={addToCart} className={styles.addToCartButton}>
          Add to Cart
        </button>
      </div>

      <p className={styles.bestseller}>Best Seller</p>
      <button className={styles.favorites}>
        <AiFillHeart />
      </button>
    </div>
  )
}

export default Card
