import { createContext, useContext, useState } from 'react'
import { Filter } from '@/types/filter'

interface ResultContextProps {
  children: React.ReactNode
}

interface ResultContextElement {
  filter: Filter
  setFilter: (filter: Filter) => void
}

const ResultContext = createContext<ResultContextElement>({} as ResultContextElement)

const ResultContextProvider: React.FC<ResultContextProps> = ({ children }) => {
  const [filter, setFilter] = useState<Filter>({ state: null, rtoIndex: null })

  return <ResultContext.Provider value={{ filter, setFilter }}>{children}</ResultContext.Provider>
}

const useResultContext = () => {
  const context = useContext(ResultContext)
  if (context === undefined) {
    throw new Error('useResultContext must be used within a ResultContextProvider')
  }
  return context
}

export { ResultContextProvider, useResultContext }
