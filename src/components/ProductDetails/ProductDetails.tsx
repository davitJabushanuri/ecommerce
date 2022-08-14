import styles from './ProductDetails.module.scss'
import {
  AiOutlineHeart,
  AiFillStar,
  AiFillHeart,
  AiOutlinePlus,
  AiOutlineMinus,
} from 'react-icons/ai'
import Image from 'next/image'
import { useState } from 'react'

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1)
  const MAX_QUANTITY = 10

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src="https://images.pexels.com/photos/13125805/pexels-photo-13125805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="product"
          layout="fill"
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <span className={styles.shipping}>Free Shipping</span>
          <button className={styles.favorites}>
            <AiFillHeart />
          </button>
        </div>
        <h1 className={styles.title}>Macbook M1 Air</h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
          architecto!
        </p>
        <p className={styles.price}>$1,000.00</p>
        <p className={styles.rating}>
          <span>4.5</span>
          <AiFillStar />
        </p>
      </div>
      <div className={styles.payment}>
        <p>in Stock</p>
        <div className={styles.quantity}>
          <button
            disabled={quantity <= 1}
            onClick={() => setQuantity((prev) => prev - 1)}
            className={styles.minus}
          >
            <AiOutlineMinus />
          </button>
          <span>{quantity}</span>

          <button
            disabled={quantity >= MAX_QUANTITY}
            onClick={() => setQuantity((prev) => prev + 1)}
            className={styles.plus}
          >
            <AiOutlinePlus />
          </button>
        </div>
        <button className={styles.addToCart}>Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductDetails
