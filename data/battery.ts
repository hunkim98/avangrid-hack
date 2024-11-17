import { Battery } from '@/types/battery'

export const Batteries: Array<Battery> = [
  {
    name: 'Lithium-Ion (1HR 1MW)',
    cycleLife: 2000,
    powerMW: 1,
    durationH: 1,
    dischargePrice: 50,
    chargePrice: 15,
    batteryInstallCostPerMW: 1000,
    batterFixedOMCostPerMW: 100,
  },
]
