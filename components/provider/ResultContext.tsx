import { createContext, useContext, useState } from 'react'
import { ResultItemProps } from '../Result/ResultItem'
import { Filter } from '@/types/filter'

interface ResultContextProps {
  children: React.ReactNode
}

interface ResultContextElement {
  results: Array<ResultItemProps>
  setResults: (results: Array<ResultItemProps>) => void
}

const sampleData: ResultItemProps = {
  title: 'Sample Data',
  npv: 100,
  irr: 0.1,
  yearTotalRevenue: 100,
  data: [
    ['Jan', 100],
    ['Feb', 200],
    ['Mar', 300],
    ['Apri', 400],
    ['May', 500],
    ['Jun', 600],
    ['Jul', 700],
    ['Aug', 800],
    ['Sep', 900],
    ['Oct', 1000],
    ['Nov', 1100],
    ['Dec', 1200],
  ],
}
const ResultContext = createContext<ResultContextElement>({} as ResultContextElement)

const ResultContextProvider: React.FC<ResultContextProps> = ({ children }) => {
  const [results, setResults] = useState<Array<ResultItemProps>>([sampleData, sampleData])

  return <ResultContext.Provider value={{ results, setResults }}>{children}</ResultContext.Provider>
}

const useResultContext = () => {
  const context = useContext(ResultContext)
  if (context === undefined) {
    throw new Error('useResultContext must be used within a ResultContextProvider')
  }
  return context
}

export { ResultContextProvider, useResultContext }
