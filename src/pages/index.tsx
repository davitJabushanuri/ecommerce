import type { NextPage } from 'next'
import Head from 'next/head'

import Header from 'components/Header/Header'
import CardsContainer from 'components/CardsContainer/CardsContainer'
import Hero from 'components/Hero/Hero'
import Footer from 'components/Footer/Footer'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <Hero />
        <CardsContainer title="New Arrivals" />
        <CardsContainer title="Trending" />
        <CardsContainer title="On Sale" />
        <CardsContainer title="All" />

        <Footer />
      </main>
    </div>
  )
}

export default Home
