import { OptimizerContextProvider } from '@/components/provider/OptimizerContext'
import { AppShell, Burger, MantineProvider, Text, Button } from '@mantine/core'
import { FilterContextProvider } from '@/components/provider/FilterContext'
import { ResultContextProvider } from '@/components/provider/ResultContext'
import { AppProps } from 'next/app'
import '@mantine/core/styles.css'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: any) {
  return (
    <MantineProvider>
      <FilterContextProvider>
        <OptimizerContextProvider>
          <ResultContextProvider>
            <Component pageProps={pageProps} />
          </ResultContextProvider>
        </OptimizerContextProvider>
      </FilterContextProvider>
    </MantineProvider>
  )
}
