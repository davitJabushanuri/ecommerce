import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useSession, signIn, signOut } from 'next-auth/react'

import { Button, ButtonGroup } from '@chakra-ui/react'
import Header from 'components/Header/Header'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />
        {session ? (
          <>
            <Button onClick={() => signOut()} colorScheme="blue">
              Sign out
            </Button>

            <p>{session?.user?.name}</p>
            <p>{session?.user?.email}</p>
          </>
        ) : (
          <Button onClick={() => signIn('github')} colorScheme="blue">
            Sign in with Github
          </Button>
        )}
      </main>
    </div>
  )
}

export default Home
