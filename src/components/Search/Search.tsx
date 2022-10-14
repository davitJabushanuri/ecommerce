/* eslint-disable @next/next/no-img-element */
import styles from './Search.module.scss'
import { MdCancel } from 'react-icons/md'
import { useState } from 'react'
import useProducts from '@components/hooks/useProducts'
import { IProduct } from '@ts/interfaces/types'

const Search = () => {
  const [search, setSearch] = useState('')
  const products = useProducts()

  const filteredProducts = products
    ? products?.data?.filter((product: IProduct) => {
        return product.name.toLowerCase().includes(search.toLowerCase())
      })
    : []

  if (products.isLoading) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search products"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
        />
        <button
          style={{ display: search ? `flex` : 'none' }}
          onClick={() => setSearch('')}
        >
          <MdCancel />
        </button>
      </div>
      <div className={`${styles.results}  ${search && styles.showResults}`}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: IProduct) => {
            return (
              <div className={styles.result} key={product.id}>
                <p>{product.name}</p>
              </div>
            )
          })
        ) : (
          <p>No results</p>
        )}
      </div>
    </div>
  )
}

export default Search
