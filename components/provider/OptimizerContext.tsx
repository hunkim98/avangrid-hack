import { createContext, useContext, useState } from 'react'
import { Filter } from '@/types/filter'

interface OptimizerContextProps {
  children: React.ReactNode
}

interface OptimizerOptions {
  batteryHour: number
  batteryMW: number
  batteryInstallCostPerMW: number
  batteryDegradation: number
  batterFixedOMCostPerMW: number
  batteryLifeCycle: number
  batteryChargeThreshold: number
  batteryDischargeThreshold: number
  itc: number
  ptc: number
}

interface OptimizerContextElement {
  options: OptimizerOptions
  setOptions: (options: OptimizerOptions) => void
  isOptionOpened: boolean
  setIsOptionOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const OptimizerContext = createContext<OptimizerContextElement>({} as OptimizerContextElement)

const OptimizerContextProvider: React.FC<OptimizerContextProps> = ({ children }) => {
  const [isOptionOpened, setIsOptionOpened] = useState(false)
  const [options, setOptions] = useState<OptimizerOptions>({
    batteryHour: 0,
    batteryMW: 0,
    batteryInstallCostPerMW: 0,
    batteryDegradation: 0,
    batterFixedOMCostPerMW: 0,
    batteryLifeCycle: 0,
    batteryChargeThreshold: 0,
    batteryDischargeThreshold: 0,
    itc: 0,
    ptc: 0,
  })

  return (
    <OptimizerContext.Provider value={{ options, setOptions, isOptionOpened, setIsOptionOpened }}>
      {children}
    </OptimizerContext.Provider>
  )
}

const useOptimizerContext = () => {
  const context = useContext(OptimizerContext)
  if (context === undefined) {
    throw new Error('useOptimizerContext must be used within a OptimizerContextProvider')
  }
  return context
}

export { OptimizerContextProvider, useOptimizerContext }
