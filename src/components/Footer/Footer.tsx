import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <div className={styles.container}>
      <footer>
        <div className={styles.footerContent}>
          <h1>Get to Know Us</h1>
          <p>Careers</p>
          <p>Press center</p>
          <p>Sustainability</p>
          <p>Investor relations</p>
        </div>
        <div className={styles.footerContent}>
          <h1>Make Money with Us</h1>
          <p>Sell products</p>
          <p>Sell apps</p>
          <p>Supply Us</p>
          <p>become a delivery driver</p>
        </div>
        <div className={styles.footerContent}>
          <h1>Payment Products</h1>
          <p>Shop with Points</p>
          <p>Credit card marketplace</p>
          <p>reload Your Balance</p>
          <p>Currency Converter</p>
        </div>
        <div className={styles.footerContent}>
          <h1>Help Center</h1>
          <p>Your Account</p>
          <p>Your Orders</p>
          <p>Returns & Replacements</p>
          <p>Help</p>
        </div>
      </footer>

      <div className={styles.copyright}>
        <p>Copyright © 2022 All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer
