import Card from 'components/Card/Card'
import styles from './CardsContainer.module.scss'
import { BsArrowRight } from 'react-icons/bs'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import Link from 'next/link'
import { IProduct } from '../../ts/interfaces/db_interfaces'
import useProductStore from '../store/productStore'

const CardsContainer = ({ title, products }: any) => {
  const setProducts = useProductStore((state: any) => state.setProducts)

  const filterProducts = () => {
    switch (title) {
      case 'New Arrivals':
        setProducts('New Arrivals')
        break
      case 'Trending':
        setProducts('Trending')
        break
      case 'On sale':
        setProducts('On sale')
        break
      default:
        setProducts('Recently Viewed')
        break
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.seeAll}>
        <h1>{title}</h1>
        <Link href={`/products`}>
          <a onClick={filterProducts}>
            <span>See all</span>
            <BsArrowRight />
          </a>
        </Link>
      </div>
      <Swiper
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={20}
        loopFillGroupWithBlank={true}
        navigation={true}
        pagination={true}
        touchMoveStopPropagation={true}
        modules={[Pagination, Navigation]}
        className="productSwiper"
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          500: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {products.products
          .filter((product: IProduct) => {
            switch (title) {
              case 'New Arrivals':
                return product.isNew
              case 'Trending':
                return product.isTrending

              case 'On sale':
                return product.isOnSale

              default:
                return product
            }
          })
          .map((product: any) => {
            return (
              <SwiperSlide key={product.id}>
                <Card product={product} />
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}

export default CardsContainer
