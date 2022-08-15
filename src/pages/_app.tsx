import '../styles/globals.css'
import 'swiper/css/bundle'
import type { AppProps } from 'next/app'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  )
}

export default MyApp
