import axios from 'axios'
import ProductDetails from 'components/ProductDetails/ProductDetails'
import SecondaryHeader from 'components/SecondaryHeader/SecondaryHeader'
import { NextPage } from 'next'
import { Product } from '../../ts/interfaces/db_interfaces'

const ProductPage: NextPage<Product> = ({ product }) => {
  return (
    <div>
      <main>
        <SecondaryHeader header="Product Details" />
        <ProductDetails product={product} />
      </main>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { id } = context.query
  const product = await axios
    .get(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err))
  return {
    props: {
      product,
    },
  }
}

export default ProductPage
