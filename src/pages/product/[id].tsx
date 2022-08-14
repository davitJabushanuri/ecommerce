import ProductDetails from 'components/ProductDetails/ProductDetails'
import SecondaryHeader from 'components/SecondaryHeader/SecondaryHeader'

const ProductPage = () => {
  return (
    <div>
      <SecondaryHeader header="Product Details" />
      <ProductDetails />
    </div>
  )
}

export default ProductPage
