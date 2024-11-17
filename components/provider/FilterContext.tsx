import { createContext, useContext, useState } from 'react'
import { Filter } from '@/types/filter'

interface FilterContextProps {
  children: React.ReactNode
}

interface FilterContextElement {
  filter: Filter
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
}

const FilterContext = createContext<FilterContextElement>({} as FilterContextElement)

const FilterContextProvider: React.FC<FilterContextProps> = ({ children }) => {
  const [filter, setFilter] = useState<Filter>({ state: null, rtoIndex: null, gridName: null })

  return <FilterContext.Provider value={{ filter, setFilter }}>{children}</FilterContext.Provider>
}

const useFilterContext = () => {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterContextProvider')
  }
  return context
}

export { FilterContextProvider, useFilterContext }
