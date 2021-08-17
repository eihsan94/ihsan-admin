import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from 'next-auth/client'
import theme from 'styles/theme'
import { FormContextProvider } from 'contexts/FormContext'
import { AppContextProvider } from 'contexts/AppContext'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <ChakraProvider theme={theme}>
      <Provider session={pageProps.session}>
        <AppContextProvider>
          <FormContextProvider>
              <Component {...pageProps} />
          </FormContextProvider>
        </AppContextProvider>
      </Provider>
      </ChakraProvider>
  )
  
}
export default MyApp
