/* eslint-disable @next/next/no-img-element */
import DashboardHeader from 'components/Dashboard/DashboardHeader'
import DashboardNavbar from 'components/Dashboard/DashboardNavbar'
import styles from './products.module.scss'
import layout from '../layout.module.scss'

const products = ({ products }: any) => {
  console.log(products)

  return (
    <div className={styles.container}>
      <main>
        <div className={layout.container}>
          <main>
            <div className={layout.navbarContainer}>
              <DashboardNavbar />
            </div>
            <div className={layout.headerContainer}>
              <DashboardHeader />
            </div>

            <div className={styles.content}>
              {products?.products.map((product: any) => {
                return (
                  <div key={product.id}>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <img src={product.image} alt="" />
                    <p>{product.price}</p>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </main>
    </div>
  )
}

export default products

export const getServerSideProps = async (context: any) => {
  const res = await fetch('http://localhost:3000/api/products')
  const products = await res.json()

  return {
    props: {
      products,
    },
  }
}
