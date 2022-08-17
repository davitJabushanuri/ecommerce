import '../styles/globals.css'
import 'swiper/css/bundle'
import type { AppProps } from 'next/app'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme} resetCSS={true}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
