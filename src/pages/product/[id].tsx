import ProductDetails from 'components/ProductDetails/ProductDetails'
import SecondaryHeader from 'components/SecondaryHeader/SecondaryHeader'

const ProductPage = () => {
  return (
    <div>
      <main>
        <SecondaryHeader header="Product Details" />
        <ProductDetails />
      </main>
    </div>
  )
}

export default ProductPage
