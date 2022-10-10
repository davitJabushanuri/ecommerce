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
import useProducts from '@components/hooks/useProducts'

interface IProps {
  title: string
}

const CardsContainer: React.FC<IProps> = ({ title }) => {
  const products = useProducts()

  if (products.isLoading) return <div>Loading...</div>

  if (products.isError) return <div>Error</div>

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
        {products.isSuccess &&
          products.data
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
