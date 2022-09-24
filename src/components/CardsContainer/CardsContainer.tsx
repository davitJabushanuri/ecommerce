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
import { IProduct } from '../../ts/interfaces/types'
import { useQuery } from '@tanstack/react-query'
import fetchProducts from 'components/helpers/fetchProducts'

interface IProps {
  title: string
}

const CardsContainer: React.FC<IProps> = ({ title }) => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(['products'], fetchProducts)

  return (
    <div className={styles.container}>
      <div className={styles.seeAll}>
        <h1>{title}</h1>
        <Link href={`/products`}>
          <a>
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
        {products &&
          products
            .filter((product: IProduct) => {
              switch (title) {
                case 'New Arrivals':
                  return product.isNew
                case 'Trending':
                  return product.isTrending

                case 'On Sale':
                  return product.isOnSale

                default:
                  return product
              }
            })
            .map((product: IProduct) => {
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
