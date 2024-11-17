import { createContext, useContext, useState } from 'react'
import { Filter } from '@/types/filter'

interface OptimizerContextProps {
  children: React.ReactNode
}

interface OptimizerOptions {
  batteryDurationH: number
  batteryPowerMW: number
  batteryInstallCostPerMW: number
  batterFixedOMCostPerMW: number
  batteryCycleLife: number
  chargePrice: number
  dischargePrice: number
  itc: number
  ptc: number
  discountRate: number
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
    batteryDurationH: 0,
    batteryPowerMW: 0,
    batteryInstallCostPerMW: 0,
    batterFixedOMCostPerMW: 0,
    batteryCycleLife: 0,
    chargePrice: 0,
    dischargePrice: 0,
    itc: 0,
    ptc: 0,
    discountRate: 0,
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
