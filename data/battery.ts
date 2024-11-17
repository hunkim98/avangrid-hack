import { Battery } from '@/types/battery'

export const Batteries: Array<Battery> = [
  {
    name: 'lithium-ion (1HR 1MW)',
    cycleLife: 2000,
    powerMW: 1,
    durationH: 1,
    dischargePrice: 50,
    chargePrice: 15,
    batteryInstallCostPerMW: undefined,
    batterFixedOMCostPerMW: undefined,
  },
  {
    name: 'lithium-ion (2HR 1MW)',
    cycleLife: 2000,
    powerMW: 1,
    durationH: 2,
    dischargePrice: 50,
    chargePrice: 15,
    batteryInstallCostPerMW: undefined,
    batterFixedOMCostPerMW: undefined,
  },
  {
    name: 'lithium-ion (1HR 2MW)',
    cycleLife: 2000,
    powerMW: 2,
    durationH: 1,
    dischargePrice: 50,
    chargePrice: 15,
    batteryInstallCostPerMW: undefined,
    batterFixedOMCostPerMW: undefined,
  },
]
