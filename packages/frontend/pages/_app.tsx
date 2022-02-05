import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"

import { FormContextProvider } from 'contexts/FormContext'
import { AppContextProvider } from 'contexts/AppContext'
import { SessionProvider } from "next-auth/react"
import theme from 'theme/theme'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <AppContextProvider>
          <FormContextProvider>
            <Component {...pageProps} />
          </FormContextProvider>
        </AppContextProvider>
      </SessionProvider>
    </ChakraProvider>
  )

}
export default MyApp
