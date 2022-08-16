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

interface CardsContainerProps {
  title: string
  products: any
}

const CardsContainer = ({ title, products }: CardsContainerProps) => {
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
        modules={[Pagination, Navigation]}
        className="mySwiper"
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
        {products.map((product: any) => {
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
