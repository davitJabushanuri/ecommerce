import styles from './Hero.module.scss'
import { BsArrowRight } from 'react-icons/bs'

const Hero = () => {
  return (
    <div className={styles.container}>
      <h1>Shop fresh adidas back-to-school looks</h1>
      <p>Score deals on must have 3-Stripes first day outfits</p>
      <button>
        Stay cool <BsArrowRight />
      </button>
    </div>
  )
}

export default Hero
