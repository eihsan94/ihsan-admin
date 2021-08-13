import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from 'next-auth/client'
import theme from 'styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <ChakraProvider theme={theme}>
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
  )
  
}
export default MyApp
