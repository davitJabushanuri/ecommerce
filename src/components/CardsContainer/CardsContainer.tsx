import Card from 'components/Card/Card'
import styles from './CardsContainer.module.scss'

const CardsContainer = () => {
  return (
    <>
      <h1>New Arrivals!</h1>
      <div className={styles.container}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  )
}

export default CardsContainer
