import Image from 'next/image'
import styles from './Card.module.scss'

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src="https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="macbook"
          layout="fill"
        />
      </div>
      <div className={styles.contentContainer}>
        <h3>Macbook Air M1</h3>
        <p className={styles.price}>$825</p>
      </div>

      <div className={styles.description}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
          libero.
        </p>
      </div>
    </div>
  )
}

export default Card
