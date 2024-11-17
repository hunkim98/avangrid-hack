import { createContext, useContext, useState } from 'react'
import { ResultItemProps } from '../Result/ResultItem'
import { useLocalStorage } from '@mantine/hooks'
import { Batteries } from '@/data/battery'
import { Filter } from '@/types/filter'

interface ResultContextProps {
  children: React.ReactNode
}

export type ResultServerItem = Omit<ResultItemProps, 'isLast' | 'index' | 'graphId'>
interface ResultContextElement {
  results: Array<ResultServerItem>
  setResults: React.Dispatch<React.SetStateAction<Array<ResultServerItem>>>
  removeResult: (index: number) => void
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const sampleData: ResultServerItem = {
  npv: 100,
  lifeYear: 100,
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
  type: Batteries[0].name,
}
const ResultContext = createContext<ResultContextElement>({} as ResultContextElement)

const ResultContextProvider: React.FC<ResultContextProps> = ({ children }) => {
  const [results, setResults] = useLocalStorage<Array<ResultServerItem>>({
    key: 'results',
    defaultValue: [sampleData, sampleData],
  })
  const [isLoading, setIsLoading] = useState(false)
  const removeResult = (index: number) => {
    const newResults = results.filter((_, i) => i !== index)
    setResults(newResults)
    console.log(newResults)
  }

  return (
    <ResultContext.Provider value={{ results, setResults, removeResult, isLoading, setIsLoading }}>
      {children}
    </ResultContext.Provider>
  )
}

const useResultContext = () => {
  const context = useContext(ResultContext)
  if (context === undefined) {
    throw new Error('useResultContext must be used within a ResultContextProvider')
  }
  return context
}

export { ResultContextProvider, useResultContext }
