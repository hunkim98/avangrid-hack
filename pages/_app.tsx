import { AppShell, Burger, MantineProvider, Text, Button } from '@mantine/core'
import { AppProps } from 'next/app'
import '@mantine/core/styles.css'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: any) {
  return (
    <MantineProvider>
      <Component pageProps={pageProps} />
    </MantineProvider>
  )
}
