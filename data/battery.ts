import { Battery } from '@/types/battery'

export const Batteries: Array<Battery> = [
  {
    name: 'Lithium-Ion',
    cycleLife: 2000,
    powerMW: 10,
    durationH: 5,
    dischargePrice: 50,
    chargePrice: 15,
    batteryInstallCostPerMW: 1000,
    batterFixedOMCostPerMW: 100,
  },
]
